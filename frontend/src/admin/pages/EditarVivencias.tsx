import EditarPagina from "./EditarPagina";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { VIV_TARDE, VIV_MANHA, VIV_EXTRAS } from "../../lib/listas";
import { VIV_TARDE_HEAD, VIV_MANHA_HEAD, VIV_EXTRAS_HEAD, VIV_CTA } from "../../lib/textos";

const campos = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];
const novo = { icon: "star", gold: false, t: "", p: "", img: "" };

const camposHead = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título do grupo" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
];
const camposCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (dourado, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];

export default function EditarVivencias() {
  return (
    <EditarPagina
      pagina="vivencias"
      active="vivencias"
      icone="palette"
      titulo="Vivências"
      subtitulo="Especializadas, Oficinas e Aulas extras"
      verNoSite="/vivencias"
      extra={
        <>
          <BlocoTexto pagina="vivencias" secao="grupo_tarde_head" titulo="Título do grupo: Especializadas" defaults={VIV_TARDE_HEAD} campos={camposHead} />
          <ListEditor pagina="vivencias" secao="grupo_tarde" titulo="Especializadas (turno da tarde)" defaults={VIV_TARDE} campos={campos} novo={novo} imagem hint="Cards de atividades. Use 'Trocar' para mudar a foto de cada card." />
          <BlocoTexto pagina="vivencias" secao="grupo_manha_head" titulo="Título do grupo: Oficinas" defaults={VIV_MANHA_HEAD} campos={camposHead} />
          <ListEditor pagina="vivencias" secao="grupo_manha" titulo="Oficinas (turno da manhã)" defaults={VIV_MANHA} campos={campos} novo={novo} imagem />
          <BlocoTexto pagina="vivencias" secao="grupo_extras_head" titulo="Título do grupo: Aulas extras" defaults={VIV_EXTRAS_HEAD} campos={camposHead} />
          <ListEditor pagina="vivencias" secao="grupo_extras" titulo="Aulas extras (parcerias)" defaults={VIV_EXTRAS} campos={campos} novo={novo} imagem />
          <BlocoTexto pagina="vivencias" secao="cta" titulo="Faixa final (chamada para visita)" defaults={VIV_CTA} campos={camposCta} />
        </>
      }
    />
  );
}
