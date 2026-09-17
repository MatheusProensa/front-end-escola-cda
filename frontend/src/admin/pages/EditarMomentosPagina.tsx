import AdminShell from "../AdminShell";
import BlocoTexto from "./BlocoTexto";
import { asset } from "../../lib/assets";
import { MOMENTOS_HERO, MOMENTOS_CTA } from "../../lib/textos";

const logo = () => asset("logo-cda-15anos-semborda.webp");

const camposHero = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (manuscrita)" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
];
const camposCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Botão do Instagram" },
  { key: "p2" as const, label: "Botão de agendar visita" },
];

// Editor dos textos da página pública de Momentos (cabeçalho e faixa final).
// Os álbuns de fotos ficam no editor "Álbuns de fotos" (Gerir).
export default function EditarMomentosPagina() {
  return (
    <AdminShell active="pagina-momentos" title="Editar — Momentos" subtitle="Textos da página de Momentos" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-camera-retro"></i></div>
        <div><h1>Página de Momentos</h1><p>Edite os textos da página. Os álbuns de fotos ficam em <strong>Álbuns de fotos</strong> (Gerir).</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/momentos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <BlocoTexto pagina="momentos" secao="hero" titulo="Cabeçalho da página" defaults={MOMENTOS_HERO} campos={camposHero} />
          <BlocoTexto pagina="momentos" secao="cta" titulo="Faixa final (chamada para visita)" defaults={MOMENTOS_CTA} campos={camposCta} />
        </div>
      </div>
    </AdminShell>
  );
}
