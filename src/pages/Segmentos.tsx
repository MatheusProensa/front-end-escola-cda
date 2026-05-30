import { Link } from "react-router-dom";
import { Icon, Layout, useContact } from "../components/site";
import { asset } from "../lib/assets";

type Seg = {
  key: string; img: string; icon: string; tag: string; title: string; p: string;
  metodo: [string, string][]; chipsLabel: string; chips: string[]; stats: [string, string][]; pos?: string;
};

const SEGS: Seg[] = [
  {
    key: "infantil", img: "infantil.webp", icon: "child-reaching", tag: "Berçário à pré-escola", pos: "center 30%",
    title: "Educação Infantil",
    p: "A fase das primeiras descobertas. Acolhemos cada criança com afeto e criamos um ambiente seguro onde aprender é, antes de tudo, brincar, explorar e se sentir amada.",
    metodo: [
      ["Aprender brincando", "O brincar é a linguagem da infância e o caminho do aprendizado."],
      ["Proposta participativa (BNCC)", "Projetos a partir dos interesses da criança, com o sistema ProRaiz."],
      ["Inglês desde o Maternal 1", "No período da tarde, de forma lúdica e interdisciplinar."],
    ],
    chipsLabel: "Especializadas · turno da tarde",
    chips: ["Musicalização", "Educação Física", "Capoeira", "Inglês"],
    stats: [["0–5", "anos"], ["Tarde", "13h–18h30"], ["Contraturno", "opcional"]],
  },
  {
    key: "fundamental", img: "fundamental-home.webp", icon: "book", tag: "Anos iniciais", pos: "center 30%",
    title: "Ensino Fundamental",
    p: "O momento de construir autonomia e pensamento crítico. Unimos base sólida e aprendizagem ativa para que cada aluno cresça curioso, confiante e preparado para os próximos passos.",
    metodo: [
      ["Aprendizagem ativa", "O aluno no centro: investiga, questiona e constrói o conhecimento."],
      ["Pensamento crítico", "Projetos que desenvolvem raciocínio, leitura de mundo e argumentação."],
      ["Contraturno opcional", "Reforço escolar e oficinas no turno da manhã, se a família quiser."],
    ],
    chipsLabel: "Contraturno do Fundamental",
    chips: ["Artes Circenses", "Libras", "Reforço Escolar"],
    stats: [["Anos", "iniciais"], ["Tarde", "13h–18h30"], ["Contraturno", "opcional"]],
  },
  {
    key: "contraturno", img: "seg-contraturno.webp", icon: "clock|r", tag: "Turno da manhã", pos: "center 28%",
    title: "Contraturno",
    p: "No turno da manhã, cada dia é uma nova experiência. Oficinas diferenciadas ampliam o aprender de forma leve, com tempo também para o brincar livre e a alimentação cuidada.",
    metodo: [
      ["Uma oficina por dia", "De segunda a sexta, uma vivência diferente para cada manhã."],
      ["Rotina equilibrada", "Oficinas, brincar livre, alimentação e descanso em harmonia."],
      ["Aprender com leveza", "Experiências que estimulam talentos sem peso de conteúdo."],
    ],
    chipsLabel: "Oficinas da semana",
    chips: ["Libras", "Educação Socioemocional", "Culinária Afetiva", "Educação Ambiental"],
    stats: [["Manhã", "7h–12h45"], ["1 oficina", "por dia"], ["Almoço", "incluso"]],
  },
];

function Segment({ s, flip }: { s: Seg; flip: boolean }) {
  const contact = useContact();
  return (
    <div className={"feature-row reveal" + (flip ? " flip" : "")}>
      <div className="fr-media">
        <img src={asset(s.img)} alt={s.title} decoding="async" style={s.pos ? { objectPosition: s.pos } : undefined} />
        <span className="fr-tag"><span className="dot"></span>{s.tag}</span>
      </div>
      <div className="fr-body">
        <span className="eyebrow">Segmento</span>
        <h3>{s.title}</h3>
        <p>{s.p}</p>
        <div className="cda-list">
          {s.metodo.map(([t, d], i) => (
            <div className="li" key={i}>
              <div className={"li-ic" + (i === 1 ? " gold" : "")}><Icon name="check" size={12} /></div>
              <div><strong>{t}</strong><span>{d}</span></div>
            </div>
          ))}
        </div>
        <span className="seg-chips-label">{s.chipsLabel}</span>
        <div className="seg-chips">
          {s.chips.map((c, i) => <span className="seg-chip" key={i}>{c}</span>)}
        </div>
        <div className="mini-stats">
          {s.stats.map(([a, b], i) => (
            <div className="mini-stat" key={i}><strong>{a}</strong><span>{b}</span></div>
          ))}
        </div>
        <div className="fr-cta" style={{ display: "none" }}>
          <button className="primary-btn" onClick={contact}>Agendar uma visita</button>
        </div>
      </div>
    </div>
  );
}

export default function Segmentos() {
  const contact = useContact();
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Nossos segmentos</span>
        <h1>Caminhos de aprendizado para cada <span className="script">fase da infância.</span></h1>
        <p>Da descoberta aos novos desafios, cada segmento acompanha o desenvolvimento da criança com acolhimento, propósito e experiências que despertam o aprender.</p>
      </section>

      {SEGS.map((s, i) => <Segment key={s.key} s={s} flip={i % 2 === 1} />)}

      <div className="cta-band reveal">
        <h2>Venha conhecer a CDA de perto.</h2>
        <p>Agende uma visita e sinta o acolhimento da nossa escola — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/vivencias"><Icon name="arrow-right" size={15} /> Ver as vivências</Link>
        </div>
      </div>
    </Layout>
  );
}
