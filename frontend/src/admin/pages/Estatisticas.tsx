import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { CountNum } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Dados = {
  periodo: number;
  totais: { usuarios: number; sessoes: number; visualizacoes: number; duracaoMediaSeg: number; taxaRejeicao: number };
  totaisAnterior: { usuarios: number; sessoes: number; visualizacoes: number; duracaoMediaSeg: number; taxaRejeicao: number };
  paginas: { caminho: string; visualizacoes: number }[];
  eventos: { nome: string; total: number }[];
  dispositivos: { categoria: string; usuarios: number }[];
  origens: { canal: string; sessoes: number }[];
  novosVsRecorrentes: { tipo: string; usuarios: number }[];
  localizacao: { cidade: string; usuarios: number }[];
  serieTemporal: { data: string; usuarios: number; sessoes: number; visualizacoes: number }[];
  funil: { visualizacoesMatriculas: number; matriculasEnviadas: number; taxaConversao: number };
  usuariosAgora: number;
};

const EVENTO_LABEL: Record<string, string> = {
  page_view: "Visualizações de página",
  whatsapp_click: "Cliques no WhatsApp",
  cta_click: "Cliques em \"Agende uma visita\"",
  social_click: "Cliques nas redes sociais",
  matricula_enviada: "Formulários de matrícula enviados",
  matricula_erro: "Erros no formulário de matrícula",
  session_start: "Início de sessão",
  first_visit: "Primeira visita",
  scroll: "Rolagem de página",
  click: "Cliques em links externos",
  file_download: "Download de arquivo",
  user_engagement: "Tempo de interação na página",
};

const PAGINA_LABEL: Record<string, string> = {
  "/": "Página inicial",
  "/segmentos": "Segmentos",
  "/vivencias": "Vivências",
  "/metodologia": "Metodologia",
  "/espacos": "Espaços",
  "/momentos": "Momentos",
  "/sobre": "Sobre",
  "/matriculas": "Matrículas",
};

const DEVICE_LABEL: Record<string, string> = { mobile: "Celular", desktop: "Computador", tablet: "Tablet" };

const CANAL_LABEL: Record<string, string> = {
  "Direct": "Direto (digitou o endereço)",
  "Organic Search": "Busca no Google",
  "Paid Search": "Anúncios de busca",
  "Organic Social": "Redes sociais",
  "Paid Social": "Anúncios em redes sociais",
  "Referral": "Outros sites",
  "Email": "E-mail",
  "Display": "Anúncios de display",
  "Unassigned": "Não identificado",
};

const TIPO_LABEL: Record<string, string> = { new: "Novos visitantes", returning: "Visitantes recorrentes", "(not set)": "Não identificado" };

// Com poucas sessões, um único acesso isolado (até de alguém da equipe checando o site) já
// distorce a taxa de rejeição inteira — só vale mostrar o número com uma amostra mínima.
const SESSOES_MIN_REJEICAO = 20;

const formatarDuracao = (seg: number) => {
  const m = Math.floor(seg / 60);
  const s = Math.round(seg % 60);
  return `${m}m ${s.toString().padStart(2, "0")}s`;
};
const formatarPercent = (v: number) => (v <= 1 ? v * 100 : v).toFixed(1) + "%";

const formatarDataCurta = (iso: string) => {
  const m = iso.match(/^(\d{4})(\d{2})(\d{2})$/);
  return m ? `${m[3]}/${m[2]}` : iso;
};

