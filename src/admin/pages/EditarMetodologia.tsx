import { useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

export default function EditarMetodologia() {
  const [toast, toastNode] = useToast();
  const [tab, setTab] = useState(0);
  const tabs = ["Sistema ProRaiz", "Tecnologia", "Diário Escola"];
  return (
    <AdminShell active="metodologia" title="Editar — Metodologia" subtitle="ProRaiz, tecnologia no aprendizado e comunicação" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-graduation-cap"></i></div>
        <div><h1>Metodologia</h1><p>Conteúdo da página de metodologia: Sistema ProRaiz, tecnologia e Diário Escola.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/metodologia" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-tabs">
        {tabs.map((x, i) => <button key={i} className={"adm-tab" + (tab === i ? " active" : "")} onClick={() => setTab(i)}>{x}</button>)}
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          {tab === 0 && (
            <>
              <div className="adm-card">
                <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-seedling"></i></div><h3>Sistema ProRaiz</h3></div>
                <div className="adm-grid-fields">
                  <div><label className="adm-form-label">Título</label><input className="adm-text" defaultValue="Formação integral para a vida inteira" /></div>
                  <div><label className="adm-form-label">Logo do parceiro</label><input className="adm-text" defaultValue="proraiz-logo.webp" /></div>
                </div>
                <label className="adm-form-label">Descrição</label>
                <textarea className="adm-textarea" defaultValue="A CDA adota a metodologia ProRaiz, que une o aprendizado acadêmico ao desenvolvimento socioemocional para formar crianças mais autônomas, confiantes e conscientes do seu papel no mundo."></textarea>
              </div>
              <div className="adm-card">
                <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-list-check"></i></div><h3>Eixos por fase</h3></div>
                <label className="adm-form-label">Educação Infantil (um por linha)</label>
                <textarea className="adm-textarea" defaultValue={"Aprendizagem criativa\nDesenvolvimento socioemocional\nEducação ambiental"}></textarea>
                <label className="adm-form-label">Ensino Fundamental (um por linha)</label>
                <textarea className="adm-textarea" defaultValue={"Construção por trocas\nConhecimento que faz sentido\nRaciocínio e autonomia\nLeitura crítica do mundo"}></textarea>
              </div>
            </>
          )}
          {tab === 1 && (
            <div className="adm-card">
              <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-laptop"></i></div><h3>Tecnologia no Ensino Fundamental</h3></div>
              <label className="adm-form-label">Texto</label>
              <textarea className="adm-textarea" defaultValue="No Ensino Fundamental, unimos o ensino de qualidade à tecnologia: os alunos usam notebooks em atividades pedagógicas que tornam o aprendizado mais ativo, interativo e conectado ao mundo de hoje — sempre com mediação dos professores."></textarea>
              <label className="adm-form-label">Fotos da seção (notebooks)</label>
              <textarea className="adm-textarea" defaultValue={"tec-1.webp\ntec-2.webp\ntec-3.webp\ntec-4.webp"}></textarea>
            </div>
          )}
          {tab === 2 && (
            <div className="adm-card">
              <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-mobile-screen-button"></i></div><h3>Diário Escola</h3></div>
              <p style={{ color: "#5f6f89", fontSize: 13.5, margin: "0 0 12px" }}>Aparece na Home (faixa compacta) e na página de Matrículas.</p>
              <label className="adm-form-label">Recursos (um por linha)</label>
              <textarea className="adm-textarea" defaultValue={"Agenda diária\nRecados\nMural & álbuns\nMedicamentos\nCalendário & presença\nEm tempo real"}></textarea>
            </div>
          )}
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15 }}>Status</h3>
            <div className="adm-status-row"><span>Situação</span><b style={{ color: "#1f9d57" }}>Publicado</b></div>
            <div className="adm-status-row"><span>Página</span><b>/metodologia</b></div>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Metodologia atualizada!")} />
      {toastNode}
    </AdminShell>
  );
}
