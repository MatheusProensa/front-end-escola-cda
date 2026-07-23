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

// fotos sem legenda (carrosséis dos Segmentos)
const semLegenda = (nomes: string[]): GalFoto[] => nomes.map((n) => ({ url: asset(n), titulo: "", descricao: "" }));

export const SEG_INFANTIL_DEFAULT: GalFoto[] = semLegenda([
  "gal-infantil-9.webp", "gal-infantil-4.webp", "gal-infantil-12.webp", "gal-infantil-1.webp", "gal-infantil-6.webp",
  "gal-infantil-8.webp", "gal-infantil-10.webp", "gal-infantil-5.webp", "gal-infantil-13.webp", "gal-infantil-2.webp",
  "gal-infantil-7.webp", "gal-infantil-11.webp", "gal-infantil-3.webp", "gal-infantil-14.webp",
]);

export const SEG_FUNDAMENTAL_DEFAULT: GalFoto[] = semLegenda([
  "gal-fundamental-2.webp", "gal-fundamental-7.webp", "gal-fundamental-17.webp", "gal-fundamental-5.webp", "gal-fundamental-11.webp",
  "gal-fundamental-14.webp", "gal-fundamental-1.webp", "gal-fundamental-9.webp", "gal-fundamental-12.webp", "gal-fundamental-3.webp",
  "gal-fundamental-8.webp", "gal-fundamental-18.webp", "gal-fundamental-6.webp", "gal-fundamental-16.webp", "gal-fundamental-4.webp",
  "gal-fundamental-10.webp", "gal-fundamental-15.webp", "gal-fundamental-13.webp",
]);

export const SEG_BERCARIO_DEFAULT: GalFoto[] = semLegenda([
  "gal-bercario-1.webp", "gal-bercario-7.webp", "gal-bercario-3.webp", "gal-bercario-9.webp", "gal-bercario-5.webp",
  "gal-bercario-11.webp", "gal-bercario-2.webp", "gal-bercario-8.webp", "gal-bercario-4.webp", "gal-bercario-10.webp",
  "gal-bercario-6.webp", "gal-bercario-12.webp",
]);

// Fotos do bloco "Tecnologia" da Metodologia (ideal manter 4 fotos)
export const MET_TEC_FOTOS: GalFoto[] = [
  { url: asset("tec-1.webp"), titulo: "Alunos usando notebook em sala", descricao: "" },
  { url: asset("tec-4.webp"), titulo: "Turma do Fundamental com notebooks", descricao: "" },
  { url: asset("tec-3.webp"), titulo: "Alunas aprendendo no computador", descricao: "" },
  { url: asset("tec-2.webp"), titulo: "Atividade pedagógica no notebook", descricao: "" },
];

// Linha do tempo da página Sobre (foto + frase)
export const SOBRE_TIMELINE_DEFAULT: GalFoto[] = [
  { url: asset("timeline/t01.webp"), titulo: "", descricao: "Onde tudo começou." },
  { url: asset("timeline/t02.webp"), titulo: "", descricao: "Os primeiros passos, com propósito e dedicação." },
  { url: asset("timeline/t03.webp"), titulo: "", descricao: "Um novo olhar, novos caminhos." },
  { url: asset("timeline/t04.webp"), titulo: "", descricao: "Histórias que ganham vida nas páginas e nos encontros." },
  { url: asset("timeline/t05.webp"), titulo: "", descricao: "Aprender também é brincar, viver e explorar." },
  { url: asset("timeline/t06.webp"), titulo: "", descricao: "Experiências que ampliam o aprender." },
  { url: asset("timeline/t07.webp"), titulo: "", descricao: "A emoção da primeira formatura." },
  { url: asset("timeline/t08.webp"), titulo: "", descricao: "Crescimento que abre novos horizontes." },
  { url: asset("timeline/t09.webp"), titulo: "", descricao: "Novas experiências e novas possibilidades." },
  { url: asset("timeline/t10.webp"), titulo: "", descricao: "Seguimos crescendo com o mesmo propósito." },
  { url: asset("timeline/t11.webp"), titulo: "", descricao: "Desafios que nos fizeram reinventar." },
  { url: asset("timeline/t12.webp"), titulo: "", descricao: "Mesmo distantes, seguimos presentes." },
  { url: asset("timeline/t13.webp"), titulo: "", descricao: "Novos projetos, novas formas de aprender." },
  { url: asset("timeline/t14.webp"), titulo: "", descricao: "Um novo ciclo começa a ganhar forma." },
  { url: asset("timeline/t15.webp"), titulo: "", descricao: "Crescemos em estrutura e serviços — e fortalecemos nossa essência." },
];