function BarraLista({ itens, max, render }: { itens: { rotulo: string; valor: number }[]; max: number; render: (v: number) => string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {itens.map((it, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: "var(--adm-ink-2)" }}>{it.rotulo}</span>
            <b>{render(it.valor)}</b>
          </div>
          <div style={{ height: 7, background: "var(--adm-bg)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${max ? (it.valor / max) * 100 : 0}%`, background: "var(--adm-blue)", borderRadius: 6 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Delta({ atual, anterior }: { atual: number; anterior: number }) {
  if (!anterior) return null;
  const variacao = ((atual - anterior) / anterior) * 100;
  const positivo = variacao >= 0;
  return (
    <span style={{ fontSize: 11.5, fontWeight: 700, color: positivo ? "var(--adm-green)" : "var(--adm-rose)", display: "inline-flex", alignItems: "center", gap: 3 }}>
      <i className={`fa-solid fa-arrow-${positivo ? "up" : "down"}`}></i>
      {Math.abs(variacao).toFixed(1)}%
    </span>
  );
}

function TrendChart({ dados }: { dados: Dados["serieTemporal"] }) {
  if (!dados.length) return null;
  const W = 600, H = 180, PAD = 8;
  const max = Math.max(1, ...dados.flatMap((d) => [d.usuarios, d.sessoes, d.visualizacoes]));
  const pontos = (campo: "usuarios" | "sessoes" | "visualizacoes") =>
    dados
      .map((d, i) => {
        const x = PAD + (i / Math.max(1, dados.length - 1)) * (W - PAD * 2);
        const y = H - PAD - (d[campo] / max) * (H - PAD * 2);
        return `${x},${y}`;
      })
      .join(" ");

  const SERIES: { campo: "usuarios" | "sessoes" | "visualizacoes"; cor: string; label: string }[] = [
    { campo: "visualizacoes", cor: "var(--adm-gold)", label: "Visualizações" },
    { campo: "sessoes", cor: "var(--adm-violet)", label: "Sessões" },
    { campo: "usuarios", cor: "var(--adm-blue)", label: "Usuários" },
  ];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 180, display: "block" }} preserveAspectRatio="none">
        {SERIES.map((s) => (
          <polyline key={s.campo} points={pontos(s.campo)} fill="none" stroke={s.cor} strokeWidth={2} />
        ))}
      </svg>
      <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, color: "var(--adm-ink-2)" }}>
        {SERIES.map((s) => (
          <span key={s.campo} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.cor, display: "inline-block" }}></span>
            {s.label}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--adm-ink-3)", marginTop: 4 }}>
        <span>{formatarDataCurta(dados[0].data)}</span>
        <span>{formatarDataCurta(dados[dados.length - 1].data)}</span>
      </div>
    </div>
  );
}

