import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/blocks";
import { usePageContent, section } from "../lib/content";
import { VIV_TARDE, VIV_MANHA, VIV_EXTRAS, imgUrl, type Viv } from "../lib/listas";
import { VIV_TARDE_HEAD, VIV_MANHA_HEAD, VIV_EXTRAS_HEAD, VIV_CTA, type Bloco } from "../lib/textos";

type Grupo = { head: Bloco; itens: Viv[] };

function VivCard({ v }: { v: Viv }) {
  const src = imgUrl(v.img);
  return (
    <div className="viv-card">
      {src ? (
        <img src={src} alt={v.t} decoding="async" style={v.pos ? { objectPosition: v.pos } : undefined} />
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
  const { sec } = usePageContent("vivencias");
  const cta = section<Bloco>(sec, "cta", VIV_CTA);
  const GRUPOS: Grupo[] = [
    { head: section<Bloco>(sec, "grupo_tarde_head", VIV_TARDE_HEAD), itens: section<Viv[]>(sec, "grupo_tarde", VIV_TARDE) },
    { head: section<Bloco>(sec, "grupo_manha_head", VIV_MANHA_HEAD), itens: section<Viv[]>(sec, "grupo_manha", VIV_MANHA) },
    { head: section<Bloco>(sec, "grupo_extras_head", VIV_EXTRAS_HEAD), itens: section<Viv[]>(sec, "grupo_extras", VIV_EXTRAS) },
  ];
  return (
    <Layout>
      <PageHero pagina="vivencias" />

      {GRUPOS.map((g, gi) => (
        <div className="cda-panel reveal viv-group" key={gi}>
          <div className="viv-group-head">
            <span className="eyebrow">{g.head.eyebrow}</span>
            <h2>{g.head.titulo}</h2>
            <p>{g.head.p1}</p>
          </div>
          <div className="viv-grid" style={{ ["--cols" as string]: g.itens.length }}>
            {g.itens.map((v, i) => <VivCard key={i} v={v} />)}
          </div>
        </div>
      ))}

      <CtaBand b={cta}>
        <button className="btn-white" onClick={() => contact("vivencias_cta")}><Icon name="calendar-check" size={16} /> {cta.btn || "Agendar visita"}</button>
        <Link className="btn-ghost" to="/espacos"><Icon name="arrow-right" size={15} /> Conhecer os espaços</Link>
      </CtaBand>
    </Layout>
  );
}
