import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Registro = {
  id: number;
  tabela: string;
  operacao: "insert" | "update" | "delete";
  registro_id: string | null;
  dados_antigos: Record<string, unknown> | null;
  dados_novos: Record<string, unknown> | null;
  usuario_email: string | null;
  created_at: string;
};

const TABELA_LABEL: Record<string, string> = {
  site_settings: "Configurações de contato",
  page_content: "Conteúdo do site",
  depoimentos: "Depoimentos",
  albuns: "Álbuns",
  fotos: "Fotos",
  matriculas: "Matrículas",
};

const OPERACAO_LABEL: Record<string, string> = { insert: "Criado", update: "Editado", delete: "Excluído" };
const OPERACAO_ICONE: Record<string, string> = { insert: "plus", update: "pen", delete: "trash" };
const OPERACAO_COR: Record<string, string> = {
  insert: "var(--adm-green)",
  update: "var(--adm-blue)",
  delete: "var(--adm-rose)",
};
const OPERACAO_FUNDO: Record<string, string> = {
  insert: "var(--adm-green-soft)",
  update: "#e9f2ff",
  delete: "#fdeaea",
};

const CAMPOS_IGNORADOS = new Set(["id", "created_at", "updated_at"]);

// Tenta achar um nome legível pro registro afetado (título, nome da pessoa, página/seção...).
function identificarRegistro(r: Registro): string {
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

// Lista os nomes dos campos que mudaram entre o estado antigo e o novo.
function camposAlterados(r: Registro): string[] {
  if (r.operacao !== "update" || !r.dados_antigos || !r.dados_novos) return [];
  const chaves = new Set([...Object.keys(r.dados_antigos), ...Object.keys(r.dados_novos)]);
  const alterados: string[] = [];
  chaves.forEach((k) => {
    if (CAMPOS_IGNORADOS.has(k)) return;
    if (JSON.stringify(r.dados_antigos![k]) !== JSON.stringify(r.dados_novos![k])) alterados.push(k);
  });
  return alterados;
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function HistoricoEdicoes() {
  const [itens, setItens] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [filtroTabela, setFiltroTabela] = useState("todas");
  const [aberto, setAberto] = useState<number | null>(null);

  useEffect(() => {
    if (!API_CONFIGURED) { setLoading(false); return; }
    setLoading(true);
    setErro("");
    supabase
      .from("historico_edicoes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) setErro("Erro ao carregar histórico. Verifique se a tabela historico_edicoes foi criada (supabase/historico.sql).");
        else setItens((data ?? []) as Registro[]);
        setLoading(false);
      });
  }, []);

  const tabelasDisponiveis = Array.from(new Set(itens.map((i) => i.tabela)));
  const itensFiltrados = filtroTabela === "todas" ? itens : itens.filter((i) => i.tabela === filtroTabela);

  return (
    <AdminShell active="historico" title="Histórico de edições" subtitle="Quem mudou o quê, e quando" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-clock-rotate-left"></i></div>
        <div><h1>Histórico de edições</h1><p>Registro automático de tudo que foi criado, editado ou excluído no painel.</p></div>
        <div className="ph-act">
          <select
            className="adm-input"
            style={{ width: "auto" }}
            value={filtroTabela}
            onChange={(e) => setFiltroTabela(e.target.value)}
          >
            <option value="todas">Todas as seções</option>
            {tabelasDisponiveis.map((t) => (
              <option key={t} value={t}>{TABELA_LABEL[t] ?? t}</option>
            ))}
          </select>
        </div>
      </div>

      {!API_CONFIGURED ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}>
          <i className="fa-solid fa-plug" style={{ fontSize: 32, color: "var(--adm-ink-3)", marginBottom: 12, display: "block" }}></i>
          <p style={{ color: "var(--adm-ink-3)" }}>Configure o backend para visualizar o histórico.</p>
        </div>
      ) : erro ? (
        <div className="adm-card" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
          <p style={{ fontSize: 13, color: "#92400e", margin: 0 }}><i className="fa-solid fa-triangle-exclamation"></i> {erro}</p>
        </div>
      ) : loading ? (
        <div className="adm-card"><p style={{ color: "var(--adm-ink-3)", fontSize: 13 }}>Carregando…</p></div>
      ) : !itensFiltrados.length ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}>
          <i className="fa-solid fa-clock-rotate-left" style={{ fontSize: 32, color: "var(--adm-ink-3)", marginBottom: 12, display: "block" }}></i>
          <p style={{ color: "var(--adm-ink-3)" }}>Nenhuma edição registrada ainda.</p>
        </div>
      ) : (
        <div className="adm-card" style={{ padding: 0 }}>
          {itensFiltrados.map((r) => {
            const alterados = camposAlterados(r);
            return (
              <div key={r.id} style={{ borderBottom: "1px solid var(--adm-line-soft)" }}>
                <button
                  onClick={() => setAberto(aberto === r.id ? null : r.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                    background: OPERACAO_FUNDO[r.operacao], color: OPERACAO_COR[r.operacao], flexShrink: 0,
                  }}>
                    <i className={"fa-solid fa-" + OPERACAO_ICONE[r.operacao]}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: "var(--adm-navy)", fontWeight: 600 }}>
                      <span style={{ color: OPERACAO_COR[r.operacao] }}>{OPERACAO_LABEL[r.operacao]}</span>
                      {" · "}{TABELA_LABEL[r.tabela] ?? r.tabela}
                      {" — "}<span style={{ color: "var(--adm-ink-2)", fontWeight: 400 }}>{identificarRegistro(r)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--adm-ink-3)", marginTop: 2 }}>
                      {formatarData(r.created_at)} · {r.usuario_email ?? "desconhecido"}
                      {alterados.length > 0 && <> · campos alterados: {alterados.join(", ")}</>}
                    </div>
                  </div>
                  <i className={"fa-solid fa-chevron-" + (aberto === r.id ? "up" : "down")} style={{ color: "var(--adm-ink-3)", fontSize: 12 }}></i>
                </button>
                {aberto === r.id && (
                  <div style={{ padding: "0 18px 18px 64px", display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {r.dados_antigos && (
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--adm-ink-3)", marginBottom: 6 }}>ANTES</div>
                        <pre style={{ fontSize: 11.5, background: "var(--adm-bg)", borderRadius: 8, padding: 12, overflow: "auto", margin: 0 }}>
                          {JSON.stringify(r.dados_antigos, null, 2)}
                        </pre>
                      </div>
                    )}
                    {r.dados_novos && (
                      <div style={{ flex: 1, minWidth: 240 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--adm-ink-3)", marginBottom: 6 }}>DEPOIS</div>
                        <pre style={{ fontSize: 11.5, background: "var(--adm-bg)", borderRadius: 8, padding: 12, overflow: "auto", margin: 0 }}>
                          {JSON.stringify(r.dados_novos, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
