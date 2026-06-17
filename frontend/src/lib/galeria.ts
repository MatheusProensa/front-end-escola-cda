// Galeria editável da página "Espaços".
// O site lê a galeria do banco (page_content, seção "galeria"); se não houver
// nada salvo, usa este padrão embutido (as mesmas fotos que já estavam no site).
import { asset } from "./assets";

export type GalFoto = {
  url: string;
  titulo: string;
  descricao: string;
  cls?: string;   // tamanho no mosaico (ex.: "w2 h2") — só os padrão usam
  pos?: string;   // object-position
  ar?: string;    // aspect-ratio
};

// Áreas externas primeiro (grama → britas → areia → quadra → horta),
// transição pela entrada coberta, depois os ambientes internos.
export const ESPACOS_GAL_DEFAULT: GalFoto[] = [
  { url: asset("jardim.webp"), titulo: "Pátio", descricao: "Áreas verdes para brincar, respirar e conviver.", cls: "w2 h2", pos: "center 40%" },
  { url: asset("patio-area.webp"), titulo: "Convivência", descricao: "Pátio arborizado para brincar e conviver ao ar livre." },
  { url: asset("patio.webp"), titulo: "Parque", descricao: "Parque ao ar livre com playground e natureza.", cls: "w2" },
  { url: asset("recreio.webp"), titulo: "Britas", descricao: "Brincar livre ao ar livre, do jeito da infância.", cls: "w2" },
  { url: asset("areia.webp"), titulo: "Areia", descricao: "Areia e balanço para explorar e imaginar.", cls: "w2 h2" },
  { url: asset("quadra.webp"), titulo: "Quadra", descricao: "Movimento, esporte e energia.", cls: "w2 h2", pos: "center 58%" },
  { url: asset("horta.webp"), titulo: "Horta", descricao: "Plantar, cuidar e aprender com a natureza.", cls: "w2 h2", pos: "center 72%", ar: "3 / 4" },
  { url: asset("coberto.webp"), titulo: "Entrada", descricao: "Brincar protegido em qualquer dia.", cls: "w2 h2" },
  { url: asset("biblioteca.webp"), titulo: "Biblioteca", descricao: "Mundos para descobrir em cada página.", cls: "w2 h2" },
  { url: asset("sala-aula.webp"), titulo: "Salas de aula", descricao: "Ambientes preparados para acolher e aprender." },
  { url: asset("laboratorio.webp"), titulo: "Laboratório", descricao: "Ciência viva, mão na massa.", cls: "w2" },
  { url: asset("refeitorio.webp"), titulo: "Refeitório", descricao: "Alimentação cuidada, com carinho.", cls: "w2" },
  { url: asset("solario.webp"), titulo: "Solário", descricao: "Espaço macio e seguro para os pequenos.", cls: "w2 h2" },
  { url: asset("convivencia.webp"), titulo: "Banheiro E. Fundamental e PCD", descricao: "Pebolim e descanso entre uma atividade e outra.", cls: "w2" },
];
