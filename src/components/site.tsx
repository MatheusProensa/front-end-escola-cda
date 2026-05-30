import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { asset } from "../lib/assets";

export const WPP = "https://wa.me/555532177947";

// Título + descrição únicos por página (SEO em SPA)
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
      m.setAttribute("content", description);
    }
  }, [title, description]);
}

/* ───────────── Ícone (Font Awesome 6 via CDN) ───────────── */
type IconProps = { name: string; color?: string; size?: number; brand?: boolean };
export function Icon({ name, color, size, brand }: IconProps) {
  const reg = name.endsWith("|r");
  const base = name.replace("|r", "");
  const cls = `${brand ? "fa-brands" : reg ? "fa-regular" : "fa-solid"} fa-${base}`;
  return <i className={cls} style={{ color, fontSize: size, lineHeight: 1 }} aria-hidden="true" />;
}

/* ───────────── Contexto do modal de contato ───────────── */
/* ───────────── Contexto de contato (→ página Matrículas) ───────────── */
const ContactCtx = createContext<() => void>(() => {});
export const useContact = () => useContext(ContactCtx);

export function ContactProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <ContactCtx.Provider value={() => navigate("/matriculas")}>
      {children}
      <WhatsAppFloat />
    </ContactCtx.Provider>
  );
}

/* ───────────── Scroll-reveal + count-up ───────────── */
export function useReveal() {
  const location = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduce) {
      reveals.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const countUp = (el: HTMLElement) => {
      const target = parseInt(el.dataset.target || "0", 10) || 0;
      const dur = 1100;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in-view");
          e.target.querySelectorAll<HTMLElement>(".count-up").forEach((c) => {
            if (!c.dataset.done) {
              c.dataset.done = "1";
              countUp(c);
            }
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);
}

/* ───────────── Navbar ───────────── */
const NAV: [string, string][] = [
  ["/", "Início"],
  ["/segmentos", "Segmentos"],
  ["/vivencias", "Vivências"],
  ["/metodologia", "Metodologia"],
  ["/espacos", "Espaços"],
  ["/momentos", "Momentos"],
  ["/sobre", "Sobre"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="navbar">
      <Link to="/" className="logo-link">
        <img src={asset("logo-cda-15anos-semborda.webp")} alt="Escola CDA" className="logo" width={190} height={127} />
      </Link>
      <button
        className={"nav-toggle" + (open ? " is-open" : "")}
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span><span></span><span></span>
      </button>
      <nav className={"nav" + (open ? " nav-open" : "")}>
        {NAV.map(([to, label]) => (
          <Link key={to} to={to} className={pathname === to ? "is-active" : ""} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link to="/matriculas" className="nav-button nav-button-mobile" onClick={() => setOpen(false)}>
          Agende uma visita
        </Link>
      </nav>
      <Link to="/matriculas" className="nav-button nav-button-desktop">Agende uma visita</Link>
    </header>
  );
}

/* ───────────── Footer ───────────── */
export function Footer() {
  const nav: [string, string][] = [
    ["Sobre nós", "/sobre"],
    ["Segmentos", "/segmentos"],
    ["Vivências", "/vivencias"],
    ["Nosso Espaço", "/espacos"],
    ["Momentos", "/momentos"],
    ["Matrículas", "/matriculas"],
  ];
  const segs: [string, string][] = [
    ["Educação Infantil", "/segmentos"],
    ["Ensino Fundamental", "/segmentos"],
    ["Contraturno", "/segmentos"],
    ["Especializadas", "/vivencias"],
    ["Oficinas", "/vivencias"],
    ["Aulas extras", "/vivencias"],
  ];
  const contact = useContact();
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={asset("logo-cda-15anos-semborda.webp")} alt="Escola CDA" className="footer-logo" />
          <p>Há 15 anos formando crianças com afeto, propósito e experiências que transformam vidas e fortalecem famílias.</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/escolacda.sm/" target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" brand size={16} /></a>
            <a href="https://www.facebook.com/escolacda.sm" target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook-f" brand size={16} /></a>
            <a href={WPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" brand size={16} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Navegação</h4>
          <ul>{nav.map(([x, to]) => <li key={x}><Link to={to}>{x}</Link></li>)}</ul>
        </div>
        <div className="footer-col">
          <h4>Segmentos</h4>
          <ul>{segs.map(([x, to], i) => <li key={i}><Link to={to}>{x}</Link></li>)}</ul>
        </div>
        <div className="footer-contact">
          <h4>Contato</h4>
          <div className="footer-contact-item"><Icon name="location-dot" color="#f0b400" size={14} /><span>R. José Manhago, 194 - Camobi, Santa Maria - RS</span></div>
          <div className="footer-contact-item"><Icon name="phone" color="#f0b400" size={14} /><a href="tel:+555532177947">(55) 3217-7947</a></div>
          <div className="footer-contact-item"><Icon name="whatsapp" brand color="#f0b400" size={14} /><a href={WPP} target="_blank" rel="noreferrer">(55) 3217-7947</a></div>
          <div className="footer-contact-item"><Icon name="clock|r" color="#f0b400" size={14} /><span>Seg a Sex: 7h30 às 18h</span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Escola CDA. Todos os direitos reservados.</p>
          <button type="button" className="footer-link-btn" onClick={contact}>Agende uma visita</button>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── WhatsApp flutuante ───────────── */
export function WhatsAppFloat() {
  const contact = useContact();
  return (
    <button type="button" className="whatsapp-float" onClick={contact}>
      <Icon name="whatsapp" brand size={22} /><span>Falar com a escola</span>
    </button>
  );
}

/* ───────────── Layout das páginas internas ───────────── */
export function Layout({ children }: { children: ReactNode }) {
  useReveal();
  return (
    <div className="app page">
      <div className="page-header"><Navbar /></div>
      {children}
      <Footer />
    </div>
  );
}
