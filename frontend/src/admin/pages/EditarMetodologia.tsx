import EditarPagina from "./EditarPagina";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import GaleriaEditor from "./GaleriaEditor";
import { MET_DIMENSOES, MET_INFANTIL, MET_FUNDAMENTAL, MET_PILARES5, MET_TEC_CHIPS, MET_MATERIAL_CHIPS } from "../../lib/listas";
import { MET_INTRO, MET_INFANTIL_BLOCO, MET_FUNDAMENTAL_BLOCO, MET_DIMENSOES_HEAD, MET_TEC_HEAD, MET_MATERIAL_HEAD, MET_PILARES5_HEAD, MET_CTA } from "../../lib/textos";
import { MET_TEC_FOTOS } from "../../lib/galeria";

const campoCard = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];
const campoLista = [{ key: "t", label: "Título" }, { key: "d", label: "Descrição", tipo: "textarea" as const }];
const campoChip = [{ key: "t", label: "Texto do selo" }];
const campoBloco = [
  { key: "tag" as const, label: "Etiqueta sobre a foto" },
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "p1" as const, label: "Parágrafo", tipo: "textarea" as const },
];
const campoSecHead = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (azul, opcional)" },
  { key: "p1" as const, label: "Texto de apoio (opcional)", tipo: "textarea" as const },
];
const campoCta = [
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (dourado, opcional)" },
  { key: "p1" as const, label: "Texto", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];

export default function EditarMetodologia() {
  return (
    <EditarPagina
      pagina="metodologia"
      active="metodologia"
      icone="graduation-cap"
      titulo="Metodologia"
      subtitulo="ProRaiz, tecnologia no aprendizado e comunicação"
      verNoSite="/metodologia"
      extra={
        <>
          <BlocoTexto pagina="metodologia" secao="intro_bloco" titulo="Bloco: Aprender por inteiro" defaults={MET_INTRO} imagem campos={campoBloco} />
          <BlocoTexto pagina="metodologia" secao="dimensoes_head" titulo="Título da seção: Dimensões" defaults={MET_DIMENSOES_HEAD} campos={campoSecHead} />
          <ListEditor pagina="metodologia" secao="dimensoes" titulo="Dimensões do desenvolvimento" defaults={MET_DIMENSOES} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} hint="Os 3 cards 'O que cultivamos em cada criança'." />
          <BlocoTexto pagina="metodologia" secao="infantil_bloco" titulo="Bloco: Educação Infantil" defaults={MET_INFANTIL_BLOCO} imagem campos={campoBloco} />
          <ListEditor pagina="metodologia" secao="infantil" titulo="Lista — Educação Infantil" defaults={MET_INFANTIL} campos={campoLista} novo={{ t: "", d: "" }} />
          <BlocoTexto pagina="metodologia" secao="fundamental_bloco" titulo="Bloco: Ensino Fundamental" defaults={MET_FUNDAMENTAL_BLOCO} imagem campos={campoBloco} />
          <ListEditor pagina="metodologia" secao="fundamental" titulo="Lista — Ensino Fundamental" defaults={MET_FUNDAMENTAL} campos={campoLista} novo={{ t: "", d: "" }} />
          <BlocoTexto pagina="metodologia" secao="tec_head" titulo="Bloco: Tecnologia (título e texto)" defaults={MET_TEC_HEAD} campos={campoSecHead} />
          <GaleriaEditor pagina="metodologia" secao="tec_fotos" titulo="Tecnologia — fotos" defaults={MET_TEC_FOTOS} hint="Fotos do bloco de tecnologia. O ideal é manter 4 fotos." />
          <ListEditor pagina="metodologia" secao="tec_chips" titulo="Tecnologia — selos" defaults={MET_TEC_CHIPS} campos={campoChip} novo={{ icon: "star", t: "" }} />
          <BlocoTexto pagina="metodologia" secao="material_head" titulo="Bloco: Material didático (título e texto)" defaults={MET_MATERIAL_HEAD} campos={campoSecHead} />
          <ListEditor pagina="metodologia" secao="material_chips" titulo="Material didático — selos" defaults={MET_MATERIAL_CHIPS} campos={campoChip} novo={{ icon: "star", t: "" }} />
          <BlocoTexto pagina="metodologia" secao="pilares5_head" titulo="Título da seção: Pilares" defaults={MET_PILARES5_HEAD} campos={campoSecHead} />
          <ListEditor pagina="metodologia" secao="pilares5" titulo="Pilares que sustentam a proposta" defaults={MET_PILARES5} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} />
          <BlocoTexto pagina="metodologia" secao="cta" titulo="Faixa final (chamada para visita)" defaults={MET_CTA} campos={campoCta} />
        </>
      }
    />
  );
}
