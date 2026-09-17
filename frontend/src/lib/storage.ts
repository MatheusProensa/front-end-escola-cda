// Upload de imagens para o Storage do Supabase (bucket "fotos").
import { supabase } from "./supabase";

const BUCKET = "fotos";

// Sobe um arquivo e retorna a URL pública.
export async function uploadImagem(file: File, pasta = ""): Promise<string> {
  // valida antes de enviar: só imagens e até 8 MB. (Alguns navegadores/OS
  // reportam type vazio para imagens válidas — nesse caso não bloqueia.)
  if (file.type && !file.type.startsWith("image/")) throw new Error("O arquivo selecionado não é uma imagem.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Imagem muito grande (máximo 8 MB). Reduza o tamanho e tente de novo.");
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
