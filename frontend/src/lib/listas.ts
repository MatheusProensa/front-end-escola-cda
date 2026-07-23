// Conteúdo padrão (fallback) das listas/cards editáveis das páginas internas.
// O site lê do banco (page_content) e cai nestes padrões quando não há nada salvo.
// Imagens já vêm resolvidas (asset) para funcionarem igual no site e no admin.
import { asset } from "./assets";

export type Valor = { icon: string; gold: boolean; t: string; p: string };
export type Lista = { t: string; d: string };
export type Viv = { icon: string; gold: boolean; t: string; p: string; img: string; pos?: string };
export type Chip = { icon: string; t: string };

// resolve o caminho de imagem (asset embutido OU url já completa do storage)
export function imgUrl(v: string): string {
  if (!v) return "";
  return v.startsWith("http") || v.startsWith("/") ? v : asset(v);
}

/* ───── Metodologia ───── */
export const MET_DIMENSOES: Valor[] = [
  { icon: "hand-holding-heart", gold: false, t: "Inteligência emocional", p: "Cuidamos das emoções e dos vínculos, desenvolvendo empatia, autoconhecimento e autorregulação." },
  { icon: "lightbulb", gold: true, t: "Protagonismo e autonomia", p: "Incentivamos a criança a tomar decisões, assumir responsabilidades e construir confiança em si mesma." },
  { icon: "comments", gold: false, t: "Pensamento crítico e argumentação", p: "Estimulamos o diálogo, a escuta ativa e a construção de ideias com respeito, clareza e propósito." },
];
export const MET_INFANTIL: Lista[] = [
  { t: "Aprendizagem criativa", d: "Atividades que desenvolvem o conhecimento pela criatividade, reflexão e interação, contemplando os cinco campos de experiências da BNCC." },
  { t: "Desenvolvimento socioemocional", d: "Ludicidade, comunicação e cooperação: a criança se conhece, constrói sua identidade e fortalece emoções e empatia." },
  { t: "Educação ambiental", d: "Investigar, explorar e observar para criar hábitos de cuidado e respeito — entender que todos somos natureza." },
];
export const MET_FUNDAMENTAL: Lista[] = [
  { t: "Construção por trocas", d: "O aluno aprende na interação com os colegas, com o mundo e com os objetos de aprendizagem." },
  { t: "Conhecimento que faz sentido", d: "Partindo do que o aluno já sabe, um aprendizado relevante e aplicável à sua vida." },
  { t: "Raciocínio e autonomia", d: "A problematização e a organização do pensamento despertam curiosidade e reflexão." },
  { t: "Leitura crítica do mundo", d: "Capacidade de interagir criticamente com diferentes fontes de informação, conforme a BNCC." },
];
export const MET_PILARES5: Valor[] = [
  { icon: "seedling", gold: false, t: "Aprendizagem significativa", p: "Um saber que se conecta com a vida real e com o mundo do aluno." },
  { icon: "users", gold: true, t: "Formação humana", p: "Valores, ética, empatia e respeito como base de todas as relações." },
  { icon: "leaf", gold: false, t: "Consciência ambiental", p: "Cuidado e responsabilidade com o planeta e com o outro." },
  { icon: "wand-magic-sparkles", gold: true, t: "Inovação com propósito", p: "Tecnologia e criatividade a serviço de uma educação mais humana." },
  { icon: "hand-holding-heart", gold: false, t: "Parceria com a família", p: "Juntos na missão de educar, acolher e transformar." },
];

export const MET_TEC_CHIPS: Chip[] = [
  { icon: "laptop", t: "Notebooks em sala" },
  { icon: "gamepad", t: "Aprendizagem interativa" },
  { icon: "chalkboard-user", t: "Mediação do professor" },
  { icon: "globe", t: "Conexão com o mundo digital" },
];
export const MET_MATERIAL_CHIPS: Chip[] = [
  { icon: "comment", t: "Linguagem acessível e envolvente" },
  { icon: "globe", t: "Conteúdos conectados à realidade" },
  { icon: "pen-ruler", t: "Atividades práticas e reflexivas" },
  { icon: "tablet-screen-button", t: "Recursos digitais interativos" },
  { icon: "certificate", t: "100% alinhado à BNCC" },
];

