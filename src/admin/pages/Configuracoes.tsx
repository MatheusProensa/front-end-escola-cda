import { useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast, Toggle } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");

export default function Configuracoes() {
  const [toast, toastNode] = useToast();
  const [equipe] = useState<[string, string, string][]>([
    ["Equipe CDA", "Administradora", "CD"],
    ["Marketing", "Editor", "MK"],
  ]);
  return (
    <AdminShell active="configuracoes" title="Configurações" subtitle="Conta, equipe e preferências do painel" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-gear"></i></div>
        <div><h1>Configurações</h1><p>Gerencie sua conta, a equipe e as preferências do painel.</p></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-user"></i></div><h3>Perfil</h3></div>
            <div className="adm-grid-fields">
              <div><label className="adm-form-label">Nome</label><input className="adm-text" defaultValue="Equipe CDA" /></div>
              <div><label className="adm-form-label">E-mail</label><input className="adm-text" defaultValue="equipe@escolacda.com.br" /></div>
            </div>
            <label className="adm-form-label">Senha</label>
            <input className="adm-text" type="password" defaultValue="••••••••" />
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-users"></i></div><h3>Equipe com acesso</h3></div>
            {equipe.map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 0", borderBottom: i === 0 ? "1px solid var(--adm-line-soft)" : "none" }}>
                <div className="adm-avatar" style={{ width: 38, height: 38, fontSize: 13 }}>{u[2]}</div>
                <div style={{ flex: 1 }}><strong style={{ display: "block", fontSize: 14, color: "var(--adm-navy)" }}>{u[0]}</strong><span style={{ fontSize: 12, color: "var(--adm-ink-3)" }}>{u[1]}</span></div>
                <button className="adm-mini-btn"><i className="fa-solid fa-ellipsis"></i></button>
              </div>
            ))}
            <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 14 }}><i className="fa-solid fa-user-plus"></i> Convidar membro</button>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-universal-access"></i></div><h3>Acessibilidade</h3></div>
            <div className="adm-toggle-row"><div className="tr-tx"><strong>Tradutor de Libras (VLibras)</strong><span>Exibe o botão “Acessível em Libras” em todas as páginas</span></div><Toggle on={true} /></div>
            <div className="adm-toggle-row"><div className="tr-tx"><strong>Recursos de acessibilidade</strong><span>Aumentar/diminuir fonte e alto contraste</span></div><Toggle on={true} /></div>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-sliders"></i></div><h3>Preferências</h3></div>
            <div className="adm-toggle-row"><div className="tr-tx"><strong>Notificações por e-mail</strong><span>Receber avisos de alterações no site</span></div><Toggle on={true} /></div>
            <div className="adm-toggle-row"><div className="tr-tx"><strong>Confirmar antes de publicar</strong><span>Pedir confirmação ao publicar mudanças</span></div><Toggle on={true} /></div>
            <div className="adm-toggle-row"><div className="tr-tx"><strong>Modo manutenção do site</strong><span>Exibir aviso de “em manutenção” aos visitantes</span></div><Toggle on={false} /></div>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>Sobre o painel</h3>
            <div className="adm-status-row"><span>Versão</span><b>1.0.0</b></div>
            <div className="adm-status-row"><span>Site</span><b>Escola CDA</b></div>
            <div className="adm-status-row"><span>Ambiente</span><b>Produção</b></div>
          </div>
          <div className="adm-card" style={{ background: "var(--adm-rose-soft)", border: "1px solid #f5d2da" }}>
            <h3 style={{ fontSize: 15, marginBottom: 6, color: "#b8324b" }}>Zona de risco</h3>
            <p style={{ fontSize: 12.5, color: "#9c4357", lineHeight: 1.6, margin: "0 0 12px" }}>Encerrar todas as sessões ativas e sair do painel em todos os dispositivos.</p>
            <button className="adm-btn adm-btn-sm" style={{ width: "100%", background: "#e0556e", color: "#fff" }}><i className="fa-solid fa-arrow-right-from-bracket"></i> Encerrar sessões</button>
          </div>
        </div>
      </div>

      <SaveBar onSave={() => toast("Configurações salvas!")} />
      {toastNode}
    </AdminShell>
  );
}
