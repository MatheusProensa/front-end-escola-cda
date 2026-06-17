import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { uploadImagem, removerImagem } from "../../lib/storage";
import { type GalFoto } from "../../lib/galeria";

type Props = {
  pagina: string;        // page_content.pagina
  secao: string;         // page_content.secao (ex.: "galeria", "galeria_infantil")
  titulo: string;        // título do card no admin
  defaults: GalFoto[];   // fotos padrão (quando o banco está vazio)
  legendas?: boolean;    // mostra campos de título/legenda (Espaços sim, carrosséis não)
  hint?: string;
};

// Gerenciador genérico de uma galeria de fotos guardada em page_content.
// Acrescentar e remover fotos — salva direto no banco e o site reflete na hora.
export default function GaleriaEditor({ pagina, secao, titulo, defaults, legendas = false, hint }: Props) {
  const [toast, toastNode] = useToast();
  const { sec, loading } = usePageContent(pagina);
  const [fotos, setFotos] = useState<GalFoto[]>(defaults);
  const [subindo, setSubindo] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading) setFotos(section<GalFoto[]>(sec, secao, defaults));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = async (next: GalFoto[]) => {
    setFotos(next);
    if (!API_CONFIGURED) return;
    try { await savePage(pagina, { [secao]: next }); }
    catch { toast("Erro ao salvar a galeria.", true); }
  };

  const enviar = async (files: FileList) => {
    if (!API_CONFIGURED) { toast("Backend não configurado.", true); return; }
    setSubindo(true);
    const novas: GalFoto[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadImagem(file, `${pagina}-${secao}`);
        novas.push({ url, titulo: "", descricao: "" });
      } catch { /* segue para a próxima */ }
    }
    setSubindo(false);
    if (fileRef.current) fileRef.current.value = "";
    if (novas.length === 0) { toast("Nenhuma foto enviada.", true); return; }
    await persist([...fotos, ...novas]);
    toast(`${novas.length} foto(s) adicionada(s)!`);
  };

  const remover = async (i: number) => {
    const f = fotos[i];
    if (!window.confirm("Remover esta foto da galeria?")) return;
    await removerImagem(f.url); // best-effort (só remove se for do storage)
    await persist(fotos.filter((_, idx) => idx !== i));
    toast("Foto removida.");
  };

  const editar = (i: number, k: "titulo" | "descricao", v: string) =>
    setFotos((p) => p.map((f, idx) => idx === i ? { ...f, [k]: v } : f));

  const salvar = async () => { await persist(fotos); toast("Galeria salva!"); };

  return (
    <div className="adm-card" style={{ marginTop: 18 }}>
      <div className="adm-card-sec"><div className="si"><i className="fa-regular fa-images"></i></div><h3>{titulo} ({fotos.length})</h3></div>
      {hint && <p className="hint" style={{ marginBottom: 12 }}>{hint}</p>}

      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && enviar(e.target.files)} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={() => fileRef.current?.click()} disabled={subindo}>
          {subindo ? <><i className="fa-solid fa-spinner fa-spin"></i> Enviando…</> : <><i className="fa-solid fa-cloud-arrow-up"></i> Adicionar fotos</>}
        </button>
        {legendas && <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "auto" }} onClick={salvar}><i className="fa-solid fa-floppy-disk"></i> Salvar legendas</button>}
      </div>

      {fotos.length === 0 ? (
        <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhuma foto. Clique em "Adicionar fotos".</p>
      ) : (
        <div className="adm-img-grid">
          {fotos.map((f, i) => (
            <div key={i} style={{ border: "1px solid var(--adm-line)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
              <div style={{ position: "relative" }}>
                <img src={f.url} alt={f.titulo} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
                <button className="adm-mini-btn del" title="Remover foto" onClick={() => remover(i)} style={{ position: "absolute", top: 6, right: 6 }}><i className="fa-regular fa-trash-can"></i></button>
              </div>
              {legendas && (
                <div style={{ padding: "8px 10px" }}>
                  <input className="adm-text" value={f.titulo} placeholder="Título (ex.: Biblioteca)" onChange={(e) => editar(i, "titulo", e.target.value)} onBlur={salvar} style={{ padding: "6px 8px", fontSize: 12.5, marginBottom: 6 }} />
                  <input className="adm-text" value={f.descricao} placeholder="Legenda" onChange={(e) => editar(i, "descricao", e.target.value)} onBlur={salvar} style={{ padding: "6px 8px", fontSize: 12.5 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {toastNode}
    </div>
  );
}
