import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { asset } from "../lib/assets";
import { supabase, API_CONFIGURED } from "../lib/supabase";

// WhatsApp padrão (fallback). O valor real vem das configurações editáveis no painel.
export const WPP = "https://wa.me/555532177947";

// Evento personalizado do Google Analytics (cliques em CTAs importantes)
export function track(event: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}

/* ───────────── Configurações do site (editáveis no painel) ───────────── */
export type SiteSettings = {
  whatsapp: string;
  telefone: string;
  wpp_link: string;
  endereco: string;
  horario: string;
  instagram: string;
  facebook: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp: "(55) 3217-7947",
  telefone: "(55) 3217-7947",
  wpp_link: WPP,
  endereco: "R. José Manhago, 194 - Camobi, Santa Maria - RS",
  horario: "Segunda a Sexta, 7h às 18h",
  instagram: "@escolacda.sm",
  facebook: "/escolacda.sm",
};

// Normaliza o handle do Instagram (@nome) para uma URL clicável.
export function instagramUrl(handle: string): string {
  if (!handle) return "https://www.instagram.com/escolacda.sm/";
  if (handle.startsWith("http")) return handle;
  return "https://www.instagram.com/" + handle.replace(/^@/, "").replace(/^\//, "");
}
export function facebookUrl(handle: string): string {
  if (!handle) return "https://www.facebook.com/escolacda.sm";
  if (handle.startsWith("http")) return handle;
  return "https://www.facebook.com/" + handle.replace(/^\//, "");
}

const SettingsCtx = createContext<SiteSettings>(DEFAULT_SETTINGS);
export const useSettings = () => useContext(SettingsCtx);

// Título + descrição únicos por página (SEO em SPA)
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
      m.setAttribute("content", description);
    }
    track("page_view", { page_title: title, page_location: window.location.href, page_path: window.location.pathname });
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
const ContactCtx = createContext<(local?: string) => void>(() => {});
export const useContact = () => useContext(ContactCtx);

export function ContactProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    let alive = true;
    supabase.from("site_settings").select("*").eq("id", 1).single()
      .then(({ data }) => { if (alive && data) setSettings((s) => ({ ...s, ...data })); });
    return () => { alive = false; };
  }, []);

  return (
    <SettingsCtx.Provider value={settings}>
      <ContactCtx.Provider value={(local) => { track("cta_click", { local }); navigate("/matriculas"); }}>
        {children}
        <AccessibilityBar />
        <WhatsAppFloat />
      </ContactCtx.Provider>
    </SettingsCtx.Provider>
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
  const s = useSettings();
  const telHref = "tel:+" + s.telefone.replace(/\D/g, "");
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={asset("logo-cda-15anos-semborda.webp")} alt="Escola CDA" className="footer-logo" />
          <p>Há 15 anos formando crianças com afeto, propósito e experiências que transformam vidas e fortalecem famílias.</p>
          <div className="footer-social">
            <a href={instagramUrl(s.instagram)} target="_blank" rel="noreferrer" aria-label="Instagram" onClick={() => track("social_click", { rede: "instagram", local: "footer" })}><Icon name="instagram" brand size={16} /></a>
            <a href={facebookUrl(s.facebook)} target="_blank" rel="noreferrer" aria-label="Facebook" onClick={() => track("social_click", { rede: "facebook", local: "footer" })}><Icon name="facebook-f" brand size={16} /></a>
            <a href={s.wpp_link} target="_blank" rel="noreferrer" aria-label="WhatsApp" onClick={() => track("whatsapp_click", { local: "footer_social" })}><Icon name="whatsapp" brand size={16} /></a>
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
          <div className="footer-contact-item"><Icon name="location-dot" color="#f0b400" size={14} /><span>{s.endereco}</span></div>
          <div className="footer-contact-item"><Icon name="phone" color="#f0b400" size={14} /><a href={telHref}>{s.telefone}</a></div>
          <div className="footer-contact-item"><Icon name="whatsapp" brand color="#f0b400" size={14} /><a href={s.wpp_link} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { local: "footer_contato" })}>{s.whatsapp}</a></div>
          <div className="footer-contact-item"><Icon name="clock|r" color="#f0b400" size={14} /><span>{s.horario}</span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Escola CDA. Todos os direitos reservados.</p>
          <span className="footer-credit">Desenvolvido por <strong>Júnior Ferreira</strong> e <strong>Matheus Proensa</strong></span>
          <button type="button" className="footer-link-btn" onClick={() => contact("footer")}>Agende uma visita</button>
        </div>
      </div>
    </footer>
  );
}

