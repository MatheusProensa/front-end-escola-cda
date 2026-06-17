import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { INTROS, type Intro } from "../../lib/intros";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Props = {
  pagina: string;     // chave em page_content e em INTROS
  active: string;     // item ativo no menu
  icone: string;      // ícone FontAwesome do cabeçalho
  titulo: string;     // título da tela do admin
  subtitulo: string;  // subtítulo da tela do admin
  verNoSite: string;  // rota pública para "Ver no site"
};

// Editor do cabeçalho (intro) de uma página pública. Salva de verdade no banco
// e o site reflete a alteração imediatamente.
export default function EditarPagina({ pagina, active, icone, titulo, subtitulo, verNoSite }: Props) {
  const [toast, toastNode] = useToast();
  const { sec, loading } = usePageContent(pagina);
  const [intro, setIntro] = useState<Intro>(INTROS[pagina]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setIntro(section<Intro>(sec, "intro", INTROS[pagina]));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: keyof Intro) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setIntro((s) => ({ ...s, [k]: e.target.value }));

  const save = async () => {
    setSaving(true);
    try {
      if (API_CONFIGURED) await savePage(pagina, { intro });
      toast("Página publicada com sucesso!");
    } catch {
      toast("Erro ao salvar. Tente novamente.", true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell active={active} title={`Editar — ${titulo}`} subtitle={subtitulo} logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className={"fa-solid fa-" + icone}></i></div>
        <div><h1>{titulo}</h1><p>Edite o cabeçalho que aparece no topo da página no site.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href={verNoSite} target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-heading"></i></div><h3>Cabeçalho da página</h3></div>
            <label className="adm-form-label">Selo (texto pequeno acima do título)</label>
            <input className="adm-text" value={intro.eyebrow} onChange={set("eyebrow")} />
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">Título</label><input className="adm-text" value={intro.titulo} onChange={set("titulo")} /></div>
              <div><label className="adm-form-label">Destaque (final manuscrito)</label><input className="adm-text" value={intro.destaque} onChange={set("destaque")} /></div>
            </div>
            <label className="adm-form-label">Texto de apoio</label>
            <textarea className="adm-textarea" value={intro.texto} onChange={set("texto")}></textarea>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 10 }}>Pré-visualização</h3>
            <div style={{ borderRadius: 12, background: "var(--adm-bg)", padding: "18px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#0b82f6", letterSpacing: 0.6, textTransform: "uppercase" }}>{intro.eyebrow}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0c2657", margin: "8px 0", lineHeight: 1.25 }}>{intro.titulo} <span style={{ color: "#f0b400", fontStyle: "italic" }}>{intro.destaque}</span></div>
              <p style={{ fontSize: 12.5, color: "var(--adm-ink-2)", lineHeight: 1.6, margin: 0 }}>{intro.texto}</p>
            </div>
          </div>
          {!API_CONFIGURED && (
            <div className="adm-card" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 12.5, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Modo demo — alterações não são salvas.
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
