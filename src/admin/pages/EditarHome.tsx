import AdminShell from "../AdminShell";
import { SaveBar, useToast, ImgSlot } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

const PILARES: [string, string][] = [
  ["Acolhimento que abraça", "Ambiente seguro, afetivo e cheio de empatia."],
  ["Ensino que desenvolve", "Aprendizagem significativa para a vida toda."],
  ["Valores que inspiram", "Incentivamos autonomia, respeito e responsabilidade."],
  ["Parceria que transforma", "Família e escola juntas no mesmo propósito."],
];

export default function EditarHome() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="home" title="Editar — Home" subtitle="Página inicial do site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-house"></i></div>
        <div><h1>Home</h1><p>Edite o conteúdo da página inicial: destaque, pilares e depoimentos.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-star"></i></div><h3>Destaque (Hero)</h3></div>
            <label className="adm-form-label">Selo (acima do título)</label>
            <input className="adm-text" defaultValue="HÁ 15 ANOS" />
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">Título</label><input className="adm-text" defaultValue="Família e escola" /></div>
              <div><label className="adm-form-label">Destaque manuscrito</label><input className="adm-text" defaultValue="sonham juntas." /></div>
            </div>
            <label className="adm-form-label">Texto de apoio</label>
            <textarea className="adm-textarea" defaultValue={"Acreditamos que a educação vai muito além do ensino. É sobre acolher, inspirar e transformar vidas para construir um futuro melhor."}></textarea>
            <label className="adm-form-label">Imagem de fundo do destaque</label>
            <ImgSlot src={asset("bg-home.webp")} label="Hero" ratio="16/7" />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-grip"></i></div><h3>Pilares</h3></div>
            <p className="hint">Os quatro pilares exibidos logo abaixo do destaque.</p>
            {PILARES.map((p, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12, marginBottom: 12 }}>
                <input className="adm-text" defaultValue={p[0]} />
                <input className="adm-text" defaultValue={p[1]} />
              </div>
            ))}
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-comment-dots"></i></div><h3>Depoimentos</h3></div>
            <p className="hint">8 depoimentos de famílias publicados no carrossel da Home.</p>
            <button className="adm-btn adm-btn-ghost adm-btn-sm"><i className="fa-solid fa-pen"></i> Gerenciar depoimentos (8)</button>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card adm-preview-card" style={{ padding: 0 }}>
            <div className="pv-img"><img src={asset("bg-home.webp")} alt="Pré-visualização" /></div>
            <div className="pv-body">
              <h4>Pré-visualização</h4>
              <p>Veja como a Home aparece para os visitantes antes de publicar.</p>
              <a className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 12, width: "100%" }} href="/" target="_blank"><i className="fa-solid fa-eye"></i> Abrir página</a>
            </div>
          </div>
          <div className="adm-card">
            <h3 style={{ fontSize: 15 }}>Status</h3>
            <div className="adm-status-row"><span>Situação</span><b style={{ color: "#1f9d57" }}>Publicado</b></div>
            <div className="adm-status-row"><span>Última edição</span><b>Há 2 dias</b></div>
            <div className="adm-status-row"><span>Por</span><b>Equipe CDA</b></div>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Home publicada com sucesso!")} />
      {toastNode}
    </AdminShell>
  );
}
