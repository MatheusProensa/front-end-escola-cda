// Cabeçalho das páginas internas — lê o texto editável já carregado pela página
// (recebe `sec` por prop, sem fazer uma segunda busca ao banco).
import { section, type SectionMap } from "../lib/content";
import { INTROS, type Intro } from "../lib/intros";

export function PageHero({ pagina, sec }: { pagina: string; sec: SectionMap }) {
  const i = section<Intro>(sec, "intro", INTROS[pagina]);
  return (
    <section className="page-hero reveal">
      <span className="eyebrow">{i.eyebrow}</span>
      <h1>{i.titulo} <span className="script">{i.destaque}</span></h1>
      <p>{i.texto}</p>
    </section>
  );
}
