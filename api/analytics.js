// Função serverless (Vercel) que busca estatísticas do Google Analytics (GA4)
// usando uma conta de serviço e devolve um resumo já pronto para o painel admin.
// Variáveis de ambiente necessárias (configuradas no projeto Vercel, nunca no código):
//   GA_PROPERTY_ID   — ID numérico da propriedade GA4 (Admin > Detalhes da propriedade)
//   GA_CLIENT_EMAIL  — e-mail da conta de serviço (Google Cloud)
//   GA_PRIVATE_KEY   — chave privada da conta de serviço (com \n escapados)
const crypto = require("crypto");

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function obterTokenAcesso() {
  const email = process.env.GA_CLIENT_EMAIL;
  const chave = (process.env.GA_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !chave) throw new Error("GA_CLIENT_EMAIL / GA_PRIVATE_KEY não configurados.");

  const agora = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64url(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: agora + 3600,
    iat: agora,
  }));
  const semAssinatura = `${header}.${payload}`;
  const assinador = crypto.createSign("RSA-SHA256");
  assinador.update(semAssinatura);
  assinador.end();
  const assinatura = assinador
    .sign(chave)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
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

async function rodarRelatorio(token, propertyId, corpo) {
  const resp = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  if (!resp.ok) throw new Error("Erro na API do Google Analytics: " + (await resp.text()));
  return resp.json();
}

// Confirma que quem está chamando é o admin logado (mesmo e-mail usado nas políticas do Supabase).
async function verificarAdmin(req) {
  const auth = req.headers.authorization || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const supaUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!token || !supaUrl || !anonKey) return false;
  const resp = await fetch(`${supaUrl}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: anonKey },
  });
  if (!resp.ok) return false;
  const usuario = await resp.json();
  return usuario && usuario.email === "escolacdasm@gmail.com";
}

const linhas = (relatorio) => relatorio.rows || [];

module.exports = async (req, res) => {
  try {
    const autorizado = await verificarAdmin(req);
    if (!autorizado) {
      res.status(401).json({ error: "Não autorizado." });
      return;
    }

    const propertyId = process.env.GA_PROPERTY_ID;
    if (!propertyId) {
      res.status(500).json({ error: "GA_PROPERTY_ID não configurado no servidor." });
      return;
    }

    const dias = Math.min(90, Math.max(1, parseInt(req.query.dias, 10) || 28));
    const dateRanges = [{ startDate: `${dias}daysAgo`, endDate: "today" }];
    const token = await obterTokenAcesso();

    const [totais, paginas, eventos, dispositivos] = await Promise.all([
      rodarRelatorio(token, propertyId, {
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
        limit: 20,
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),
    ]);

    const valoresTotais = linhas(totais)[0]?.metricValues?.map((m) => Number(m.value)) || [0, 0, 0, 0, 0];

    res.status(200).json({
      periodo: dias,
      totais: {
        usuarios: valoresTotais[0],
        sessoes: valoresTotais[1],
        visualizacoes: valoresTotais[2],
        duracaoMediaSeg: valoresTotais[3],
        taxaRejeicao: valoresTotais[4],
      },
      paginas: linhas(paginas).map((r) => ({ caminho: r.dimensionValues[0].value, visualizacoes: Number(r.metricValues[0].value) })),
      eventos: linhas(eventos).map((r) => ({ nome: r.dimensionValues[0].value, total: Number(r.metricValues[0].value) })),
      dispositivos: linhas(dispositivos).map((r) => ({ categoria: r.dimensionValues[0].value, usuarios: Number(r.metricValues[0].value) })),
    });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Erro desconhecido." });
  }
};
