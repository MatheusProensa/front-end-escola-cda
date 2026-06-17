// Cabeçalho das páginas internas — lê o texto editável do banco (com fallback no padrão).
import { usePageContent, section } from "../lib/content";
import { INTROS, type Intro } from "../lib/intros";

export function PageHero({ pagina }: { pagina: string }) {
  const { sec } = usePageContent(pagina);
  const i = section<Intro>(sec, "intro", INTROS[pagina]);
  return (
    <section className="page-hero reveal">
      <span className="eyebrow">{i.eyebrow}</span>
      <h1>{i.titulo} <span className="script">{i.destaque}</span></h1>
      <p>{i.texto}</p>
    </section>
  );
}
