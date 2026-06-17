import { useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";
import { useAuth } from "../auth";
import { supabase, API_CONFIGURED } from "../../lib/supabase";

const logo = () => asset("logo-cda-15anos-semborda.webp");

export default function Configuracoes() {
  const [toast, toastNode] = useToast();
  const [saving, setSaving] = useState(false);
  const { user, logout } = useAuth();

  const initials = user?.nome
    ? user.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "CDA";

  const nomePublicado = user?.nome ?? "Equipe CDA";
  const [nome, setNome] = useState(nomePublicado);
  const [email] = useState(user?.email ?? "equipe@escolacda.com.br");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");

  const dirty = nome !== nomePublicado || senha !== "" || senhaConf !== "";

  const save = async () => {
    if (senha && senha !== senhaConf) {
      toast("As senhas não coincidem.", true);
      return;
    }
    setSaving(true);
    try {
      if (API_CONFIGURED) {
        const { error } = await supabase.auth.updateUser({
          data: { nome },
          ...(senha ? { password: senha } : {}),
        });
        if (error) throw error;
      }
      toast("Configurações salvas!");
      setSenha("");
      setSenhaConf("");
    } catch {
      toast("Erro ao salvar. Tente novamente.", true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell active="configuracoes" title="Configurações" subtitle="Conta, equipe e preferências do painel" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-gear"></i></div>
        <div><h1>Configurações</h1><p>Gerencie sua conta e as preferências do painel.</p></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-user"></i></div><h3>Perfil</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">Nome</label><input className="adm-text" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
              <div><label className="adm-form-label">E-mail</label><input className="adm-text" value={email} disabled style={{ opacity: 0.6 }} /></div>
            </div>
            <div className="adm-grid-fields">
              <div>
                <label className="adm-form-label">Nova senha</label>
                <input className="adm-text" type="password" placeholder="Deixe em branco para não alterar" value={senha} onChange={(e) => setSenha(e.target.value)} />
              </div>
              <div>
                <label className="adm-form-label">Confirmar senha</label>
                <input className="adm-text" type="password" placeholder="Repita a nova senha" value={senhaConf} onChange={(e) => setSenhaConf(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-universal-access"></i></div><h3>Acessibilidade do site</h3></div>
            <p style={{ fontSize: 13, color: "var(--adm-ink-2)", lineHeight: 1.7, margin: 0 }}>
              O site já oferece, em todas as páginas e para todos os visitantes:
            </p>
            <ul style={{ fontSize: 13, color: "var(--adm-ink-2)", lineHeight: 1.8, margin: "10px 0 0", paddingLeft: 18 }}>
              <li><strong>Tradutor de Libras (VLibras)</strong> — botão "Acessível em Libras"</li>
              <li><strong>Aumentar / diminuir fonte</strong> e <strong>alto contraste</strong></li>
            </ul>
            <p style={{ fontSize: 12.5, color: "var(--adm-ink-3)", marginTop: 10 }}>Esses recursos ficam sempre ativos — não é preciso configurar nada.</p>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card" style={{ textAlign: "center" }}>
            <div className="adm-avatar" style={{ width: 60, height: 60, fontSize: 20, margin: "0 auto 12px" }}>{initials}</div>
            <strong style={{ display: "block", fontSize: 15 }}>{user?.nome}</strong>
            <span style={{ fontSize: 12, color: "var(--adm-ink-3)" }}>{user?.email}</span>
          </div>
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>Sobre o painel</h3>
            <div className="adm-status-row"><span>Versão</span><b>1.0.0</b></div>
            <div className="adm-status-row"><span>Backend</span><b>{API_CONFIGURED ? "Conectado" : "Modo demo"}</b></div>
          </div>
          <div className="adm-card" style={{ background: "var(--adm-rose-soft)", border: "1px solid #f5d2da" }}>
            <h3 style={{ fontSize: 15, marginBottom: 6, color: "#b8324b" }}>Zona de risco</h3>
            <p style={{ fontSize: 12.5, color: "#9c4357", lineHeight: 1.6, margin: "0 0 12px" }}>Encerrar sessão em todos os dispositivos.</p>
            <button className="adm-btn adm-btn-sm" style={{ width: "100%", background: "#e0556e", color: "#fff" }} onClick={logout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Encerrar sessão
            </button>
          </div>
        </div>
      </div>

      {dirty && <SaveBar onSave={save} saving={saving} onDiscard={() => { setNome(nomePublicado); setSenha(""); setSenhaConf(""); }} />}
      {toastNode}
    </AdminShell>
  );
}
