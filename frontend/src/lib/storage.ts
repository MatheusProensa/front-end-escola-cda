// Upload de imagens para o Storage do Supabase (bucket "fotos").
import { supabase } from "./supabase";

const BUCKET = "fotos";

// Sobe um arquivo e retorna a URL pública.
export async function uploadImagem(file: File, pasta = ""): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const nome = `${pasta ? pasta + "/" : ""}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(nome, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(nome);
  return data.publicUrl;
}

// Remove uma imagem do Storage a partir da URL pública (best-effort).
export async function removerImagem(url: string): Promise<void> {
  const marcador = `/${BUCKET}/`;
  const i = url.indexOf(marcador);
  if (i === -1) return;
  const path = url.slice(i + marcador.length);
  await supabase.storage.from(BUCKET).remove([path]);
}