/* ───────────── Acessibilidade (dock + VLibras) ───────────── */
export function AccessibilityBar() {
  const [menu, setMenu] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [libras, setLibras] = useState(false);
  useEffect(() => {
    const z = parseFloat(localStorage.getItem("cda-zoom") || "1");
    if (z !== 1) (document.body.style as unknown as { zoom: string }).zoom = String(z);
    if (localStorage.getItem("cda-contrast") === "1") { document.documentElement.classList.add("a11y-contrast"); setContrast(true); }
  }, []);
  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest(".a11y-menu") && !t.closest(".a11y-acc-btn")) setMenu(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [menu]);
  const setZoom = (dir: number) => {
    let z = parseFloat(localStorage.getItem("cda-zoom") || "1");
    z = dir === 0 ? 1 : Math.min(1.4, Math.max(0.9, +(z + dir * 0.1).toFixed(2)));
    (document.body.style as unknown as { zoom: string }).zoom = String(z);
    localStorage.setItem("cda-zoom", String(z));
  };
  const toggleContrast = () => {
    const on = document.documentElement.classList.toggle("a11y-contrast");
    localStorage.setItem("cda-contrast", on ? "1" : "0");
    setContrast(on);
  };
  const reset = () => { setZoom(0); document.documentElement.classList.remove("a11y-contrast"); localStorage.setItem("cda-contrast", "0"); setContrast(false); };
  const openLibras = () => {
    let tries = 0;
    setLibras(true);
    const fire = () => {
      const btn = document.querySelector("[vw-access-button]") as HTMLElement | null;
      const wrap = document.querySelector("[vw-plugin-wrapper]") as HTMLElement | null;
      if (btn) ["mousedown", "mouseup", "click"].forEach((t) => btn.dispatchEvent(new MouseEvent(t, { bubbles: true, cancelable: true, view: window })));
      tries++;
      const open = wrap && getComputedStyle(wrap).display !== "none";
      if (open || tries >= 6) { setLibras(false); return; }
      setTimeout(fire, 600);
    };
    fire();
  };
  return (
    <>
      <div className="a11y-bar">
        <button className="a11y-btn a11y-acc-btn" aria-label="Recursos de acessibilidade" aria-expanded={menu} onClick={(e) => { e.stopPropagation(); setMenu((v) => !v); }}>
          <span className="a11y-label">Recursos de acessibilidade</span>
          <span className="a11y-ic"><Icon name="universal-access" size={24} /></span>
        </button>
        <button className={"a11y-btn a11y-libras" + (libras ? " loading" : "")} aria-label="Acessível em Libras" onClick={openLibras}>
          <span className="a11y-label">{libras ? "Abrindo tradutor…" : "Acessível em Libras"}</span>
          <span className="a11y-ic"><Icon name={libras ? "spinner" : "hands-asl-interpreting"} size={22} /></span>
        </button>
      </div>
      {menu && (
        <div className="a11y-menu" role="dialog" aria-label="Opções de acessibilidade">
          <h4><Icon name="universal-access" size={15} /> Acessibilidade</h4>
          <p className="a11y-menu-sub">Ajuste a leitura do site</p>
          <div className="a11y-row">
            <button className="opt" onClick={() => setZoom(1)}><Icon name="magnifying-glass-plus" size={13} /> Aumentar</button>
            <button className="opt" onClick={() => setZoom(-1)}><Icon name="magnifying-glass-minus" size={13} /> Diminuir</button>
          </div>
          <button className={"opt full" + (contrast ? " active" : "")} onClick={toggleContrast}><Icon name="circle-half-stroke" size={13} /> Alto contraste</button>
          <button className="opt full" onClick={reset}><Icon name="rotate-left" size={13} /> Restaurar padrão</button>
        </div>
      )}
    </>
  );
}

/* ───────────── WhatsApp flutuante ───────────── */
export function WhatsAppFloat() {
  const s = useSettings();
  return (
    <a className="whatsapp-float" href={s.wpp_link} target="_blank" rel="noopener noreferrer" aria-label="Falar com a escola no WhatsApp" onClick={() => track("whatsapp_click", { local: "float" })}>
      <Icon name="whatsapp" brand size={22} /><span>Falar com a escola</span>
    </a>
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
