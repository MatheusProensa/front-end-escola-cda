import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { ESPACOS_GAL_DEFAULT } from "../../lib/galeria";
import { ESPACOS_FEATS } from "../../lib/listas";
import { ESPACOS_SOLAR, ESPACOS_SOLAR_ITENS, ESPACOS_FEATS_HEAD, ESPACOS_CTA } from "../../lib/textos";

const camposSecHead = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (azul, opcional)" },
  { key: "p1" as const, label: "Texto de apoio (opcional)", tipo: "textarea" as const },
];
const camposCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (dourado, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];

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
          <BlocoTexto pagina="espacos" secao="feats_head" titulo="Título da seção: Selos" defaults={ESPACOS_FEATS_HEAD} campos={camposSecHead} />
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
          <BlocoTexto pagina="espacos" secao="cta" titulo="Faixa final (chamada para visita)" defaults={ESPACOS_CTA} campos={camposCta} />
        </>
      }
    />
  );
}
