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

async function rodarRelatorioTempoReal(token, propertyId, corpo) {
  const resp = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  if (!resp.ok) throw new Error("Erro na API do Google Analytics (tempo real): " + (await resp.text()));
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
  return usuario && usuario.email === "sm.escolacda@gmail.com";
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
    const dateRangesAnterior = [{ startDate: `${dias * 2}daysAgo`, endDate: `${dias + 1}daysAgo` }];
    const metricasTotais = [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ];
    const token = await obterTokenAcesso();

    const [
      totais,
      totaisAnterior,
      paginas,
      eventos,
      dispositivos,
      origens,
      novosVsRecorrentes,
      localizacao,
      serieTemporal,
      funilMatriculas,
      tempoReal,
    ] = await Promise.all([
      rodarRelatorio(token, propertyId, { dateRanges, metrics: metricasTotais }),
      rodarRelatorio(token, propertyId, { dateRanges: dateRangesAnterior, metrics: metricasTotais }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          notExpression: { filter: { fieldName: "pagePath", stringFilter: { matchType: "BEGINS_WITH", value: "/admin" } } },
        },
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
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 8,
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "newVsReturning" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "city" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 8,
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }, { name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      rodarRelatorio(token, propertyId, {
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: { filter: { fieldName: "pagePath", stringFilter: { matchType: "EXACT", value: "/matriculas" } } },
      }),
      rodarRelatorioTempoReal(token, propertyId, { metrics: [{ name: "activeUsers" }] }),
    ]);

    const extrairTotais = (relatorio) => {
      const v = linhas(relatorio)[0]?.metricValues?.map((m) => Number(m.value)) || [0, 0, 0, 0, 0];
      return { usuarios: v[0], sessoes: v[1], visualizacoes: v[2], duracaoMediaSeg: v[3], taxaRejeicao: v[4] };
    };

    const visualizacoesMatriculas = linhas(funilMatriculas)[0]?.metricValues?.[0]?.value
      ? Number(linhas(funilMatriculas)[0].metricValues[0].value)
      : 0;
    const eventosLista = linhas(eventos).map((r) => ({ nome: r.dimensionValues[0].value, total: Number(r.metricValues[0].value) }));
    const matriculasEnviadas = eventosLista.find((e) => e.nome === "matricula_enviada")?.total ?? 0;

    res.status(200).json({
      periodo: dias,
      totais: extrairTotais(totais),
      totaisAnterior: extrairTotais(totaisAnterior),
      paginas: linhas(paginas).map((r) => ({ caminho: r.dimensionValues[0].value, visualizacoes: Number(r.metricValues[0].value) })),
      eventos: eventosLista,
      dispositivos: linhas(dispositivos).map((r) => ({ categoria: r.dimensionValues[0].value, usuarios: Number(r.metricValues[0].value) })),
      origens: linhas(origens).map((r) => ({ canal: r.dimensionValues[0].value, sessoes: Number(r.metricValues[0].value) })),
      novosVsRecorrentes: linhas(novosVsRecorrentes).map((r) => ({ tipo: r.dimensionValues[0].value, usuarios: Number(r.metricValues[0].value) })),
      localizacao: linhas(localizacao).map((r) => ({ cidade: r.dimensionValues[0].value, usuarios: Number(r.metricValues[0].value) })),
      serieTemporal: linhas(serieTemporal).map((r) => ({
        data: r.dimensionValues[0].value,
        usuarios: Number(r.metricValues[0].value),
        sessoes: Number(r.metricValues[1].value),
        visualizacoes: Number(r.metricValues[2].value),
      })),
      funil: {
        visualizacoesMatriculas,
        matriculasEnviadas,
        taxaConversao: visualizacoesMatriculas ? (matriculasEnviadas / visualizacoesMatriculas) * 100 : 0,
      },
      usuariosAgora: Number(linhas(tempoReal)[0]?.metricValues?.[0]?.value || 0),
    });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Erro desconhecido." });
  }
};
