import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import { SOBRE_TIMELINE_DEFAULT } from "../../lib/galeria";
import { SOBRE_VALORES } from "../../lib/listas";

export default function EditarSobre() {
  return (
    <EditarPagina
      pagina="sobre"
      active="sobre"
      icone="book-open"
      titulo="Sobre a Escola"
      subtitulo="História, valores e linha do tempo"
      verNoSite="/sobre"
      extra={
        <>
          <GaleriaEditor
            pagina="sobre"
            secao="timeline"
            titulo="Linha do tempo"
            defaults={SOBRE_TIMELINE_DEFAULT}
            legendas
            hint="Cada foto é um ano/etapa da história. Escreva a frase no campo 'Legenda'. A ordem aqui é a ordem que aparece no site."
          />
          <ListEditor
            pagina="sobre"
            secao="valores"
            titulo="Valores que guiam cada dia"
            defaults={SOBRE_VALORES}
            campos={[{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" }]}
            novo={{ icon: "star", gold: false, t: "", p: "" }}
          />
        </>
      }
    />
  );
}
