import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { SOBRE_TIMELINE_DEFAULT } from "../../lib/galeria";
import { SOBRE_VALORES } from "../../lib/listas";
import { SOBRE_HISTORIA, SOBRE_ALIMENTACAO, SOBRE_ALIMENTACAO_ITENS, SOBRE_TIMELINE_HEAD, SOBRE_VALORES_HEAD, SOBRE_CTA } from "../../lib/textos";

const camposBloco = [
  { key: "tag" as const, label: "Etiqueta sobre a foto" },
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "p1" as const, label: "Parágrafo 1", tipo: "textarea" as const },
];

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
          <BlocoTexto pagina="sobre" secao="historia" titulo="Bloco: Nossa história" defaults={SOBRE_HISTORIA} imagem campos={[...camposBloco, { key: "p2", label: "Parágrafo 2", tipo: "textarea" }]} />
          <BlocoTexto pagina="sobre" secao="timeline_head" titulo="Título da seção: Linha do tempo" defaults={SOBRE_TIMELINE_HEAD} campos={camposSecHead} />
          <BlocoTexto pagina="sobre" secao="alimentacao" titulo="Bloco: Alimentação" defaults={SOBRE_ALIMENTACAO} imagem campos={camposBloco} />
          <ListEditor pagina="sobre" secao="alimentacao_itens" titulo="Alimentação — itens da lista" defaults={SOBRE_ALIMENTACAO_ITENS} campos={[{ key: "t", label: "Título" }, { key: "d", label: "Descrição", tipo: "textarea" }]} novo={{ t: "", d: "" }} />
          <GaleriaEditor
            pagina="sobre"
            secao="timeline"
            titulo="Linha do tempo"
            defaults={SOBRE_TIMELINE_DEFAULT}
            legendas
            hint="Cada foto é um ano/etapa da história. Escreva a frase no campo 'Legenda'. A ordem aqui é a ordem que aparece no site."
          />
          <BlocoTexto pagina="sobre" secao="valores_head" titulo="Título da seção: Valores" defaults={SOBRE_VALORES_HEAD} campos={camposSecHead} />
          <ListEditor
            pagina="sobre"
            secao="valores"
            titulo="Valores que guiam cada dia"
            defaults={SOBRE_VALORES}
            campos={[{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" }]}
            novo={{ icon: "star", gold: false, t: "", p: "" }}
          />
          <BlocoTexto pagina="sobre" secao="cta" titulo="Faixa final (chamada para visita)" defaults={SOBRE_CTA} campos={camposCta} />
        </>
      }
    />
  );
}
