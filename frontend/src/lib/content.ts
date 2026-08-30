// Camada central de conteúdo editável.
// As páginas públicas leem o conteúdo do banco (tabela page_content) e, se não
// houver nada salvo (ou em modo demo), usam o conteúdo padrão embutido no código.
// Assim o site nunca "quebra" e qualquer edição no painel aparece de verdade.

import { useEffect, useState } from "react";
import { supabase, API_CONFIGURED } from "./supabase";

export type SectionMap = Record<string, unknown>;

// Busca todas as seções de uma página: { hero: {...}, pilares: [...], ... }
// Lança em caso de erro real (rede/permissão) — assim quem chama distingue
// "banco vazio" de "falha de carregamento" e evita salvar padrão por cima do conteúdo.
export async function loadPage(pagina: string): Promise<SectionMap> {
  if (!API_CONFIGURED) return {};
  const { data, error } = await supabase
    .from("page_content")
    .select("secao, dados")
    .eq("pagina", pagina);
  if (error) throw error;
  const map: SectionMap = {};
  (data ?? []).forEach((row: { secao: string; dados: unknown }) => {
    map[row.secao] = row.dados;
  });
  return map;
}

// Hook para páginas públicas e editores: carrega as seções uma vez.
// `loading` = ainda buscando; `erro` = a busca falhou (não é "vazio").
// Os editores usam `erro` para NÃO autossalvar o padrão por cima do conteúdo real.
export function usePageContent(pagina: string): { sec: SectionMap; loading: boolean; erro: boolean } {
  const [sec, setSec] = useState<SectionMap>({});
  const [loading, setLoading] = useState(API_CONFIGURED);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    let alive = true;
    setErro(false);
    loadPage(pagina)
      .then((m) => { if (alive) setSec(m); })
      .catch(() => { if (alive) setErro(true); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [pagina]);

  return { sec, loading, erro };
}

// Lê uma seção com fallback no padrão. Mescla raso para tolerar campos novos.
export function section<T>(sec: SectionMap, nome: string, fallback: T): T {
  const v = sec[nome];
  if (v == null) return fallback;
  if (Array.isArray(v) || typeof v !== "object") return v as T;
  return { ...fallback, ...(v as object) } as T;
}

// Salva (upsert) várias seções de uma página de uma vez — usado pelo painel.
export async function savePage(
  pagina: string,
  secoes: Record<string, unknown>
): Promise<void> {
  const linhas = Object.entries(secoes).map(([secao, dados]) => ({ pagina, secao, dados }));
  const { error } = await supabase
    .from("page_content")
    .upsert(linhas, { onConflict: "pagina,secao" });
  if (error) throw error;
}
