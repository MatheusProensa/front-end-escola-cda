import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout, usePageMeta, useSettings, instagramUrl } from "../components/site";
import { supabase, API_CONFIGURED } from "../lib/supabase";

type Foto = { thumb: string; full: string };
type UAlbum = {
  key: string;
  titulo: string;
  capa: string;
  date: string;
  dbId: number;
  count?: number;
};

const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
function dataLabel(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")} de ${MESES[d.getMonth()]} · ${d.getFullYear()}`;
}

function Lightbox({ fotos, index, onClose, onNav }: { fotos: Foto[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % fotos.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, fotos.length, onClose, onNav]);

  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Fechar">×</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onNav((index - 1 + fotos.length) % fotos.length); }} aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>
      <img className="lb-img" src={fotos[index].full} alt={"Foto " + (index + 1)} onClick={(e) => e.stopPropagation()} />
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNav((index + 1) % fotos.length); }} aria-label="Próxima"><i className="fa-solid fa-chevron-right"></i></button>
      <span className="lb-count">{index + 1} / {fotos.length}</span>
    </div>
  );
}

function AlbumModal({ album, onClose }: { album: UAlbum; onClose: () => void }) {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    supabase.from("fotos").select("url").eq("album_id", album.dbId).order("id")
      .then(({ data }) => {
        if (!alive) return;
        setFotos((data ?? []).map((f: { url: string }) => ({ thumb: f.url, full: f.url })));
        setCarregando(false);
      });
    return () => { alive = false; };
  }, [album]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && lb === null) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lb]);

  return (
    <div className="album-modal-backdrop" onClick={onClose}>
      <div className="album-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={album.titulo}>
        <div className="album-modal-head">
          {album.date && <span className="album-modal-date"><i className="fa-regular fa-calendar"></i> {album.date}</span>}
          <h2>{album.titulo}</h2>
          {fotos.length > 0 && <span className="album-modal-sub">{fotos.length} fotos</span>}
          <button className="album-modal-x" onClick={onClose} aria-label="Fechar">×</button>
        </div>

        {fotos.length > 0 ? (
          <div className="album-grid">
            {fotos.map((f, i) => (
              <button className="album-thumb" key={i} onClick={() => setLb(i)} aria-label={"Abrir foto " + (i + 1)}>
                <img src={f.thumb} alt={"Foto " + (i + 1)} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="album-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="album-ph" key={i}><i className="fa-regular fa-image"></i></div>
              ))}
            </div>
            <div className="album-empty-note">
              <i className="fa-solid fa-camera-retro"></i> {carregando ? "Carregando fotos…" : "As fotos deste evento serão publicadas em breve."}
            </div>
          </>
        )}
      </div>

      {lb !== null && <Lightbox fotos={fotos} index={lb} onClose={() => setLb(null)} onNav={setLb} />}
    </div>
  );
}

export default function Momentos() {
  usePageMeta("Momentos — Festas e eventos | Escola CDA", "Reviva festas, encontros e celebrações que marcam a vida das crianças e famílias da Escola CDA.");
  const s = useSettings();
  const [albuns, setAlbuns] = useState<UAlbum[]>([]);
  const [aberto, setAberto] = useState<UAlbum | null>(null);
  const fechar = useCallback(() => setAberto(null), []);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    let alive = true;
    (async () => {
      const { data: albs } = await supabase.from("albuns").select("*").eq("publicado", true).order("created_at", { ascending: false });
      if (!alive || !albs || albs.length === 0) return;
      const ids = albs.map((a: { id: number }) => a.id);
      const { data: fs } = await supabase.from("fotos").select("album_id").in("album_id", ids);
      const cont: Record<number, number> = {};
      (fs ?? []).forEach((f: { album_id: number }) => { cont[f.album_id] = (cont[f.album_id] || 0) + 1; });
      setAlbuns(albs.map((a: { id: number; titulo: string; capa_url: string | null; created_at: string }) => ({
        key: "db-" + a.id,
        dbId: a.id,
        titulo: a.titulo,
        capa: a.capa_url || "",
        date: dataLabel(a.created_at),
        count: cont[a.id] || 0,
      })));
    })();
    return () => { alive = false; };
  }, []);

  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Momentos</span>
        <h1>Cada conquista vira uma <span className="script">lembrança</span></h1>
        <p>Festas, encontros e celebrações que marcam a vida das nossas crianças e famílias — reviva cada momento com a gente.</p>
      </section>

      <div className="cda-panel reveal">
        {albuns.length > 0 ? (
          <div className="momentos-grid">
            {albuns.map((a) => {
              const n = a.count || 0;
              return (
                <button className="album" key={a.key} onClick={() => setAberto(a)}>
                  {a.capa
                    ? <img src={a.capa} alt={a.titulo} loading="lazy" decoding="async" />
                    : <div className="album-ph" style={{ aspectRatio: "4 / 3" }}><i className="fa-solid fa-camera-retro"></i></div>}
                  <div className="album-body">
                    {a.date && <span className="album-date"><i className="fa-regular fa-calendar"></i> {a.date}</span>}
                    <h3>{a.titulo}</h3>
                    <span className="count"><i className="fa-regular fa-images"></i> {n > 0 ? `Ver galeria · ${n} fotos` : "Ver galeria"}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="album-empty-note">
            <i className="fa-solid fa-camera-retro"></i> Novos álbuns em breve.
          </div>
        )}
      </div>

      <div className="cta-band reveal">
        <h2>Quer ver de perto o dia a dia da CDA?</h2>
        <p>Acompanhe nossos momentos no Instagram ou venha nos visitar — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <a className="btn-white" href={instagramUrl(s.instagram)} target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Seguir no Instagram</a>
          <Link className="btn-ghost" to="/matriculas"><i className="fa-solid fa-arrow-right"></i> Agendar visita</Link>
        </div>
      </div>

      {aberto && <AlbumModal album={aberto} onClose={fechar} />}
    </Layout>
  );
}
