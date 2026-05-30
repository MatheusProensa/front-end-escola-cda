import { useNavigate } from "react-router-dom";
import { Icon, Navbar, Footer, useReveal, useContact } from "../components/site";
import { asset } from "../lib/assets";

/* ───────────── Hero ───────────── */
function Hero() {
  const contact = useContact();
  const navigate = useNavigate();
  return (
    <section className="hero" id="hero">
      <Navbar />
      <div className="hero-content">
        <div className="hero-left">
          <span className="mini-title">HÁ 15 ANOS</span>
          <h1>Família e escola<span className="script-line"> sonham juntas.</span></h1>
          <p>
            Acreditamos que a educação vai muito além do ensino.<br />
            É sobre <strong>acolher</strong>, <strong>inspirar</strong> e <strong>transformar vidas</strong><br />
            para construir um futuro melhor.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={contact}>Falar com a escola</button>
            <button className="secondary-btn" onClick={() => navigate("/sobre")}>Conhecer a escola</button>
          </div>
        </div>
      </div>
      <img src={asset("bg-home.webp")} alt="Crianças da Escola CDA fazendo um coração com as mãos" className="hero-bg" fetchPriority="high" decoding="async" />
    </section>
  );
}

/* ───────────── Pilares ───────────── */
function Pillars() {
  const items = [
    { icon: "hand-holding-heart", tone: "blue", t: ["Acolhimento", "que abraça"], p: "Ambiente seguro, afetivo e cheio de empatia." },
    { icon: "graduation-cap", tone: "gold", t: ["Ensino que", "desenvolve"], p: "Aprendizagem significativa para a vida toda." },
    { icon: "star", tone: "blue", t: ["Valores que", "inspiram"], p: "Incentivamos autonomia, respeito e responsabilidade." },
    { icon: "handshake-angle", tone: "gold", t: ["Parceria que", "transforma"], p: "Família e escola juntas no mesmo propósito." },
  ];
  return (
    <section className="cards reveal">
      {items.map((it, i) => (
        <div className="card" key={i}>
          <div className="card-ic-wrap">
            <span className="card-halo"></span>
            <div className={"card-icon " + it.tone}><Icon name={it.icon} size={28} /></div>
          </div>
          <div className="card-text">
            <h3>{it.t[0]}<br />{it.t[1]}</h3>
            <p>{it.p}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ───────────── Proposito ───────────── */
function Proposito() {
  const navigate = useNavigate();
  return (
    <section className="proposito reveal" id="proposito">
      <div className="proposito-left">
        <span className="proposito-mini">EDUCAÇÃO COM PROPÓSITO</span>
        <h2>Um jeito de aprender<br />que respeita a infância.</h2>
        <p>Aprender acontece com afeto, escuta e vivências significativas. Valorizamos a infância como uma fase de descobertas, autonomia e construção de vínculos.</p>
        <button className="proposito-button" onClick={() => navigate("/sobre")}>Conheça nossa proposta</button>
      </div>
      <div className="proposito-right">
        <img src={asset("giovana.webp")} alt="Criança na escola CDA" decoding="async" />
      </div>
    </section>
  );
}

/* ───────────── Segmentos ───────────── */
function Segmentos() {
  const navigate = useNavigate();
  const segs = [
    { img: "infantil-home.webp", icon: "child-reaching", t: "Educação Infantil", p: "Do berçário à pré-escola, acolhemos cada conquista com amor e estimulamos o aprender brincando.", to: "/segmentos", pos: "center 35%" },
    { img: "fundamental-livro.webp", icon: "book", t: "Ensino Fundamental", p: "Anos iniciais com aprendizagem ativa, pensamento crítico e desenvolvimento integral.", to: "/segmentos", pos: "center 24%" },
    { img: "contraturno-home.webp", icon: "clock|r", t: "Contraturno", p: "Acolhimento no turno da manhã com rotina equilibrada e oficinas que ampliam o aprender.", to: "/segmentos", pos: "center 18%" },
    { img: "oficinas.webp", icon: "paintbrush", t: "Oficinas", p: "Libras, Educação Socioemocional, Culinária e Educação Ambiental — no contraturno.", to: "/vivencias" },
  ];
  return (
    <section className="segmentos reveal" id="segmentos">
      <div className="segmentos-header">
        <div>
          <span className="segmentos-mini">NOSSOS SEGMENTOS</span>
          <h2>Caminhos de aprendizado<br />para cada fase da infância.</h2>
        </div>
        <p>Da descoberta aos novos desafios, nossos segmentos acompanham cada fase da infância com acolhimento, propósito e experiências que despertam o aprender.</p>
      </div>
      <div className="segmentos-grid">
        {segs.map((s, i) => (
          <div className="segmento-card" key={i}>
            <img src={asset(s.img)} alt={s.t} decoding="async" style={s.pos ? { objectPosition: s.pos } : undefined} />
            <div className="segmento-overlay">
              <div className="segmento-icon"><Icon name={s.icon} color="#0b82f6" size={20} /></div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <button onClick={() => navigate(s.to)}>Saiba mais</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Vivências ───────────── */
function Vivencias() {
  const navigate = useNavigate();
  const vivs = [
    { img: "musica.webp", icon: "music", c: "#f0b400", t: "Musicalização", p: "Estímulo à sensibilidade, criatividade e expressão através da música.", pos: "center 88%" },
    { img: "capoeira.webp", icon: "hand-fist", c: "#0b82f6", t: "Capoeira", p: "Promove disciplina, respeito, coordenação e consciência corporal.", pos: "center 42%" },
    { img: "ambiental.webp", icon: "leaf", c: "#0b82f6", t: "Ed. Ambiental", p: "Conexão com a natureza para formar cidadãos conscientes e responsáveis.", pos: "" },
    { img: "culinaria.webp", icon: "utensils", c: "#f0b400", t: "Culinária Afetiva", p: "Com a nutricionista: autonomia, saúde e afeto ao aprender com as mãos.", pos: "center 100%" },
    { img: "ingles.webp", icon: "globe", c: "#0b82f6", t: "Proposta Bilíngue", p: "Imersão no inglês desde cedo para formar alunos preparados para o futuro.", pos: "" },
  ];
  return (
    <section className="vivencias reveal" id="vivencias">
      <span className="vivencias-mini">VIVÊNCIAS QUE TRANSFORMAM</span>
      <h2>Experiências que despertam<br />habilidades <span className="script-accent">para a vida.</span></h2>
      <p className="vivencias-sub">Mais do que atividades, vivências que <strong>estimulam talentos</strong>, <strong>desenvolvem competências</strong> e tornam o <strong>aprendizado mais significativo.</strong></p>
      <div className="vivencias-grid">
        {vivs.map((v, i) => (
          <div className="vivencia-card" key={i}>
            <img src={asset(v.img)} alt={v.t} decoding="async" style={v.pos ? { objectPosition: v.pos } : undefined} />
            <div className="vivencia-overlay">
              <div className="vivencia-icon"><Icon name={v.icon} color={v.c} size={18} /></div>
              <h3>{v.t}</h3>
              <p>{v.p}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="vivencias-btn" onClick={() => navigate("/vivencias")}>Conheça todas as nossas vivências →</button>
    </section>
  );
}

/* ───────────── Nosso Espaço ───────────── */
function Espaco() {
  const navigate = useNavigate();
  const contact = useContact();
  const feats = [
    { icon: "shield-halved", t: "Segurança", p: "Ambientes seguros pensados para o bem-estar dos alunos." },
    { icon: "heart", t: "Acolhimento", p: "Espaços que acolhem com carinho e humanização." },
    { icon: "seedling", t: "Natureza", p: "Contato com áreas verdes que despertam curiosidade." },
    { icon: "lightbulb", t: "Descobertas", p: "Lugares que inspiram aprendizagem e novas experiências." },
  ];
  const fotos = ["laboratorio.webp", "horta.webp", "patio.webp", "biblioteca.webp", "refeitorio.webp", "quadra.webp"];
  const labels = ["Laboratório", "Horta", "Pátio", "Biblioteca", "Refeitório", "Quadra"];
  return (
    <section className="espaco reveal" id="espaco">
      <div className="espaco-left">
        <span className="espaco-mini">NOSSO ESPAÇO</span>
        <h2>Ambientes pensados<br />para <span className="azul-accent">acolher, explorar</span><br />e crescer.</h2>
        <p>Cada espaço da CDA é preparado para proporcionar segurança, conforto e experiências que fazem parte do desenvolvimento infantil.</p>
        <div className="espaco-features">
          {feats.map((f, i) => (
            <div className="espaco-feature" key={i}>
              <div className="espaco-feature-icon"><Icon name={f.icon} color="#fff" size={16} /></div>
              <div><strong>{f.t}</strong><span>{f.p}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="espaco-right">
        <div className="espaco-grid">
          {fotos.map((f, i) => (
            <div className="espaco-foto" key={i}>
              <img src={asset(f)} alt={labels[i]} decoding="async" />
              <span className="espaco-label"><span className="espaco-dot"></span>{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="espaco-ver-mais">
        <button className="espaco-ver-mais-btn" onClick={() => navigate("/espacos")}>Conheça todos os nossos espaços →</button>
      </div>
      <div className="espaco-banner">
        <div className="espaco-banner-icon"><Icon name="heart" color="#f0b400" size={22} /></div>
        <div className="espaco-banner-text"><strong>Mais que espaços, criamos ambientes que incentivam o aprender, o brincar e o conviver.</strong></div>
        <div className="espaco-banner-sub"><p>Venha conhecer de perto cada cantinho feito com cuidado para o seu filho.</p></div>
        <button className="espaco-banner-btn" onClick={contact}>Agende uma visita →</button>
      </div>
    </section>
  );
}

/* ───────────── Depoimentos ───────────── */
function Depoimentos() {
  const depos = [
    { txt: "Confiamos na escola CDA para deixar nossa filha desde 1 ano e 3 meses. Hoje a Mariah está com 5 anos e permanecemos fazendo parte da escola. O cuidado e carinho faz toda a diferença, além de uma proposta pedagógica rica e diversificada.", name: "Pais da Mariah B.", ini: "M", heart: false },
    { txt: "Temos plena confiança na escolinha e fico super tranquila enquanto o Otto está na escola. A CDA faz parte do desenvolvimento do nosso filho — e o principal é que ele adora a escola e todos os profissionais que trabalham nela!", name: "Pais do Otto B.", ini: "O", heart: false },
    { txt: "Confiamos plenamente na educação e no cuidado que a CDA oferece. Todo ambiente é pensado no melhor para as crianças, e temos certeza de que a Laura está numa escola capacitada. Só temos a agradecer!", name: "Pais da Laura L.", ini: "L", heart: false },
    { txt: "Confiamos no trabalho da CDA pelo diálogo sempre próximo com a família, pela valorização da brincadeira e dos interesses das crianças.", name: "Pais da Giovanna Z.", ini: "G", heart: false },
    { txt: "Parabéns pelo excelente trabalho que fazem, pelo carinho e amor com que conduzem o dia a dia dos nossos filhos. O resultado é esse: crianças felizes e confiantes para desenvolver a autonomia e suas habilidades!", name: "Família CDA", ini: "", heart: true },
    { txt: "Parabéns pra essa escola que faz parte do início escolar dos meus filhos e que tenho muito carinho e confiança! Indico para todos que conheço. Profissionais sempre atenciosos e dedicados — moram em nosso coração!", name: "Mãe de alunos", ini: "", heart: true },
    { txt: "Parabéns, escola CDA! Dedicação, carinho, respeito e responsabilidade junto a um ensino de qualidade!", name: "Gilmar", ini: "G", heart: false },
    { txt: "Melhor escola — e melhor escolha que fizemos!", name: "Flávia Pedrosa", ini: "F", heart: false },
  ];
  return (
    <section className="depoimentos reveal" id="depoimentos">
      <div className="depo-head">
        <span className="mini-title">O QUE AS FAMÍLIAS DIZEM</span>
        <h2>Histórias de quem confia na CDA.</h2>
        <p>Quem vive a escola todos os dias é quem melhor conta o que somos.</p>
      </div>
      <div className="depo-track">
        {depos.map((d, i) => (
          <figure className="depo-card" key={i}>
            <div className="depo-quote"><Icon name="quote-left" color="#f0b400" size={26} /></div>
            <blockquote>{d.txt}</blockquote>
            <figcaption className="depo-author">
              <span className={"depo-av" + (d.heart ? " heart" : "")}>{d.heart ? <Icon name="heart" color="#fff" size={16} /> : d.ini}</span>
              <strong>{d.name}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Conexão ───────────── */
function Conexao() {
  const feats = [
    { icon: "user-group", t: "Acompanhamento próximo", p: "Olhar individual para cada aluno." },
    { icon: "heart", t: "Diálogo com as famílias", p: "Comunicação aberta, transparente e constante." },
    { icon: "shield-halved", t: "Desenvolvimento integral", p: "Cuidado com o cognitivo, emocional e social." },
    { icon: "star", t: "Vivências que marcam", p: "Experiências que constroem memórias e valores." },
  ];
  return (
    <section className="conexao reveal" id="conexao">
      <div className="conexao-foto"><img src={asset("conexao.webp")} alt="Professora e alunos CDA" decoding="async" /></div>
      <div className="conexao-content">
        <span className="conexao-mini">CONEXÃO QUE TRANSFORMA</span>
        <h2>Educação construída<br />com <span className="conexao-destaque-azul">carinho, escuta</span><br />e <span className="conexao-destaque-azul">presença</span> diária.</h2>
        <p>Acreditamos que a parceria entre escola e família é essencial para que cada criança se desenvolva com segurança, autonomia e confiança.</p>
        <div className="conexao-features">
          {feats.map((f, i) => (
            <div className="conexao-feature" key={i}>
              <div className="conexao-feature-icon"><Icon name={f.icon} color="#fff" size={16} /></div>
              <div><strong>{f.t}</strong><span>{f.p}</span></div>
            </div>
          ))}
        </div>
        <div className="conexao-cta">
          <div className="conexao-seal-ic"><Icon name="heart" color="#f0b400" size={24} /></div>
          <div className="conexao-seal-text">
            <strong>+<span className="count-up" data-target="15">15</span> anos</strong>{" "}
            de história e confiança ao lado das famílias.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useReveal();
  return (
    <div className="app">
      <Hero />
      <Pillars />
      <Proposito />
      <Segmentos />
      <Vivencias />
      <Espaco />
      <Depoimentos />
      <Conexao />
      <Footer />
    </div>
  );
}
