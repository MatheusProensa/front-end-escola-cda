import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import { ESPACOS_GAL_DEFAULT } from "../../lib/galeria";
import { ESPACOS_FEATS } from "../../lib/listas";

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
        <>
          <GaleriaEditor
            pagina="espacos"
            secao="galeria"
            titulo="Galeria de fotos"
            defaults={ESPACOS_GAL_DEFAULT}
            legendas
            hint="Adicione ou remova as fotos da galeria da página Espaços. A legenda aparece ao ampliar a foto."
          />
          <ListEditor
            pagina="espacos"
            secao="feats"
            titulo="Selos (Segurança, Acolhimento...)"
            defaults={ESPACOS_FEATS}
            campos={[{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" }]}
            novo={{ icon: "star", gold: false, t: "", p: "" }}
          />
        </>
      }
    />
  );
}
