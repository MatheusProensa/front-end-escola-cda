import AdminShell from "../AdminShell";
import BlocoTexto from "./BlocoTexto";
import { asset } from "../../lib/assets";
import { MATRICULAS_HERO, MATRICULAS_FORM, MATRICULAS_CTA } from "../../lib/textos";

const logo = () => asset("logo-cda-15anos-semborda.webp");

const camposHero = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (manuscrita)" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
];
const camposForm = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título do formulário" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão de enviar" },
];
const camposCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (dourado, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];

// Editor dos textos da página pública de Matrículas (hero, formulário e faixa final).
// Os dados de contato (endereço, WhatsApp...) continuam no editor "Contato".
export default function EditarMatriculasPagina() {
  return (
    <AdminShell active="pagina-matriculas" title="Editar — Matrículas" subtitle="Textos da página de matrículas" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-file-lines"></i></div>
        <div><h1>Página de Matrículas</h1><p>Edite os textos da página. Endereço, WhatsApp e horário ficam no editor <strong>Contato</strong>.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/matriculas" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <BlocoTexto pagina="matriculas" secao="hero" titulo="Cabeçalho da página" defaults={MATRICULAS_HERO} campos={camposHero} />
          <BlocoTexto pagina="matriculas" secao="form" titulo="Textos do formulário" defaults={MATRICULAS_FORM} campos={camposForm} />
          <BlocoTexto pagina="matriculas" secao="cta" titulo="Faixa final (chamada para visita)" defaults={MATRICULAS_CTA} campos={camposCta} />
        </div>
      </div>
    </AdminShell>
  );
}
