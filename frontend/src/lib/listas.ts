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

/* ───── Segmentos (blocos principais) ───── */
// metodo/stats: um item por linha no formato "Título | descrição".
// chips: separados por vírgula. Os padrões reproduzem o que já estava no site.
export type SegBloco = {
  key: string; img: string; icon: string; tag: string; pos?: string;
  title: string; p: string; metodo: string; chipsLabel: string; chips: string; stats: string;
};
export const SEG_BLOCOS: SegBloco[] = [
  {
    key: "infantil", img: asset("infantil.webp"), icon: "child-reaching", tag: "Berçário à pré-escola", pos: "center 30%",
    title: "Educação Infantil",
    p: "A fase das primeiras descobertas — do berçário à pré-escola. Acolhemos cada criança com afeto e criamos um ambiente seguro onde aprender é, antes de tudo, brincar, explorar e se sentir amada.",
    metodo: "Berçário acolhedor | Cuidado afetivo e atento desde os primeiros meses, com rotina de sono, alimentação e estímulos.\nAprender brincando | O brincar é a linguagem da infância e o caminho do aprendizado.\nProposta participativa (BNCC) | Projetos a partir dos interesses da criança, com o sistema ProRaiz.\nInglês desde o Maternal 1 | No período da tarde, de forma lúdica e interdisciplinar.",
    chipsLabel: "Especializadas · turno da tarde",
    chips: "Musicalização, Educação Física, Capoeira, Inglês",
    stats: "0–5 | anos\nTarde | 13h–18h30\nContraturno | opcional",
  },
  {
    key: "fundamental", img: asset("fundamental-home.webp"), icon: "book", tag: "Anos iniciais", pos: "center 30%",
    title: "Ensino Fundamental",
    p: "O momento de ampliar horizontes sobre uma base sólida. Cada aluno cresce curioso, confiante e preparado para os próximos passos da vida escolar.",
    metodo: "Aprendizagem ativa | O aluno no centro: investiga, questiona e constrói o conhecimento.\nPensamento crítico | Projetos que desenvolvem raciocínio, leitura de mundo e argumentação.\nTecnologia no aprendizado | Notebooks em atividades pedagógicas que conectam o aluno ao mundo digital.",
    chipsLabel: "Contraturno do Fundamental",
    chips: "Artes Circenses, Libras, Reforço Escolar",
    stats: "Anos | iniciais\nTarde | 13h–18h30\nContraturno | opcional",
  },
  {
    key: "contraturno", img: asset("seg-contraturno.webp"), icon: "clock|r", tag: "Turno da manhã", pos: "center 28%",
    title: "Contraturno",
    p: "No turno da manhã, cada dia é uma nova experiência. Oficinas diferenciadas ampliam o aprender de forma leve, com tempo também para o brincar livre e a alimentação cuidada.",
    metodo: "Uma oficina por dia | De segunda a sexta, uma vivência diferente para cada manhã.\nRotina equilibrada | Oficinas, brincar livre, alimentação e descanso em harmonia.\nAprender com leveza | Experiências que estimulam talentos sem peso de conteúdo.",
    chipsLabel: "Oficinas da semana",
    chips: "Libras, Educação Socioemocional, Culinária Afetiva, Educação Ambiental",
    stats: "Manhã | 7h–12h45\n1 oficina | por dia\nAlmoço | incluso",
  },
];

/* ───── Home (prévias da página inicial) ───── */
export type HomeCard = { img: string; icon: string; t: string; p: string; to?: string; pos?: string; c?: string };

export const HOME_SEG_CARDS: HomeCard[] = [
  { img: asset("infantil-home.webp"), icon: "child-reaching", t: "Educação Infantil", p: "Do berçário à pré-escola, acolhemos cada conquista com amor e estimulamos o aprender brincando.", to: "/segmentos", pos: "center 35%" },
  { img: asset("fundamental-livro.webp"), icon: "book", t: "Ensino Fundamental", p: "Anos iniciais com aprendizagem ativa, pensamento crítico e desenvolvimento integral.", to: "/segmentos", pos: "center 24%" },
  { img: asset("contraturno-home.webp"), icon: "clock|r", t: "Contraturno", p: "Acolhimento no turno da manhã com rotina equilibrada e oficinas que ampliam o aprender.", to: "/segmentos", pos: "center 18%" },
  { img: asset("oficinas.webp"), icon: "paintbrush", t: "Oficinas", p: "Libras, Educação Socioemocional, Culinária e Educação Ambiental — no contraturno.", to: "/vivencias" },
];

export const HOME_VIV_CARDS: HomeCard[] = [
  { img: asset("musica.webp"), icon: "music", c: "#f0b400", t: "Musicalização", p: "Estímulo à sensibilidade, criatividade e expressão através da música.", pos: "center 88%" },
  { img: asset("capoeira.webp"), icon: "hand-fist", c: "#0b82f6", t: "Capoeira", p: "Promove disciplina, respeito, coordenação e consciência corporal.", pos: "center 42%" },
  { img: asset("ambiental.webp"), icon: "leaf", c: "#0b82f6", t: "Ed. Ambiental", p: "Conexão com a natureza para formar cidadãos conscientes e responsáveis.", pos: "" },
  { img: asset("culinaria.webp"), icon: "utensils", c: "#f0b400", t: "Culinária Afetiva", p: "Com a nutricionista: autonomia, saúde e afeto ao aprender com as mãos.", pos: "center 100%" },
  { img: asset("ingles.webp"), icon: "globe", c: "#0b82f6", t: "Proposta Bilíngue", p: "Imersão no inglês desde cedo para formar alunos preparados para o futuro.", pos: "" },
];

export type FeatItem = { icon: string; t: string; p: string };
export const HOME_CONEXAO_FEATS: FeatItem[] = [
  { icon: "user-group", t: "Acompanhamento próximo", p: "Olhar individual para cada aluno." },
  { icon: "heart", t: "Diálogo com as famílias", p: "Comunicação aberta, transparente e constante." },
  { icon: "shield-halved", t: "Desenvolvimento integral", p: "Cuidado com o cognitivo, emocional e social." },
  { icon: "star", t: "Vivências que marcam", p: "Experiências que constroem memórias e valores." },
];

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
