import EditarPagina from "./EditarPagina";
import ListEditor from "./ListEditor";
import BlocoTexto from "./BlocoTexto";
import { MET_DIMENSOES, MET_INFANTIL, MET_FUNDAMENTAL, MET_PILARES5 } from "../../lib/listas";
import { MET_INTRO, MET_INFANTIL_BLOCO, MET_FUNDAMENTAL_BLOCO } from "../../lib/textos";

const campoCard = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];
const campoLista = [{ key: "t", label: "Título" }, { key: "d", label: "Descrição", tipo: "textarea" as const }];
const campoBloco = [
  { key: "tag" as const, label: "Etiqueta sobre a foto" },
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "p1" as const, label: "Parágrafo", tipo: "textarea" as const },
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
          <ListEditor pagina="metodologia" secao="dimensoes" titulo="Dimensões do desenvolvimento" defaults={MET_DIMENSOES} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} hint="Os 3 cards 'O que cultivamos em cada criança'." />
          <BlocoTexto pagina="metodologia" secao="infantil_bloco" titulo="Bloco: Educação Infantil" defaults={MET_INFANTIL_BLOCO} imagem campos={campoBloco} />
          <ListEditor pagina="metodologia" secao="infantil" titulo="Lista — Educação Infantil" defaults={MET_INFANTIL} campos={campoLista} novo={{ t: "", d: "" }} />
          <BlocoTexto pagina="metodologia" secao="fundamental_bloco" titulo="Bloco: Ensino Fundamental" defaults={MET_FUNDAMENTAL_BLOCO} imagem campos={campoBloco} />
          <ListEditor pagina="metodologia" secao="fundamental" titulo="Lista — Ensino Fundamental" defaults={MET_FUNDAMENTAL} campos={campoLista} novo={{ t: "", d: "" }} />
          <ListEditor pagina="metodologia" secao="pilares5" titulo="Pilares que sustentam a proposta" defaults={MET_PILARES5} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} />
        </>
      }
    />
  );
}
