import { Link } from "react-router-dom";
import { Icon, Layout, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { usePageContent, section } from "../lib/content";
import { SOBRE_TIMELINE_DEFAULT, type GalFoto } from "../lib/galeria";
import { SOBRE_VALORES, type Valor, type Lista } from "../lib/listas";
import { SOBRE_HISTORIA, SOBRE_ALIMENTACAO, SOBRE_ALIMENTACAO_ITENS, type Bloco } from "../lib/textos";

const ALIM_ICONS = ["utensils", "leaf", "ban"];

export default function Sobre() {
  usePageMeta("Sobre a Escola CDA — 15 anos de história em Santa Maria/RS", "Há 15 anos sonhando junto com as famílias. Conheça a história, os valores e a proposta educacional da Escola CDA.");
  const { sec } = usePageContent("sobre");
  const tl = section<GalFoto[]>(sec, "timeline", SOBRE_TIMELINE_DEFAULT);
  const valores = section<Valor[]>(sec, "valores", SOBRE_VALORES);
  const historia = section<Bloco>(sec, "historia", SOBRE_HISTORIA);
  const alimentacao = section<Bloco>(sec, "alimentacao", SOBRE_ALIMENTACAO);
  const alimItens = section<Lista[]>(sec, "alimentacao_itens", SOBRE_ALIMENTACAO_ITENS);
  return (
    <Layout>
      <PageHero pagina="sobre" />

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={historia.img} alt="Equipe da Escola CDA" decoding="async" style={{ objectPosition: "center 35%" }} />
          <span className="fr-tag"><span className="dot"></span>{historia.tag}</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">{historia.eyebrow}</span>
          <h3>{historia.titulo}</h3>
          <p>{historia.p1}</p>
          {historia.p2 && <p>{historia.p2}</p>}
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
          <img src={alimentacao.img} alt="Refeitório da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>{alimentacao.tag}</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">{alimentacao.eyebrow}</span>
          <h3>{alimentacao.titulo}</h3>
          <p>{alimentacao.p1}</p>
          <div className="cda-list">
            {alimItens.map((it, i) => (
              <div className="li" key={i}><div className={"li-ic" + (i % 2 ? " gold" : "")}><Icon name={ALIM_ICONS[i] || "check"} size={12} /></div><div><strong>{it.t}</strong><span>{it.d}</span></div></div>
            ))}
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
