// Cabeçalhos (intro) editáveis de cada página — texto padrão = o que está no site hoje.
export type Intro = { eyebrow: string; titulo: string; destaque: string; texto: string };

export const INTROS: Record<string, Intro> = {
  segmentos: {
    eyebrow: "Nossos segmentos",
    titulo: "Caminhos de aprendizado para cada",
    destaque: "fase da infância",
    texto: "Da descoberta aos novos desafios, cada segmento acompanha o desenvolvimento da criança com acolhimento, propósito e experiências que despertam o aprender.",
  },
  metodologia: {
    eyebrow: "Nossa metodologia",
    titulo: "Formação integral",
    destaque: "para a vida inteira",
    texto: "A CDA adota a metodologia ProRaiz, que une o aprendizado acadêmico ao desenvolvimento socioemocional para formar crianças mais autônomas, confiantes e conscientes do seu papel no mundo.",
  },
  vivencias: {
    eyebrow: "Vivências que transformam",
    titulo: "Experiências que despertam habilidades",
    destaque: "para a vida",
    texto: "Mais do que atividades, são vivências reais que estimulam talentos, desenvolvem competências e tornam o aprendizado vivo, criativo e cheio de significado.",
  },
  espacos: {
    eyebrow: "Nosso espaço",
    titulo: "Ambientes pensados para acolher, explorar e",
    destaque: "crescer",
    texto: "Cada cantinho da CDA é preparado com cuidado para oferecer segurança, conforto e experiências que fazem parte do desenvolvimento infantil.",
  },
  sobre: {
    eyebrow: "Sobre a escola",
    titulo: "Há 15 anos sonhando junto com as",
    destaque: "famílias",
    texto: "Mais que uma escola, somos uma comunidade que acredita na educação como um ato de afeto, propósito e parceria — para formar crianças felizes e preparadas para a vida.",
  },
};
