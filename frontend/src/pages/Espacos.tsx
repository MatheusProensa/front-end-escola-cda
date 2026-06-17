import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { ESPACOS_GAL_DEFAULT, type GalFoto } from "../lib/galeria";
import { ESPACOS_FEATS, type Valor } from "../lib/listas";

function GaleriaLightbox({ gal, index, onClose, onNav }: { gal: GalFoto[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % gal.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + gal.length) % gal.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, gal.length, onClose, onNav]);
  const g = gal[index];
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Fechar">×</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onNav((index - 1 + gal.length) % gal.length); }} aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img className="lb-img" src={g.url} alt={g.titulo} />
      </figure>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNav((index + 1) % gal.length); }} aria-label="Próxima"><i className="fa-solid fa-chevron-right"></i></button>
      <span className="lb-count">{index + 1} / {gal.length}</span>
    </div>
  );
}

export default function Espacos() {
  usePageMeta("Nosso Espaço — Estrutura e energia solar | Escola CDA", "Ambientes pensados para acolher, explorar e crescer: biblioteca, quadra, pátio, horta e energia solar na Escola CDA, Santa Maria/RS.");
  const contact = useContact();
  const { sec } = usePageContent("espacos");
  const gal = section<GalFoto[]>(sec, "galeria", ESPACOS_GAL_DEFAULT);
  const feats = section<Valor[]>(sec, "feats", ESPACOS_FEATS);
  const [lb, setLb] = useState<number | null>(null);
  const fechar = useCallback(() => setLb(null), []);
  return (
    <Layout>
      <PageHero pagina="espacos" />

      <div className="page-cover reveal">
        <img src={asset("fachada.webp")} alt="Fachada da Escola CDA" decoding="async" />
      </div>

      <div className="cda-panel reveal">
        <div className="galeria">
          {gal.map((g, i) => (
            <button className={"gal " + (g.cls || "")} key={i} onClick={() => setLb(i)} aria-label={"Ampliar foto: " + g.titulo}>
              <img src={g.url} alt={g.titulo} loading="lazy" decoding="async" style={{ ...(g.pos ? { objectPosition: g.pos } : {}), ...(g.ar ? { aspectRatio: g.ar, objectFit: "cover" } : {}) }} />
              <span className="gal-zoom"><Icon name="expand" size={14} /></span>
            </button>
          ))}
        </div>
      </div>

      <div className="cda-panel tight reveal">
        <div className="sec-head"><span className="eyebrow">Por dentro de cada espaço</span><h2>Feitos para o bem-estar de cada criança</h2></div>
        <div className="valores cols-4">
          {feats.map((f, i) => (
            <div className={"valor" + (f.gold ? " gold" : "")} key={i}>
              <div className="v-ic"><Icon name={f.icon} color="#fff" size={22} /></div>
              <h3>{f.t}</h3>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-row flip reveal">
        <div className="fr-media">
          <img src={asset("drone.webp")} alt="Painéis solares da Escola CDA" decoding="async" style={{ objectPosition: "88% center" }} />
          <span className="fr-tag"><span className="dot"></span>Energia limpa</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Sustentabilidade</span>
          <h3>Uma escola movida a energia solar</h3>
          <p>Investimos em energia limpa porque cuidar da infância também é cuidar do futuro do planeta. Nossos painéis abastecem o dia a dia da escola e ainda viram aprendizado sobre consciência ambiental para as crianças.</p>
          <div className="cda-list">
            <div className="li"><div className="li-ic gold"><Icon name="solar-panel" size={12} /></div><div><strong>Energia limpa e renovável</strong><span>Painéis solares que reduzem o impacto ambiental.</span></div></div>
            <div className="li"><div className="li-ic"><Icon name="leaf" size={12} /></div><div><strong>Consciência ambiental</strong><span>As crianças aprendem, na prática, a cuidar do planeta.</span></div></div>
            <div className="li"><div className="li-ic gold"><Icon name="piggy-bank" size={12} /></div><div><strong>Recurso que volta pra educação</strong><span>A economia gerada é reinvestida no aprendizado.</span></div></div>
          </div>
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Cada espaço fica ainda melhor com seu filho nele</h2>
        <p>Agende uma visita e conheça de perto cada ambiente feito com cuidado para a infância.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/sobre"><Icon name="arrow-right" size={15} /> Conhecer a escola</Link>
        </div>
      </div>

      {lb !== null && <GaleriaLightbox gal={gal} index={lb} onClose={fechar} onNav={setLb} />}
    </Layout>
  );
}
