import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { usePageContent, section } from "../lib/content";
import { VIV_TARDE, VIV_MANHA, VIV_EXTRAS, imgUrl, type Viv } from "../lib/listas";

type Grupo = { eyebrow: string; titulo: string; intro: string; itens: Viv[] };

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
  const GRUPOS: Grupo[] = [
    { eyebrow: "Turno da tarde", titulo: "Especializadas", intro: "Aulas que fazem parte da rotina e ampliam o repertório de corpo, ritmo e movimento.", itens: section<Viv[]>(sec, "grupo_tarde", VIV_TARDE) },
    { eyebrow: "Turno da manhã", titulo: "Oficinas", intro: "No contraturno, oficinas que despertam talentos, valores e novas descobertas a cada dia.", itens: section<Viv[]>(sec, "grupo_manha", VIV_MANHA) },
    { eyebrow: "Parcerias da escola", titulo: "Aulas extras", intro: "Atividades opcionais em parceria, para a família escolher o que mais combina com a criança.", itens: section<Viv[]>(sec, "grupo_extras", VIV_EXTRAS) },
  ];
  return (
    <Layout>
      <PageHero pagina="vivencias" />

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
        <h2>Toda criança tem um talento esperando para florescer</h2>
        <p>Venha ver de perto como as vivências da CDA despertam o melhor de cada aluno.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/espacos"><Icon name="arrow-right" size={15} /> Conhecer os espaços</Link>
        </div>
      </div>
    </Layout>
  );
}
