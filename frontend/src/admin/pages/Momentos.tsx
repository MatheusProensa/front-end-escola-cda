import { useEffect, useRef, useState } from "react";
import AdminShell from "../AdminShell";
import { useToast } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";
import { uploadImagem, removerImagem } from "../../lib/storage";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Album = { id: number; titulo: string; capa_url: string | null; publicado: boolean; created_at: string };
type Foto = { id: number; album_id: number; url: string };

export default function Momentos() {
  const [toast, toastNode] = useToast();
  const [albuns, setAlbuns] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  // novo álbum
  const [novoTitulo, setNovoTitulo] = useState("");
  const [criando, setCriando] = useState(false);

  // gerir fotos de um álbum
  const [aberto, setAberto] = useState<Album | null>(null);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [subindo, setSubindo] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!API_CONFIGURED) { setLoading(false); return; }
    const { data, error } = await supabase.from("albuns").select("*").order("created_at", { ascending: false });
    if (error) toast("Erro ao carregar álbuns.", true);
    else setAlbuns(data as Album[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const criarAlbum = async () => {
    if (!novoTitulo.trim()) { toast("Dê um nome ao álbum.", true); return; }
    setCriando(true);
    const { error } = await supabase.from("albuns").insert({ titulo: novoTitulo.trim(), publicado: true });
    setCriando(false);
    if (error) { toast("Erro ao criar álbum.", true); return; }
    setNovoTitulo("");
    toast("Álbum criado!");
    load();
  };

  const renomear = async (a: Album) => {
    const { error } = await supabase.from("albuns").update({ titulo: a.titulo }).eq("id", a.id);
    if (error) toast("Erro ao salvar.", true); else toast("Álbum atualizado!");
  };

  const togglePublicado = async (a: Album) => {
    const novo = { ...a, publicado: !a.publicado };
    setAlbuns((p) => p.map((x) => x.id === a.id ? novo : x));
    const { error } = await supabase.from("albuns").update({ publicado: novo.publicado }).eq("id", a.id);
    if (error) toast("Erro ao alterar.", true);
  };

  const excluirAlbum = async (a: Album) => {
    if (!window.confirm(`Excluir o álbum "${a.titulo}" e todas as fotos dele?`)) return;
    // remove as fotos do storage (best-effort)
    const { data: fs } = await supabase.from("fotos").select("url").eq("album_id", a.id);
    await Promise.all((fs ?? []).map((f: { url: string }) => removerImagem(f.url)));
    if (a.capa_url) await removerImagem(a.capa_url);
    const { error } = await supabase.from("albuns").delete().eq("id", a.id);
    if (error) { toast("Erro ao excluir.", true); return; }
    setAlbuns((p) => p.filter((x) => x.id !== a.id));
    if (aberto?.id === a.id) setAberto(null);
    toast("Álbum excluído.");
  };

  const trocarCapa = async (a: Album, file: File) => {
    try {
      if (a.capa_url) await removerImagem(a.capa_url);
      const url = await uploadImagem(file, "capas");
      const { error } = await supabase.from("albuns").update({ capa_url: url }).eq("id", a.id);
      if (error) throw error;
      setAlbuns((p) => p.map((x) => x.id === a.id ? { ...x, capa_url: url } : x));
      toast("Capa atualizada!");
    } catch { toast("Erro ao enviar a capa.", true); }
  };

  const abrirFotos = async (a: Album) => {
    setAberto(a);
    setFotos([]);
    const { data } = await supabase.from("fotos").select("*").eq("album_id", a.id).order("id");
    setFotos((data as Foto[]) ?? []);
  };

  const enviarFotos = async (files: FileList) => {
    if (!aberto) return;
    setSubindo(true);
    let ok = 0;
    for (const file of Array.from(files)) {
      try {
        const url = await uploadImagem(file, "album-" + aberto.id);
        const { data, error } = await supabase.from("fotos").insert({ album_id: aberto.id, url }).select().single();
        if (error) throw error;
        setFotos((p) => [...p, data as Foto]);
        // primeira foto vira capa automaticamente se o álbum não tiver capa
        if (!aberto.capa_url && ok === 0) await trocarCapaAuto(aberto, url);
        ok++;
      } catch { /* segue para a próxima */ }
    }
    setSubindo(false);
    if (fileRef.current) fileRef.current.value = "";
    toast(ok > 0 ? `${ok} foto(s) enviada(s)!` : "Nenhuma foto enviada.", ok === 0);
  };

  const trocarCapaAuto = async (a: Album, url: string) => {
    await supabase.from("albuns").update({ capa_url: url }).eq("id", a.id);
    setAlbuns((p) => p.map((x) => x.id === a.id ? { ...x, capa_url: url } : x));
    setAberto((x) => x ? { ...x, capa_url: url } : x);
  };

  const excluirFoto = async (f: Foto) => {
    await removerImagem(f.url);
    const { error } = await supabase.from("fotos").delete().eq("id", f.id);
    if (error) { toast("Erro ao excluir foto.", true); return; }
    setFotos((p) => p.filter((x) => x.id !== f.id));
  };

  return (
    <AdminShell active="momentos" title="Momentos" subtitle="Álbuns de fotos exibidos no site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-camera-retro"></i></div>
        <div><h1>Momentos</h1><p>Crie álbuns de fotos dos eventos da escola — exibidos na página Momentos do site.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/momentos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      {!API_CONFIGURED ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}><p style={{ color: "var(--adm-ink-3)" }}>Backend não configurado.</p></div>
      ) : (
        <>
          <div className="adm-card" style={{ marginBottom: 18 }}>
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-plus"></i></div><h3>Novo álbum</h3></div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input className="adm-text" style={{ flex: 1, minWidth: 220 }} placeholder="Nome do evento (ex.: Festa da Família)" value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} />
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={criarAlbum} disabled={criando}>
                {criando ? <><i className="fa-solid fa-spinner fa-spin"></i> Criando…</> : <><i className="fa-solid fa-plus"></i> Criar álbum</>}
              </button>
            </div>
            <p className="hint" style={{ marginTop: 8 }}>Depois de criar, clique em "Gerir fotos" para enviar as imagens. A primeira foto vira a capa automaticamente.</p>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-folder-open"></i></div><h3>Todos os álbuns ({albuns.length})</h3></div>
            {loading ? (
              <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p>
            ) : albuns.length === 0 ? (
              <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhum álbum ainda. Crie o primeiro acima.</p>
            ) : (
              <div className="adm-img-grid">
                {albuns.map((a) => (
                  <div key={a.id} style={{ border: "1px solid var(--adm-line)", borderRadius: 14, overflow: "hidden", background: "#fff", opacity: a.publicado ? 1 : 0.6 }}>
                    <label className="adm-img-slot" style={{ aspectRatio: "16/10", border: "none", borderRadius: 0, cursor: "pointer", display: "block" }}>
                      {a.capa_url ? <img src={a.capa_url} alt={a.titulo} /> : <div className="adm-img-empty"><i className="fa-solid fa-image"></i><span>Sem capa</span></div>}
                      <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar capa</span></div>
                      <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && trocarCapa(a, e.target.files[0])} />
                    </label>
                    <div style={{ padding: "12px 14px" }}>
                      <input className="adm-text" value={a.titulo} onChange={(e) => setAlbuns((p) => p.map((x) => x.id === a.id ? { ...x, titulo: e.target.value } : x))} onBlur={() => renomear(a)} style={{ padding: "8px 10px", fontSize: 13, marginBottom: 8 }} />
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={() => abrirFotos(a)}><i className="fa-regular fa-images"></i> Gerir fotos</button>
                        <button className="adm-mini-btn" title={a.publicado ? "Ocultar do site" : "Publicar"} onClick={() => togglePublicado(a)}><i className={"fa-solid " + (a.publicado ? "fa-eye" : "fa-eye-slash")}></i></button>
                        <button className="adm-mini-btn del" title="Excluir álbum" onClick={() => excluirAlbum(a)}><i className="fa-regular fa-trash-can"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {aberto && (
        <div className="album-modal-backdrop" onClick={() => setAberto(null)}>
          <div className="album-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="album-modal-head">
              <h2>{aberto.titulo}</h2>
              <span className="album-modal-sub">{fotos.length} foto(s)</span>
              <button className="album-modal-x" onClick={() => setAberto(null)} aria-label="Fechar">×</button>
            </div>
            <div style={{ padding: "14px 18px" }}>
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files && enviarFotos(e.target.files)} />
              <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto", marginBottom: 14 }} onClick={() => fileRef.current?.click()} disabled={subindo}>
                {subindo ? <><i className="fa-solid fa-spinner fa-spin"></i> Enviando…</> : <><i className="fa-solid fa-cloud-arrow-up"></i> Enviar fotos</>}
              </button>
              {fotos.length === 0 ? (
                <p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Nenhuma foto ainda. Clique em "Enviar fotos" para adicionar.</p>
              ) : (
                <div className="adm-img-grid">
                  {fotos.map((f) => (
                    <div key={f.id} style={{ position: "relative", borderRadius: 10, overflow: "hidden", border: "1px solid var(--adm-line)" }}>
                      <img src={f.url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                      <button className="adm-mini-btn del" title="Excluir foto" onClick={() => excluirFoto(f)} style={{ position: "absolute", top: 6, right: 6 }}><i className="fa-regular fa-trash-can"></i></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {toastNode}
    </AdminShell>
  );
}
