import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { api, API_CONFIGURED } from "../lib/api";
import "./admin.css";

/* Navegação do painel */
const NAV_MAIN: [string, string, string, string][] = [
  ["/admin/dashboard", "Dashboard", "gauge-high", "dashboard"],
  ["/admin/home", "Home", "house", "home"],
  ["/admin/segmentos", "Segmentos", "layer-group", "segmentos"],
  ["/admin/metodologia", "Metodologia", "graduation-cap", "metodologia"],
  ["/admin/vivencias", "Vivências", "palette", "vivencias"],
  ["/admin/espacos", "Espaços", "image", "espacos"],
  ["/admin/sobre", "Sobre", "book-open", "sobre"],
];
const NAV_GERIR: [string, string, string, string][] = [
  ["/admin/momentos", "Momentos", "camera-retro", "momentos"],
  ["/admin/matriculas", "Matrículas", "envelope-open-text", "matriculas"],
  ["/admin/contato", "Contato", "address-book", "contato"],
  ["/admin/configuracoes", "Configurações", "gear", "configuracoes"],
];

function Sidebar({ active, open, onClose, logoSrc }: { active: string; open: boolean; onClose: () => void; logoSrc: string }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const sair = async () => { await logout(); navigate("/admin/login"); };
  return (
    <>
      <div className={"adm-backdrop" + (open ? " show" : "")} onClick={onClose}></div>
      <aside className={"adm-side" + (open ? " open" : "")}>
        <div className="adm-side-logo">
          <img src={logoSrc} alt="Escola CDA" style={{ filter: "brightness(0) invert(1)" }} />
          <span className="badge">ADMIN</span>
        </div>

        <div className="adm-side-label">Conteúdo do site</div>
        <nav className="adm-nav">
          {NAV_MAIN.map(([to, label, icon, key]) => (
            <Link key={key} to={to} className={active === key ? "active" : ""} onClick={onClose}>
              <i className={"fa-solid fa-" + icon}></i>{label}
            </Link>
          ))}
        </nav>

        <div className="adm-side-label">Gerir</div>
        <nav className="adm-nav">
          {NAV_GERIR.map(([to, label, icon, key]) => (
            <Link key={key} to={to} className={active === key ? "active" : ""} onClick={onClose}>
              <i className={"fa-solid fa-" + icon}></i>{label}
            </Link>
          ))}
        </nav>

        <div className="adm-side-foot">
          <div className="adm-side-card">
            <b>Site publicado</b>
            Última atualização há 2 dias. Tudo no ar e funcionando.
          </div>
          <button className="adm-logout" onClick={sair}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Sair
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, subtitle, onBurger }: { title: string; subtitle: string; onBurger: () => void }) {
  const { user } = useAuth();
  const [novasMatriculas, setNovasMatriculas] = useState(0);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current || !API_CONFIGURED) return;
    fetched.current = true;
    api<{ status: string }[]>("/api/admin/matriculas")
      .then((data) => setNovasMatriculas(data.filter((m) => m.status === "novo").length))
      .catch(() => {});
  }, []);

  const initials = user?.nome
    ? user.nome.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase()
    : "CDA";

  return (
    <header className="adm-top">
      <button className="adm-burger" onClick={onBurger} aria-label="Menu"><i className="fa-solid fa-bars"></i></button>
      <div className="adm-top-title">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="adm-top-actions">
        <div className="adm-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Buscar conteúdo…" />
        </div>
        <button className="adm-icon-btn" aria-label="Ajuda"><i className="fa-regular fa-circle-question"></i></button>
        <Link to="/admin/matriculas" className="adm-icon-btn" aria-label="Matrículas" style={{ position: "relative", display: "inline-flex" }}>
          <i className="fa-regular fa-envelope"></i>
          {novasMatriculas > 0 && <span className="dot" style={{ position: "absolute", top: 6, right: 6 }}></span>}
        </Link>
        <div className="adm-user">
          <div className="adm-avatar">{initials}</div>
          <div className="adm-user-meta">
            <strong>{user?.nome ?? "Equipe CDA"}</strong>
            <span>Administrador</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AdminShell({ active, title, subtitle, logoSrc, children }: {
  active: string; title: string; subtitle: string; logoSrc: string; children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="adm-shell">
      <Sidebar active={active} open={open} onClose={() => setOpen(false)} logoSrc={logoSrc} />
      <div className="adm-main">
        <Topbar title={title} subtitle={subtitle} onBurger={() => setOpen(true)} />
        <div className="adm-content">{children}</div>
      </div>
    </div>
  );
}
