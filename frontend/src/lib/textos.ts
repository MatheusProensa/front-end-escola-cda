// Blocos de texto (com imagem) editáveis das páginas internas.
// O site lê do banco (page_content) e cai nestes padrões quando não há nada salvo.
import { asset } from "./assets";
import type { Lista } from "./listas";

export type Bloco = {
  tag?: string;      // etiqueta sobre a foto
  eyebrow?: string;  // texto pequeno acima do título
  titulo?: string;
  destaque?: string; // palavra/trecho em destaque (cor) ao lado do título
  p1?: string;
  p2?: string;
  btn?: string;      // rótulo do botão (usado nas faixas de chamada)
  img?: string;      // resolvida (asset) ou url do storage
};

/* ───── Sobre ───── */
export const SOBRE_HISTORIA: Bloco = {
  tag: "Nossa história", eyebrow: "Quem somos", titulo: "Uma história construída com afeto",
  p1: "Tudo começou como \"Carinha de Anjo\" — um lugar pensado para acolher cada criança com afeto, segurança e propósito, ao lado das famílias. Em 15 anos nos tornamos a Escola CDA: crescemos em espaços, vivências e estrutura, mas mantivemos intacto o que nos move — o cuidado humano com a infância.",
  p2: "Acreditamos que aprender acontece com escuta, vínculo e experiências que marcam. É assim, todos os dias, que transformamos vidas.",
  img: asset("nossa-historia.webp"),
};
export const SOBRE_ALIMENTACAO: Bloco = {
  tag: "Alimentação saudável", eyebrow: "Comer bem também é cuidar", titulo: "Comida de verdade, feita com carinho",
  p1: "Comida de verdade, feita na escola e com acompanhamento nutricional. Sem industrializados — priorizamos alimentos naturais e o que colhemos na nossa própria horta.",
  img: asset("alimentacao.webp"),
};
export const SOBRE_ALIMENTACAO_ITENS: Lista[] = [
  { t: "Refeições ao longo do dia", d: "Fruta e almoço pela manhã; fruta e lanche à tarde. No Ensino Fundamental, o lanche." },
  { t: "Da horta para a mesa", d: "Parte das hortaliças e temperos vem da nossa própria horta." },
  { t: "Sem industrializados", d: "Receitas feitas na escola; nos berçários, sem sal e açúcar." },
];
export const SOBRE_TIMELINE_HEAD: Bloco = {
  eyebrow: "15 anos de caminhada", titulo: "Nossa linha do tempo",
  p1: "De \"Carinha de Anjo\" à Escola CDA — cada fase carregou o mesmo cuidado com a infância.",
};
export const SOBRE_VALORES_HEAD: Bloco = { eyebrow: "No que acreditamos", titulo: "Valores que guiam cada dia" };
export const SOBRE_CTA: Bloco = {
  titulo: "Venha fazer parte da nossa história",
  p1: "Agende uma visita e descubra por que tantas famílias confiam na CDA há 15 anos.",
  btn: "Quero conhecer",
};

/* ───── Espaços ───── */
export const ESPACOS_SOLAR: Bloco = {
  tag: "Energia limpa", eyebrow: "Sustentabilidade", titulo: "Uma escola movida a energia solar",
  p1: "Investimos em energia limpa porque cuidar da infância também é cuidar do futuro do planeta. Nossos painéis abastecem o dia a dia da escola e ainda viram aprendizado sobre consciência ambiental para as crianças.",
  img: asset("drone.webp"),
};
export const ESPACOS_SOLAR_ITENS: Lista[] = [
  { t: "Energia limpa e renovável", d: "Painéis solares que reduzem o impacto ambiental." },
  { t: "Consciência ambiental", d: "As crianças aprendem, na prática, a cuidar do planeta." },
  { t: "Recurso que volta pra educação", d: "A economia gerada é reinvestida no aprendizado." },
];
export const ESPACOS_FEATS_HEAD: Bloco = { eyebrow: "Por dentro de cada espaço", titulo: "Feitos para o bem-estar de cada criança" };
export const ESPACOS_CTA: Bloco = {
  titulo: "Cada espaço fica ainda melhor com seu filho nele",
  p1: "Agende uma visita e conheça de perto cada ambiente feito com cuidado para a infância.",
  btn: "Agendar visita",
};

