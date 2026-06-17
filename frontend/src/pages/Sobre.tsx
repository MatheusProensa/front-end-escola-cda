import { Link } from "react-router-dom";
import { Icon, Layout, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { SOBRE_TIMELINE_DEFAULT, type GalFoto } from "../lib/galeria";
import { SOBRE_VALORES, type Valor } from "../lib/listas";

export default function Sobre() {
  usePageMeta("Sobre a Escola CDA — 15 anos de história em Santa Maria/RS", "Há 15 anos sonhando junto com as famílias. Conheça a história, os valores e a proposta educacional da Escola CDA.");
  const { sec } = usePageContent("sobre");
  const tl = section<GalFoto[]>(sec, "timeline", SOBRE_TIMELINE_DEFAULT);
  const valores = section<Valor[]>(sec, "valores", SOBRE_VALORES);
  return (
    <Layout>
      <PageHero pagina="sobre" />

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={asset("nossa-historia.webp")} alt="Equipe da Escola CDA" decoding="async" style={{ objectPosition: "center 35%" }} />
          <span className="fr-tag"><span className="dot"></span>Nossa história</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Quem somos</span>
          <h3>Uma história construída com afeto</h3>
          <p>Tudo começou como "Carinha de Anjo" — um lugar pensado para acolher cada criança com afeto, segurança e propósito, ao lado das famílias. Em 15 anos nos tornamos a Escola CDA: crescemos em espaços, vivências e estrutura, mas mantivemos intacto o que nos move — o cuidado humano com a infância.</p>
          <p>Acreditamos que aprender acontece com escuta, vínculo e experiências que marcam. É assim, todos os dias, que transformamos vidas.</p>
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">15 anos de caminhada</span><h2>Nossa linha do tempo</h2><p>De "Carinha de Anjo" à Escola CDA — cada fase carregou o mesmo cuidado com a infância.</p></div>
        <div className="tl-hint"><i className="fa-solid fa-arrow-right-long"></i> Arraste para percorrer os 15 anos</div>
        <div className="tl-track">
          {tl.map((f, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-photo">
                <span className="tl-num">{i + 1}</span>
                <img src={f.url} alt={f.descricao} loading="lazy" decoding="async" />
              </div>
              <div className="tl-rail"><span className="tl-dot"></span></div>
              <div className="tl-cap">{f.descricao}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cda-panel reveal">
        <div className="sec-head"><span className="eyebrow">No que acreditamos</span><h2>Valores que guiam cada dia</h2></div>
        <div className="valores">
          {valores.map((v, i) => (
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
          <img src={asset("alimentacao.webp")} alt="Refeitório da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>Alimentação saudável</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">Comer bem também é cuidar</span>
          <h3>Comida de verdade, feita com carinho</h3>
          <p>Comida de verdade, feita na escola e com acompanhamento nutricional. Sem industrializados — priorizamos alimentos naturais e o que colhemos na nossa própria horta.</p>
          <div className="cda-list">
            <div className="li"><div className="li-ic"><Icon name="utensils" size={12} /></div><div><strong>Refeições ao longo do dia</strong><span>Fruta e almoço pela manhã; fruta e lanche à tarde. No Ensino Fundamental, o lanche.</span></div></div>
            <div className="li"><div className="li-ic gold"><Icon name="leaf" size={12} /></div><div><strong>Da horta para a mesa</strong><span>Parte das hortaliças e temperos vem da nossa própria horta.</span></div></div>
            <div className="li"><div className="li-ic"><Icon name="ban" size={12} /></div><div><strong>Sem industrializados</strong><span>Receitas feitas na escola; nos berçários, sem sal e açúcar.</span></div></div>
          </div>
        </div>
      </div>

      <div className="cta-band reveal">
        <h2>Venha fazer parte da nossa história</h2>
        <p>Agende uma visita e descubra por que tantas famílias confiam na CDA há 15 anos.</p>
        <div className="cta-actions">
          <Link className="btn-white" to="/matriculas"><Icon name="calendar-check" size={16} /> Quero conhecer</Link>
          <Link className="btn-ghost" to="/segmentos"><Icon name="arrow-right" size={15} /> Ver os segmentos</Link>
        </div>
      </div>
    </Layout>
  );
}
