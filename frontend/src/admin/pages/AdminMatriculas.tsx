import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { useToast } from "../ui";
import { asset } from "../../lib/assets";
import { api, API_CONFIGURED } from "../../lib/api";

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Matricula = {
  id: number;
  responsavel: string;
  whatsapp: string;
  nome_crianca: string | null;
  idade_crianca: string | null;
  segmento: string;
  mensagem: string | null;
  status: "novo" | "em_contato" | "matriculado" | "arquivado";
  created_at: string;
};

const STATUS_LABEL: Record<string, string> = {
  novo: "Novo",
  em_contato: "Em contato",
  matriculado: "Matriculado",
  arquivado: "Arquivado",
};
const STATUS_COLOR: Record<string, string> = {
  novo: "#0b82f6",
  em_contato: "#f59e0b",
  matriculado: "#1f9d57",
  arquivado: "#9ca3af",
};

export default function AdminMatriculas() {
  const [toast, toastNode] = useToast();
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todos");

  const load = () => {
    if (!API_CONFIGURED) { setLoading(false); return; }
    api<Matricula[]>("/api/admin/matriculas")
      .then(setMatriculas)
      .catch(() => toast("Erro ao carregar matrículas.", true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      await api(`/api/admin/matriculas/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) });
      setMatriculas((prev) => prev.map((m) => m.id === id ? { ...m, status: status as Matricula["status"] } : m));
      toast("Status atualizado!");
    } catch {
      toast("Erro ao atualizar.", true);
    }
  };

  const filtradas = filtro === "todos" ? matriculas : matriculas.filter((m) => m.status === filtro);
  const novas = matriculas.filter((m) => m.status === "novo").length;

  return (
    <AdminShell active="matriculas" title="Matrículas" subtitle="Solicitações recebidas pelo site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-envelope-open-text"></i></div>
        <div><h1>Matrículas</h1><p>Gerencie as solicitações de interesse recebidas pelo formulário do site.</p></div>
        {novas > 0 && <div className="ph-act"><span style={{ background: "#0b82f6", color: "#fff", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 700 }}>{novas} nova{novas > 1 ? "s" : ""}</span></div>}
      </div>

      {!API_CONFIGURED ? (
        <div className="adm-card" style={{ textAlign: "center", padding: 40 }}>
          <i className="fa-solid fa-plug" style={{ fontSize: 32, color: "var(--adm-ink-3)", marginBottom: 12, display: "block" }}></i>
          <p style={{ color: "var(--adm-ink-3)" }}>Configure <code>VITE_API_URL</code> para visualizar as matrículas.</p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {["todos", "novo", "em_contato", "matriculado", "arquivado"].map((s) => (
              <button key={s} onClick={() => setFiltro(s)}
                className={"adm-btn adm-btn-sm " + (filtro === s ? "adm-btn-primary" : "adm-btn-ghost")}
                style={{ width: "auto" }}>
                {s === "todos" ? "Todos" : STATUS_LABEL[s]}
                {s !== "todos" && <span style={{ marginLeft: 5, opacity: 0.8 }}>({matriculas.filter((m) => m.status === s).length})</span>}
              </button>
            ))}
          </div>

          <div className="adm-card" style={{ padding: 0, overflow: "hidden" }}>
            {loading ? (
              <div style={{ padding: 40, textAlign: "center", color: "var(--adm-ink-3)" }}>Carregando…</div>
            ) : filtradas.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "var(--adm-ink-3)" }}>Nenhuma solicitação encontrada.</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--adm-bg)", borderBottom: "1px solid var(--adm-line)" }}>
                    {["Responsável", "WhatsApp", "Criança", "Segmento", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "var(--adm-ink-2)", fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtradas.map((m) => (
                    <tr key={m.id} style={{ borderBottom: "1px solid var(--adm-line-soft)" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>{m.responsavel}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <a href={`https://wa.me/55${m.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" style={{ color: "#25d366" }}>
                          <i className="fa-brands fa-whatsapp"></i> {m.whatsapp}
                        </a>
                      </td>
                      <td style={{ padding: "12px 16px" }}>{m.nome_crianca ? `${m.nome_crianca}${m.idade_crianca ? `, ${m.idade_crianca}` : ""}` : "—"}</td>
                      <td style={{ padding: "12px 16px" }}>{m.segmento}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <select value={m.status} onChange={(e) => updateStatus(m.id, e.target.value)}
                          style={{ border: `1px solid ${STATUS_COLOR[m.status]}`, color: STATUS_COLOR[m.status], background: "transparent", borderRadius: 6, padding: "3px 8px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          {Object.entries(STATUS_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {m.mensagem && (
                          <button className="adm-mini-btn" title={m.mensagem}><i className="fa-regular fa-comment"></i></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      {toastNode}
    </AdminShell>
  );
}
