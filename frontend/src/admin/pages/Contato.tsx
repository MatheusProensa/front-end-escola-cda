import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";
import { api, API_CONFIGURED } from "../../lib/api";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Settings = {
  whatsapp: string;
  telefone: string;
  wpp_link: string;
  endereco: string;
  horario: string;
  instagram: string;
  facebook: string;
};

const DEFAULTS: Settings = {
  whatsapp: "(55) 3217-7947",
  telefone: "(55) 3217-7947",
  wpp_link: "https://wa.me/555532177947",
  endereco: "R. José Manhago, 194 - Camobi, Santa Maria - RS",
  horario: "Segunda a Sexta, 7h às 18h",
  instagram: "@escolacda.sm",
  facebook: "/escolacda.sm",
};

export default function Contato() {
  const [toast, toastNode] = useToast();
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    api<Partial<Settings>>("/api/configuracoes")
      .then((data) => setFields((prev) => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  const set = (k: keyof Settings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((s) => ({ ...s, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      if (API_CONFIGURED) {
        await api("/api/admin/configuracoes", {
          method: "PUT",
          body: JSON.stringify(fields),
        });
      }
      toast("Contatos atualizados!");
    } catch {
      toast("Erro ao salvar. Tente novamente.", true);
    } finally {
      setSaving(false);
    }
  };

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
              <div><label className="adm-form-label">WhatsApp</label><input className="adm-text" value={fields.whatsapp} onChange={set("whatsapp")} /></div>
              <div><label className="adm-form-label">Telefone</label><input className="adm-text" value={fields.telefone} onChange={set("telefone")} /></div>
            </div>
            <label className="adm-form-label">Link do WhatsApp</label>
            <input className="adm-text" value={fields.wpp_link} onChange={set("wpp_link")} />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-location-dot"></i></div><h3>Endereço e horário</h3></div>
            <label className="adm-form-label">Endereço</label>
            <input className="adm-text" value={fields.endereco} onChange={set("endereco")} />
            <label className="adm-form-label">Horário de atendimento</label>
            <input className="adm-text" value={fields.horario} onChange={set("horario")} />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-share-nodes"></i></div><h3>Redes sociais</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label"><i className="fa-brands fa-instagram"></i> Instagram</label><input className="adm-text" value={fields.instagram} onChange={set("instagram")} /></div>
              <div><label className="adm-form-label"><i className="fa-brands fa-facebook"></i> Facebook</label><input className="adm-text" value={fields.facebook} onChange={set("facebook")} /></div>
            </div>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>Onde aparece</h3>
            <p style={{ fontSize: 12.5, color: "var(--adm-ink-3)", lineHeight: 1.6, margin: 0 }}>Estas informações são exibidas no rodapé do site, na página de Matrículas e no botão flutuante de WhatsApp.</p>
          </div>
          {!API_CONFIGURED && (
            <div className="adm-card" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 12.5, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Modo demo — configure <code>VITE_API_URL</code> para salvar no banco de dados.
              </p>
            </div>
          )}
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} />
      {toastNode}
    </AdminShell>
  );
}
