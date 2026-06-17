-- Escola CDA — histórico de edições
-- Registra automaticamente (via trigger) toda inserção/atualização/remoção
-- feita nas tabelas editáveis pelo painel admin: quem, quando, o quê.
-- Execute este arquivo inteiro no SQL Editor do Supabase.

create table if not exists historico_edicoes (
  id bigint generated always as identity primary key,
  tabela text not null,
  operacao text not null check (operacao in ('insert', 'update', 'delete')),
  registro_id text,
  dados_antigos jsonb,
  dados_novos jsonb,
  usuario_email text,
  created_at timestamptz default now()
);

alter table historico_edicoes enable row level security;

drop policy if exists "historico_edicoes: leitura admin" on historico_edicoes;
create policy "historico_edicoes: leitura admin" on historico_edicoes
  for select using ((auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com');

-- ============================================================
-- função genérica do trigger (security definer: grava mesmo que
-- o usuário não tenha permissão direta de insert na tabela de log)
-- ============================================================
create or replace function registrar_historico() returns trigger as $$
declare
  v_id text;
begin
  v_id := case when TG_OP = 'DELETE' then (old.id)::text else (new.id)::text end;
  insert into historico_edicoes (tabela, operacao, registro_id, dados_antigos, dados_novos, usuario_email)
  values (
    TG_TABLE_NAME,
    lower(TG_OP),
    v_id,
    case when TG_OP in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
    case when TG_OP in ('UPDATE', 'INSERT') then to_jsonb(new) else null end,
    auth.jwt() ->> 'email'
  );
  return coalesce(new, old);
end;
$$ language plpgsql security definer;

-- ============================================================
-- triggers nas tabelas editáveis pelo painel
-- ============================================================
drop trigger if exists trg_historico_site_settings on site_settings;
create trigger trg_historico_site_settings
  after insert or update or delete on site_settings
  for each row execute function registrar_historico();

drop trigger if exists trg_historico_page_content on page_content;
create trigger trg_historico_page_content
  after insert or update or delete on page_content
  for each row execute function registrar_historico();

drop trigger if exists trg_historico_depoimentos on depoimentos;
create trigger trg_historico_depoimentos
  after insert or update or delete on depoimentos
  for each row execute function registrar_historico();

drop trigger if exists trg_historico_albuns on albuns;
create trigger trg_historico_albuns
  after insert or update or delete on albuns
  for each row execute function registrar_historico();

drop trigger if exists trg_historico_fotos on fotos;
create trigger trg_historico_fotos
  after insert or update or delete on fotos
  for each row execute function registrar_historico();

drop trigger if exists trg_historico_matriculas on matriculas;
create trigger trg_historico_matriculas
  after insert or update or delete on matriculas
  for each row execute function registrar_historico();
