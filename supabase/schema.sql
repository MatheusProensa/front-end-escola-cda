-- Escola CDA — esquema do banco para Supabase
-- Execute este arquivo inteiro em: Supabase Dashboard > SQL Editor > New query
--
-- Segurança: a escrita (e a leitura de dados sensíveis, como matrículas) é
-- liberada SOMENTE para o e-mail do admin abaixo. Se o e-mail do admin mudar,
-- troque o valor em todas as policies que usam (auth.jwt() ->> 'email').

-- ============================================================
-- site_settings — configurações de contato exibidas no site
-- (linha única, sempre id = 1)
-- ============================================================
create table if not exists site_settings (
  id integer primary key default 1,
  whatsapp text default '',
  telefone text default '',
  wpp_link text default '',
  endereco text default '',
  horario text default '',
  instagram text default '',
  facebook text default '',
  updated_at timestamptz default now(),
  constraint site_settings_singleton check (id = 1)
);

insert into site_settings (id, whatsapp, telefone, wpp_link, endereco, horario, instagram, facebook)
values (1, '(55) 3217-7947', '(55) 3217-7947', 'https://wa.me/555532177947', 'R. José Manhago, 194 - Camobi, Santa Maria - RS', 'Segunda a Sexta, 7h às 18h', '@escolacda.sm', '/escolacda.sm')
on conflict (id) do nothing;

alter table site_settings enable row level security;

create policy "site_settings: leitura pública" on site_settings
  for select using (true);

create policy "site_settings: escrita autenticada" on site_settings
  for update using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

-- ============================================================
-- page_content — conteúdo editável de cada página (por seção)
-- ============================================================
create table if not exists page_content (
  id bigint generated always as identity primary key,
  pagina text not null,
  secao text not null,
  dados jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now(),
  unique (pagina, secao)
);

alter table page_content enable row level security;

create policy "page_content: leitura pública" on page_content
  for select using (true);

create policy "page_content: escrita autenticada" on page_content
  for insert with check ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "page_content: atualização autenticada" on page_content
  for update using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

-- ============================================================
-- depoimentos — carrossel da home
-- ============================================================
create table if not exists depoimentos (
  id bigint generated always as identity primary key,
  nome text not null,
  texto text not null,
  ativo boolean default true,
  ordem integer default 0,
  created_at timestamptz default now()
);

alter table depoimentos enable row level security;

create policy "depoimentos: leitura pública dos ativos" on depoimentos
  for select using (ativo = true);

create policy "depoimentos: leitura total autenticada" on depoimentos
  for select using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "depoimentos: escrita autenticada" on depoimentos
  for insert with check ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "depoimentos: atualização autenticada" on depoimentos
  for update using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "depoimentos: remoção autenticada" on depoimentos
  for delete using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

-- ============================================================
-- albuns e fotos — galeria de momentos
-- ============================================================
create table if not exists albuns (
  id bigint generated always as identity primary key,
  titulo text not null,
  capa_url text,
  publicado boolean default true,
  created_at timestamptz default now()
);

alter table albuns enable row level security;

create policy "albuns: leitura pública dos publicados" on albuns
  for select using (publicado = true);

