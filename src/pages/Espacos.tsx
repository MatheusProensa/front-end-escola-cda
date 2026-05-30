import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { asset } from "../lib/assets";

// Galeria: áreas externas primeiro (grama → britas → areia → quadra → horta),
// transição pela entrada coberta, depois os ambientes internos.
const GAL = [
  { img: "jardim.webp", t: "Pátio", d: "Áreas verdes para brincar, respirar e conviver.", cls: "w2 h2", pos: "center 40%" },
  { img: "patio-area.webp", t: "Convivência", d: "Pátio arborizado para brincar e conviver ao ar livre." },
  { img: "patio.webp", t: "Parque", d: "Parque ao ar livre com playground e natureza.", cls: "w2" },
  { img: "recreio.webp", t: "Britas", d: "Brincar livre ao ar livre, do jeito da infância.", cls: "w2" },
  { img: "areia.webp", t: "Areia", d: "Areia e balanço para explorar e imaginar.", cls: "w2 h2" },
  { img: "quadra.webp", t: "Quadra", d: "Movimento, esporte e energia.", cls: "w2 h2", pos: "center 58%" },
  { img: "horta.webp", t: "Horta", d: "Plantar, cuidar e aprender com a natureza.", cls: "w2 h2", pos: "center 72%", ar: "3 / 4" },
  { img: "coberto.webp", t: "Entrada", d: "Brincar protegido em qualquer dia.", cls: "w2 h2" },
  { img: "biblioteca.webp", t: "Biblioteca", d: "Mundos para descobrir em cada página.", cls: "w2 h2" },
  { img: "sala-aula.webp", t: "Salas de aula", d: "Ambientes preparados para acolher e aprender." },
  { img: "laboratorio.webp", t: "Laboratório", d: "Ciência viva, mão na massa.", cls: "w2" },
  { img: "refeitorio.webp", t: "Refeitório", d: "Alimentação cuidada, com carinho.", cls: "w2" },
  { img: "solario.webp", t: "Solário", d: "Espaço macio e seguro para os pequenos.", cls: "w2 h2" },
  { img: "convivencia.webp", t: "Banheiro E. Fundamental e PCD", d: "Pebolim e descanso entre uma atividade e outra.", cls: "w2" },
];

const FEATS = [
  { icon: "shield-halved", t: "Segurança", p: "Ambientes seguros, pensados para o bem-estar dos alunos.", gold: false },
  { icon: "heart", t: "Acolhimento", p: "Espaços que recebem com carinho e humanização.", gold: true },
  { icon: "seedling", t: "Natureza", p: "Áreas verdes que despertam curiosidade e cuidado.", gold: false },
  { icon: "lightbulb", t: "Descobertas", p: "Lugares que inspiram aprendizagem e novas experiências.", gold: true },
];

function GaleriaLightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (i: number) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % GAL.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + GAL.length) % GAL.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNav]);
  const g = GAL[index];
  return (
    <div className="lb-backdrop" onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Fechar">×</button>
      <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); onNav((index - 1 + GAL.length) % GAL.length); }} aria-label="Anterior"><i className="fa-solid fa-chevron-left"></i></button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img className="lb-img" src={asset(g.img)} alt={g.t} />
      </figure>
      <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); onNav((index + 1) % GAL.length); }} aria-label="Próxima"><i className="fa-solid fa-chevron-right"></i></button>
      <span className="lb-count">{index + 1} / {GAL.length}</span>
    </div>
  );
}

export default function Espacos() {
  usePageMeta("Nosso Espaço — Estrutura e energia solar | Escola CDA", "Ambientes pensados para acolher, explorar e crescer: biblioteca, quadra, pátio, horta e energia solar na Escola CDA, Santa Maria/RS.");
  const contact = useContact();
  const [lb, setLb] = useState<number | null>(null);
  const fechar = useCallback(() => setLb(null), []);
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Nosso espaço</span>
        <h1>Ambientes pensados para acolher, explorar e <span className="script">crescer.</span></h1>
        <p>Cada cantinho da CDA é preparado com cuidado para oferecer segurança, conforto e experiências que fazem parte do desenvolvimento infantil.</p>
      </section>

      <div className="page-cover reveal">
        <img src={asset("fachada.webp")} alt="Fachada da Escola CDA" decoding="async" />
      </div>

      <div className="cda-panel reveal">
        <div className="galeria">
          {GAL.map((g, i) => (
            <button className={"gal " + (g.cls || "")} key={i} onClick={() => setLb(i)} aria-label={"Ampliar foto: " + g.t}>
              <img src={asset(g.img)} alt={g.t} loading="lazy" decoding="async" style={{ ...(g.pos ? { objectPosition: g.pos } : {}), ...(g.ar ? { aspectRatio: g.ar, objectFit: "cover" } : {}) }} />
              <span className="gal-zoom"><Icon name="expand" size={14} /></span>
            </button>
          ))}
        </div>
      </div>

      <div className="cda-panel tight reveal">
        <div className="sec-head"><span className="eyebrow">Por dentro de cada espaço</span><h2>Feitos para o bem-estar de cada criança.</h2></div>
        <div className="valores cols-4">
          {FEATS.map((f, i) => (
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
          <h3>Uma escola movida a energia solar.</h3>
          <p>Investimos em energia limpa porque cuidar da infância também é cuidar do futuro do planeta. Nossos painéis abastecem o dia a dia da escola e ainda viram aprendizado sobre consciência ambiental para as crianças.</p>
          <div className="cda-list">
            <div className="li"><div className="li-ic gold"><Icon name="solar-panel" size={12} /></div><div><strong>Energia limpa e renovável</strong><span>Painéis solares que reduzem o impacto ambiental.</span></div></div>
            <div className="li"><div className="li-ic"><Icon name="leaf" size={12} /></div><div><strong>Consciência ambiental</strong><span>As crianças aprendem, na prática, a cuidar do planeta.</span></div></div>
            <div className="li"><div className="li-ic gold"><Icon name="piggy-bank" size={12} /></div><div><strong>Recurso que volta pra educação</strong><span>A economia gerada é reinvestida no aprendizado.</span></div></div>
          </div>
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Cada espaço fica ainda melhor com seu filho nele.</h2>
        <p>Agende uma visita e conheça de perto cada ambiente feito com cuidado para a infância.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/sobre"><Icon name="arrow-right" size={15} /> Conhecer a escola</Link>
        </div>
      </div>

      {lb !== null && <GaleriaLightbox index={lb} onClose={fechar} onNav={setLb} />}
    </Layout>
  );
}
