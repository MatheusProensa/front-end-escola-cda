import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

export default function EditarSobre() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="sobre" title="Editar — Sobre a Escola" subtitle="História, valores e linha do tempo" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-book-open"></i></div>
        <div><h1>Sobre a Escola</h1><p>Edite a história, os valores, os diferenciais e a linha do tempo dos 15 anos.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/sobre" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-feather"></i></div><h3>Nossa história</h3></div>
            <label className="adm-form-label">Título</label>
            <input className="adm-text" defaultValue="Uma história construída com afeto." />
            <label className="adm-form-label">Texto</label>
            <textarea className="adm-textarea" style={{ minHeight: 120 }} defaultValue={"Tudo começou como “Carinha de Anjo” — um lugar pensado para acolher cada criança com afeto, segurança e propósito, ao lado das famílias. Em 15 anos nos tornamos a Escola CDA: crescemos em espaços, vivências e estrutura, mas mantivemos intacto o que nos move — o cuidado humano com a infância."}></textarea>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-clock-rotate-left"></i></div><h3>Linha do tempo (15 anos)</h3></div>
            <p className="hint">15 momentos com foto e legenda. Clique para trocar imagem ou editar texto.</p>
            <div className="adm-img-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} style={{ border: "1px solid var(--adm-line)", borderRadius: 14, overflow: "hidden" }}>
                  <div className="adm-img-slot" style={{ aspectRatio: "16/11", border: "none", borderRadius: 0 }}>
                    <img src={asset("timeline/t" + String(n).padStart(2, "0") + ".webp")} alt={"Momento " + n} />
                    <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar</span></div>
                  </div>
                  <div style={{ padding: 10 }}><input className="adm-text" defaultValue={"Momento " + n} style={{ padding: "8px 10px", fontSize: 12.5 }} /></div>
                </div>
              ))}
            </div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 14 }}><i className="fa-solid fa-images"></i> Ver todos os 15 momentos</button>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-utensils"></i></div><h3>Alimentação saudável</h3></div>
            <label className="adm-form-label">Texto</label>
            <textarea className="adm-textarea" defaultValue="Comida de verdade, feita na escola e com acompanhamento nutricional. Sem industrializados — priorizamos alimentos naturais e o que colhemos na nossa própria horta."></textarea>
            <label className="adm-form-label">Itens (um por linha)</label>
            <textarea className="adm-textarea" defaultValue={"Refeições ao longo do dia — Fruta e almoço pela manhã; fruta e lanche à tarde. No Ensino Fundamental, o lanche.\nDa horta para a mesa — Parte das hortaliças e temperos vem da nossa própria horta.\nSem industrializados — Receitas feitas na escola; nos berçários, sem sal e açúcar."}></textarea>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card adm-preview-card" style={{ padding: 0 }}>
            <div className="pv-img"><img src={asset("giovana.webp")} alt="Pré-visualização" /></div>
            <div className="pv-body"><h4>Sobre a Escola</h4><p>Pré-visualização da página no site.</p></div>
          </div>
          <div className="adm-card">
            <h3 style={{ fontSize: 15 }}>Status</h3>
            <div className="adm-status-row"><span>Situação</span><b style={{ color: "#1f9d57" }}>Publicado</b></div>
            <div className="adm-status-row"><span>Seções</span><b>5</b></div>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Página Sobre atualizada!")} />
      {toastNode}
    </AdminShell>
  );
}
