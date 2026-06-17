import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { CountNum } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Dados = {
  periodo: number;
  totais: { usuarios: number; sessoes: number; visualizacoes: number; duracaoMediaSeg: number; taxaRejeicao: number };
  paginas: { caminho: string; visualizacoes: number }[];
  eventos: { nome: string; total: number }[];
  dispositivos: { categoria: string; usuarios: number }[];
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
};

const DEVICE_LABEL: Record<string, string> = { mobile: "Celular", desktop: "Computador", tablet: "Tablet" };

const formatarDuracao = (seg: number) => {
  const m = Math.floor(seg / 60);
  const s = Math.round(seg % 60);
  return `${m}m ${s.toString().padStart(2, "0")}s`;
};
const formatarPercent = (v: number) => (v <= 1 ? v * 100 : v).toFixed(1) + "%";

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

  return (
    <AdminShell active="estatisticas" title="Estatísticas" subtitle="Acompanhe o desempenho do site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-chart-line"></i></div>
        <div><h1>Estatísticas</h1><p>Dados reais do Google Analytics — visitas, páginas mais acessadas e os cliques que mais importam.</p></div>
        <div className="ph-act">
          <div style={{ display: "flex", gap: 6 }}>
            {[7, 28, 90].map((d) => (
              <button key={d} onClick={() => setDias(d)} className={"adm-btn adm-btn-sm " + (dias === d ? "adm-btn-primary" : "adm-btn-ghost")} style={{ width: "auto" }}>
                {d} dias
              </button>
            ))}
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
              { ic: "users", tone: "ic-blue", num: dados?.totais.usuarios ?? 0, lbl: "Usuários" },
              { ic: "arrow-right-arrow-left", tone: "ic-gold", num: dados?.totais.sessoes ?? 0, lbl: "Sessões" },
              { ic: "eye", tone: "ic-violet", num: dados?.totais.visualizacoes ?? 0, lbl: "Visualizações de página" },
            ].map((s, i) => (
              <div className="adm-stat" key={i}>
                <div className="adm-stat-top"><div className={"adm-stat-ic " + s.tone}><i className={"fa-solid fa-" + s.ic}></i></div></div>
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
                    itens={dados.paginas.map((p) => ({ rotulo: p.caminho, valor: p.visualizacoes }))}
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
              <div className="adm-status-row"><span>Taxa de rejeição</span><b>{loading ? "—" : formatarPercent(dados?.totais.taxaRejeicao ?? 0)}</b></div>
            </div>
            <p className="hint" style={{ marginTop: 14 }}>Taxa de rejeição = visitantes que saíram sem interagir com a página. Quanto menor, melhor.</p>
          </div>
        </>
      )}
    </AdminShell>
  );
}
