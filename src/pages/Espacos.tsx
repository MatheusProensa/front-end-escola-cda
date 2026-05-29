import { Link } from "react-router-dom";
import { Icon, Layout, useContact } from "../components/site";
import { asset } from "../lib/assets";

const GAL = [
  { img: "biblioteca.webp", t: "Biblioteca", d: "Mundos para descobrir em cada página.", cls: "w3 h2" },
  { img: "patio.webp", t: "Pátio", d: "Espaço livre para brincar e respirar.", cls: "w3" },
  { img: "quadra.webp", t: "Quadra", d: "Movimento, esporte e energia.", cls: "w3" },
  { img: "laboratorio.webp", t: "Laboratório", d: "Ciência viva, mão na massa.", cls: "w2" },
  { img: "refeitorio.webp", t: "Refeitório", d: "Alimentação cuidada, com carinho.", cls: "w2" },
  { img: "horta.webp", t: "Horta", d: "Plantar, cuidar e aprender com a natureza.", cls: "w2" },
  { img: "conexao.webp", t: "Salas de aula", d: "Ambientes preparados para acolher e aprender.", cls: "w6" },
];

const FEATS = [
  { icon: "shield-halved", t: "Segurança", p: "Ambientes seguros, pensados para o bem-estar dos alunos.", gold: false },
  { icon: "heart", t: "Acolhimento", p: "Espaços que recebem com carinho e humanização.", gold: true },
  { icon: "seedling", t: "Natureza", p: "Áreas verdes que despertam curiosidade e cuidado.", gold: false },
  { icon: "lightbulb", t: "Descobertas", p: "Lugares que inspiram aprendizagem e novas experiências.", gold: true },
];

export default function Espacos() {
  const contact = useContact();
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Nosso espaço</span>
        <h1>Ambientes pensados para acolher, explorar e <span className="script">crescer.</span></h1>
        <p>Cada cantinho da CDA é preparado com cuidado para oferecer segurança, conforto e experiências que fazem parte do desenvolvimento infantil.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="galeria">
          {GAL.map((g, i) => (
            <div className={"gal " + g.cls} key={i}>
              <img src={asset(g.img)} alt={g.t} decoding="async" />
              <div className="gal-label"><span className="dot"></span><div><strong>{g.t}</strong><span>{g.d}</span></div></div>
            </div>
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

      <div className="cta-band reveal">
        <h2>Cada espaço fica ainda melhor com seu filho nele.</h2>
        <p>Agende uma visita e conheça de perto cada ambiente feito com cuidado para a infância.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/sobre"><Icon name="arrow-right" size={15} /> Conhecer a escola</Link>
        </div>
      </div>
    </Layout>
  );
}
