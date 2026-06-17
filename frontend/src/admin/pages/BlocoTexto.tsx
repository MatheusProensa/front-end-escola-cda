import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { uploadImagem } from "../../lib/storage";
import type { Bloco } from "../../lib/textos";

type Campo = { key: keyof Bloco; label: string; tipo?: "text" | "textarea" };
type Props = {
  pagina: string;
  secao: string;
  titulo: string;       // título do card no admin
  defaults: Bloco;
  campos: Campo[];
  imagem?: boolean;     // permite trocar a imagem do bloco
  hint?: string;
};

// Editor de um bloco de texto (com imagem opcional) guardado em page_content.
export default function BlocoTexto({ pagina, secao, titulo, defaults, campos, imagem, hint }: Props) {
  const [toast, toastNode] = useToast();
  const { sec, loading } = usePageContent(pagina);
  const [bloco, setBloco] = useState<Bloco>(defaults);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) setBloco(section<Bloco>(sec, secao, defaults));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = async (next: Bloco) => {
    setBloco(next);
    if (!API_CONFIGURED) return;
    try { await savePage(pagina, { [secao]: next }); }
    catch { toast("Erro ao salvar.", true); }
  };

  const editar = (k: keyof Bloco, v: string) => setBloco((b) => ({ ...b, [k]: v }));
  const salvar = async () => { setSaving(true); await persist(bloco); setSaving(false); toast("Salvo!"); };

  const trocarImg = async (file: File) => {
    try {
      const url = await uploadImagem(file, `${pagina}-${secao}`);
      await persist({ ...bloco, img: url });
      toast("Imagem trocada!");
    } catch { toast("Erro ao enviar imagem.", true); }
  };

  return (
    <div className="adm-card" style={{ marginTop: 18 }}>
      <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-align-left"></i></div><h3>{titulo}</h3></div>
      {hint && <p className="hint" style={{ marginBottom: 12 }}>{hint}</p>}

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {imagem && (
          <div style={{ flexShrink: 0 }}>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) trocarImg(e.target.files[0]); e.target.value = ""; }} />
            <div style={{ width: 130, height: 100, borderRadius: 10, overflow: "hidden", background: "var(--adm-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {bloco.img ? <img src={bloco.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <i className="fa-regular fa-image" style={{ color: "var(--adm-ink-3)" }}></i>}
            </div>
            <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "100%", marginTop: 6, fontSize: 11 }} onClick={() => fileRef.current?.click()}><i className="fa-solid fa-arrows-rotate"></i> Trocar foto</button>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 240 }}>
          {campos.map((c) => (
            <div key={String(c.key)} style={{ marginBottom: 8 }}>
              <label className="adm-form-label" style={{ fontSize: 11.5 }}>{c.label}</label>
              {c.tipo === "textarea"
                ? <textarea className="adm-textarea" value={String(bloco[c.key] ?? "")} onChange={(e) => editar(c.key, e.target.value)} onBlur={salvar} style={{ minHeight: 70, fontSize: 12.5 }} />
                : <input className="adm-text" value={String(bloco[c.key] ?? "")} onChange={(e) => editar(c.key, e.target.value)} onBlur={salvar} style={{ padding: "7px 9px", fontSize: 12.5 }} />}
            </div>
          ))}
          <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "auto", marginTop: 4 }} onClick={salvar} disabled={saving}><i className="fa-solid fa-floppy-disk"></i> Salvar</button>
        </div>

        <div style={{ flexShrink: 0, width: 200 }}>
          <span className="adm-form-label" style={{ fontSize: 11.5, display: "block", marginBottom: 6 }}>Pré-visualização</span>
          <div style={{ borderRadius: 12, background: "var(--adm-bg)", padding: "14px 12px", textAlign: "center" }}>
            {bloco.eyebrow && <div style={{ fontSize: 10, fontWeight: 800, color: "#f0b400", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{bloco.eyebrow}</div>}
            {bloco.titulo && <div style={{ fontSize: 14, fontWeight: 800, color: "#0e2d6e", marginBottom: 6, lineHeight: 1.25 }}>{bloco.titulo}</div>}
            {bloco.p1 && <p style={{ fontSize: 11, color: "var(--adm-ink-2)", lineHeight: 1.5, margin: 0 }}>{bloco.p1}</p>}
          </div>
        </div>
      </div>
      {toastNode}
    </div>
  );
}
