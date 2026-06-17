import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { MET_DIMENSOES, MET_INFANTIL, MET_FUNDAMENTAL, MET_PILARES5, type Valor, type Lista } from "../lib/listas";

export default function Metodologia() {
  usePageMeta("Metodologia ProRaiz — Escola CDA, Santa Maria/RS", "A CDA adota a metodologia ProRaiz: formação integral que une aprendizado acadêmico e desenvolvimento socioemocional, alinhada à BNCC.");
  const contact = useContact();
  const { sec } = usePageContent("metodologia");
  const PILARES = section<Valor[]>(sec, "dimensoes", MET_DIMENSOES);
  const INFANTIL = section<Lista[]>(sec, "infantil", MET_INFANTIL);
  const FUNDAMENTAL = section<Lista[]>(sec, "fundamental", MET_FUNDAMENTAL);
  const PILARES5 = section<Valor[]>(sec, "pilares5", MET_PILARES5);
  return (
    <Layout>
      <PageHero pagina="metodologia" />

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={asset("sala-aula.webp")} alt="Sala de aula da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>Aprender por inteiro</span>
        </div>
        <div className="fr-body">
          <img className="sistema-logo" style={{ margin: "0 0 16px" }} src={asset("proraiz-logo.webp")} alt="Sistema ProRaiz" />
          <span className="eyebrow">Mais que conteúdo</span>
          <h3>Um ensino que forma o intelecto, a cidadania e o emocional</h3>
          <p>Trabalhamos habilidades, valores e competências que acompanham nossos alunos em cada escolha, relação e desafio da vida. É a integração entre emoção, razão e ação — uma jornada educativa com propósito e sentido.</p>
        </div>
      </div>

      <div className="cda-panel tight reveal">
        <div className="sec-head"><span className="eyebrow">Dimensões do desenvolvimento</span><h2>O que cultivamos em cada criança</h2></div>
        <div className="valores">
          {PILARES.map((v, i) => (
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
          <img src={asset("infantil-met.webp")} alt="Educação Infantil na CDA" decoding="async" style={{ objectPosition: "center 45%" }} />
          <span className="fr-tag"><span className="dot"></span>Educação Infantil</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Educação Infantil</span>
          <h3>Descobrir, sentir e se expressar</h3>
          <p>Na Educação Infantil, a proposta do ProRaiz é <strong>baseada em vivências</strong>, como recomenda a BNCC: a criança aprende por meio de interações e brincadeiras, vivendo experiências com significado e propósito.</p>
          <div className="cda-list">
            {INFANTIL.map((it, i) => (
              <div className="li" key={i}><div className={"li-ic" + (i % 2 ? " gold" : "")}><Icon name="check" size={11} /></div><div><strong>{it.t}</strong><span>{it.d}</span></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="feature-row flip reveal">
        <div className="fr-media">
          <img src={asset("fundamental-met.webp")} alt="Ensino Fundamental na CDA" decoding="async" style={{ objectPosition: "center 40%" }} />
          <span className="fr-tag"><span className="dot"></span>Ensino Fundamental</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Ensino Fundamental</span>
          <h3>Pensar, criar e transformar</h3>
          <p>No Ensino Fundamental, o conhecimento se constrói <strong>por meio de trocas</strong> — com os colegas, com o mundo e com os objetos de aprendizagem. Partindo do que o aluno já sabe, o aprendizado se torna relevante e aplicável à vida.</p>
          <div className="cda-list">
            {FUNDAMENTAL.map((it, i) => (
              <div className="li" key={i}><div className={"li-ic" + (i % 2 ? " gold" : "")}><Icon name="check" size={11} /></div><div><strong>{it.t}</strong><span>{it.d}</span></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">Tecnologia no Ensino Fundamental</span><h2>Aprender também é <span style={{ color: "#1b84ff" }}>conectar-se</span></h2><p>No Ensino Fundamental, unimos o ensino de qualidade à tecnologia: os alunos usam <strong>notebooks</strong> em atividades pedagógicas que tornam o aprendizado mais ativo, interativo e conectado ao mundo de hoje — sempre com mediação dos professores.</p></div>
        <div className="tec-grid">
          <div className="tec-photo"><img src={asset("tec-1.webp")} alt="Alunos usando notebook em sala" loading="lazy" decoding="async" /></div>
          <div className="tec-photo"><img src={asset("tec-4.webp")} alt="Turma do Fundamental com notebooks" loading="lazy" decoding="async" /></div>
          <div className="tec-photo"><img src={asset("tec-3.webp")} alt="Alunas aprendendo no computador" loading="lazy" decoding="async" /></div>
          <div className="tec-photo"><img src={asset("tec-2.webp")} alt="Atividade pedagógica no notebook" loading="lazy" decoding="async" /></div>
        </div>
        <div className="sistema-chips">
          <span className="seg-chip"><Icon name="laptop" size={11} /> Notebooks em sala</span>
          <span className="seg-chip"><Icon name="gamepad" size={11} /> Aprendizagem interativa</span>
          <span className="seg-chip"><Icon name="chalkboard-user" size={11} /> Mediação do professor</span>
          <span className="seg-chip"><Icon name="globe" size={11} /> Conexão com o mundo digital</span>
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">Material didático</span><h2>Materiais de excelência, alinhados à BNCC</h2><p>A metodologia ProRaiz conta com materiais exclusivos e atualizados, desenvolvidos por professores atuantes para estimular o aprendizado significativo e o protagonismo do aluno.</p></div>
        <div className="sistema-chips">
          <span className="seg-chip"><Icon name="comment" size={11} /> Linguagem acessível e envolvente</span>
          <span className="seg-chip"><Icon name="globe" size={11} /> Conteúdos conectados à realidade</span>
          <span className="seg-chip"><Icon name="pen-ruler" size={11} /> Atividades práticas e reflexivas</span>
          <span className="seg-chip"><Icon name="tablet-screen-button" size={11} /> Recursos digitais interativos</span>
          <span className="seg-chip"><Icon name="certificate" size={11} /> 100% alinhado à BNCC</span>
        </div>
      </div>

      <div className="cda-panel tight tinted reveal">
        <div className="sec-head"><span className="eyebrow">Pilares que sustentam a proposta</span><h2>A base de tudo que fazemos</h2></div>
        <div className="valores cols-5">
          {PILARES5.map((v, i) => (
            <div className={"valor" + (v.gold ? " gold" : "")} key={i}>
              <div className="v-ic"><Icon name={v.icon} color="#fff" size={22} /></div>
              <h3>{v.t}</h3>
              <p>{v.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Mais que uma metodologia, um compromisso com a vida</h2>
        <p>Na CDA, o ProRaiz fortalece nossa missão de formar alunos preparados para aprender, conviver, escolher e transformar o mundo com consciência e empatia.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Conheça nossa escola</button>
          <Link className="btn-ghost" to="/segmentos"><Icon name="arrow-right" size={15} /> Ver os segmentos</Link>
        </div>
      </div>
    </Layout>
  );
}
