import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";
import { SaveBar, useToast } from "../ui";
import { asset } from "../../lib/assets";
import { supabase, API_CONFIGURED } from "../../lib/supabase";
import BlocoTexto from "./BlocoTexto";
import ListEditor from "./ListEditor";
import GaleriaEditor from "./GaleriaEditor";
import { HOME_PROPOSITO, HOME_CONEXAO, HOME_SEG_HEAD, HOME_VIV_HEAD, HOME_ESP_HEAD, HOME_FACHADA, HOME_CONVITE } from "../../lib/textos";
import { HOME_SEG_CARDS, HOME_VIV_CARDS, HOME_CONEXAO_FEATS } from "../../lib/listas";
import { HOME_ESP_FOTOS } from "../../lib/galeria";

const camposHomeBloco = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "p1" as const, label: "Parágrafo", tipo: "textarea" as const },
];
const camposHead = [
  { key: "eyebrow" as const, label: "Texto pequeno (acima do título)" },
  { key: "titulo" as const, label: "Título" },
  { key: "destaque" as const, label: "Palavra em destaque (opcional)" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
];
const camposEspHead = [...camposHead, { key: "btn" as const, label: "Texto do botão" }];
const camposBanner = [
  { key: "titulo" as const, label: "Texto principal" },
  { key: "p1" as const, label: "Texto de apoio", tipo: "textarea" as const },
  { key: "btn" as const, label: "Texto do botão" },
];
const campoCard = [{ key: "t", label: "Título" }, { key: "p", label: "Texto", tipo: "textarea" as const }];

const logo = () => asset("logo-cda-15anos-semborda.webp");

type Hero = { selo: string; titulo: string; destaque: string; texto: string; imagem?: string };
type Pilar = { titulo: string; descricao: string };
type Diario = { titulo: string; texto: string; recursos: string };

const DEFAULT_HERO: Hero = {
  selo: "HÁ 15 ANOS",
  titulo: "Fundamental para aprender",
  destaque: "e crescer",
  texto: "Acreditamos que a educação vai muito além do ensino. É sobre acolher, inspirar e transformar vidas para construir um futuro melhor.",
};
const DEFAULT_PILARES: Pilar[] = [
  { titulo: "Acolhimento que abraça", descricao: "Ambiente seguro, afetivo e cheio de empatia." },
  { titulo: "Ensino que desenvolve", descricao: "Aprendizagem significativa para a vida toda." },
  { titulo: "Valores que inspiram", descricao: "Incentivamos autonomia, respeito e responsabilidade." },
  { titulo: "Parceria que transforma", descricao: "Família e escola juntas no mesmo propósito." },
];
const DEFAULT_DIARIO: Diario = {
  titulo: "Você acompanha tudo, todos os dias",
  texto: "Recados, fotos e a rotina do seu filho direto no celular — em tempo real, pelo app Diário Escola.",
  recursos: "Agenda diária\nRecados\nMural & álbuns\nMedicamentos\nCalendário & presença\nEm tempo real",
};

export default function EditarHome() {
  const [toast, toastNode] = useToast();
  const [saving, setSaving] = useState(false);
  const [hero, setHero] = useState<Hero>(DEFAULT_HERO);
  const [pilares, setPilares] = useState<Pilar[]>(DEFAULT_PILARES);
  const [diario, setDiario] = useState<Diario>(DEFAULT_DIARIO);
  const [publicado, setPublicado] = useState({ hero: DEFAULT_HERO, pilares: DEFAULT_PILARES, diario: DEFAULT_DIARIO });
  const [erroLoad, setErroLoad] = useState(false);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    let alive = true;
    supabase.from("page_content").select("secao, dados").eq("pagina", "home")
      .then(({ data, error }) => {
        if (!alive) return;
        // falha de carregamento: NÃO cair nos padrões (evita salvar padrão por cima do real)
        if (error) { setErroLoad(true); return; }
        const porSecao = Object.fromEntries((data ?? []).map((r) => [r.secao, r.dados]));
        const h = (porSecao.hero ?? DEFAULT_HERO) as Hero;
        const p = (porSecao.pilares ?? DEFAULT_PILARES) as Pilar[];
        const d = (porSecao.diario ?? DEFAULT_DIARIO) as Diario;
        setHero(h); setPilares(p); setDiario(d);
        setPublicado({ hero: h, pilares: p, diario: d });
      });
    return () => { alive = false; };
  }, []);

  const setPilar = (i: number, k: keyof Pilar, v: string) =>
    setPilares((prev) => prev.map((p, idx) => idx === i ? { ...p, [k]: v } : p));

  const dirty = JSON.stringify({ hero, pilares, diario }) !== JSON.stringify(publicado);

  const save = async () => {
    if (erroLoad) { toast("Não foi possível carregar o conteúdo atual. Recarregue a página antes de publicar.", true); return; }
    setSaving(true);
    try {
      if (API_CONFIGURED) {
        const { error } = await supabase.from("page_content").upsert([
          { pagina: "home", secao: "hero", dados: hero },
          { pagina: "home", secao: "pilares", dados: pilares },
          { pagina: "home", secao: "diario", dados: diario },
        ], { onConflict: "pagina,secao" });
        if (error) throw error;
      }
      setPublicado({ hero, pilares, diario });
      toast("Home publicada com sucesso!");
    } catch {
      toast("Erro ao salvar. Tente novamente.", true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell active="home" title="Editar — Home" subtitle="Página inicial do site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-house"></i></div>
        <div><h1>Home</h1><p>Edite o conteúdo da página inicial: destaque, pilares e depoimentos.</p></div>
        <div className="ph-act"><a className="adm-btn adm-btn-ghost adm-btn-sm" href="/" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a></div>
      </div>

      <div className="adm-editor">
        <div className="adm-editor-main">
          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-star"></i></div><h3>Destaque (Hero)</h3></div>
            <p className="hint" style={{ marginTop: 0, marginBottom: 12 }}>
              A arte da campanha (<strong>Fundamental para aprender e crescer</strong>) e a foto de fundo fazem parte do design da marca e são fixas. Aqui você edita o <strong>texto de apoio</strong> que aparece abaixo dela.
            </p>
            <label className="adm-form-label">Texto de apoio</label>
            <textarea className="adm-textarea" value={hero.texto} onChange={(e) => setHero((h) => ({ ...h, texto: e.target.value }))}></textarea>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-grip"></i></div><h3>Pilares</h3></div>
            <p className="hint">Os quatro pilares exibidos logo abaixo do destaque.</p>
            {pilares.map((p, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 12, marginBottom: 12 }}>
                <input className="adm-text" value={p.titulo} onChange={(e) => setPilar(i, "titulo", e.target.value)} />
                <input className="adm-text" value={p.descricao} onChange={(e) => setPilar(i, "descricao", e.target.value)} />
              </div>
            ))}
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-mobile-screen-button"></i></div><h3>Diário Escola (faixa)</h3></div>
            <p className="hint">Faixa compacta do app, exibida antes da seção "Conexão que transforma".</p>
            <label className="adm-form-label">Título</label>
            <input className="adm-text" value={diario.titulo} onChange={(e) => setDiario((d) => ({ ...d, titulo: e.target.value }))} />
            <label className="adm-form-label">Texto</label>
            <textarea className="adm-textarea" value={diario.texto} onChange={(e) => setDiario((d) => ({ ...d, texto: e.target.value }))}></textarea>
            <label className="adm-form-label">Recursos (um por linha)</label>
            <textarea className="adm-textarea" value={diario.recursos} onChange={(e) => setDiario((d) => ({ ...d, recursos: e.target.value }))}></textarea>
          </div>

          <div className="adm-card">
            <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-comment-dots"></i></div><h3>Depoimentos</h3></div>
            <p className="hint">Depoimentos de famílias publicados no carrossel da Home.</p>
            <a className="adm-btn adm-btn-ghost adm-btn-sm" style={{ width: "fit-content" }} href="/admin/depoimentos"><i className="fa-solid fa-pen"></i> Gerenciar depoimentos</a>
          </div>

          <BlocoTexto pagina="home" secao="proposito" titulo="Bloco: Educação com propósito" defaults={HOME_PROPOSITO} imagem campos={camposHomeBloco} hint="Seção com foto à direita, logo após os pilares." />

          <BlocoTexto pagina="home" secao="seg_head" titulo="Prévia Segmentos — título" defaults={HOME_SEG_HEAD} campos={camposHead} />
          <ListEditor pagina="home" secao="seg_cards" titulo="Prévia Segmentos — cards" defaults={HOME_SEG_CARDS} campos={campoCard} novo={{ img: "", icon: "star", t: "", p: "", to: "/segmentos" }} imagem hint="Os cards que aparecem na seção 'Nossos segmentos' da Home." />

          <BlocoTexto pagina="home" secao="viv_head" titulo="Prévia Vivências — título" defaults={HOME_VIV_HEAD} campos={camposHead} />
          <ListEditor pagina="home" secao="viv_cards" titulo="Prévia Vivências — cards" defaults={HOME_VIV_CARDS} campos={campoCard} novo={{ img: "", icon: "star", c: "#0b82f6", t: "", p: "" }} imagem hint="Os cards da seção 'Vivências que transformam' da Home." />

          <BlocoTexto pagina="home" secao="fachada" titulo="Faixa da fachada" defaults={HOME_FACHADA} campos={camposHomeBloco} hint="Faixa com a foto da fachada e o convite a visitar." />
          <BlocoTexto pagina="home" secao="convite" titulo="Faixa-convite (após a fachada)" defaults={HOME_CONVITE} campos={camposBanner} />

          <BlocoTexto pagina="home" secao="esp_head" titulo="Prévia Nosso espaço — título" defaults={HOME_ESP_HEAD} campos={camposEspHead} />
          <GaleriaEditor pagina="home" secao="esp_fotos" titulo="Prévia Nosso espaço — fotos" defaults={HOME_ESP_FOTOS} legendas hint="4 fotos com rótulo (o rótulo aparece sobre a foto). O ideal é manter 4." />

          <BlocoTexto pagina="home" secao="conexao" titulo="Bloco: Conexão que transforma" defaults={HOME_CONEXAO} imagem campos={camposHomeBloco} hint="Seção perto do fim da página inicial." />
          <ListEditor pagina="home" secao="conexao_feats" titulo="Conexão — itens" defaults={HOME_CONEXAO_FEATS} campos={campoCard} novo={{ icon: "star", t: "", p: "" }} hint="Os 4 itens com ícone dentro da seção 'Conexão que transforma'." />
        </div>

        <div className="adm-side-panel">
          <div className="adm-card adm-preview-card" style={{ padding: 0 }}>
            <div className="pv-img"><img src={asset("bg-home.webp")} alt="Pré-visualização" /></div>
            <div className="pv-body">
              <h4>Pré-visualização</h4>
              <p>Veja como a Home aparece para os visitantes antes de publicar.</p>
              <a className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 12, width: "100%" }} href="/" target="_blank"><i className="fa-solid fa-eye"></i> Abrir página</a>
            </div>
          </div>
          {erroLoad && (
            <div className="adm-card" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
              <p style={{ fontSize: 12.5, color: "#b91c1c", margin: 0, lineHeight: 1.6 }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Não foi possível carregar o conteúdo atual. <strong>Recarregue a página</strong> antes de editar — publicar agora pode apagar o conteúdo salvo.
              </p>
            </div>
          )}
          <div className="adm-card">
            <h3 style={{ fontSize: 15 }}>Status</h3>
            <div className="adm-status-row"><span>Situação</span><b style={{ color: "#1f9d57" }}>Publicado</b></div>
          </div>
          {!API_CONFIGURED && (
            <div className="adm-card" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <p style={{ fontSize: 12.5, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                <i className="fa-solid fa-triangle-exclamation"></i> Modo demo — alterações não são salvas no banco.
              </p>
            </div>
          )}
        </div>
      </div>

      {dirty && <SaveBar onSave={save} saving={saving} onDiscard={() => { setHero(publicado.hero); setPilares(publicado.pilares); setDiario(publicado.diario); }} />}
      {toastNode}
    </AdminShell>
  );
}
