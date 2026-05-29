import { Link } from "react-router-dom";
import { Icon, Layout } from "../components/site";
import { asset } from "../lib/assets";

const VALORES = [
  { icon: "hand-holding-heart", t: "Acolhimento", p: "Cada criança é recebida com afeto, escuta e respeito ao seu tempo.", gold: false },
  { icon: "seedling", t: "Respeito à infância", p: "Valorizamos o brincar e o descobrir como caminhos legítimos de aprender.", gold: true },
  { icon: "brain", t: "Desenvolvimento integral", p: "Cuidamos do cognitivo, do emocional e do social, de forma equilibrada.", gold: false },
  { icon: "user-group", t: "Parceria com a família", p: "Escola e família caminham juntas, em diálogo aberto e constante.", gold: true },
  { icon: "lightbulb", t: "Autonomia", p: "Incentivamos a confiança, a responsabilidade e a iniciativa.", gold: false },
  { icon: "star", t: "Propósito", p: "Educamos para a vida, com sentido, valores e olhar para o futuro.", gold: true },
];

const TL: [string, string][] = [
  ["Onde tudo começou.", "timeline/t01.webp"],
  ["Os primeiros passos, com propósito e dedicação.", "timeline/t02.webp"],
  ["Um novo olhar, novos caminhos.", "timeline/t03.webp"],
  ["Histórias que ganham vida nas páginas e nos encontros.", "timeline/t04.webp"],
  ["Aprender também é brincar, viver e explorar.", "timeline/t05.webp"],
  ["Experiências que ampliam o aprender.", "timeline/t06.webp"],
  ["A emoção da primeira formatura.", "timeline/t07.webp"],
  ["Crescimento que abre novos horizontes.", "timeline/t08.webp"],
  ["Novas experiências e novas possibilidades.", "timeline/t09.webp"],
  ["Seguimos crescendo com o mesmo propósito.", "timeline/t10.webp"],
  ["Desafios que nos fizeram reinventar.", "timeline/t11.webp"],
  ["Mesmo distantes, seguimos presentes.", "timeline/t12.webp"],
  ["Novos projetos, novas formas de aprender.", "timeline/t13.webp"],
  ["Um novo ciclo começa a ganhar forma.", "timeline/t14.webp"],
  ["Crescemos em estrutura e serviços — e fortalecemos nossa essência.", "timeline/t15.webp"],
];

export default function Sobre() {
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Sobre a escola</span>
        <h1>Há 15 anos sonhando junto com as <span className="script">famílias.</span></h1>
        <p>Mais que uma escola, somos uma comunidade que acredita na educação como um ato de afeto, propósito e parceria — para formar crianças felizes e preparadas para a vida.</p>
      </section>

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={asset("giovana.webp")} alt="Criança da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>Nossa história</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Quem somos</span>
          <h3>Uma história construída com afeto.</h3>
          <p>Tudo começou como "Carinha de Anjo" — um lugar pensado para acolher cada criança com afeto, segurança e propósito, ao lado das famílias. Em 15 anos nos tornamos a Escola CDA: crescemos em espaços, vivências e estrutura, mas mantivemos intacto o que nos move — o cuidado humano com a infância.</p>
          <p>Acreditamos que aprender acontece com escuta, vínculo e experiências que marcam. É assim, todos os dias, que transformamos vidas.</p>
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">15 anos de caminhada</span><h2>Nossa linha do tempo.</h2><p>De "Carinha de Anjo" à Escola CDA — cada fase carregou o mesmo cuidado com a infância.</p></div>
        <div className="tl-hint"><i className="fa-solid fa-arrow-right-long"></i> Arraste para percorrer os 15 anos</div>
        <div className="tl-track">
          {TL.map(([cap, img], i) => (
            <div className="tl-item" key={i}>
              <div className="tl-photo">
                <span className="tl-num">{i + 1}</span>
                <img src={asset(img)} alt={cap} loading="lazy" decoding="async" />
              </div>
              <div className="tl-rail"><span className="tl-dot"></span></div>
              <div className="tl-cap">{cap}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">No que acreditamos</span><h2>Valores que guiam cada dia.</h2></div>
        <div className="valores">
          {VALORES.map((v, i) => (
            <div className={"valor" + (v.gold ? " gold" : "")} key={i}>
              <div className="v-ic"><Icon name={v.icon} color="#fff" size={22} /></div>
              <h3>{v.t}</h3>
              <p>{v.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={asset("refeitorio.webp")} alt="Refeitório da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>Alimentação saudável</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Comer bem também é cuidar</span>
          <h3>Comida de verdade, feita com carinho.</h3>
          <p>Quatro refeições por dia, balanceadas e com acompanhamento nutricional. Sem industrializados — tudo preparado na escola, priorizando alimentos naturais e o que colhemos na nossa própria horta.</p>
          <div className="cda-list">
            <div className="li"><div className="li-ic"><Icon name="utensils" size={12} /></div><div><strong>4 refeições por dia</strong><span>Cardápio completo e balanceado, com nutricionista.</span></div></div>
            <div className="li"><div className="li-ic gold"><Icon name="leaf" size={12} /></div><div><strong>Da horta para a mesa</strong><span>Alimentos orgânicos cultivados na própria escola.</span></div></div>
            <div className="li"><div className="li-ic"><Icon name="ban" size={12} /></div><div><strong>Sem industrializados</strong><span>Receitas feitas na escola; nos berçários, sem sal e açúcar.</span></div></div>
          </div>
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">Por que a CDA</span><h2>Diferenciais que fazem a diferença.</h2></div>
        <div className="valores cols-4">
          <div className="valor"><div className="v-ic"><Icon name="seedling" color="#fff" size={22} /></div><h3>Sistema ProRaiz</h3><p>Ensino alinhado à BNCC, crítico, multidisciplinar e cheio de propósito.</p></div>
          <div className="valor gold"><div className="v-ic"><Icon name="person-rays" color="#fff" size={22} /></div><h3>Ballet · Umbigo de Bruxa</h3><p>Parceria com a escola de ballet, com profissionais capacitados e experientes.</p></div>
          <div className="valor"><div className="v-ic"><Icon name="hand-fist" color="#fff" size={22} /></div><h3>Jiu-Jitsu</h3><p>Parceria que desenvolve disciplina, respeito, coordenação e autoconfiança.</p></div>
          <div className="valor gold"><div className="v-ic"><Icon name="mobile-screen-button" color="#fff" size={22} /></div><h3>App Diário Escola</h3><p>Comunicação aberta e diária entre escola e família, na palma da mão.</p></div>
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Venha fazer parte da nossa história.</h2>
        <p>Agende uma visita e descubra por que tantas famílias confiam na CDA há 15 anos.</p>
        <div className="cta-actions">
          <Link className="btn-white" to="/matriculas"><Icon name="calendar-check" size={16} /> Quero conhecer</Link>
          <Link className="btn-ghost" to="/segmentos"><Icon name="arrow-right" size={15} /> Ver os segmentos</Link>
        </div>
      </div>
    </Layout>
  );
}
