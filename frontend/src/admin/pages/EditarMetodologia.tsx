import EditarPagina from "./EditarPagina";
import ListEditor from "./ListEditor";
import { MET_DIMENSOES, MET_INFANTIL, MET_FUNDAMENTAL, MET_PILARES5 } from "../../lib/listas";

const campoCard = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];
const campoLista = [{ key: "t", label: "Título" }, { key: "d", label: "Descrição", tipo: "textarea" as const }];

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
          <ListEditor pagina="metodologia" secao="dimensoes" titulo="Dimensões do desenvolvimento" defaults={MET_DIMENSOES} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} hint="Os 3 cards 'O que cultivamos em cada criança'." />
          <ListEditor pagina="metodologia" secao="infantil" titulo="Lista — Educação Infantil" defaults={MET_INFANTIL} campos={campoLista} novo={{ t: "", d: "" }} />
          <ListEditor pagina="metodologia" secao="fundamental" titulo="Lista — Ensino Fundamental" defaults={MET_FUNDAMENTAL} campos={campoLista} novo={{ t: "", d: "" }} />
          <ListEditor pagina="metodologia" secao="pilares5" titulo="Pilares que sustentam a proposta" defaults={MET_PILARES5} campos={campoCard} novo={{ icon: "star", gold: false, t: "", p: "" }} />
        </>
      }
    />
  );
}
