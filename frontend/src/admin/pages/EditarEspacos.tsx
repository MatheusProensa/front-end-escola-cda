import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import { ESPACOS_GAL_DEFAULT } from "../../lib/galeria";

export default function EditarEspacos() {
  return (
    <EditarPagina
      pagina="espacos"
      active="espacos"
      icone="image"
      titulo="Espaços"
      subtitulo="Galeria de ambientes e energia solar"
      verNoSite="/espacos"
      extra={
        <GaleriaEditor
          pagina="espacos"
          secao="galeria"
          titulo="Galeria de fotos"
          defaults={ESPACOS_GAL_DEFAULT}
          legendas
          hint="Adicione ou remova as fotos da galeria da página Espaços. A legenda aparece ao ampliar a foto."
        />
      }
    />
  );
}
