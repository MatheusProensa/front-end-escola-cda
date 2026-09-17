import { useEffect, useRef, useState } from "react";
import { useToast } from "../ui";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { uploadImagem } from "../../lib/storage";

export type Item = Record<string, unknown>;
type Campo = { key: string; label: string; tipo?: "text" | "textarea" };

// Ícones disponíveis para escolher nos cards (nomes do Font Awesome).
const ICONES = [
  "star", "heart", "hand-holding-heart", "shield-heart", "hands-holding-child", "child-reaching", "children", "users", "user-group", "people-group",
  "book", "book-open", "graduation-cap", "chalkboard-user", "pencil", "paint-brush", "palette", "music", "guitar", "drum",
  "futbol", "basketball", "dumbbell", "bicycle", "puzzle-piece", "shapes", "gamepad", "dice", "robot", "brain",
  "lightbulb", "seedling", "leaf", "tree", "sun", "earth-americas", "globe", "flask", "microscope", "dna",
  "apple-whole", "carrot", "utensils", "bus", "clock", "calendar", "camera", "image", "award", "medal",
  "trophy", "face-smile", "comments", "comment-dots", "handshake", "school", "bell", "heart-pulse", "tooth", "check",
];

type Props = {
  pagina: string;          // page_content.pagina
  secao: string;           // page_content.secao
  titulo: string;          // título do card no admin
  defaults: Item[];        // conteúdo padrão (quando o banco está vazio)
  campos: Campo[];         // campos de texto editáveis
  novo: Item;              // modelo para um item novo
  imagem?: boolean;        // mostra troca de imagem (campo "img")
  icones?: boolean;        // mostra seletor de ícone (campo "icon")
  hint?: string;
  addLabel?: string;
};

// Editor genérico de uma lista de itens (cards, valores, listas) em page_content.
// Edita os textos, adiciona e remove itens — salva direto no banco.
export default function ListEditor({ pagina, secao, titulo, defaults, campos, novo, imagem, icones, hint, addLabel = "Adicionar item" }: Props) {
  const [toast, toastNode] = useToast();
  const { sec, loading, erro } = usePageContent(pagina);
  const [itens, setItens] = useState<Item[]>(defaults);
  const fileRef = useRef<HTMLInputElement>(null);
  const [alvo, setAlvo] = useState<number | null>(null);
  const [iconAlvo, setIconAlvo] = useState<number | null>(null);

  useEffect(() => {
    if (!loading) setItens(section<Item[]>(sec, secao, defaults));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Retorna true só quando realmente gravou (ou modo demo). Quem chama só
  // mostra a mensagem de sucesso quando de fato salvou.
  const persist = async (next: Item[]): Promise<boolean> => {
    setItens(next);
    if (!API_CONFIGURED) return true;
    // se o carregamento falhou, o que está na tela é o padrão — não gravar por cima do real
    if (erro) { toast("Não foi possível carregar o conteúdo atual. Recarregue a página antes de salvar.", true); return false; }
    try { await savePage(pagina, { [secao]: next }); return true; }
    catch { toast("Erro ao salvar.", true); return false; }
  };

  const editar = (i: number, k: string, v: string) =>
    setItens((p) => p.map((it, idx) => idx === i ? { ...it, [k]: v } : it));

  const salvar = async () => { if (await persist(itens)) toast("Salvo!"); };

  const adicionar = async () => { if (await persist([...itens, { ...novo }])) toast("Item adicionado."); };

  const remover = async (i: number) => {
    if (!window.confirm("Remover este item?")) return;
    if (await persist(itens.filter((_, idx) => idx !== i))) toast("Item removido.");
  };

  const trocarImg = async (i: number, file: File) => {
    try {
      const url = await uploadImagem(file, `${pagina}-${secao}`);
      const next = itens.map((it, idx) => idx === i ? { ...it, img: url } : it);
      if (await persist(next)) toast("Imagem trocada!");
    } catch { toast("Erro ao enviar imagem.", true); }
  };

  const escolherIcone = async (i: number, name: string) => {
    setIconAlvo(null);
    const next = itens.map((it, idx) => idx === i ? { ...it, icon: name } : it);
    if (await persist(next)) toast("Ícone alterado!");
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
            {icones && (
              <div style={{ flexShrink: 0, width: 66, textAlign: "center" }}>
                <span className="adm-form-label" style={{ fontSize: 10.5, display: "block", marginBottom: 5 }}>Ícone</span>
                <button type="button" onClick={() => setIconAlvo(i)} title="Trocar ícone"
                  style={{ width: 58, height: 58, borderRadius: 12, border: "1px solid var(--adm-line)", background: "var(--adm-bg)", cursor: "pointer", display: "grid", placeItems: "center" }}>
                  <i className={"fa-solid fa-" + (typeof it.icon === "string" && it.icon ? it.icon : "star")} style={{ fontSize: 22, color: "#0e2d6e" }}></i>
                </button>
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
            <div style={{ flexShrink: 0, width: 150 }}>
              <span className="adm-form-label" style={{ fontSize: 10.5, display: "block", marginBottom: 5 }}>Pré-visualização</span>
              <div style={{ borderRadius: 10, background: "var(--adm-bg)", padding: "10px 9px" }}>
                {typeof it.t === "string" && it.t && <div style={{ fontSize: 12, fontWeight: 800, color: "#0e2d6e", marginBottom: 4, lineHeight: 1.25 }}>{it.t}</div>}
                {(typeof it.d === "string" && it.d) || (typeof it.p === "string" && it.p) ? (
                  <p style={{ fontSize: 10.5, color: "var(--adm-ink-2)", lineHeight: 1.45, margin: 0 }}>{String(it.d ?? it.p)}</p>
                ) : null}
              </div>
            </div>
            <button className="adm-mini-btn del" title="Remover" onClick={() => remover(i)} style={{ flexShrink: 0, alignSelf: "flex-start" }}><i className="fa-regular fa-trash-can"></i></button>
          </div>
        ))}
      </div>

      <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "auto", marginTop: 12 }} onClick={adicionar}><i className="fa-solid fa-plus"></i> {addLabel}</button>

      {iconAlvo !== null && (
        <div onClick={() => setIconAlvo(null)} style={{ position: "fixed", inset: 0, background: "rgba(8,20,50,.5)", display: "grid", placeItems: "center", zIndex: 100, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: 20, maxWidth: 480, width: "100%", maxHeight: "80vh", overflow: "auto", boxShadow: "0 24px 64px rgba(19,52,110,.25)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 16, color: "#0e2d6e" }}>Escolha um ícone</h3>
              <button className="adm-mini-btn" onClick={() => setIconAlvo(null)} aria-label="Fechar"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))", gap: 8 }}>
              {ICONES.map((name) => {
                const atual = typeof itens[iconAlvo]?.icon === "string" && itens[iconAlvo].icon === name;
                return (
                  <button key={name} type="button" onClick={() => escolherIcone(iconAlvo, name)} title={name}
                    style={{ height: 52, borderRadius: 10, border: atual ? "2px solid #1351b4" : "1px solid var(--adm-line)", background: atual ? "#eef4ff" : "#fff", cursor: "pointer", display: "grid", placeItems: "center" }}>
                    <i className={"fa-solid fa-" + name} style={{ fontSize: 20, color: "#0e2d6e" }}></i>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {toastNode}
    </div>
  );
}
