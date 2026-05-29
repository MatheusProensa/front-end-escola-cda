import { useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");
const SEGS = [
  { img: "infantil.webp", t: "Educação Infantil", tag: "Berçário à pré-escola", chips: "Musicalização, Educação Física, Capoeira, Inglês" },
  { img: "fundamental.webp", t: "Ensino Fundamental", tag: "Anos iniciais", chips: "Artes Circenses, Libras, Reforço Escolar" },
  { img: "contraturno.webp", t: "Contraturno", tag: "Turno da manhã", chips: "Super Cérebro, Educação Ambiental, Arte Circense, Culinária Afetiva" },
];

export default function EditarSegmentos() {
  const [toast, toastNode] = useToast();
  const [tab, setTab] = useState(0);
  const s = SEGS[tab];
  return (
    <AdminShell active="segmentos" title="Editar — Segmentos" subtitle="Educação Infantil, Fundamental e Contraturno" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-layer-group"></i></div>
        <div><h1>Segmentos</h1><p>Edite a descrição, as imagens e as atividades de cada segmento.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/segmentos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-tabs">
        {SEGS.map((x, i) => <button key={i} className={"adm-tab" + (tab === i ? " active" : "")} onClick={() => setTab(i)}>{x.t}</button>)}
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-pen"></i></div><h3>{s.t}</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">Título</label><input className="adm-text" defaultValue={s.t} /></div>
              <div><label className="adm-form-label">Etiqueta</label><input className="adm-text" defaultValue={s.tag} /></div>
            </div>
            <label className="adm-form-label">Descrição</label>
            <textarea className="adm-textarea" defaultValue="A fase das primeiras descobertas. Acolhemos cada criança com afeto e criamos um ambiente seguro onde aprender é, antes de tudo, brincar, explorar e se sentir amada."></textarea>
            <label className="adm-form-label">Imagem do segmento</label>
            <div className="adm-img-slot" style={{ aspectRatio: "16/9" }}>
              <img src={asset(s.img)} alt={s.t} />
              <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar imagem</span></div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-list-check"></i></div><h3>Atividades / chips</h3></div>
            <label className="adm-form-label">Atividades (separadas por vírgula)</label>
            <textarea className="adm-textarea" value={s.chips} onChange={() => {}}></textarea>
            <div className="adm-grid-fields" style={{ marginTop: 6 }}>
              <div><label className="adm-form-label">Período</label><input className="adm-text" defaultValue="Tarde · 13h–18h30" /></div>
              <div><label className="adm-form-label">Contraturno</label><input className="adm-text" defaultValue="Opcional" /></div>
            </div>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card adm-preview-card" style={{ padding: 0 }}>
            <div className="pv-img"><img src={asset(s.img)} alt="Pré-visualização" /></div>
            <div className="pv-body"><h4>{s.t}</h4><p>Pré-visualização do segmento no site.</p></div>
          </div>
          <div className="adm-card">
            <h3 style={{ fontSize: 15 }}>Status</h3>
            <div className="adm-status-row"><span>Situação</span><b style={{ color: "#1f9d57" }}>Publicado</b></div>
            <div className="adm-status-row"><span>Última edição</span><b>Há 6 dias</b></div>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Segmento atualizado!")} />
      {toastNode}
    </AdminShell>
  );
}
