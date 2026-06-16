import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asset } from "../../lib/assets";
import { useAuth } from "../auth";
import { ApiError } from "../../lib/supabase";
import "../admin.css";

export default function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("equipe@escolacda.com.br");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    // validação simples (UX) — a validação de verdade é no backend
    if (!email.trim() || !senha.trim()) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), senha);
      navigate("/admin/dashboard");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Não foi possível entrar. Tente novamente.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={submit} noValidate>
          {erro ? (
            <div className="adm-login-erro"><i className="fa-solid fa-circle-exclamation"></i> {erro}</div>
          ) : null}

          <div className="adm-field">
            <label htmlFor="email">E-mail</label>
            <div className="adm-input-wrap">
              <i className="fa-regular fa-envelope"></i>
              <input id="email" className="adm-input" type="email" autoComplete="username" placeholder="seu@escolacda.com.br" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="adm-field">
            <label htmlFor="senha">Senha</label>
            <div className="adm-input-wrap">
              <i className="fa-solid fa-lock"></i>
              <input id="senha" className="adm-input" type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} required />
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
