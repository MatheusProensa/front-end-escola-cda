-- Escola CDA — permissões do Storage (bucket "fotos")
-- Pré-requisito: criar um bucket PÚBLICO chamado "fotos" no painel do Supabase.
-- Leitura pública; upload/atualização/remoção só para o admin.

create policy "fotos: leitura pública"
  on storage.objects for select
  using ( bucket_id = 'fotos' );

create policy "fotos: upload admin"
  on storage.objects for insert
  with check ( bucket_id = 'fotos' and (auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com' );

create policy "fotos: atualização admin"
  on storage.objects for update
  using ( bucket_id = 'fotos' and (auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com' );

create policy "fotos: remoção admin"
  on storage.objects for delete
  using ( bucket_id = 'fotos' and (auth.jwt() ->> 'email') = 'sm.escolacda@gmail.com' );
