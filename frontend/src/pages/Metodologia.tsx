import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { SecHead, CtaBand } from "../components/blocks";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { MET_DIMENSOES, MET_INFANTIL, MET_FUNDAMENTAL, MET_PILARES5, MET_TEC_CHIPS, MET_MATERIAL_CHIPS, type Valor, type Lista, type Chip } from "../lib/listas";
import { MET_INTRO, MET_INFANTIL_BLOCO, MET_FUNDAMENTAL_BLOCO, MET_DIMENSOES_HEAD, MET_TEC_HEAD, MET_MATERIAL_HEAD, MET_PILARES5_HEAD, MET_CTA, type Bloco } from "../lib/textos";
import { MET_TEC_FOTOS, type GalFoto } from "../lib/galeria";

export default function Metodologia() {
  usePageMeta("Metodologia ProRaiz — Escola CDA, Santa Maria/RS", "A CDA adota a metodologia ProRaiz: formação integral que une aprendizado acadêmico e desenvolvimento socioemocional, alinhada à BNCC.");
  const contact = useContact();
  const { sec } = usePageContent("metodologia");
  const PILARES = section<Valor[]>(sec, "dimensoes", MET_DIMENSOES);
  const INFANTIL = section<Lista[]>(sec, "infantil", MET_INFANTIL);
  const FUNDAMENTAL = section<Lista[]>(sec, "fundamental", MET_FUNDAMENTAL);
  const PILARES5 = section<Valor[]>(sec, "pilares5", MET_PILARES5);
  const intro = section<Bloco>(sec, "intro_bloco", MET_INTRO);
  const infBloco = section<Bloco>(sec, "infantil_bloco", MET_INFANTIL_BLOCO);
  const fundBloco = section<Bloco>(sec, "fundamental_bloco", MET_FUNDAMENTAL_BLOCO);
  const dimHead = section<Bloco>(sec, "dimensoes_head", MET_DIMENSOES_HEAD);
  const tecHead = section<Bloco>(sec, "tec_head", MET_TEC_HEAD);
  const tecFotos = section<GalFoto[]>(sec, "tec_fotos", MET_TEC_FOTOS);
  const tecChips = section<Chip[]>(sec, "tec_chips", MET_TEC_CHIPS);
  const materialHead = section<Bloco>(sec, "material_head", MET_MATERIAL_HEAD);
  const materialChips = section<Chip[]>(sec, "material_chips", MET_MATERIAL_CHIPS);
  const pilares5Head = section<Bloco>(sec, "pilares5_head", MET_PILARES5_HEAD);
  const cta = section<Bloco>(sec, "cta", MET_CTA);
  return (
    <Layout>
      <PageHero pagina="metodologia" sec={sec} />

      <div className="feature-row reveal">
        <div className="fr-media">
          <img src={intro.img} alt="Sala de aula da Escola CDA" decoding="async" />
          <span className="fr-tag"><span className="dot"></span>{intro.tag}</span>
        </div>
        <div className="fr-body">
          <img className="sistema-logo" style={{ margin: "0 0 16px" }} src={asset("proraiz-logo.webp")} alt="Sistema ProRaiz" />
          <span className="eyebrow">{intro.eyebrow}</span>
          <h3>{intro.titulo}</h3>
          <p>{intro.p1}</p>
        </div>
      </div>

      <div className="cda-panel tight reveal">
        <SecHead b={dimHead} />
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
          <img src={infBloco.img} alt="Educação Infantil na CDA" decoding="async" style={{ objectPosition: "center 45%" }} />
          <span className="fr-tag"><span className="dot"></span>{infBloco.tag}</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">{infBloco.eyebrow}</span>
          <h3>{infBloco.titulo}</h3>
          <p>{infBloco.p1}</p>
          <div className="cda-list">
            {INFANTIL.map((it, i) => (
              <div className="li" key={i}><div className={"li-ic" + (i % 2 ? " gold" : "")}><Icon name="check" size={11} /></div><div><strong>{it.t}</strong><span>{it.d}</span></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="feature-row flip reveal">
        <div className="fr-media">
          <img src={fundBloco.img} alt="Ensino Fundamental na CDA" decoding="async" style={{ objectPosition: "center 40%" }} />
          <span className="fr-tag"><span className="dot"></span>{fundBloco.tag}</span>
        </div>
        <div className="fr-body">
          <span className="eyebrow">{fundBloco.eyebrow}</span>
          <h3>{fundBloco.titulo}</h3>
          <p>{fundBloco.p1}</p>
          <div className="cda-list">
            {FUNDAMENTAL.map((it, i) => (
              <div className="li" key={i}><div className={"li-ic" + (i % 2 ? " gold" : "")}><Icon name="check" size={11} /></div><div><strong>{it.t}</strong><span>{it.d}</span></div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="cda-panel reveal">
        <SecHead b={tecHead} />
        <div className="tec-grid">
          {tecFotos.map((f, i) => (
            <div className="tec-photo" key={i}><img src={f.url} alt={f.titulo} loading="lazy" decoding="async" /></div>
          ))}
        </div>
        <div className="sistema-chips">
          {tecChips.map((c, i) => (
            <span className="seg-chip" key={i}><Icon name={c.icon} size={11} /> {c.t}</span>
          ))}
        </div>
      </div>

      <div className="cda-panel reveal">
        <SecHead b={materialHead} />
        <div className="sistema-chips">
          {materialChips.map((c, i) => (
            <span className="seg-chip" key={i}><Icon name={c.icon} size={11} /> {c.t}</span>
          ))}
        </div>
      </div>

      <div className="cda-panel tight tinted reveal">
        <SecHead b={pilares5Head} />
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

      <CtaBand b={cta}>
        <button className="btn-white" onClick={() => contact("metodologia")}><Icon name="calendar-check" size={16} /> {cta.btn || "Conheça nossa escola"}</button>
        <Link className="btn-ghost" to="/segmentos"><Icon name="arrow-right" size={15} /> Ver os segmentos</Link>
      </CtaBand>
    </Layout>
  );
}
