import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");
type V = { img?: string; t: string };
const VIVS: V[] = [
  { img: "supercerebro.webp", t: "Super Cérebro" }, { img: "musica.webp", t: "Musicalização" },
  { img: "capoeira.webp", t: "Capoeira" }, { img: "ambiental.webp", t: "Educação Ambiental" },
  { img: "culinaria.webp", t: "Culinária Afetiva" }, { img: "ingles.webp", t: "Inglês" },
  { t: "Educação Física" }, { t: "Arte Circense" },
  { t: "Desenvolvimento Socioemocional" }, { t: "Dança Criativa" },
  { t: "Libras" }, { t: "Reforço Escolar" },
];

export default function EditarVivencias() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="vivencias" title="Editar — Vivências" subtitle="Atividades e oficinas" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-palette"></i></div>
        <div><h1>Vivências</h1><p>Gerencie as {VIVS.length} atividades e oficinas exibidas no site.</p></div>
        <div className="ph-act"><button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={() => toast("Nova vivência criada!")}><i className="fa-solid fa-plus"></i> Nova vivência</button></div>
      </div>

      <div className="adm-card">
        <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-layer-group"></i></div><h3>Todas as vivências</h3></div>
        <div className="adm-img-grid">
          {VIVS.map((v, i) => (
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
      </div>

      <SaveBar onSave={() => toast("Vivências atualizadas!")} />
      {toastNode}
    </AdminShell>
  );
}
