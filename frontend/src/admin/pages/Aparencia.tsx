import { useEffect, useRef, useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage, invalidateGlobal } from "../../lib/content";
import { uploadImagem } from "../../lib/storage";

const logo = () => asset("logo-cda-15anos-semborda.webp");

// Rótulos padrão (batem com o que está no site.tsx). Só mudam se editados aqui.
const NAV_ITENS_DEFAULT = ["Início", "Segmentos", "Vivências", "Metodologia", "Espaços", "Momentos", "Sobre"];
const FOOTER_NAV_DEFAULT = ["Sobre nós", "Segmentos", "Vivências", "Nosso Espaço", "Momentos", "Matrículas"];
const FOOTER_SEG_DEFAULT = ["Educação Infantil", "Ensino Fundamental", "Contraturno", "Especializadas", "Oficinas", "Aulas extras"];

type NavCfg = { logo: string; itens: string[]; btn: string };
type FooterCfg = {
  blurb: string; colNav: string; colSeg: string; colContato: string;
  navLabels: string[]; segLabels: string[]; credito: string; copyright: string; btn: string;
};

const NAV_DEF: NavCfg = { logo: "", itens: NAV_ITENS_DEFAULT, btn: "Agende uma visita" };
const FOOTER_DEF: FooterCfg = {
  blurb: "Há 15 anos formando crianças com afeto, propósito e experiências que transformam vidas e fortalecem famílias.",
  colNav: "Navegação", colSeg: "Segmentos", colContato: "Contato",
  navLabels: FOOTER_NAV_DEFAULT, segLabels: FOOTER_SEG_DEFAULT,
  credito: "Matheus Proensa", copyright: "Escola CDA. Todos os direitos reservados.", btn: "Agende uma visita",
};

const fill = (arr: string[] | undefined, def: string[]) => def.map((d, i) => (arr?.[i] ?? d) || d);

