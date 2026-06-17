import EditarPagina from "./EditarPagina";
import ListEditor from "./ListEditor";
import { VIV_TARDE, VIV_MANHA, VIV_EXTRAS } from "../../lib/listas";

const campos = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];
const novo = { icon: "star", gold: false, t: "", p: "", img: "" };

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
          <ListEditor pagina="vivencias" secao="grupo_tarde" titulo="Especializadas (turno da tarde)" defaults={VIV_TARDE} campos={campos} novo={novo} imagem hint="Cards de atividades. Use 'Trocar' para mudar a foto de cada card." />
          <ListEditor pagina="vivencias" secao="grupo_manha" titulo="Oficinas (turno da manhã)" defaults={VIV_MANHA} campos={campos} novo={novo} imagem />
          <ListEditor pagina="vivencias" secao="grupo_extras" titulo="Aulas extras (parcerias)" defaults={VIV_EXTRAS} campos={campos} novo={novo} imagem />
        </>
      }
    />
  );
}
