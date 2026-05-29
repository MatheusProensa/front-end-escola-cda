import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/site";
import { asset } from "../lib/assets";

type Album = { id: string; img: string; t: string; date: string };

const ALBUNS: Album[] = [
  { id: "aniversario-15", img: "patio.webp", t: "Aniversário da Escola CDA — 15 anos", date: "31 de Março · 2026" },
  { id: "feira-do-livro", img: "biblioteca.webp", t: "Feira do Livro", date: "11 de Abril · 2026" },
  { id: "festa-familia-1sem", img: "conexao.webp", t: "Festa da Família — 1º semestre", date: "09 de Maio · 2026" },
];

function AlbumModal({ album, onClose }: { album: Album; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="album-modal-backdrop" onClick={onClose}>
      <div className="album-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={album.t}>
        <div className="album-modal-head">
          <span className="album-modal-date"><i className="fa-regular fa-calendar"></i> {album.date}</span>
          <h2>{album.t}</h2>
          <button className="album-modal-x" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="album-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="album-ph" key={i}><i className="fa-regular fa-image"></i></div>
          ))}
        </div>
        <div className="album-empty-note">
          <i className="fa-solid fa-camera-retro"></i> As fotos deste evento serão publicadas em breve.
        </div>
      </div>
    </div>
  );
}

export default function Momentos() {
  const [aberto, setAberto] = useState<Album | null>(null);
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Momentos</span>
        <h1>Cada conquista vira uma <span className="script">lembrança.</span></h1>
        <p>Festas, encontros e celebrações que marcam a vida das nossas crianças e famílias. Acompanhe a agenda e reviva com a gente cada momento especial da CDA.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="momentos-grid">
          {ALBUNS.map((a) => (
            <button className="album" key={a.id} onClick={() => setAberto(a)}>
              <img src={asset(a.img)} alt={a.t} loading="lazy" decoding="async" />
              <div className="album-body">
                <span className="album-date"><i className="fa-regular fa-calendar"></i> {a.date}</span>
                <h3>{a.t}</h3>
                <span className="count"><i className="fa-regular fa-images"></i> Ver galeria</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Quer ver de perto o dia a dia da CDA?</h2>
        <p>Acompanhe nossos momentos no Instagram ou venha nos visitar — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <a className="btn-white" href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Seguir no Instagram</a>
          <Link className="btn-ghost" to="/matriculas"><i className="fa-solid fa-arrow-right"></i> Agendar visita</Link>
        </div>
      </div>

      {aberto && <AlbumModal album={aberto} onClose={() => setAberto(null)} />}
    </Layout>
  );
}
