import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

export default function Contato() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="contato" title="Contato" subtitle="Informações exibidas no site e no rodapé" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-address-book"></i></div>
        <div><h1>Contato</h1><p>Atualize telefone, WhatsApp, endereço e horários de atendimento.</p></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-brands fa-whatsapp"></i></div><h3>Canais de atendimento</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">WhatsApp</label><input className="adm-text" defaultValue="(55) 3217-7947" /></div>
              <div><label className="adm-form-label">Telefone</label><input className="adm-text" defaultValue="(55) 3217-7947" /></div>
            </div>
            <label className="adm-form-label">Link do WhatsApp</label>
            <input className="adm-text" defaultValue="https://wa.me/555532177947" />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-location-dot"></i></div><h3>Endereço e horário</h3></div>
            <label className="adm-form-label">Endereço</label>
            <input className="adm-text" defaultValue="R. José Manhago, 194 - Camobi, Santa Maria - RS" />
            <label className="adm-form-label">Horário de atendimento</label>
            <input className="adm-text" defaultValue="Segunda a Sexta, 7h às 18h" />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-share-nodes"></i></div><h3>Redes sociais</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label"><i className="fa-brands fa-instagram"></i> Instagram</label><input className="adm-text" defaultValue="@escolacda" /></div>
              <div><label className="adm-form-label"><i className="fa-brands fa-facebook"></i> Facebook</label><input className="adm-text" defaultValue="/escolacda" /></div>
            </div>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>Onde aparece</h3>
            <p style={{ fontSize: 12.5, color: "var(--adm-ink-3)", lineHeight: 1.6, margin: 0 }}>Estas informações são exibidas no rodapé do site, na página de Matrículas e no botão flutuante de WhatsApp.</p>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Contatos atualizados!")} />
      {toastNode}
    </AdminShell>
  );
}
