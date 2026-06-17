import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminShell from "../AdminShell";
import { CountNum } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";
import { useAuth } from "../auth";
import { type Registro, TABELA_LABEL, identificarRegistro } from "../historico";

const logo = () => asset("logo-cda-15anos-semborda.webp");

const PAGINAS: [string, string, string, string, string][] = [
  ["house", "Home", "Hero, pilares, depoimentos", "pub", "/admin/home"],
  ["layer-group", "Segmentos", "Infantil (com berçário), Fundamental, Contraturno", "pub", "/admin/segmentos"],
  ["graduation-cap", "Metodologia", "ProRaiz, pilares, tecnologia, materiais", "pub", "/admin/metodologia"],
  ["palette", "Vivências", "Especializadas, Oficinas, Aulas extras", "pub", "/admin/vivencias"],
  ["image", "Espaços", "Galeria + energia solar", "pub", "/admin/espacos"],
  ["book-open", "Sobre", "História, linha do tempo, valores", "pub", "/admin/sobre"],
];

type Matricula = { status: string; responsavel?: string; segmento?: string; whatsapp?: string };
type Album = { id: number };

const OPERACAO_LABEL: Record<string, string> = { insert: "criou", update: "editou", delete: "excluiu" };
const OPERACAO_ICONE: Record<string, string> = { insert: "plus", update: "pen", delete: "trash" };
const OPERACAO_COR: Record<string, string> = { insert: "ic-green", update: "ic-blue", delete: "ic-rose" };

