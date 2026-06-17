import { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { SEG_INFANTIL_DEFAULT, SEG_FUNDAMENTAL_DEFAULT, SEG_BERCARIO_DEFAULT, type GalFoto } from "../lib/galeria";

// arrastar com o mouse (drag-to-scroll) no carrossel
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, startX = 0, scroll = 0, moved = false;
    const onDown = (e: PointerEvent) => { down = true; moved = false; startX = e.pageX; scroll = el.scrollLeft; el.classList.add("dragging"); };
    const onMove = (e: PointerEvent) => { if (!down) return; const dx = e.pageX - startX; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = scroll - dx; };
    const onUp = () => { down = false; el.classList.remove("dragging"); };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);
  return ref;
}

function Carrossel({ fotos, alt }: { fotos: GalFoto[]; alt: string }) {
  const ref = useDragScroll();
  return (
    <div className="seg-galeria-track" ref={ref}>
      {fotos.map((f, i) => (
        <div className="seg-galeria-item" key={i}><img src={f.url} alt={f.titulo || alt + " — foto " + (i + 1)} loading="lazy" decoding="async" draggable={false} /></div>
      ))}
    </div>
  );
}

function SegGaleria({ eyebrow, title, fotos }: { eyebrow: string; title: string; fotos: GalFoto[] }) {
  return (
    <div className="seg-galeria reveal">
      <div className="seg-galeria-head">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <span className="seg-galeria-hint"><Icon name="hand-pointer" size={13} /> Arraste para ver mais</span>
      </div>
      <Carrossel fotos={fotos} alt={title} />
    </div>
  );
}

function BercarioDestaque({ fotos }: { fotos: GalFoto[] }) {
  return (
    <div className="bercario-band reveal">
      <div className="bercario-band-head">
        <div>
          <span className="eyebrow">Berçário</span>
          <h2>Um começo cercado de <span style={{ color: "#1b84ff" }}>cuidado</span></h2>
        </div>
        <p>No berçário, cada bebê é acolhido com afeto e atenção individual. Cuidamos do sono, da alimentação e dos primeiros estímulos num ambiente seguro e cheio de carinho — onde a família fica tranquila e o bebê se sente em casa.</p>
      </div>
      <Carrossel fotos={fotos} alt="Berçário CDA" />
    </div>
  );
}

type Seg = {
  key: string; img: string; icon: string; tag: string; title: string; p: string;
  metodo: [string, string][]; chipsLabel: string; chips: string[]; stats: [string, string][]; pos?: string;
};

const SEGS: Seg[] = [
  {
    key: "infantil", img: "infantil.webp", icon: "child-reaching", tag: "Berçário à pré-escola", pos: "center 30%",
    title: "Educação Infantil",
    p: "A fase das primeiras descobertas — do berçário à pré-escola. Acolhemos cada criança com afeto e criamos um ambiente seguro onde aprender é, antes de tudo, brincar, explorar e se sentir amada.",
    metodo: [
      ["Berçário acolhedor", "Cuidado afetivo e atento desde os primeiros meses, com rotina de sono, alimentação e estímulos."],
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
    p: "O momento de ampliar horizontes sobre uma base sólida. Cada aluno cresce curioso, confiante e preparado para os próximos passos da vida escolar.",
    metodo: [
      ["Aprendizagem ativa", "O aluno no centro: investiga, questiona e constrói o conhecimento."],
      ["Pensamento crítico", "Projetos que desenvolvem raciocínio, leitura de mundo e argumentação."],
      ["Tecnologia no aprendizado", "Notebooks em atividades pedagógicas que conectam o aluno ao mundo digital."],
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
        {(s.key === "infantil" || s.key === "fundamental") && (
          <Link className="seg-metodo-link" to="/metodologia">
            <Icon name="book-open" size={14} /> Saiba mais sobre nossa metodologia
            <Icon name="arrow-right" size={13} />
          </Link>
        )}
        <div className="fr-cta" style={{ display: "none" }}>
          <button className="primary-btn" onClick={() => contact("segmentos_hero")}>Agendar uma visita</button>
        </div>
      </div>
    </div>
  );
}

export default function Segmentos() {
  usePageMeta("Segmentos — Educação Infantil, Fundamental e Contraturno | Escola CDA", "Conheça os segmentos da Escola CDA: Educação Infantil, Ensino Fundamental e Contraturno, com proposta bilíngue e cuidado em cada fase.");
  const contact = useContact();
  const { sec } = usePageContent("segmentos");
  const galBercario = section<GalFoto[]>(sec, "galeria_bercario", SEG_BERCARIO_DEFAULT);
  const galerias: Record<string, { eyebrow: string; title: string; fotos: GalFoto[] }> = {
    infantil: { eyebrow: "Maternal e Pré-escola", title: "Brincar, criar e descobrir", fotos: section<GalFoto[]>(sec, "galeria_infantil", SEG_INFANTIL_DEFAULT) },
    fundamental: { eyebrow: "Anos iniciais", title: "Momentos do Ensino Fundamental", fotos: section<GalFoto[]>(sec, "galeria_fundamental", SEG_FUNDAMENTAL_DEFAULT) },
  };
  return (
    <Layout>
      <PageHero pagina="segmentos" />

      {SEGS.map((s, i) => {
        const g = galerias[s.key];
        return (
          <Fragment key={s.key}>
            <Segment s={s} flip={i % 2 === 1} />
            {s.key === "infantil" && <BercarioDestaque fotos={galBercario} />}
            {g && <SegGaleria eyebrow={g.eyebrow} title={g.title} fotos={g.fotos} />}
          </Fragment>
        );
      })}

      <div className="cta-band reveal">
        <h2>Venha conhecer a CDA de perto</h2>
        <p>Agende uma visita e sinta o acolhimento da nossa escola — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={() => contact("segmentos_cta")}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/vivencias"><Icon name="arrow-right" size={15} /> Ver as vivências</Link>
        </div>
      </div>
    </Layout>
  );
}
