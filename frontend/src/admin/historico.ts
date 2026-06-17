// Tipos e helpers compartilhados pela página de Histórico e pelo widget do Dashboard.

export type Registro = {
  id: number;
  tabela: string;
  operacao: "insert" | "update" | "delete";
  registro_id: string | null;
  dados_antigos: Record<string, unknown> | null;
  dados_novos: Record<string, unknown> | null;
  usuario_email: string | null;
  created_at: string;
};

export const TABELA_LABEL: Record<string, string> = {
  site_settings: "Configurações de contato",
  page_content: "Conteúdo do site",
  depoimentos: "Depoimentos",
  albuns: "Álbuns",
  fotos: "Fotos",
  matriculas: "Matrículas",
};

// Tenta achar um nome legível pro registro afetado (título, nome da pessoa, página/seção...).
export function identificarRegistro(r: Registro): string {
  const dados = (r.dados_novos ?? r.dados_antigos) as Record<string, unknown> | null;
  if (!dados) return `#${r.registro_id ?? "?"}`;
  if (r.tabela === "page_content") return `${dados.pagina} / ${dados.secao}`;
  if (r.tabela === "depoimentos") return String(dados.nome ?? `#${r.registro_id}`);
  if (r.tabela === "albuns") return String(dados.titulo ?? `#${r.registro_id}`);
  if (r.tabela === "matriculas") return String(dados.responsavel ?? `#${r.registro_id}`);
  if (r.tabela === "fotos") return `álbum #${dados.album_id ?? "?"}`;
  if (r.tabela === "site_settings") return "dados de contato";
  return `#${r.registro_id ?? "?"}`;
}
