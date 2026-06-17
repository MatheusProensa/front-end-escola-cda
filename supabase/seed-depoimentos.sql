-- Escola CDA — migra os depoimentos que hoje sao fixos no codigo para o banco
-- Resultado: ficam 100% editaveis/apagaveis pelo admin (Depoimentos), e continuam
-- aparecendo exatamente como hoje no carrossel da Home.
-- Execute uma unica vez em: Supabase Dashboard > SQL Editor > New query

insert into depoimentos (nome, texto, ativo, ordem) values
  ('Pais da Mariah B.', 'Confiamos na escola CDA para deixar nossa filha desde 1 ano e 3 meses. Hoje a Mariah está com 5 anos e permanecemos fazendo parte da escola. O cuidado e carinho faz toda a diferença, além de uma proposta pedagógica rica e diversificada.', true, 1),
  ('Pais do Otto B.', 'Temos plena confiança na escolinha e fico super tranquila enquanto o Otto está na escola. A CDA faz parte do desenvolvimento do nosso filho — e o principal é que ele adora a escola e todos os profissionais que trabalham nela!', true, 2),
  ('Pais da Laura L.', 'Confiamos plenamente na educação e no cuidado que a CDA oferece. Todo ambiente é pensado no melhor para as crianças, e temos certeza de que a Laura está numa escola capacitada. Só temos a agradecer!', true, 3),
  ('Pais da Giovanna Z.', 'Confiamos no trabalho da CDA pelo diálogo sempre próximo com a família, pela valorização da brincadeira e dos interesses das crianças.', true, 4),
  ('Família CDA', 'Parabéns pelo excelente trabalho que fazem, pelo carinho e amor com que conduzem o dia a dia dos nossos filhos. O resultado é esse: crianças felizes e confiantes para desenvolver a autonomia e suas habilidades!', true, 5),
  ('Mãe de alunos', 'Parabéns pra essa escola que faz parte do início escolar dos meus filhos e que tenho muito carinho e confiança! Indico para todos que conheço. Profissionais sempre atenciosos e dedicados — moram em nosso coração!', true, 6),
  ('Gilmar', 'Parabéns, escola CDA! Dedicação, carinho, respeito e responsabilidade junto a um ensino de qualidade!', true, 7),
  ('Flávia Pedrosa', 'Melhor escola — e melhor escolha que fizemos!', true, 8);
