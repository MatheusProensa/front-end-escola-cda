import { Link } from "react-router-dom";
import AdminShell from "../AdminShell";
import { CountNum } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

const STATS = [
  { ic: "image", tone: "ic-blue", num: "248", lbl: "Imagens no site", trend: "+12", up: true },
  { ic: "calendar-days", tone: "ic-gold", num: "3", lbl: "Eventos ativos", trend: "Próx. 14/06", up: false },
  { ic: "file-lines", tone: "ic-violet", num: "9", lbl: "Páginas publicadas", trend: "100% no ar", up: true },
  { ic: "pen-to-square", tone: "ic-green", num: "17", lbl: "Edições este mês", trend: "+5", up: true },
];
const ATIV = [
  { ic: "image", tone: "ic-blue", a: "Foto atualizada", b: " na galeria de Espaços", when: "Há 2 horas · Equipe CDA" },
  { ic: "calendar-days", tone: "ic-gold", a: "Novo evento", b: " “Festa Junina 2026” criado", when: "Ontem · Equipe CDA" },
  { ic: "pen-to-square", tone: "ic-green", a: "Texto do Hero", b: " da Home editado", when: "Há 2 dias · Equipe CDA" },
  { ic: "palette", tone: "ic-violet", a: "Vivência", b: " “Culinária Afetiva” atualizada", when: "Há 3 dias · Equipe CDA" },
  { ic: "address-book", tone: "ic-blue", a: "WhatsApp de contato", b: " atualizado", when: "Há 5 dias · Equipe CDA" },
];
const PAGINAS: [string, string, string, string, string][] = [
  ["house", "Home", "Hero, pilares, depoimentos", "pub", "/admin/home"],
  ["layer-group", "Segmentos", "Infantil (com berçário), Fundamental, Contraturno", "pub", "/admin/segmentos"],
  ["graduation-cap", "Metodologia", "ProRaiz, pilares, tecnologia, materiais", "pub", "/admin/metodologia"],
  ["palette", "Vivências", "Especializadas, Oficinas, Aulas extras", "pub", "/admin/vivencias"],
  ["image", "Espaços", "Galeria + energia solar", "pub", "/admin/espacos"],
  ["book-open", "Sobre", "História, linha do tempo, valores", "pub", "/admin/sobre"],
];

export default function Dashboard() {
  return (
    <AdminShell active="dashboard" title="Olá, Equipe CDA 👋" subtitle="Veja o que está acontecendo com o site da escola." logoSrc={logo()}>
      <div className="adm-stats">
        {STATS.map((s, i) => (
          <div className="adm-stat" key={i}>
            <div className="adm-stat-top">
              <div className={"adm-stat-ic " + s.tone}><i className={"fa-solid fa-" + s.ic}></i></div>
              <span className={"adm-trend " + (s.up ? "up" : "flat")}>{s.trend}</span>
            </div>
            <div className="adm-stat-num"><CountNum value={s.num} /></div>
            <div className="adm-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="adm-grid-2">
        <div className="adm-panel">
          <div className="adm-panel-head">
            <div><h3>Atividades recentes</h3><p>O que a equipe alterou ultimamente</p></div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm">Ver tudo</button>
          </div>
          <div className="adm-panel-body">
            {ATIV.map((a, i) => (
              <div className="adm-activity" key={i}>
                <div className={"av " + a.tone}><i className={"fa-solid fa-" + a.ic}></i></div>
                <div className="tx"><p><b>{a.a}</b>{a.b}</p><span>{a.when}</span></div>
              </div>
            ))}
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

      <div className="adm-grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="adm-panel">
          <div className="adm-panel-head"><div><h3>Próximos eventos</h3><p>Agenda publicada no site</p></div><Link className="adm-btn adm-btn-ghost adm-btn-sm" to="/admin/momentos">Gerir</Link></div>
          <div className="adm-panel-body" style={{ padding: "14px 18px 18px" }}>
            <div className="adm-evt" style={{ marginBottom: 10 }}>
              <div className="date"><div className="d">14</div><div className="m">Jun</div></div>
              <div className="info"><h4>Festa Junina 2026</h4><p>Arraiá da CDA com as famílias.</p></div>
            </div>
            <div className="adm-evt" style={{ margin: 0 }}>
              <div className="date"><div className="d">28</div><div className="m">Jun</div></div>
              <div className="info"><h4>Reunião de Pais</h4><p>Encontro do 2º bimestre.</p></div>
            </div>
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