export default function Estatisticas() {
  const [dias, setDias] = useState(28);
  const [dados, setDados] = useState<Dados | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!API_CONFIGURED) { setLoading(false); return; }
    setLoading(true);
    setErro("");
    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token;
      if (!token) { setErro("Faça login novamente para ver as estatísticas."); setLoading(false); return; }
      try {
        const resp = await fetch(`/api/analytics?dias=${dias}`, { headers: { Authorization: `Bearer ${token}` } });
        const json = await resp.json();
        if (!resp.ok) throw new Error(json.error || "Erro ao carregar estatísticas.");
        setDados(json);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro ao carregar estatísticas.");
      } finally {
        setLoading(false);
      }
    });
  }, [dias]);

  const maxPagina = Math.max(1, ...(dados?.paginas.map((p) => p.visualizacoes) ?? [1]));
  const maxEvento = Math.max(1, ...(dados?.eventos.map((e) => e.total) ?? [1]));
  const maxDispositivo = Math.max(1, ...(dados?.dispositivos.map((d) => d.usuarios) ?? [1]));
  const maxOrigem = Math.max(1, ...(dados?.origens.map((o) => o.sessoes) ?? [1]));
  const maxTipo = Math.max(1, ...(dados?.novosVsRecorrentes.map((t) => t.usuarios) ?? [1]));
  const maxCidade = Math.max(1, ...(dados?.localizacao.map((c) => c.usuarios) ?? [1]));

  return (
    <AdminShell active="estatisticas" title="Estatísticas" subtitle="Acompanhe o desempenho do site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-chart-line"></i></div>
        <div><h1>Estatísticas</h1><p>Dados reais do Google Analytics — visitas, páginas mais acessadas e os cliques que mais importam.</p></div>
        <div className="ph-act">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!loading && dados && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "var(--adm-green)", background: "var(--adm-green-soft)", padding: "6px 12px", borderRadius: 999 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--adm-green)", display: "inline-block" }}></span>
                {dados.usuariosAgora} {dados.usuariosAgora === 1 ? "pessoa" : "pessoas"} no site agora
              </div>
            )}
            <div style={{ display: "flex", gap: 6 }}>
              {[7, 28, 90].map((d) => (
                <button key={d} onClick={() => setDias(d)} className={"adm-btn adm-btn-sm " + (dias === d ? "adm-btn-primary" : "adm-btn-ghost")} style={{ width: "auto" }}>
                  {d} dias
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!API_CONFIGURED ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}>
          <i className="fa-solid fa-plug" style={{ fontSize: 32, color: "var(--adm-ink-3)", marginBottom: 12, display: "block" }}></i>
          <p style={{ color: "var(--adm-ink-3)" }}>Configure o backend para visualizar as estatísticas.</p>
        </div>
      ) : erro ? (
        <div className="adm-card" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
          <p style={{ fontSize: 13, color: "#92400e", margin: 0 }}><i className="fa-solid fa-triangle-exclamation"></i> {erro}</p>
        </div>
      ) : (
        <>
          <div className="adm-stats">
            {[
              { ic: "users", tone: "ic-blue", num: dados?.totais.usuarios ?? 0, anterior: dados?.totaisAnterior.usuarios ?? 0, lbl: "Usuários" },
              { ic: "arrow-right-arrow-left", tone: "ic-gold", num: dados?.totais.sessoes ?? 0, anterior: dados?.totaisAnterior.sessoes ?? 0, lbl: "Sessões" },
              { ic: "eye", tone: "ic-violet", num: dados?.totais.visualizacoes ?? 0, anterior: dados?.totaisAnterior.visualizacoes ?? 0, lbl: "Visualizações de página" },
            ].map((s, i) => (
              <div className="adm-stat" key={i}>
                <div className="adm-stat-top">
                  <div className={"adm-stat-ic " + s.tone}><i className={"fa-solid fa-" + s.ic}></i></div>
                  {!loading && <Delta atual={s.num} anterior={s.anterior} />}
                </div>
                <div className="adm-stat-num">{loading ? <span style={{ fontSize: 14, color: "var(--adm-ink-3)" }}>—</span> : <CountNum value={s.num} />}</div>
                <div className="adm-stat-lbl">{s.lbl}</div>
              </div>
            ))}
            <div className="adm-stat">
              <div className="adm-stat-top"><div className="adm-stat-ic ic-green"><i className="fa-solid fa-clock"></i></div></div>
              <div className="adm-stat-num" style={{ fontSize: 22 }}>{loading ? "—" : formatarDuracao(dados?.totais.duracaoMediaSeg ?? 0)}</div>
              <div className="adm-stat-lbl">Tempo médio no site</div>
            </div>
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div><h3>Evolução no período</h3><p>Usuários, sessões e visualizações por dia, últimos {dias} dias</p></div></div>
            <div className="adm-panel-body" style={{ padding: 18 }}>
              {loading ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
              ) : !dados?.serieTemporal.length ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
              ) : (
                <TrendChart dados={dados.serieTemporal} />
              )}
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-panel">
              <div className="adm-panel-head"><div><h3>Páginas mais acessadas</h3><p>Últimos {dias} dias</p></div></div>
              <div className="adm-panel-body" style={{ padding: 18 }}>
                {loading ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
                ) : !dados?.paginas.length ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
                ) : (
                  <BarraLista
                    itens={dados.paginas.map((p) => ({ rotulo: PAGINA_LABEL[p.caminho] ?? p.caminho, valor: p.visualizacoes }))}
                    max={maxPagina}
                    render={(v) => `${v}`}
                  />
                )}
              </div>
            </div>

            <div className="adm-panel">
              <div className="adm-panel-head"><div><h3>Cliques e eventos</h3><p>O que as famílias mais fazem no site</p></div></div>
              <div className="adm-panel-body" style={{ padding: 18 }}>
                {loading ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
                ) : !dados?.eventos.length ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
                ) : (
                  <BarraLista
                    itens={dados.eventos.map((e) => ({ rotulo: EVENTO_LABEL[e.nome] ?? e.nome, valor: e.total }))}
                    max={maxEvento}
                    render={(v) => `${v}`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-panel">
              <div className="adm-panel-head"><div><h3>Origens de tráfego</h3><p>De onde vêm as visitas</p></div></div>
              <div className="adm-panel-body" style={{ padding: 18 }}>
                {loading ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
                ) : !dados?.origens.length ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
                ) : (
                  <BarraLista
                    itens={dados.origens.map((o) => ({ rotulo: CANAL_LABEL[o.canal] ?? o.canal, valor: o.sessoes }))}
                    max={maxOrigem}
                    render={(v) => `${v}`}
                  />
                )}
              </div>
            </div>

            <div className="adm-panel">
              <div className="adm-panel-head"><div><h3>Novos vs. recorrentes</h3><p>Quem já conhecia o site</p></div></div>
              <div className="adm-panel-body" style={{ padding: 18 }}>
                {loading ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
                ) : !dados?.novosVsRecorrentes.length ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
                ) : (
                  <BarraLista
                    itens={dados.novosVsRecorrentes.map((t) => ({ rotulo: TIPO_LABEL[t.tipo] || "Não identificado", valor: t.usuarios }))}
                    max={maxTipo}
                    render={(v) => `${v}`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-panel">
              <div className="adm-panel-head"><div><h3>Localização</h3><p>Cidades de onde vêm os visitantes</p></div></div>
              <div className="adm-panel-body" style={{ padding: 18 }}>
                {loading ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
                ) : !dados?.localizacao.length ? (
                  <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
                ) : (
                  <BarraLista
                    itens={dados.localizacao.map((c) => ({ rotulo: !c.cidade || c.cidade === "(not set)" ? "Não identificada" : c.cidade, valor: c.usuarios }))}
                    max={maxCidade}
                    render={(v) => `${v}`}
                  />
                )}
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-filter"></i></div><h3>Funil de matrículas</h3></div>
              {loading ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="adm-status-row"><span>Visualizaram a página de Matrículas</span><b>{dados?.funil.visualizacoesMatriculas ?? 0}</b></div>
                  <div className="adm-status-row"><span>Enviaram o formulário</span><b>{dados?.funil.matriculasEnviadas ?? 0}</b></div>
                  <div className="adm-status-row"><span>Taxa de conversão</span><b>{(dados?.funil.taxaConversao ?? 0).toFixed(1)}%</b></div>
                </div>
              )}
              <p className="hint" style={{ marginTop: 14 }}>Taxa de conversão = quantas pessoas que viram a página de Matrículas realmente enviaram o formulário.</p>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-mobile-screen"></i></div><h3>Dispositivos e taxa de rejeição</h3></div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
              {loading ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
              ) : !dados?.dispositivos.length ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum dado no período.</p>
              ) : (
                <BarraLista
                  itens={dados.dispositivos.map((d) => ({ rotulo: DEVICE_LABEL[d.categoria] ?? d.categoria, valor: d.usuarios }))}
                  max={maxDispositivo}
                  render={(v) => `${v}`}
                />
              )}
              <div className="adm-status-row">
                <span>Taxa de rejeição</span>
                <b>
                  {loading
                    ? "—"
                    : (dados?.totais.sessoes ?? 0) < SESSOES_MIN_REJEICAO
                      ? "Dados insuficientes"
                      : formatarPercent(dados?.totais.taxaRejeicao ?? 0)}
                </b>
              </div>
            </div>
            <p className="hint" style={{ marginTop: 14 }}>
              {(dados?.totais.sessoes ?? 0) < SESSOES_MIN_REJEICAO
                ? `Ainda há poucas visitas no período pra esse número ser confiável (precisa de pelo menos ${SESSOES_MIN_REJEICAO} sessões).`
                : "Taxa de rejeição = visitantes que saíram sem interagir com a página. Quanto menor, melhor."}
            </p>
          </div>
        </>
      )}
    </AdminShell>
  );
}
