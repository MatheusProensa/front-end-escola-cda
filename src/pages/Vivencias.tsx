import { Link } from "react-router-dom";
import { Icon, Layout, useContact } from "../components/site";
import { asset } from "../lib/assets";

type Viv = { img?: string; icon: string; gold?: boolean; t: string; p: string; pos?: string };

const VIVS: Viv[] = [
  { img: "supercerebro.webp", icon: "brain", t: "Super Cérebro", p: "Raciocínio lógico, concentração e autoconfiança através do cálculo mental." },
  { img: "musica.webp", icon: "music", gold: true, t: "Musicalização", p: "Sensibilidade, criatividade e expressão através da música e do ritmo.", pos: "center -90px" },
  { img: "capoeira.webp", icon: "hand-fist", t: "Capoeira", p: "Disciplina, respeito, coordenação e consciência corporal em movimento.", pos: "center -90px" },
  { img: "ambiental.webp", icon: "leaf", t: "Educação Ambiental", p: "Conexão com a natureza para formar cidadãos conscientes e responsáveis." },
  { img: "culinaria.webp", icon: "utensils", gold: true, t: "Culinária Afetiva", p: "Autonomia, saúde e afeto na cozinha — aprender com as mãos e o coração." },
  { img: "ingles.webp", icon: "globe", t: "Inglês", p: "Imersão no idioma desde cedo, de forma natural, lúdica e significativa." },
  { icon: "person-running", t: "Educação Física", p: "Movimento, esquema corporal, coordenação e o prazer de praticar esportes." },
  { icon: "masks-theater", gold: true, t: "Arte Circense", p: "Equilíbrio, expressão e autoconfiança através das artes do circo." },
  { icon: "face-smile", t: "Desenvolvimento Socioemocional", p: "Empatia, autoconhecimento e relações saudáveis através do brincar." },
  { icon: "person-rays", gold: true, t: "Dança Criativa e Expressão Corporal", p: "O corpo como linguagem: ritmo, gesto, criatividade e expressão." },
  { icon: "hands-asl-interpreting", t: "Libras", p: "Primeiros contatos com a Língua Brasileira de Sinais — incluir e conectar." },
  { icon: "book-open-reader", gold: true, t: "Reforço Escolar", p: "Apoio no contraturno para consolidar a aprendizagem do Fundamental." },
];

function VivCard({ v }: { v: Viv }) {
  return (
    <div className="viv-card">
      {v.img ? (
        <img src={asset(v.img)} alt={v.t} decoding="async" style={v.pos ? { objectPosition: v.pos } : undefined} />
      ) : (
        <div className="viv-noimg"><Icon name={v.icon} color="rgba(255,255,255,0.15)" size={92} /></div>
      )}
      <div className="viv-ov">
        <div className="viv-ic"><Icon name={v.icon} color={v.gold ? "#f0b400" : "#0b82f6"} size={18} /></div>
        <h3>{v.t}</h3>
        <p>{v.p}</p>
      </div>
    </div>
  );
}

export default function Vivencias() {
  const contact = useContact();
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Vivências que transformam</span>
        <h1>Experiências que despertam habilidades <span className="script">para a vida.</span></h1>
        <p>Mais do que atividades, são vivências reais que estimulam talentos, desenvolvem competências e tornam o aprendizado vivo, criativo e cheio de significado.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="viv-grid">
          {VIVS.map((v, i) => <VivCard key={i} v={v} />)}
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Toda criança tem um talento esperando para florescer.</h2>
        <p>Venha ver de perto como as vivências da CDA despertam o melhor de cada aluno.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/espacos"><Icon name="arrow-right" size={15} /> Conhecer os espaços</Link>
        </div>
      </div>
    </Layout>
  );
}