export default function Aparencia() {
  const [toast, toastNode] = useToast();
  const { sec, loading, erro } = usePageContent("global");
  const [nav, setNav] = useState<NavCfg>(NAV_DEF);
  const [footer, setFooter] = useState<FooterCfg>(FOOTER_DEF);
  const [pubNav, setPubNav] = useState<NavCfg>(NAV_DEF);
  const [pubFooter, setPubFooter] = useState<FooterCfg>(FOOTER_DEF);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loading) return;
    const n = section<NavCfg>(sec, "nav", NAV_DEF);
    const f = section<FooterCfg>(sec, "footer", FOOTER_DEF);
    const nn: NavCfg = { logo: n.logo || "", btn: n.btn || NAV_DEF.btn, itens: fill(n.itens, NAV_ITENS_DEFAULT) };
    const ff: FooterCfg = {
      blurb: f.blurb || FOOTER_DEF.blurb, colNav: f.colNav || FOOTER_DEF.colNav,
      colSeg: f.colSeg || FOOTER_DEF.colSeg, colContato: f.colContato || FOOTER_DEF.colContato,
      navLabels: fill(f.navLabels, FOOTER_NAV_DEFAULT), segLabels: fill(f.segLabels, FOOTER_SEG_DEFAULT),
      credito: f.credito || FOOTER_DEF.credito, copyright: f.copyright || FOOTER_DEF.copyright, btn: f.btn || FOOTER_DEF.btn,
    };
    setNav(nn); setFooter(ff); setPubNav(nn); setPubFooter(ff);
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = JSON.stringify([nav, footer]) !== JSON.stringify([pubNav, pubFooter]);

  const salvar = async () => {
    if (erro) { toast("Não foi possível carregar o conteúdo atual. Recarregue a página antes de salvar.", true); return; }
    setSaving(true);
    try {
      if (API_CONFIGURED) await savePage("global", { nav, footer });
      invalidateGlobal();
      setPubNav(nav); setPubFooter(footer);
      toast("Salvo!");
    } catch { toast("Erro ao salvar.", true); }
    finally { setSaving(false); }
  };

  const trocarLogo = async (file: File) => {
    try {
      const url = await uploadImagem(file, "marca");
      setNav((n) => ({ ...n, logo: url }));
      toast("Logo enviado! Clique em “Salvar e publicar”.");
    } catch (e) { toast(e instanceof Error ? e.message : "Erro ao enviar imagem.", true); }
  };

  const setNavItem = (i: number, v: string) => setNav((n) => ({ ...n, itens: n.itens.map((x, idx) => idx === i ? v : x) }));
  const setFNav = (i: number, v: string) => setFooter((f) => ({ ...f, navLabels: f.navLabels.map((x, idx) => idx === i ? v : x) }));
  const setFSeg = (i: number, v: string) => setFooter((f) => ({ ...f, segLabels: f.segLabels.map((x, idx) => idx === i ? v : x) }));

  return (
    <AdminShell active="aparencia" title="Rodapé e Menu" subtitle="Textos do menu do topo, do rodapé e o logo" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-table-columns"></i></div>
        <div><h1>Rodapé e Menu</h1><p>Edite os nomes do menu, o logo e todos os textos do rodapé do site.</p></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          {/* MENU DO TOPO */}
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-bars"></i></div><h3>Menu do topo</h3></div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              <div style={{ flexShrink: 0 }}>
                <span className="adm-form-label" style={{ display: "block", marginBottom: 6 }}>Logo</span>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { if (e.target.files?.[0]) trocarLogo(e.target.files[0]); e.target.value = ""; }} />
                <div style={{ width: 160, height: 74, borderRadius: 10, background: "#0e2d6e", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                  <img src={nav.logo || logo()} alt="" style={{ maxWidth: "100%", maxHeight: "100%", filter: "brightness(0) invert(1)" }} />
                </div>
                <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "100%", marginTop: 6, fontSize: 11 }} onClick={() => fileRef.current?.click()}><i className="fa-solid fa-arrows-rotate"></i> Trocar logo</button>
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <span className="adm-form-label" style={{ display: "block", marginBottom: 6 }}>Nomes dos itens do menu</span>
                <div className="adm-grid-fields">
                  {nav.itens.map((label, i) => (
                    <div key={i}><input className="adm-text" value={label} onChange={(e) => setNavItem(i, e.target.value)} /></div>
                  ))}
                </div>
                <label className="adm-form-label" style={{ marginTop: 10 }}>Botão do menu</label>
                <input className="adm-text" value={nav.btn} onChange={(e) => setNav((n) => ({ ...n, btn: e.target.value }))} />
              </div>
            </div>
          </div>

          {/* RODAPÉ */}
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-shoe-prints"></i></div><h3>Rodapé</h3></div>
            <label className="adm-form-label">Frase da marca</label>
            <textarea className="adm-textarea" value={footer.blurb} onChange={(e) => setFooter((f) => ({ ...f, blurb: e.target.value }))} style={{ minHeight: 70 }} />

            <div className="adm-grid-fields" style={{ marginTop: 10 }}>
              <div><label className="adm-form-label">Título da coluna “Navegação”</label><input className="adm-text" value={footer.colNav} onChange={(e) => setFooter((f) => ({ ...f, colNav: e.target.value }))} /></div>
              <div><label className="adm-form-label">Título da coluna “Segmentos”</label><input className="adm-text" value={footer.colSeg} onChange={(e) => setFooter((f) => ({ ...f, colSeg: e.target.value }))} /></div>
              <div><label className="adm-form-label">Título da coluna “Contato”</label><input className="adm-text" value={footer.colContato} onChange={(e) => setFooter((f) => ({ ...f, colContato: e.target.value }))} /></div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <span className="adm-form-label" style={{ display: "block", marginBottom: 6 }}>Links da coluna “Navegação”</span>
                {footer.navLabels.map((label, i) => (
                  <input key={i} className="adm-text" value={label} onChange={(e) => setFNav(i, e.target.value)} style={{ marginBottom: 6 }} />
                ))}
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <span className="adm-form-label" style={{ display: "block", marginBottom: 6 }}>Links da coluna “Segmentos”</span>
                {footer.segLabels.map((label, i) => (
                  <input key={i} className="adm-text" value={label} onChange={(e) => setFSeg(i, e.target.value)} style={{ marginBottom: 6 }} />
                ))}
              </div>
            </div>

            <div className="adm-grid-fields" style={{ marginTop: 12 }}>
              <div><label className="adm-form-label">Crédito (seu nome)</label><input className="adm-text" value={footer.credito} onChange={(e) => setFooter((f) => ({ ...f, credito: e.target.value }))} /></div>
              <div><label className="adm-form-label">Botão do rodapé</label><input className="adm-text" value={footer.btn} onChange={(e) => setFooter((f) => ({ ...f, btn: e.target.value }))} /></div>
            </div>
            <label className="adm-form-label" style={{ marginTop: 10 }}>Direitos autorais (o ano é automático)</label>
            <input className="adm-text" value={footer.copyright} onChange={(e) => setFooter((f) => ({ ...f, copyright: e.target.value }))} />
            <p className="hint" style={{ marginTop: 6 }}>No site aparece: “© {new Date().getFullYear()} {footer.copyright}”</p>
          </div>
        </div>

        <div className="adm-side-panel">
          <div className="adm-card">
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>Onde aparece</h3>
            <p style={{ fontSize: 12.5, color: "var(--adm-ink-3)", lineHeight: 1.6, margin: 0 }}>
              O <strong>menu</strong> e o <strong>logo</strong> aparecem no topo de todas as páginas. O <strong>rodapé</strong> aparece embaixo de todas as páginas. Telefone, endereço e redes ficam em <strong>Contato</strong>.
            </p>
          </div>
        </div>
      </div>

      {dirty && <SaveBar onSave={salvar} saving={saving} onDiscard={() => { setNav(pubNav); setFooter(pubFooter); }} />}
      {toastNode}
    </AdminShell>
  );
}
