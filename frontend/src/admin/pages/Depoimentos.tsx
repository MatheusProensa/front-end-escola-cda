import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useToast } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Depoimento = {
  id: number;
  nome: string;
  texto: string;
  ativo: boolean;
  ordem: number;
};

export default function Depoimentos() {
  const [toast, toastNode] = useToast();
  const [lista, setLista] = useState<Depoimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Formulário de novo depoimento
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");

  const load = async () => {
    if (!API_CONFIGURED) { setLoading(false); return; }
    const { data, error } = await supabase
      .from("depoimentos")
      .select("*")
      .order("ordem", { ascending: true })
      .order("id", { ascending: true });
    if (error) toast("Erro ao carregar depoimentos.", true);
    else setLista(data as Depoimento[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const adicionar = async () => {
    if (!texto.trim()) { toast("Escreva o texto do depoimento.", true); return; }
    setSaving(true);
    const ordem = lista.length ? Math.max(...lista.map((d) => d.ordem)) + 1 : 0;
    const { error } = await supabase.from("depoimentos").insert({ nome: nome.trim(), texto: texto.trim(), ordem });
    setSaving(false);
    if (error) { toast("Erro ao adicionar.", true); return; }
    setNome(""); setTexto("");
    toast("Depoimento adicionado!");
    load();
  };

  const salvarEdicao = async (d: Depoimento) => {
    const { error } = await supabase.from("depoimentos")
      .update({ nome: d.nome, texto: d.texto, ativo: d.ativo, ordem: d.ordem }).eq("id", d.id);
    if (error) toast("Erro ao salvar.", true);
    else toast("Depoimento atualizado!");
  };

  const alternarAtivo = async (d: Depoimento) => {
    const novo = { ...d, ativo: !d.ativo };
    setLista((prev) => prev.map((x) => x.id === d.id ? novo : x));
    const { error } = await supabase.from("depoimentos").update({ ativo: novo.ativo }).eq("id", d.id);
    if (error) toast("Erro ao alterar.", true);
  };

  const excluir = async (id: number) => {
    if (!window.confirm("Excluir este depoimento? Esta ação não pode ser desfeita.")) return;
    const { error } = await supabase.from("depoimentos").delete().eq("id", id);
    if (error) { toast("Erro ao excluir.", true); return; }
    setLista((prev) => prev.filter((x) => x.id !== id));
    toast("Depoimento excluído.");
  };

  const editarCampo = (id: number, campo: "nome" | "texto", valor: string) =>
    setLista((prev) => prev.map((x) => x.id === id ? { ...x, [campo]: valor } : x));

  return (
    <AdminShell active="depoimentos" title="Depoimentos" subtitle="Frases das famílias exibidas na Home" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-comment-dots"></i></div>
        <div><h1>Depoimentos</h1><p>Gerencie os depoimentos do carrossel da página inicial. Deixe o nome em branco para mostrar um coração no lugar das iniciais.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/#depoimentos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      {!API_CONFIGURED ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}>
          <p style={{ color: "var(--adm-ink-3)" }}>Backend não configurado.</p>
        </div>
      ) : (
        <div className="adm-editor">
          <div className="adm-editor-main">
            <div className="adm-card">
              <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-plus"></i></div><h3>Novo depoimento</h3></div>
              <label className="adm-form-label">Nome (opcional)</label>
              <input className="adm-text" placeholder="Ex.: Pais da Mariah B." value={nome} onChange={(e) => setNome(e.target.value)} />
              <label className="adm-form-label">Texto do depoimento</label>
              <textarea className="adm-textarea" placeholder="O que a família disse sobre a escola…" value={texto} onChange={(e) => setTexto(e.target.value)}></textarea>
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto", marginTop: 10 }} onClick={adicionar} disabled={saving}>
                {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Adicionando…</> : <><i className="fa-solid fa-plus"></i> Adicionar depoimento</>}
              </button>
            </div>

            <div className="adm-card">
              <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-list"></i></div><h3>Depoimentos publicados</h3></div>
              {loading ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
              ) : lista.length === 0 ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum depoimento ainda. Adicione o primeiro acima.</p>
              ) : (
                lista.map((d) => (
                  <div key={d.id} style={{ border: "1px solid var(--adm-line)", borderRadius: 12, padding: 14, marginBottom: 12, opacity: d.ativo ? 1 : 0.55 }}>
                    <input className="adm-text" value={d.nome} placeholder="(sem nome — mostra coração)" onChange={(e) => editarCampo(d.id, "nome", e.target.value)} style={{ marginBottom: 8, fontWeight: 600 }} />
                    <textarea className="adm-textarea" value={d.texto} onChange={(e) => editarCampo(d.id, "texto", e.target.value)} style={{ minHeight: 70 }}></textarea>
                    <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                      <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={() => salvarEdicao(d)}><i className="fa-solid fa-floppy-disk"></i> Salvar</button>
                      <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "auto" }} onClick={() => alternarAtivo(d)}>
                        <i className={"fa-solid " + (d.ativo ? "fa-eye-slash" : "fa-eye")}></i> {d.ativo ? "Ocultar" : "Mostrar"}
                      </button>
                      <button className="adm-btn adm-btn-sm" style={{ width: "auto", background: "#fce8ec", color: "#b8324b" }} onClick={() => excluir(d.id)}><i className="fa-regular fa-trash-can"></i> Excluir</button>
                      {!d.ativo && <span style={{ alignSelf: "center", fontSize: 12, color: "var(--adm-ink-3)" }}>Oculto no site</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="adm-side-panel">
            <div className="adm-card">
              <h3 style={{ fontSize: 15, marginBottom: 12 }}>Como funciona</h3>
              <p style={{ fontSize: 12.5, color: "var(--adm-ink-3)", lineHeight: 1.6, margin: 0 }}>
                Os depoimentos aparecem no carrossel da Home. "Ocultar" tira do site sem apagar. A ordem segue a lista (de cima para baixo).
              </p>
            </div>
            <div className="adm-card">
              <h3 style={{ fontSize: 15, marginBottom: 8 }}>Total</h3>
              <div className="adm-status-row"><span>Publicados</span><b>{lista.filter((d) => d.ativo).length}</b></div>
              <div className="adm-status-row"><span>Ocultos</span><b>{lista.filter((d) => !d.ativo).length}</b></div>
            </div>
          </div>
        </div>
      )}
      {toastNode}
    </AdminShell>
  );
}
