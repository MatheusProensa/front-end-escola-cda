import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Layout, usePageMeta } from "../components/site";
import { asset } from "../lib/assets";

type Album = { id: string; img: string; t: string; date: string; dir?: string; count?: number };

const ALBUNS: Album[] = [
  { id: "aniversario-15", img: "aniversario-15.webp", t: "Aniversário da Escola CDA — 15 anos", date: "31 de Março · 2026", dir: "eventos/aniversario-15/", count: 132 },
  { id: "feira-do-livro", img: "feira-livro-pro.webp", t: "Feira do Livro", date: "11 de Abril · 2026", dir: "eventos/feira-do-livro/", count: 7 },
  { id: "festa-familia-1sem", img: "eventos/festa-familia-1sem/032.webp", t: "Festa da Família — 1º semestre", date: "09 de Maio · 2026", dir: "eventos/festa-familia-1sem/", count: 45 },
];

// gera os caminhos das fotos (miniatura -t.webp + grande .webp) de um álbum
function fotosDe(album: Album): { thumb: string; full: string }[] {
  if (!album.dir || !album.count) return [];
  return Array.from({ length: album.count }, (_, i) => {
    const id = String(i + 1).padStart(3, "0");
    return { thumb: asset(album.dir + id + "-t.webp"), full: asset(album.dir + id + ".webp") };
  });
}

function Lightbox({ fotos, index, onClose, onNav }: { fotos: { thumb: string; full: string }[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
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

function AlbumModal({ album, onClose }: { album: Album; onClose: () => void }) {
  const fotos = fotosDe(album);
  const [lb, setLb] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && lb === null) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lb]);

  return (
    <div className="album-modal-backdrop" onClick={onClose}>
      <div className="album-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={album.t}>
        <div className="album-modal-head">
          <span className="album-modal-date"><i className="fa-regular fa-calendar"></i> {album.date}</span>
          <h2>{album.t}</h2>
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
              <i className="fa-solid fa-camera-retro"></i> As fotos deste evento serão publicadas em breve.
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
  const [aberto, setAberto] = useState<Album | null>(null);
  const fechar = useCallback(() => setAberto(null), []);
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Momentos</span>
        <h1>Cada conquista vira uma <span className="script">lembrança.</span></h1>
        <p>Festas, encontros e celebrações que marcam a vida das nossas crianças e famílias — reviva cada momento com a gente.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="momentos-grid">
          {ALBUNS.map((a) => {
            const n = a.count || 0;
            return (
              <button className="album" key={a.id} onClick={() => setAberto(a)}>
                <img src={asset(a.img)} alt={a.t} loading="lazy" decoding="async" />
                <div className="album-body">
                  <span className="album-date"><i className="fa-regular fa-calendar"></i> {a.date}</span>
                  <h3>{a.t}</h3>
                  <span className="count"><i className="fa-regular fa-images"></i> {n > 0 ? `Ver galeria · ${n} fotos` : "Ver galeria"}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Quer ver de perto o dia a dia da CDA?</h2>
        <p>Acompanhe nossos momentos no Instagram ou venha nos visitar — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <a className="btn-white" href="https://www.instagram.com/escolacda.sm/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Seguir no Instagram</a>
          <Link className="btn-ghost" to="/matriculas"><i className="fa-solid fa-arrow-right"></i> Agendar visita</Link>
        </div>
      </div>

      {aberto && <AlbumModal album={aberto} onClose={fechar} />}
    </Layout>
  );
}
