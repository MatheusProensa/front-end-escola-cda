import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { asset } from "../lib/assets";

type Viv = { img?: string; icon: string; gold?: boolean; t: string; p: string; pos?: string; fit?: string };
type Grupo = { eyebrow: string; titulo: string; intro: string; itens: Viv[] };

const GRUPOS: Grupo[] = [
  {
    eyebrow: "Turno da tarde",
    titulo: "Especializadas",
    intro: "Aulas que fazem parte da rotina e ampliam o repertório de corpo, ritmo e movimento.",
    itens: [
      { img: "musica.webp", icon: "music", gold: true, t: "Musicalização", p: "Sensibilidade, criatividade e expressão através da música e do ritmo.", pos: "center 88%" },
      { img: "capoeira.webp", icon: "hand-fist", t: "Capoeira", p: "Disciplina, respeito, coordenação e consciência corporal em movimento.", pos: "center 42%" },
      { icon: "person-running", gold: true, t: "Educação Física", p: "Movimento, esquema corporal, coordenação e o prazer de praticar esportes.", img: "edfisica.webp", pos: "center 52%" },
    ],
  },
  {
    eyebrow: "Turno da manhã",
    titulo: "Oficinas",
    intro: "No contraturno, oficinas que despertam talentos, valores e novas descobertas a cada dia.",
    itens: [
      { img: "ambiental.webp", icon: "leaf", t: "Educação Ambiental", p: "Conexão com a natureza para formar cidadãos conscientes e responsáveis — conduzida pela professora da turma." },
      { img: "culinaria.webp", icon: "utensils", gold: true, t: "Culinária Afetiva", p: "Com a nutricionista: autonomia, saúde e afeto ao aprender com as mãos.", pos: "center 100%" },
      { icon: "face-smile", t: "Educação Socioemocional", p: "Empatia, autoconhecimento e relações saudáveis — desenvolvida pela professora da turma.", img: "socioemocional.webp", pos: "center 35%" },
      { icon: "hands-asl-interpreting", gold: true, t: "Libras", p: "Com a educadora especial: primeiros contatos com a Língua Brasileira de Sinais para incluir e conectar.", img: "libras.webp", pos: "center 32%" },
    ],
  },
  {
    eyebrow: "Parcerias da escola",
    titulo: "Aulas extras",
    intro: "Atividades opcionais em parceria, para a família escolher o que mais combina com a criança.",
    itens: [
      { icon: "helmet-safety", t: "Bombeiro Mirim", p: "Disciplina, coragem e cidadania com noções de prevenção e segurança.", img: "bombeiromirim.webp", pos: "center 75%" },
      { icon: "shoe-prints", gold: true, t: "Ballet", p: "Postura, leveza e expressão: o corpo que aprende a dançar com graça." },
      { icon: "user-ninja", t: "Taekwondo", p: "Foco, respeito e autocontrole através da arte marcial." },
    ],
  },
];

function VivCard({ v }: { v: Viv }) {
  return (
    <div className={"viv-card" + (v.fit === "contain" ? " contain" : "")}>
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
  usePageMeta("Vivências — Especializadas, Oficinas e Aulas extras | Escola CDA", "Musicalização, capoeira, educação ambiental, culinária e mais: vivências que despertam talentos e valores na Escola CDA.");
  const contact = useContact();
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Vivências que transformam</span>
        <h1>Experiências que despertam habilidades <span className="script">para a vida.</span></h1>
        <p>Mais do que atividades, são vivências reais que estimulam talentos, desenvolvem competências e tornam o aprendizado vivo, criativo e cheio de significado.</p>
      </section>

      {GRUPOS.map((g, gi) => (
        <div className="cda-panel reveal viv-group" key={gi}>
          <div className="viv-group-head">
            <span className="eyebrow">{g.eyebrow}</span>
            <h2>{g.titulo}</h2>
            <p>{g.intro}</p>
          </div>
          <div className="viv-grid" style={{ ["--cols" as string]: g.itens.length }}>
            {g.itens.map((v, i) => <VivCard key={i} v={v} />)}
          </div>
        </div>
      ))}

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