create policy "albuns: leitura total autenticada" on albuns
  for select using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "albuns: escrita autenticada" on albuns
  for insert with check ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "albuns: atualização autenticada" on albuns
  for update using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "albuns: remoção autenticada" on albuns
  for delete using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create table if not exists fotos (
  id bigint generated always as identity primary key,
  album_id bigint not null references albuns(id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

alter table fotos enable row level security;

create policy "fotos: leitura pública via album publicado" on fotos
  for select using (
    exists (select 1 from albuns where albuns.id = fotos.album_id and albuns.publicado = true)
  );

create policy "fotos: leitura total autenticada" on fotos
  for select using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "fotos: escrita autenticada" on fotos
  for insert with check ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "fotos: remoção autenticada" on fotos
  for delete using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

-- ============================================================
-- matriculas — formulário de interesse (site público envia)
-- ============================================================
create table if not exists matriculas (
  id bigint generated always as identity primary key,
  responsavel text not null,
  whatsapp text not null,
  nome_crianca text,
  idade_crianca text,
  segmento text not null,
  mensagem text,
  status text not null default 'novo' check (status in ('novo', 'em_contato', 'matriculado', 'arquivado')),
  created_at timestamptz default now()
);

alter table matriculas enable row level security;

create policy "matriculas: envio público" on matriculas
  for insert with check (true);

create policy "matriculas: leitura autenticada" on matriculas
  for select using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "matriculas: atualização autenticada" on matriculas
  for update using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

create policy "matriculas: remoção admin" on matriculas
  for delete using ((auth.jwt() ->> 'email') = 'escolacdasm@gmail.com');

-- ============================================================
-- conteúdo inicial da Home (hero, pilares, diário)
-- ============================================================
insert into page_content (pagina, secao, dados) values
  ('home', 'hero', '{"selo":"HÁ 15 ANOS","titulo":"Família e escola","destaque":"sonham juntas.","texto":"Acreditamos que a educação vai muito além do ensino. É sobre acolher, inspirar e transformar vidas para construir um futuro melhor."}'),
  ('home', 'pilares', '[{"titulo":"Acolhimento que abraça","descricao":"Ambiente seguro, afetivo e cheio de empatia."},{"titulo":"Ensino que desenvolve","descricao":"Aprendizagem significativa para a vida toda."},{"titulo":"Valores que inspiram","descricao":"Incentivamos autonomia, respeito e responsabilidade."},{"titulo":"Parceria que transforma","descricao":"Família e escola juntas no mesmo propósito."}]'),
  ('home', 'diario', '{"titulo":"Você acompanha tudo, todos os dias","texto":"Recados, fotos e a rotina do seu filho direto no celular — em tempo real, pelo app Diário Escola.","recursos":"Agenda diária\nRecados\nMural & álbuns\nMedicamentos\nCalendário & presença\nEm tempo real"}')
on conflict (pagina, secao) do nothing;

-- Cabeçalhos (intro) editáveis das páginas internas
insert into page_content (pagina, secao, dados) values
  ('segmentos', 'intro', '{"eyebrow":"Nossos segmentos","titulo":"Caminhos de aprendizado para cada","destaque":"fase da infância","texto":"Da descoberta aos novos desafios, cada segmento acompanha o desenvolvimento da criança com acolhimento, propósito e experiências que despertam o aprender."}'),
  ('metodologia', 'intro', '{"eyebrow":"Nossa metodologia","titulo":"Formação integral","destaque":"para a vida inteira","texto":"A CDA adota a metodologia ProRaiz, que une o aprendizado acadêmico ao desenvolvimento socioemocional para formar crianças mais autônomas, confiantes e conscientes do seu papel no mundo."}'),
  ('vivencias', 'intro', '{"eyebrow":"Vivências que transformam","titulo":"Experiências que despertam habilidades","destaque":"para a vida","texto":"Mais do que atividades, são vivências reais que estimulam talentos, desenvolvem competências e tornam o aprendizado vivo, criativo e cheio de significado."}'),
  ('espacos', 'intro', '{"eyebrow":"Nosso espaço","titulo":"Ambientes pensados para acolher, explorar e","destaque":"crescer","texto":"Cada cantinho da CDA é preparado com cuidado para oferecer segurança, conforto e experiências que fazem parte do desenvolvimento infantil."}'),
  ('sobre', 'intro', '{"eyebrow":"Sobre a escola","titulo":"Há 15 anos sonhando junto com as","destaque":"famílias","texto":"Mais que uma escola, somos uma comunidade que acredita na educação como um ato de afeto, propósito e parceria — para formar crianças felizes e preparadas para a vida."}')
on conflict (pagina, secao) do nothing;
