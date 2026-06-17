import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { uploadImagem } from "../../lib/storage";

export type Item = Record<string, unknown>;
type Campo = { key: string; label: string; tipo?: "text" | "textarea" };

type Props = {
  pagina: string;          // page_content.pagina
  secao: string;           // page_content.secao
  titulo: string;          // título do card no admin
  defaults: Item[];        // conteúdo padrão (quando o banco está vazio)
  campos: Campo[];         // campos de texto editáveis
  novo: Item;              // modelo para um item novo
  imagem?: boolean;        // mostra troca de imagem (campo "img")
  hint?: string;
  addLabel?: string;
};

// Editor genérico de uma lista de itens (cards, valores, listas) em page_content.
// Edita os textos, adiciona e remove itens — salva direto no banco.
export default function ListEditor({ pagina, secao, titulo, defaults, campos, novo, imagem, hint, addLabel = "Adicionar item" }: Props) {
  const [toast, toastNode] = useToast();
  const { sec, loading } = usePageContent(pagina);
  const [itens, setItens] = useState<Item[]>(defaults);
  const fileRef = useRef<HTMLInputElement>(null);
  const [alvo, setAlvo] = useState<number | null>(null);

  useEffect(() => {
    if (!loading) setItens(section<Item[]>(sec, secao, defaults));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = async (next: Item[]) => {
    setItens(next);
    if (!API_CONFIGURED) return;
    try { await savePage(pagina, { [secao]: next }); }
    catch { toast("Erro ao salvar.", true); }
  };

  const editar = (i: number, k: string, v: string) =>
    setItens((p) => p.map((it, idx) => idx === i ? { ...it, [k]: v } : it));

  const salvar = async () => { await persist(itens); toast("Salvo!"); };

  const adicionar = async () => { await persist([...itens, { ...novo }]); toast("Item adicionado."); };

  const remover = async (i: number) => {
    if (!window.confirm("Remover este item?")) return;
    await persist(itens.filter((_, idx) => idx !== i));
    toast("Item removido.");
  };

  const trocarImg = async (i: number, file: File) => {
    try {
      const url = await uploadImagem(file, `${pagina}-${secao}`);
      const next = itens.map((it, idx) => idx === i ? { ...it, img: url } : it);
      await persist(next);
      toast("Imagem trocada!");
    } catch { toast("Erro ao enviar imagem.", true); }
  };

  return (
    <div className="adm-card" style={{ marginTop: 18 }}>
      <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-list"></i></div><h3>{titulo} ({itens.length})</h3></div>
      {hint && <p className="hint" style={{ marginBottom: 12 }}>{hint}</p>}

      {imagem && <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0] && alvo !== null) trocarImg(alvo, e.target.files[0]); e.target.value = ""; }} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {itens.map((it, i) => (
          <div key={i} style={{ border: "1px solid var(--adm-line)", borderRadius: 12, padding: 12, background: "#fff", display: "flex", gap: 12 }}>
            {imagem && (
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 84, height: 84, borderRadius: 10, overflow: "hidden", background: "var(--adm-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {typeof it.img === "string" && it.img ? <img src={it.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <i className="fa-regular fa-image" style={{ color: "var(--adm-ink-3)" }}></i>}
                </div>
                <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "100%", marginTop: 6, fontSize: 11, padding: "5px 6px" }} onClick={() => { setAlvo(i); fileRef.current?.click(); }}><i className="fa-solid fa-arrows-rotate"></i> Trocar</button>
              </div>
            )}
            <div style={{ flex: 1 }}>
              {campos.map((c) => (
                <div key={c.key} style={{ marginBottom: 8 }}>
                  <label className="adm-form-label" style={{ fontSize: 11.5 }}>{c.label}</label>
                  {c.tipo === "textarea"
                    ? <textarea className="adm-textarea" value={String(it[c.key] ?? "")} onChange={(e) => editar(i, c.key, e.target.value)} onBlur={salvar} style={{ minHeight: 60, fontSize: 12.5 }} />
                    : <input className="adm-text" value={String(it[c.key] ?? "")} onChange={(e) => editar(i, c.key, e.target.value)} onBlur={salvar} style={{ padding: "7px 9px", fontSize: 12.5 }} />}
                </div>
              ))}
            </div>
            <button className="adm-mini-btn del" title="Remover" onClick={() => remover(i)} style={{ flexShrink: 0, alignSelf: "flex-start" }}><i className="fa-regular fa-trash-can"></i></button>
          </div>
        ))}
      </div>

      <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "auto", marginTop: 12 }} onClick={adicionar}><i className="fa-solid fa-plus"></i> {addLabel}</button>
      {toastNode}
    </div>
  );
}
