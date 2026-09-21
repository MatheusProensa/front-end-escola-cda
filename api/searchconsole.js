// Função serverless (Vercel) que busca dados de busca do Google Search Console
// (o que as pessoas pesquisam, cliques, impressões) e devolve um resumo pronto
// para o painel admin. Reaproveita a mesma conta de serviço do Analytics.
// Variáveis de ambiente necessárias (no projeto Vercel, nunca no código):
//   GA_CLIENT_EMAIL  — e-mail da conta de serviço (Google Cloud)
//   GA_PRIVATE_KEY   — chave privada da conta de serviço (com \n escapados)
//   SC_SITE_URL      — (opcional) URL da propriedade no Search Console.
//                      Padrão: https://escolacda.com.br/
// Pré-requisitos (uma vez): habilitar a "Search Console API" no Google Cloud e
// adicionar o GA_CLIENT_EMAIL como usuário da propriedade no Search Console.
const crypto = require("crypto");

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function obterTokenAcesso() {
  const email = process.env.GA_CLIENT_EMAIL;
  const chave = (process.env.GA_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !chave) throw new Error("GA_CLIENT_EMAIL / GA_PRIVATE_KEY não configurados.");

  const agora = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: agora + 3600,
    iat: agora,
  }));
  const semAssinatura = `${header}.${payload}`;
  const assinador = crypto.createSign("RSA-SHA256");
  assinador.update(semAssinatura);
  assinador.end();
  const assinatura = assinador.sign(chave).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const jwt = `${semAssinatura}.${assinatura}`;

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const dados = await resp.json();
  if (!dados.access_token) throw new Error("Falha ao autenticar com o Google: " + JSON.stringify(dados));
  return dados.access_token;
}

async function consultar(token, siteUrl, corpo) {
  const resp = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(corpo) }
  );
  if (!resp.ok) throw new Error("Erro na API do Search Console: " + (await resp.text()));
  return resp.json();
}

// Confirma que quem chama é o admin logado (mesmo e-mail das políticas do Supabase).
async function verificarAdmin(req) {
  const auth = req.headers.authorization || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const supaUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!token || !supaUrl || !anonKey) return false;
  const resp = await fetch(`${supaUrl}/auth/v1/user`, { headers: { Authorization: `Bearer ${token}`, apikey: anonKey } });
  if (!resp.ok) return false;
  const usuario = await resp.json();
  return usuario && usuario.email === "sm.escolacda@gmail.com";
}

const fmtData = (d) => d.toISOString().slice(0, 10);

module.exports = async (req, res) => {
  try {
    if (!(await verificarAdmin(req))) {
      res.status(401).json({ error: "Não autorizado." });
      return;
    }

    const siteUrl = process.env.SC_SITE_URL || "https://escolacda.com.br/";
    const dias = Math.min(90, Math.max(1, parseInt(req.query.dias, 10) || 28));
    const hoje = new Date();
    const ini = new Date(hoje);
    ini.setDate(ini.getDate() - dias);
    const startDate = fmtData(ini);
    const endDate = fmtData(hoje);

    const token = await obterTokenAcesso();

    const [totais, termos, paginas] = await Promise.all([
      consultar(token, siteUrl, { startDate, endDate }),
      consultar(token, siteUrl, { startDate, endDate, dimensions: ["query"], rowLimit: 15 }),
      consultar(token, siteUrl, { startDate, endDate, dimensions: ["page"], rowLimit: 10 }),
    ]);

    const linhaTotais = (totais.rows || [])[0] || {};
    const nomePagina = (url) => {
      try { return new URL(url).pathname || "/"; } catch { return url; }
    };

    res.status(200).json({
      periodo: dias,
      totais: {
        cliques: Math.round(linhaTotais.clicks || 0),
        impressoes: Math.round(linhaTotais.impressions || 0),
        ctr: (linhaTotais.ctr || 0) * 100,
        posicao: linhaTotais.position || 0,
      },
      termos: (termos.rows || []).map((r) => ({
        termo: r.keys[0],
        cliques: Math.round(r.clicks || 0),
        impressoes: Math.round(r.impressions || 0),
        ctr: (r.ctr || 0) * 100,
        posicao: r.position || 0,
      })),
      paginas: (paginas.rows || []).map((r) => ({
        pagina: nomePagina(r.keys[0]),
        cliques: Math.round(r.clicks || 0),
        impressoes: Math.round(r.impressions || 0),
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Erro desconhecido." });
  }
};
