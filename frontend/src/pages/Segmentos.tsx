import { Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, useContact, usePageMeta } from "../components/site";
import { PageHero } from "../components/PageHero";
import { CtaBand } from "../components/blocks";
import { usePageContent, section } from "../lib/content";
import { SEG_INFANTIL_DEFAULT, SEG_FUNDAMENTAL_DEFAULT, SEG_BERCARIO_DEFAULT, type GalFoto } from "../lib/galeria";
import { SEG_BLOCOS, imgUrl, type SegBloco } from "../lib/listas";
import { SEG_BERCARIO, SEG_INFANTIL_GAL_HEAD, SEG_FUNDAMENTAL_GAL_HEAD, SEG_CTA, type Bloco } from "../lib/textos";

// "Título | descrição" por linha → pares [t, d]
const parLinhas = (s: string): [string, string][] =>
  s.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const i = l.indexOf("|");
    return i === -1 ? [l, ""] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  });
const listaVirgula = (s: string): string[] => s.split(",").map((c) => c.trim()).filter(Boolean);

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

function BercarioDestaque({ b, fotos }: { b: Bloco; fotos: GalFoto[] }) {
  return (
    <div className="bercario-band reveal">
      <div className="bercario-band-head">
        <div>
          <span className="eyebrow">{b.eyebrow}</span>
          <h2>{b.titulo} {b.destaque && <span style={{ color: "#1b84ff" }}>{b.destaque}</span>}</h2>
        </div>
        <p>{b.p1}</p>
      </div>
      <Carrossel fotos={fotos} alt="Berçário CDA" />
    </div>
  );
}

function Segment({ s, flip }: { s: SegBloco; flip: boolean }) {
  const contact = useContact();
  const metodo = parLinhas(s.metodo);
  const chips = listaVirgula(s.chips);
  const stats = parLinhas(s.stats);
  return (
    <div className={"feature-row reveal" + (flip ? " flip" : "")}>
      <div className="fr-media">
        <img src={imgUrl(s.img)} alt={s.title} decoding="async" style={s.pos ? { objectPosition: s.pos } : undefined} />
        <span className="fr-tag"><span className="dot"></span>{s.tag}</span>
      </div>
      <div className="fr-body">
        <span className="eyebrow">Segmento</span>
        <h3>{s.title}</h3>
        <p>{s.p}</p>
        <div className="cda-list">
          {metodo.map(([t, d], i) => (
            <div className="li" key={i}>
              <div className={"li-ic" + (i === 1 ? " gold" : "")}><Icon name="check" size={12} /></div>
              <div><strong>{t}</strong><span>{d}</span></div>
            </div>
          ))}
        </div>
        <span className="seg-chips-label">{s.chipsLabel}</span>
        <div className="seg-chips">
          {chips.map((c, i) => <span className="seg-chip" key={i}>{c}</span>)}
        </div>
        <div className="mini-stats">
          {stats.map(([a, b], i) => (
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
  const blocos = section<SegBloco[]>(sec, "blocos", SEG_BLOCOS);
  const bercario = section<Bloco>(sec, "bercario", SEG_BERCARIO);
  const galBercario = section<GalFoto[]>(sec, "galeria_bercario", SEG_BERCARIO_DEFAULT);
  const infantilHead = section<Bloco>(sec, "galeria_infantil_head", SEG_INFANTIL_GAL_HEAD);
  const fundamentalHead = section<Bloco>(sec, "galeria_fundamental_head", SEG_FUNDAMENTAL_GAL_HEAD);
  const cta = section<Bloco>(sec, "cta", SEG_CTA);
  const galerias: Record<string, { eyebrow: string; title: string; fotos: GalFoto[] }> = {
    infantil: { eyebrow: infantilHead.eyebrow || "", title: infantilHead.titulo || "", fotos: section<GalFoto[]>(sec, "galeria_infantil", SEG_INFANTIL_DEFAULT) },
    fundamental: { eyebrow: fundamentalHead.eyebrow || "", title: fundamentalHead.titulo || "", fotos: section<GalFoto[]>(sec, "galeria_fundamental", SEG_FUNDAMENTAL_DEFAULT) },
  };
  return (
    <Layout>
      <PageHero pagina="segmentos" />

      {blocos.map((s, i) => {
        const g = galerias[s.key];
        return (
          <Fragment key={s.key + "-" + i}>
            <Segment s={s} flip={i % 2 === 1} />
            {s.key === "infantil" && <BercarioDestaque b={bercario} fotos={galBercario} />}
            {g && <SegGaleria eyebrow={g.eyebrow} title={g.title} fotos={g.fotos} />}
          </Fragment>
        );
      })}

      <CtaBand b={cta}>
        <button className="btn-white" onClick={() => contact("segmentos_cta")}><Icon name="calendar-check" size={16} /> {cta.btn || "Agendar visita"}</button>
        <Link className="btn-ghost" to="/vivencias"><Icon name="arrow-right" size={15} /> Ver as vivências</Link>
      </CtaBand>
    </Layout>
  );
}