/* ───── Sobre ───── */
export const SOBRE_VALORES: Valor[] = [
  { icon: "hand-holding-heart", gold: false, t: "Acolhimento", p: "Cada criança é recebida com afeto, escuta e respeito ao seu tempo." },
  { icon: "seedling", gold: true, t: "Respeito à infância", p: "Valorizamos o brincar e o descobrir como caminhos legítimos de aprender." },
  { icon: "brain", gold: false, t: "Desenvolvimento integral", p: "Cuidamos do cognitivo, do emocional e do social, de forma equilibrada." },
  { icon: "user-group", gold: true, t: "Parceria com a família", p: "Escola e família caminham juntas, em diálogo aberto e constante." },
  { icon: "lightbulb", gold: false, t: "Autonomia", p: "Incentivamos a confiança, a responsabilidade e a iniciativa." },
  { icon: "star", gold: true, t: "Propósito", p: "Educamos para a vida, com sentido, valores e olhar para o futuro." },
];

/* ───── Espaços ───── */
export const ESPACOS_FEATS: Valor[] = [
  { icon: "shield-halved", gold: false, t: "Segurança", p: "Ambientes seguros, pensados para o bem-estar dos alunos." },
  { icon: "heart", gold: true, t: "Acolhimento", p: "Espaços que recebem com carinho e humanização." },
  { icon: "seedling", gold: false, t: "Natureza", p: "Áreas verdes que despertam curiosidade e cuidado." },
  { icon: "lightbulb", gold: true, t: "Descobertas", p: "Lugares que inspiram aprendizagem e novas experiências." },
];

/* ───── Vivências (3 grupos de cards) ───── */
export const VIV_TARDE: Viv[] = [
  { img: asset("musica.webp"), icon: "music", gold: true, t: "Musicalização", p: "Sensibilidade, criatividade e expressão através da música e do ritmo.", pos: "center 88%" },
  { img: asset("capoeira.webp"), icon: "hand-fist", gold: false, t: "Capoeira", p: "Disciplina, respeito, coordenação e consciência corporal em movimento.", pos: "center 42%" },
  { img: asset("edfisica.webp"), icon: "person-running", gold: true, t: "Educação Física", p: "Movimento, esquema corporal, coordenação e o prazer de praticar esportes.", pos: "center 52%" },
];
export const VIV_MANHA: Viv[] = [
  { img: asset("ambiental.webp"), icon: "leaf", gold: false, t: "Educação Ambiental", p: "Conexão com a natureza para formar cidadãos conscientes e responsáveis — conduzida pela professora da turma." },
  { img: asset("culinaria.webp"), icon: "utensils", gold: true, t: "Culinária Afetiva", p: "Com a nutricionista: autonomia, saúde e afeto ao aprender com as mãos.", pos: "center 100%" },
  { img: asset("socioemocional.webp"), icon: "face-smile", gold: false, t: "Educação Socioemocional", p: "Empatia, autoconhecimento e relações saudáveis — desenvolvida pela professora da turma.", pos: "center 35%" },
  { img: asset("libras.webp"), icon: "hands-asl-interpreting", gold: true, t: "Libras", p: "Com a educadora especial: primeiros contatos com a Língua Brasileira de Sinais para incluir e conectar.", pos: "center 32%" },
];
export const VIV_EXTRAS: Viv[] = [
  { img: asset("bombeiromirim.webp"), icon: "helmet-safety", gold: false, t: "Bombeiro Mirim", p: "Disciplina, coragem e cidadania com noções de prevenção e segurança.", pos: "center 75%" },
  { img: "", icon: "shoe-prints", gold: true, t: "Ballet", p: "Postura, leveza e expressão: o corpo que aprende a dançar com graça." },
  { img: "", icon: "user-ninja", gold: false, t: "Taekwondo", p: "Foco, respeito e autocontrole através da arte marcial." },
];
