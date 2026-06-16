import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");
const GRUPOS: { titulo: string; turno: string; itens: { img?: string; t: string }[] }[] = [
  {
    titulo: "Especializadas", turno: "Turno da tarde",
    itens: [{ img: "musica.webp", t: "Musicalização" }, { img: "capoeira.webp", t: "Capoeira" }, { t: "Educação Física" }],
  },
  {
    titulo: "Oficinas", turno: "Turno da manhã (contraturno)",
    itens: [{ img: "ambiental.webp", t: "Educação Ambiental" }, { img: "culinaria.webp", t: "Culinária Afetiva" }, { t: "Educação Socioemocional" }, { t: "Libras" }],
  },
  {
    titulo: "Aulas extras", turno: "Parcerias da escola (opcionais)",
    itens: [{ t: "Bombeiro Mirim" }, { t: "Ballet" }, { t: "Taekwondo" }],
  },
];
const TOTAL = GRUPOS.reduce((n, g) => n + g.itens.length, 0);

export default function EditarVivencias() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="vivencias" title="Editar — Vivências" subtitle="Especializadas, Oficinas e Aulas extras" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-palette"></i></div>
        <div><h1>Vivências</h1><p>Gerencie as {TOTAL} atividades, organizadas em 3 categorias como no site.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/vivencias" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      {GRUPOS.map((g, gi) => (
        <div className="adm-card" key={gi} style={{ marginBottom: 16 }}>
          <div className="adm-card-sec">
            <div className="si"><i className="fa-solid fa-layer-group"></i></div>
            <h3>{g.titulo} <span style={{ fontWeight: 600, color: "var(--adm-ink-3)", fontSize: 13 }}>· {g.turno}</span></h3>
          </div>
          <div className="adm-img-grid">
            {g.itens.map((v, i) => (
              <div key={i} style={{ border: "1px solid var(--adm-line)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
                <div className="adm-img-slot" style={{ aspectRatio: "16/10", border: "none", borderRadius: 0 }}>
                  {v.img ? <img src={asset(v.img)} alt={v.t} /> : <div className="adm-img-empty"><i className="fa-solid fa-image"></i><span>Sem foto</span></div>}
                  <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar</span></div>
                </div>
                <div style={{ padding: "11px 13px", display: "flex", alignItems: "center", gap: 8 }}>
                  <input className="adm-text" defaultValue={v.t} style={{ padding: "8px 10px", fontSize: 13 }} />
                  <button className="adm-mini-btn del" title="Remover"><i className="fa-regular fa-trash-can"></i></button>
                </div>
              </div>
            ))}
          </div>
          <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 12 }}><i className="fa-solid fa-plus"></i> Adicionar em {g.titulo}</button>
        </div>
      ))}

      <SaveBar onSave={() => toast("Vivências atualizadas!")} />
      {toastNode}
    </AdminShell>
  );
}