function formatarTempoRelativo(iso: string) {
  const diffMin = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (diffMin < 1) return "agora mesmo";
  if (diffMin < 60) return `há ${diffMin} min`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  return `há ${Math.round(diffH / 24)}d`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [totalAlbuns, setTotalAlbuns] = useState(0);
  const [edicoes, setEdicoes] = useState<Registro[]>([]);
  const [visitantes, setVisitantes] = useState<number | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!API_CONFIGURED) { setLoadingStats(false); return; }
    Promise.all([
      supabase.from("matriculas").select("status, responsavel, whatsapp, segmento").order("created_at", { ascending: false }),
      supabase.from("albuns").select("id"),
      supabase.from("historico_edicoes").select("*").order("created_at", { ascending: false }).limit(5),
    ]).then(([matsRes, albunsRes, edicoesRes]) => {
      setMatriculas((matsRes.data as Matricula[]) ?? []);
      setTotalAlbuns((albunsRes.data as Album[])?.length ?? 0);
      setEdicoes((edicoesRes.data as Registro[]) ?? []);
    }).finally(() => setLoadingStats(false));

    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token;
      if (!token) return;
      try {
        const resp = await fetch(`/api/analytics?dias=7`, { headers: { Authorization: `Bearer ${token}` } });
        if (!resp.ok) return;
        const json = await resp.json();
        setVisitantes(json.totais?.usuarios ?? 0);
      } catch {
        // estatísticas são complementares — se falhar, o resto do dashboard continua normal
      }
    });
  }, []);

  const novas = matriculas.filter((m) => m.status === "novo").length;
  const emContato = matriculas.filter((m) => m.status === "em_contato").length;

  const stats = API_CONFIGURED
    ? [
        { ic: "envelope-open-text", tone: "ic-blue", num: novas, lbl: "Matrículas novas", trend: novas > 0 ? `+${novas} aguardando` : "Em dia" as string, up: novas > 0 },
        { ic: "comments", tone: "ic-gold", num: emContato, lbl: "Em contato", trend: `${matriculas.length} total`, up: false },
        { ic: "images", tone: "ic-violet", num: totalAlbuns, lbl: "Álbuns publicados", trend: "Na página Momentos", up: false },
        { ic: "chart-line", tone: "ic-green", num: visitantes ?? 0, lbl: "Visitantes (7 dias)", trend: "Tráfego do site", up: true },
      ]
    : [
        { ic: "envelope-open-text", tone: "ic-blue", num: 0, lbl: "Matrículas novas", trend: "Modo demo", up: false },
        { ic: "comments", tone: "ic-gold", num: 0, lbl: "Em contato", trend: "Modo demo", up: false },
        { ic: "images", tone: "ic-violet", num: 0, lbl: "Álbuns publicados", trend: "Modo demo", up: false },
        { ic: "chart-line", tone: "ic-green", num: 0, lbl: "Visitantes (7 dias)", trend: "Modo demo", up: false },
      ];

  return (
    <AdminShell active="dashboard" title={`Olá, ${user?.nome?.split(" ")[0] ?? "Equipe CDA"} 👋`} subtitle="Veja o que está acontecendo com o site da escola." logoSrc={logo()}>

      {!API_CONFIGURED && (
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#92400e" }}>
          <i className="fa-solid fa-triangle-exclamation"></i> Painel em <strong>modo demo</strong> — configure <code>VITE_API_URL</code> no Vercel para conectar ao backend.
        </div>
      )}

      <div className="adm-stats">
        {stats.map((s, i) => (
          <div className="adm-stat" key={i}>
            <div className="adm-stat-top">
              <div className={"adm-stat-ic " + s.tone}><i className={"fa-solid fa-" + s.ic}></i></div>
              <span className={"adm-trend " + (s.up ? "up" : "flat")}>{s.trend}</span>
            </div>
            <div className="adm-stat-num">
              {loadingStats ? <span style={{ fontSize: 14, color: "var(--adm-ink-3)" }}>—</span> : <CountNum value={s.num} />}
            </div>
            <div className="adm-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="adm-grid-2">
        <div className="adm-panel">
          <div className="adm-panel-head">
            <div><h3>Matrículas recentes</h3><p>Solicitações enviadas pelo site</p></div>
            <Link className="adm-btn adm-btn-ghost adm-btn-sm" to="/admin/matriculas">Ver todas</Link>
          </div>
          <div className="adm-panel-body">
            {!API_CONFIGURED ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Conecte o backend para ver as matrículas.</p>
            ) : loadingStats ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Carregando…</p>
            ) : matriculas.length === 0 ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Nenhuma solicitação ainda.</p>
            ) : (
              matriculas.slice(0, 5).map((m, i) => (
                <div className="adm-activity" key={i}>
                  <div className="av ic-blue"><i className="fa-solid fa-user"></i></div>
                  <div className="tx">
                    <p><b>{m.responsavel}</b> — {m.segmento}</p>
                    <span>{m.status === "novo" ? "Novo" : m.status === "em_contato" ? "Em contato" : m.status} · {m.whatsapp}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="adm-panel">
          <div className="adm-panel-head"><div><h3>Editar páginas</h3><p>Acesso rápido ao conteúdo</p></div></div>
          <div className="adm-panel-body">
            <div className="adm-pagelist">
              {PAGINAS.map(([ic, t, d, st, to], i) => (
                <Link className="adm-pagerow" key={i} to={to}>
                  <div className="pic"><i className={"fa-solid fa-" + ic}></i></div>
                  <div className="pn"><strong>{t}</strong><span>{d}</span></div>
                  <span className={"adm-badge " + st}>{st === "pub" ? "Publicado" : "Rascunho"}</span>
                  <i className="fa-solid fa-chevron-right go"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="adm-grid-2" style={{ gridTemplateColumns: "1fr" }}>
        <div className="adm-panel">
          <div className="adm-panel-head">
            <div><h3>Últimas edições</h3><p>Atividade recente no painel</p></div>
            <Link className="adm-btn adm-btn-ghost adm-btn-sm" to="/admin/historico">Ver histórico</Link>
          </div>
          <div className="adm-panel-body">
            {!API_CONFIGURED ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Conecte o backend para ver o histórico.</p>
            ) : loadingStats ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Carregando…</p>
            ) : edicoes.length === 0 ? (
              <p style={{ padding: "12px 18px", fontSize: 13, color: "var(--adm-ink-3)" }}>Nenhuma edição registrada ainda.</p>
            ) : (
              edicoes.map((e) => (
                <div className="adm-activity" key={e.id}>
                  <div className={"av " + OPERACAO_COR[e.operacao]}><i className={"fa-solid fa-" + OPERACAO_ICONE[e.operacao]}></i></div>
                  <div className="tx">
                    <p>
                      <b>Admin</b> {OPERACAO_LABEL[e.operacao]} {TABELA_LABEL[e.tabela] ?? e.tabela}
                      {" — "}{identificarRegistro(e)}
                    </p>
                    <span>{formatarTempoRelativo(e.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="adm-grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="adm-panel">
          <div className="adm-panel-head">
            <div><h3>Álbuns de fotos</h3><p>Galeria de momentos da escola</p></div>
            <Link className="adm-btn adm-btn-ghost adm-btn-sm" to="/admin/momentos">Gerir</Link>
          </div>
          <div className="adm-panel-body" style={{ padding: "14px 18px 18px" }}>
            <p style={{ fontSize: 13, color: "var(--adm-ink-3)", margin: 0 }}>
              {loadingStats ? "Carregando…" : `${totalAlbuns} álbum${totalAlbuns !== 1 ? "s" : ""} publicado${totalAlbuns !== 1 ? "s" : ""} na página Momentos.`}
            </p>
            <Link className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 14, width: "fit-content" }} to="/admin/momentos">
              <i className="fa-solid fa-plus"></i> Novo álbum
            </Link>
          </div>
        </div>

        <div className="adm-panel" style={{ background: "linear-gradient(140deg,#0c2657,#0a1f4e)", border: "none", color: "#fff" }}>
          <div className="adm-panel-body" style={{ padding: "26px 24px" }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(240,180,0,0.16)", color: "#f0b400", display: "grid", placeItems: "center", fontSize: 19 }}><i className="fa-solid fa-wand-magic-sparkles"></i></div>
            <h3 style={{ margin: "16px 0 6px", fontSize: 18, fontWeight: 800 }}>Site pronto para receber famílias</h3>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>Mantenha fotos e textos sempre atualizados para transmitir confiança. Comece pela Home ou cadastre um novo evento.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <Link className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} to="/admin/home"><i className="fa-solid fa-pen-to-square"></i> Editar Home</Link>
              <Link className="adm-btn adm-btn-sm" style={{ width: "auto", background: "rgba(255,255,255,0.12)", color: "#fff" }} to="/admin/momentos"><i className="fa-solid fa-plus"></i> Novo álbum</Link>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
