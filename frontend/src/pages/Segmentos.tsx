import { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { asset } from "../lib/assets";

// Galerias "rolo de fotos" — ordem embaralhada p/ cenas não se repetirem em sequência
const G_INFANTIL = [
  "gal-infantil-9.webp","gal-infantil-4.webp","gal-infantil-12.webp","gal-infantil-1.webp","gal-infantil-6.webp",
  "gal-infantil-8.webp","gal-infantil-10.webp","gal-infantil-5.webp","gal-infantil-13.webp","gal-infantil-2.webp",
  "gal-infantil-7.webp","gal-infantil-11.webp","gal-infantil-3.webp","gal-infantil-14.webp",
];
const G_FUNDAMENTAL = [
  "gal-fundamental-2.webp","gal-fundamental-7.webp","gal-fundamental-17.webp","gal-fundamental-5.webp","gal-fundamental-11.webp",
  "gal-fundamental-14.webp","gal-fundamental-1.webp","gal-fundamental-9.webp","gal-fundamental-12.webp","gal-fundamental-3.webp",
  "gal-fundamental-8.webp","gal-fundamental-18.webp","gal-fundamental-6.webp","gal-fundamental-16.webp","gal-fundamental-4.webp",
  "gal-fundamental-10.webp","gal-fundamental-15.webp","gal-fundamental-13.webp",
];
const G_BERCARIO = [
  "gal-bercario-1.webp","gal-bercario-7.webp","gal-bercario-3.webp","gal-bercario-9.webp","gal-bercario-5.webp",
  "gal-bercario-11.webp","gal-bercario-2.webp","gal-bercario-8.webp","gal-bercario-4.webp","gal-bercario-10.webp",
  "gal-bercario-6.webp","gal-bercario-12.webp",
];
const GALERIAS: Record<string, { eyebrow: string; title: string; imgs: string[] }> = {
  infantil: { eyebrow: "Maternal e Pré-escola", title: "Brincar, criar e descobrir", imgs: G_INFANTIL },
  fundamental: { eyebrow: "Anos iniciais", title: "Momentos do Ensino Fundamental", imgs: G_FUNDAMENTAL },
};

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

function Carrossel({ imgs, alt }: { imgs: string[]; alt: string }) {
  const ref = useDragScroll();
  return (
    <div className="seg-galeria-track" ref={ref}>
      {imgs.map((src, i) => (
        <div className="seg-galeria-item" key={i}><img src={asset(src)} alt={alt + " — foto " + (i + 1)} loading="lazy" decoding="async" draggable={false} /></div>
      ))}
    </div>
  );
}

function SegGaleria({ eyebrow, title, imgs }: { eyebrow: string; title: string; imgs: string[] }) {
  return (
    <div className="seg-galeria reveal">
      <div className="seg-galeria-head">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <span className="seg-galeria-hint"><Icon name="hand-pointer" size={13} /> Arraste para ver mais</span>
      </div>
      <Carrossel imgs={imgs} alt={title} />
    </div>
  );
}

function BercarioDestaque() {
  return (
    <div className="bercario-band reveal">
      <div className="bercario-band-head">
        <div>
          <span className="eyebrow">Berçário</span>
          <h2>Um começo cercado de <span style={{ color: "#1b84ff" }}>cuidado</span></h2>
        </div>
        <p>No berçário, cada bebê é acolhido com afeto e atenção individual. Cuidamos do sono, da alimentação e dos primeiros estímulos num ambiente seguro e cheio de carinho — onde a família fica tranquila e o bebê se sente em casa.</p>
      </div>
      <Carrossel imgs={G_BERCARIO} alt="Berçário CDA" />
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
          <button className="primary-btn" onClick={contact}>Agendar uma visita</button>
        </div>
      </div>
    </div>
  );
}

export default function Segmentos() {
  usePageMeta("Segmentos — Educação Infantil, Fundamental e Contraturno | Escola CDA", "Conheça os segmentos da Escola CDA: Educação Infantil, Ensino Fundamental e Contraturno, com proposta bilíngue e cuidado em cada fase.");
  const contact = useContact();
  return (
    <Layout>
      <PageHero pagina="segmentos" />

      {SEGS.map((s, i) => {
        const g = GALERIAS[s.key];
        return (
          <Fragment key={s.key}>
            <Segment s={s} flip={i % 2 === 1} />
            {s.key === "infantil" && <BercarioDestaque />}
            {g && <SegGaleria eyebrow={g.eyebrow} title={g.title} imgs={g.imgs} />}
          </Fragment>
        );
      })}

      <div className="cta-band reveal">
        <h2>Venha conhecer a CDA de perto</h2>
        <p>Agende uma visita e sinta o acolhimento da nossa escola — será um prazer receber a sua família.</p>
        <div className="cta-actions">
          <button className="btn-white" onClick={contact}><Icon name="calendar-check" size={16} /> Agendar visita</button>
          <Link className="btn-ghost" to="/vivencias"><Icon name="arrow-right" size={15} /> Ver as vivências</Link>
        </div>
      </div>
    </Layout>
  );
}
