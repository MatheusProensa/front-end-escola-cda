import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { ESPACOS_GAL_DEFAULT } from "../../lib/galeria";
import { ESPACOS_FEATS } from "../../lib/listas";
import { ESPACOS_SOLAR, ESPACOS_SOLAR_ITENS } from "../../lib/textos";

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
            hint="Adicione ou remova as fotos da galeria da página Espaços."
          />
          <ListEditor
            pagina="espacos"
            secao="feats"
            titulo="Selos (Segurança, Acolhimento...)"
            defaults={ESPACOS_FEATS}
            campos={[{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" }]}
            novo={{ icon: "star", gold: false, t: "", p: "" }}
          />
          <BlocoTexto
            pagina="espacos"
            secao="solar"
            titulo="Bloco: Energia solar"
            defaults={ESPACOS_SOLAR}
            imagem
            campos={[
              { key: "tag", label: "Etiqueta sobre a foto" },
              { key: "eyebrow", label: "Texto pequeno (acima do título)" },
              { key: "titulo", label: "Título" },
              { key: "p1", label: "Parágrafo", tipo: "textarea" },
            ]}
          />
          <ListEditor
            pagina="espacos"
            secao="solar_itens"
            titulo="Energia solar — itens da lista"
            defaults={ESPACOS_SOLAR_ITENS}
            campos={[{ key: "t", label: "Título" }, { key: "d", label: "Descrição", tipo: "textarea" }]}
            novo={{ t: "", d: "" }}
          />
        </>
      }
    />
  );
}