/* ───── Metodologia ───── */
export const MET_INTRO: Bloco = {
  tag: "Aprender por inteiro", eyebrow: "Mais que conteúdo", titulo: "Um ensino que forma o intelecto, a cidadania e o emocional",
  p1: "Trabalhamos habilidades, valores e competências que acompanham nossos alunos em cada escolha, relação e desafio da vida. É a integração entre emoção, razão e ação — uma jornada educativa com propósito e sentido.",
  img: asset("sala-aula.webp"),
};
export const MET_INFANTIL_BLOCO: Bloco = {
  tag: "Educação Infantil", eyebrow: "Educação Infantil", titulo: "Descobrir, sentir e se expressar",
  p1: "Na Educação Infantil, a proposta do ProRaiz é baseada em vivências, como recomenda a BNCC: a criança aprende por meio de interações e brincadeiras, vivendo experiências com significado e propósito.",
  img: asset("infantil-met.webp"),
};
export const MET_FUNDAMENTAL_BLOCO: Bloco = {
  tag: "Ensino Fundamental", eyebrow: "Ensino Fundamental", titulo: "Pensar, criar e transformar",
  p1: "No Ensino Fundamental, o conhecimento se constrói por meio de trocas — com os colegas, com o mundo e com os objetos de aprendizagem. Partindo do que o aluno já sabe, o aprendizado se torna relevante e aplicável à vida.",
  img: asset("fundamental-met.webp"),
};

/* ───── Vivências ───── */
export const VIV_TARDE_HEAD: Bloco = { eyebrow: "Turno da tarde", titulo: "Especializadas", p1: "Aulas que fazem parte da rotina e ampliam o repertório de corpo, ritmo e movimento." };
export const VIV_MANHA_HEAD: Bloco = { eyebrow: "Turno da manhã", titulo: "Oficinas", p1: "No contraturno, oficinas que despertam talentos, valores e novas descobertas a cada dia." };
export const VIV_EXTRAS_HEAD: Bloco = { eyebrow: "Parcerias da escola", titulo: "Aulas extras", p1: "Atividades opcionais em parceria, para a família escolher o que mais combina com a criança." };
export const VIV_CTA: Bloco = {
  titulo: "Toda criança tem um talento esperando para florescer",
  p1: "Venha ver de perto como as vivências da CDA despertam o melhor de cada aluno.",
  btn: "Agendar visita",
};

export const MET_DIMENSOES_HEAD: Bloco = { eyebrow: "Dimensões do desenvolvimento", titulo: "O que cultivamos em cada criança" };
export const MET_TEC_HEAD: Bloco = {
  eyebrow: "Tecnologia no Ensino Fundamental", titulo: "Aprender também é", destaque: "conectar-se",
  p1: "No Ensino Fundamental, unimos o ensino de qualidade à tecnologia: os alunos usam notebooks em atividades pedagógicas que tornam o aprendizado mais ativo, interativo e conectado ao mundo de hoje — sempre com mediação dos professores.",
};
export const MET_MATERIAL_HEAD: Bloco = {
  eyebrow: "Material didático", titulo: "Materiais de excelência, alinhados à BNCC",
  p1: "A metodologia ProRaiz conta com materiais exclusivos e atualizados, desenvolvidos por professores atuantes para estimular o aprendizado significativo e o protagonismo do aluno.",
};
export const MET_PILARES5_HEAD: Bloco = { eyebrow: "Pilares que sustentam a proposta", titulo: "A base de tudo que fazemos" };
export const MET_CTA: Bloco = {
  titulo: "Mais que uma metodologia, um compromisso com a vida",
  p1: "Na CDA, o ProRaiz fortalece nossa missão de formar alunos preparados para aprender, conviver, escolher e transformar o mundo com consciência e empatia.",
  btn: "Conheça nossa escola",
};

/* ───── Home ───── */
export const HOME_PROPOSITO: Bloco = {
  eyebrow: "EDUCAÇÃO COM PROPÓSITO", titulo: "Um jeito de aprender que respeita a infância",
  p1: "Aprender acontece com afeto, escuta e vivências significativas. Valorizamos a infância como uma fase de descobertas, autonomia e construção de vínculos.",
  img: asset("giovana.webp"),
};
export const HOME_CONEXAO: Bloco = {
  eyebrow: "CONEXÃO QUE TRANSFORMA", titulo: "Educação construída com carinho, escuta e presença diária",
  p1: "Acreditamos que a parceria entre escola e família é essencial para que cada criança se desenvolva com segurança, autonomia e confiança.",
  img: asset("conexao.webp"),
};
