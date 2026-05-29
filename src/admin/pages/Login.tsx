import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asset } from "../../lib/assets";
import "../admin.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 🔌 Integração com backend entra aqui:
    //    const res = await fetch("/api/admin/login", { method: "POST", body: JSON.stringify({ email, senha }) });
    //    if (res.ok) navigate("/admin/dashboard");
    setTimeout(() => navigate("/admin/dashboard"), 800);
  };

  return (
    <div className="adm-login">
      <div className="adm-login-bg" style={{ backgroundImage: `url(${asset("bg-home.webp")})` }}></div>
      <div className="adm-login-glow g1"></div>
      <div className="adm-login-glow g2"></div>

      <div className="adm-login-card">
        <img className="adm-login-logo" src={asset("logo-cda-15anos-semborda.webp")} alt="Escola CDA" />
        <span className="adm-eyebrow">Painel Administrativo</span>
        <h1>Bem-vindo de volta</h1>
        <p className="sub">Acesse o painel para gerenciar o conteúdo do site da Escola CDA.</p>

        <form onSubmit={submit}>
          <div className="adm-field">
            <label htmlFor="email">E-mail</label>
            <div className="adm-input-wrap">
              <i className="fa-regular fa-envelope"></i>
              <input id="email" className="adm-input" type="email" placeholder="seu@escolacda.com.br" defaultValue="equipe@escolacda.com.br" required />
            </div>
          </div>

          <div className="adm-field">
            <label htmlFor="senha">Senha</label>
            <div className="adm-input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input id="senha" className="adm-input" type={show ? "text" : "password"} placeholder="••••••••" defaultValue="senha123" required />
              <button type="button" className="adm-eye" onClick={() => setShow((s) => !s)} aria-label="Mostrar senha">
                <i className={show ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
              </button>
            </div>
          </div>

          <div className="adm-row-between">
            <label className="adm-check"><input type="checkbox" defaultChecked /> Manter conectado</label>
            <span className="adm-link">Esqueci a senha</span>
          </div>

          <button type="submit" className="adm-btn adm-btn-primary" disabled={loading}>
            {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Entrando…</> : <>Entrar no painel <i className="fa-solid fa-arrow-right-long"></i></>}
          </button>
        </form>

        <div className="adm-login-foot">
          <i className="fa-solid fa-shield-halved lock"></i> Acesso restrito à equipe autorizada da Escola CDA
        </div>
      </div>
    </div>
  );
}
