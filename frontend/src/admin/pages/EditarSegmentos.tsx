import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { SEG_INFANTIL_DEFAULT, SEG_FUNDAMENTAL_DEFAULT, SEG_BERCARIO_DEFAULT } from "../../lib/galeria";
import { SEG_BLOCOS } from "../../lib/listas";
import { SEG_BERCARIO, SEG_INFANTIL_GAL_HEAD, SEG_FUNDAMENTAL_GAL_HEAD, SEG_CTA } from "../../lib/textos";

const camposBloco = [
  { key: "title", label: "Título do segmento" },
  { key: "tag", label: "Etiqueta sobre a foto" },
  { key: "p", label: "Descrição", tipo: "textarea" as const },
  { key: "metodo", label: "Tópicos do método (um por linha: Título | descrição)", tipo: "textarea" as const },
  { key: "chipsLabel", label: "Rótulo dos selos" },
  { key: "chips", label: "Selos (separados por vírgula)" },
  { key: "stats", label: "Números (um por linha: valor | rótulo)", tipo: "textarea" as const },
];
const novoBloco = { key: "novo", img: "", icon: "star", tag: "", pos: "", title: "", p: "", metodo: "", chipsLabel: "", chips: "", stats: "" };

const camposBercario = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (azul, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
];
const camposGalHead = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
];
const camposCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (dourado, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];

export default function EditarSegmentos() {
  return (
    <EditarPagina
      pagina="segmentos"
      active="segmentos"
      icone="layer-group"
      titulo="Segmentos"
      subtitulo="Educação Infantil, Fundamental e Contraturno"
      verNoSite="/segmentos"
      extra={
        <>
          <ListEditor pagina="segmentos" secao="blocos" titulo="Blocos dos segmentos" defaults={SEG_BLOCOS} campos={camposBloco} novo={novoBloco} imagem hint="Cada bloco é um segmento (Infantil, Fundamental, Contraturno). Nos tópicos e números, escreva um item por linha usando a barra | para separar as duas partes." />
          <BlocoTexto pagina="segmentos" secao="bercario" titulo="Destaque do Berçário (texto)" defaults={SEG_BERCARIO} campos={camposBercario} />
          <GaleriaEditor pagina="segmentos" secao="galeria_bercario" titulo="Galeria — Berçário" defaults={SEG_BERCARIO_DEFAULT} hint="Fotos do carrossel do Berçário." />
          <BlocoTexto pagina="segmentos" secao="galeria_infantil_head" titulo="Título da galeria — Educação Infantil" defaults={SEG_INFANTIL_GAL_HEAD} campos={camposGalHead} />
          <GaleriaEditor pagina="segmentos" secao="galeria_infantil" titulo="Galeria — Educação Infantil" defaults={SEG_INFANTIL_DEFAULT} hint="Fotos do carrossel da Educação Infantil." />
          <BlocoTexto pagina="segmentos" secao="galeria_fundamental_head" titulo="Título da galeria — Ensino Fundamental" defaults={SEG_FUNDAMENTAL_GAL_HEAD} campos={camposGalHead} />
          <GaleriaEditor pagina="segmentos" secao="galeria_fundamental" titulo="Galeria — Ensino Fundamental" defaults={SEG_FUNDAMENTAL_DEFAULT} hint="Fotos do carrossel do Ensino Fundamental." />
          <BlocoTexto pagina="segmentos" secao="cta" titulo="Faixa final (chamada para visita)" defaults={SEG_CTA} campos={camposCta} />
        </>
      }
    />
  );
}
