import { Link } from "react-router-dom";
import { Layout, useContact } from "../components/site";
import { asset } from "../lib/assets";

type Album = { img: string; t: string; date: string; fotos: number; destaque?: boolean };
const ALBUNS: Album[] = [
  { img: "patio.webp", t: "Festa Junina 2025", date: "Junho · 2025", fotos: 24, destaque: true },
  { img: "timeline/t07.webp", t: "Formatura 2024", date: "Dezembro · 2024", fotos: 32 },
  { img: "quadra.webp", t: "Dia das Crianças", date: "Outubro · 2024", fotos: 18 },
  { img: "laboratorio.webp", t: "Feira de Ciências", date: "Setembro · 2024", fotos: 15 },
  { img: "culinaria.webp", t: "Páscoa na CDA", date: "Abril · 2024", fotos: 12 },
  { img: "conexao.webp", t: "Festa da Família", date: "Maio · 2024", fotos: 21 },
];

export default function Momentos() {
  const contact = useContact();
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Momentos</span>
        <h1>Cada conquista vira uma <span className="script">lembrança.</span></h1>
        <p>Festas, formaturas, vivências e celebrações que marcam a vida das nossas crianças e famílias. Reviva com a gente os momentos mais especiais da CDA.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="momentos-grid">
          {ALBUNS.map((a, i) => (
            <button className="album" key={i} onClick={contact}>
              {a.destaque ? <span className="album-badge">Mais recente</span> : null}
              <img src={asset(a.img)} alt={a.t} loading="lazy" decoding="async" />
              <div className="album-body">
                <span className="album-date"><i className="fa-regular fa-calendar"></i> {a.date}</span>
                <h3>{a.t}</h3>
                <span className="count"><i className="fa-regular fa-images"></i> {a.fotos} fotos</span>
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
    </Layout>
  );
}
