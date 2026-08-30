-- Escola CDA — reforço de segurança (defesa extra)
-- Troca as regras de "qualquer usuário autenticado" por "somente o admin"
-- (identificado pelo e-mail no token). Execute todo este arquivo no SQL Editor.
--
-- Se algum dia o e-mail do admin mudar, troque o valor abaixo em TODAS as linhas.

-- ============================================================
-- site_settings
-- ============================================================
drop policy if exists "site_settings: escrita autenticada" on site_settings;
drop policy if exists "site_settings: escrita admin" on site_settings;
create policy "site_settings: escrita admin" on site_settings
  for update using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- page_content
-- ============================================================
drop policy if exists "page_content: escrita autenticada" on page_content;
drop policy if exists "page_content: atualização autenticada" on page_content;
drop policy if exists "page_content: inserção admin" on page_content;
drop policy if exists "page_content: atualização admin" on page_content;
create policy "page_content: inserção admin" on page_content
  for insert with check ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "page_content: atualização admin" on page_content
  for update using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- depoimentos
-- ============================================================
drop policy if exists "depoimentos: leitura total autenticada" on depoimentos;
drop policy if exists "depoimentos: escrita autenticada" on depoimentos;
drop policy if exists "depoimentos: atualização autenticada" on depoimentos;
drop policy if exists "depoimentos: remoção autenticada" on depoimentos;
drop policy if exists "depoimentos: leitura total admin" on depoimentos;
drop policy if exists "depoimentos: inserção admin" on depoimentos;
drop policy if exists "depoimentos: atualização admin" on depoimentos;
drop policy if exists "depoimentos: remoção admin" on depoimentos;
create policy "depoimentos: leitura total admin" on depoimentos
  for select using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "depoimentos: inserção admin" on depoimentos
  for insert with check ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "depoimentos: atualização admin" on depoimentos
  for update using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "depoimentos: remoção admin" on depoimentos
  for delete using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- albuns
-- ============================================================
drop policy if exists "albuns: leitura total autenticada" on albuns;
drop policy if exists "albuns: escrita autenticada" on albuns;
drop policy if exists "albuns: atualização autenticada" on albuns;
drop policy if exists "albuns: remoção autenticada" on albuns;
drop policy if exists "albuns: leitura total admin" on albuns;
drop policy if exists "albuns: inserção admin" on albuns;
drop policy if exists "albuns: atualização admin" on albuns;
drop policy if exists "albuns: remoção admin" on albuns;
create policy "albuns: leitura total admin" on albuns
  for select using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "albuns: inserção admin" on albuns
  for insert with check ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "albuns: atualização admin" on albuns
  for update using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "albuns: remoção admin" on albuns
  for delete using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- fotos
-- ============================================================
drop policy if exists "fotos: leitura total autenticada" on fotos;
drop policy if exists "fotos: escrita autenticada" on fotos;
drop policy if exists "fotos: remoção autenticada" on fotos;
drop policy if exists "fotos: leitura total admin" on fotos;
drop policy if exists "fotos: inserção admin" on fotos;
drop policy if exists "fotos: remoção admin" on fotos;
create policy "fotos: leitura total admin" on fotos
  for select using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "fotos: inserção admin" on fotos
  for insert with check ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "fotos: remoção admin" on fotos
  for delete using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- matriculas (envio continua público; leitura/edição só admin)
-- ============================================================
drop policy if exists "matriculas: leitura autenticada" on matriculas;
drop policy if exists "matriculas: atualização autenticada" on matriculas;
drop policy if exists "matriculas: leitura admin" on matriculas;
drop policy if exists "matriculas: atualização admin" on matriculas;
drop policy if exists "matriculas: remoção admin" on matriculas;
create policy "matriculas: leitura admin" on matriculas
  for select using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "matriculas: atualização admin" on matriculas
  for update using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');
create policy "matriculas: remoção admin" on matriculas
  for delete using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- Limites de tamanho em matriculas (defesa contra abuso/spam via API direta).
-- Idempotente: remove a constraint antiga antes de recriar. Rode uma vez.
-- ============================================================
alter table matriculas drop constraint if exists matriculas_tamanhos;
alter table matriculas add constraint matriculas_tamanhos check (
  char_length(coalesce(responsavel, ''))   <= 120 and
  char_length(coalesce(whatsapp, ''))       <= 30  and
  char_length(coalesce(nome_crianca, ''))   <= 120 and
  char_length(coalesce(idade_crianca, ''))  <= 40  and
  char_length(coalesce(segmento, ''))       <= 60  and
  char_length(coalesce(mensagem, ''))       <= 2000
);
