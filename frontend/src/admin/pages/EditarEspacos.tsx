import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");
const GAL: [string, string][] = [
  ["biblioteca.webp", "Biblioteca"], ["patio.webp", "Pátio"], ["quadra.webp", "Quadra"],
  ["laboratorio.webp", "Laboratório"], ["refeitorio.webp", "Refeitório"], ["horta.webp", "Horta"],
];

export default function EditarEspacos() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="espacos" title="Editar — Espaços" subtitle="Galeria de ambientes e energia solar" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-image"></i></div>
        <div><h1>Espaços</h1><p>Gerencie a galeria de ambientes e a seção de energia solar.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/espacos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-card">
        <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-images"></i></div><h3>Galeria de ambientes</h3></div>
        <p className="hint">Fotos exibidas na galeria da página Espaços (sem legendas no site). O nome é só referência interna / texto alternativo de acessibilidade.</p>
        <div className="adm-img-grid">
          {GAL.map(([img, name], i) => (
            <div key={i} style={{ border: "1px solid var(--adm-line)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
              <div className="adm-img-slot" style={{ aspectRatio: "16/10", border: "none", borderRadius: 0 }}>
                <img src={asset(img)} alt={name} />
                <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar</span></div>
              </div>
              <div style={{ padding: "11px 13px", display: "flex", gap: 8 }}>
                <input className="adm-text" defaultValue={name} style={{ padding: "8px 10px", fontSize: 13 }} />
                <button className="adm-mini-btn del"><i className="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          ))}
        </div>
        <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 14 }}><i className="fa-solid fa-plus"></i> Adicionar ambiente</button>
      </div>

      <div className="adm-card" style={{ marginTop: 18 }}>
        <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-solar-panel"></i></div><h3>Energia solar (sustentabilidade)</h3></div>
        <div className="adm-grid-fields">
          <div><label className="adm-form-label">Selo</label><input className="adm-text" defaultValue="Sustentabilidade" /></div>
          <div><label className="adm-form-label">Título</label><input className="adm-text" defaultValue="Uma escola movida a energia solar" /></div>
        </div>
        <label className="adm-form-label">Texto</label>
        <textarea className="adm-textarea" defaultValue="Investimos em energia limpa porque cuidar da infância também é cuidar do futuro do planeta. Nossos painéis abastecem o dia a dia da escola e ainda viram aprendizado sobre consciência ambiental."></textarea>
        <label className="adm-form-label">Itens (um por linha)</label>
        <textarea className="adm-textarea" defaultValue={"Energia limpa e renovável — Painéis solares que reduzem o impacto ambiental.\nConsciência ambiental — As crianças aprendem, na prática, a cuidar do planeta.\nRecurso que volta pra educação — A economia gerada é reinvestida no aprendizado."}></textarea>
        <label className="adm-form-label">Foto (drone)</label>
        <input className="adm-text" defaultValue="drone.webp" />
      </div>

      <SaveBar onSave={() => toast("Espaços atualizados!")} />
      {toastNode}
    </AdminShell>
  );
}
