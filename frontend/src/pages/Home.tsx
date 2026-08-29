import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Navbar, Footer, useReveal, useContact, usePageMeta } from "../components/site";
import { asset } from "../lib/assets";
import { usePageContent, section } from "../lib/content";
import { HOME_PROPOSITO, HOME_CONEXAO, HOME_SEG_HEAD, HOME_VIV_HEAD, HOME_ESP_HEAD, HOME_FACHADA, HOME_CONVITE, type Bloco } from "../lib/textos";
import { HOME_SEG_CARDS, HOME_VIV_CARDS, HOME_CONEXAO_FEATS, type HomeCard, type FeatItem } from "../lib/listas";
import { HOME_ESP_FOTOS, type GalFoto } from "../lib/galeria";
import { supabase, API_CONFIGURED } from "../lib/supabase";

type HeroData = { selo: string; titulo: string; destaque: string; texto: string; imagem?: string };
type PilarData = { titulo: string; descricao: string };
type DiarioData = { titulo: string; texto: string; recursos: string };

const HERO_DEFAULT: HeroData = {
  selo: "HÁ 15 ANOS",
  titulo: "Fundamental para aprender",
  destaque: "e crescer",
  texto: "Acreditamos que a educação vai muito além do ensino. É sobre acolher, inspirar e transformar vidas para construir um futuro melhor.",
};
const PILARES_ICONS = ["hand-holding-heart", "graduation-cap", "star", "handshake-angle"];
const PILARES_TONES = ["blue", "gold", "blue", "gold"];
const PILARES_DEFAULT: PilarData[] = [
  { titulo: "Acolhimento que abraça", descricao: "Ambiente seguro, afetivo e cheio de empatia." },
  { titulo: "Ensino que desenvolve", descricao: "Aprendizagem significativa para a vida toda." },
  { titulo: "Valores que inspiram", descricao: "Incentivamos autonomia, respeito e responsabilidade." },
  { titulo: "Parceria que transforma", descricao: "Família e escola juntas no mesmo propósito." },
];
const DIARIO_DEFAULT: DiarioData = {
  titulo: "Você acompanha tudo, todos os dias",
  texto: "Recados, fotos e a rotina do seu filho direto no celular — em tempo real, pelo app Diário Escola.",
  recursos: "Agenda diária\nRecados\nMural & álbuns\nMedicamentos\nCalendário & presença\nEm tempo real",
};

/* ───────────── Hero ───────────── */
function Hero({ data, loading }: { data: HeroData; loading: boolean }) {
  const contact = useContact();
  const navigate = useNavigate();
  return (
    <section className="hero" id="hero">
      <Navbar />
      <div className="hero-content">
        <div className="hero-left">
          <span className="mini-title">{data.selo}</span>
          {loading
            ? <div className="hero-slogan-ph" aria-hidden="true" />
            : data.imagem
              ? <img src={data.imagem} alt={data.titulo + " " + data.destaque} className="hero-slogan-img" fetchPriority="high" decoding="async" />
              : <h1>{data.titulo}<span className="script-line"> {data.destaque}</span></h1>}
          <p>{data.texto}</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => contact("home_hero")}>Falar com a escola</button>
            <button className="secondary-btn" onClick={() => navigate("/sobre")}>Conhecer a escola</button>
          </div>
        </div>
      </div>
      <img src={asset("bg-home.webp")} alt="Crianças da Escola CDA fazendo um coração com as mãos" className="hero-bg" fetchPriority="high" decoding="async" />
    </section>
  );
}

/* ───────────── Pilares ───────────── */
function Pillars({ pilares }: { pilares: PilarData[] }) {
  const items = pilares.map((p, i) => ({
    icon: PILARES_ICONS[i] || "star",
    tone: PILARES_TONES[i] || "blue",
    titulo: p.titulo,
    p: p.descricao,
  }));
  return (
    <section className="cards reveal">
      {items.map((it, i) => (
        <div className="card" key={i}>
          <div className="card-ic-wrap">
            <span className="card-halo"></span>
            <div className={"card-icon " + it.tone}><Icon name={it.icon} size={28} /></div>
          </div>
          <div className="card-text">
            <h3>{it.titulo}</h3>
            <p>{it.p}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ───────────── Proposito ───────────── */
function Proposito({ data }: { data: Bloco }) {
  const navigate = useNavigate();
  return (
    <section className="proposito reveal" id="proposito">
      <div className="proposito-left">
        <span className="proposito-mini">{data.eyebrow}</span>
        <h2>{data.titulo}</h2>
        <p>{data.p1}</p>
        <button className="proposito-button" onClick={() => navigate("/sobre")}>Conheça nossa proposta</button>
      </div>
      <div className="proposito-right">
        <img src={data.img} alt="Criança na escola CDA" decoding="async" />
      </div>
    </section>
  );
}

/* ───────────── Segmentos ───────────── */
function Segmentos({ head, segs }: { head: Bloco; segs: HomeCard[] }) {
  const navigate = useNavigate();
  return (
    <section className="segmentos reveal" id="segmentos">
      <div className="segmentos-header">
        <div>
          <span className="segmentos-mini">{head.eyebrow}</span>
          <h2>{head.titulo}</h2>
        </div>
        <p>{head.p1}</p>
      </div>
      <div className="segmentos-grid">
        {segs.map((s, i) => (
          <div className="segmento-card" key={i}>
            <img src={s.img} alt={s.t} decoding="async" style={s.pos ? { objectPosition: s.pos } : undefined} />
            <div className="segmento-overlay">
              <div className="segmento-icon"><Icon name={s.icon} color="#0b82f6" size={20} /></div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
              <button onClick={() => navigate(s.to || "/segmentos")}>Saiba mais</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Vivências ───────────── */
function Vivencias({ head, vivs }: { head: Bloco; vivs: HomeCard[] }) {
  const navigate = useNavigate();
  return (
    <section className="vivencias reveal" id="vivencias">
      <span className="vivencias-mini">{head.eyebrow}</span>
      <h2>{head.titulo} {head.destaque && <span className="script-accent">{head.destaque}</span>}</h2>
      <p className="vivencias-sub">{head.p1}</p>
      <div className="vivencias-grid">
        {vivs.map((v, i) => (
          <div className="vivencia-card" key={i}>
            <img src={v.img} alt={v.t} decoding="async" style={v.pos ? { objectPosition: v.pos } : undefined} />
            <div className="vivencia-overlay">
              <div className="vivencia-icon"><Icon name={v.icon} color={v.c || "#0b82f6"} size={18} /></div>
              <h3>{v.t}</h3>
              <p>{v.p}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="vivencias-btn" onClick={() => navigate("/vivencias")}>Conheça todas as nossas vivências →</button>
    </section>
  );
}

/* ───────────── Nosso Espaço ───────────── */
function Espaco({ head, fotos }: { head: Bloco; fotos: GalFoto[] }) {
  const navigate = useNavigate();
  return (
    <section className="espaco reveal" id="espaco">
      <div className="espaco-left">
        <span className="espaco-mini">{head.eyebrow}</span>
        <h2>{head.titulo} {head.destaque && <span className="azul-accent">{head.destaque}</span>}</h2>
        <p>{head.p1}</p>
        <button className="espaco-ver-mais-btn" onClick={() => navigate("/espacos")}>{head.btn || "Conheça todos os nossos espaços →"}</button>
      </div>
      <div className="espaco-right">
        <div className="espaco-grid">
          {fotos.map((f, i) => (
            <div className="espaco-foto" key={i}>
              <img src={f.url} alt={f.titulo} decoding="async" />
              <span className="espaco-label"><span className="espaco-dot"></span>{f.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Depoimentos ───────────── */
type Depo = { txt: string; name: string; ini: string; heart: boolean };
const DEPOS_DEFAULT: Depo[] = [
  { txt: "Confiamos na escola CDA para deixar nossa filha desde 1 ano e 3 meses. Hoje a Mariah está com 5 anos e permanecemos fazendo parte da escola. O cuidado e carinho faz toda a diferença, além de uma proposta pedagógica rica e diversificada.", name: "Pais da Mariah B.", ini: "M", heart: false },
  { txt: "Temos plena confiança na escolinha e fico super tranquila enquanto o Otto está na escola. A CDA faz parte do desenvolvimento do nosso filho — e o principal é que ele adora a escola e todos os profissionais que trabalham nela!", name: "Pais do Otto B.", ini: "O", heart: false },
  { txt: "Confiamos plenamente na educação e no cuidado que a CDA oferece. Todo ambiente é pensado no melhor para as crianças, e temos certeza de que a Laura está numa escola capacitada. Só temos a agradecer!", name: "Pais da Laura L.", ini: "L", heart: false },
  { txt: "Confiamos no trabalho da CDA pelo diálogo sempre próximo com a família, pela valorização da brincadeira e dos interesses das crianças.", name: "Pais da Giovanna Z.", ini: "G", heart: false },
  { txt: "Parabéns pelo excelente trabalho que fazem, pelo carinho e amor com que conduzem o dia a dia dos nossos filhos. O resultado é esse: crianças felizes e confiantes para desenvolver a autonomia e suas habilidades!", name: "Família CDA", ini: "", heart: true },
  { txt: "Parabéns pra essa escola que faz parte do início escolar dos meus filhos e que tenho muito carinho e confiança! Indico para todos que conheço. Profissionais sempre atenciosos e dedicados — moram em nosso coração!", name: "Mãe de alunos", ini: "", heart: true },
  { txt: "Parabéns, escola CDA! Dedicação, carinho, respeito e responsabilidade junto a um ensino de qualidade!", name: "Gilmar", ini: "G", heart: false },
  { txt: "Melhor escola — e melhor escolha que fizemos!", name: "Flávia Pedrosa", ini: "F", heart: false },
];

function Depoimentos() {
  const [depos, setDepos] = useState<Depo[]>(DEPOS_DEFAULT);

  useEffect(() => {
    if (!API_CONFIGURED) return;
    let alive = true;
    supabase.from("depoimentos").select("nome, texto").eq("ativo", true).order("ordem")
      .then(({ data }) => {
        if (!alive || !data || data.length === 0) return;
        setDepos(data.map((d: { nome: string; texto: string }) => ({
          txt: d.texto,
          name: d.nome,
          ini: (d.nome || "").trim().charAt(0).toUpperCase(),
          heart: !(d.nome || "").trim(),
        })));
      });
    return () => { alive = false; };
  }, []);

  return (
    <section className="depoimentos reveal" id="depoimentos">
      <div className="depo-head">
        <span className="mini-title">O QUE AS FAMÍLIAS DIZEM</span>
        <h2>Histórias de quem confia na CDA</h2>
        <p>Quem vive a escola todos os dias é quem melhor conta o que somos.</p>
      </div>
      <div className="depo-track">
        {depos.map((d, i) => (
          <figure className="depo-card" key={i}>
            <div className="depo-quote"><Icon name="quote-left" color="#f0b400" size={26} /></div>
            <blockquote>{d.txt}</blockquote>
            <figcaption className="depo-author">
              <span className={"depo-av" + (d.heart ? " heart" : "")}>{d.heart ? <Icon name="heart" color="#fff" size={16} /> : d.ini}</span>
              <strong>{d.name}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ───────────── Conexão ───────────── */
function Conexao({ data, feats }: { data: Bloco; feats: FeatItem[] }) {
  return (
    <section className="conexao reveal" id="conexao">
      <div className="conexao-foto"><img src={data.img} alt="Professora e alunos CDA" decoding="async" /></div>
      <div className="conexao-content">
        <span className="conexao-mini">{data.eyebrow}</span>
        <h2>{data.titulo}</h2>
        <p>{data.p1}</p>
        <div className="conexao-features">
          {feats.map((f, i) => (
            <div className="conexao-feature" key={i}>
              <div className="conexao-feature-icon"><Icon name={f.icon} color="#fff" size={16} /></div>
              <div><strong>{f.t}</strong><span>{f.p}</span></div>
            </div>
          ))}
        </div>
        <div className="conexao-cta">
          <div className="conexao-seal-ic"><Icon name="heart" color="#f0b400" size={24} /></div>
          <div className="conexao-seal-text">
            <strong>+<span className="count-up" data-target="15">15</span> anos</strong>{" "}
            de história e confiança ao lado das famílias.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Faixa da fachada (convite a conhecer) ───────────── */
function FachadaBand({ data }: { data: Bloco }) {
  return (
    <section className="fachada-band reveal">
      <img src={asset("fachada.webp")} alt="Fachada da Escola CDA" decoding="async" />
      <div className="fachada-band-overlay">
        <span className="fb-eyebrow">{data.eyebrow}</span>
        <h2>{data.titulo}</h2>
        <p>{data.p1}</p>
      </div>
    </section>
  );
}

/* ── Faixa-convite (logo após a fachada) ── */
function EspacoConvite({ data }: { data: Bloco }) {
  const contact = useContact();
  return (
    <div className="espaco-banner solo reveal">
      <div className="espaco-banner-icon"><Icon name="heart" color="#f0b400" size={22} /></div>
      <div className="espaco-banner-text"><strong>{data.titulo}</strong></div>
      <div className="espaco-banner-sub"><p>{data.p1}</p></div>
      <button className="espaco-banner-btn" onClick={() => contact("home_banner")}>{data.btn || "Agende uma visita →"}</button>
    </div>
  );
}

/* ─────────────── Diário Escola (faixa compacta) ─────────────── */
const DIARIO_ICONS = ["book", "comment-dots", "images", "kit-medical", "calendar-check", "bolt"];
function DiarioBand({ data }: { data: DiarioData }) {
  const recursos = data.recursos.split("\n").map((s) => s.trim()).filter(Boolean);
  return (
    <section className="diario-band reveal">
      <div className="diario-band-left">
        <img className="diario-logo" src={asset("diarioescola-logo.webp")} alt="Diário Escola" />
        <h2>{data.titulo}</h2>
        <p>{data.texto}</p>
      </div>
      <div className="diario-grid">
        {recursos.map((t, i) => {
          const gold = i % 2 === 1;
          return (
            <div className={"diario-feat" + (gold ? " gold" : "")} key={i}>
              <div className="di-ic"><Icon name={DIARIO_ICONS[i] || "circle-check"} color={gold ? "#f0b400" : "#0b82f6"} size={16} /></div>
              {t}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta("Escola CDA — Educação infantil e fundamental em Santa Maria/RS", "Há 15 anos acolhendo, inspirando e transformando vidas com afeto e propósito. Educação infantil e ensino fundamental em Santa Maria/RS.");
  useReveal();
  const { sec, loading } = usePageContent("home");
  const hero = section<HeroData>(sec, "hero", HERO_DEFAULT);
  const pilares = section<PilarData[]>(sec, "pilares", PILARES_DEFAULT);
  const diario = section<DiarioData>(sec, "diario", DIARIO_DEFAULT);
  const proposito = section<Bloco>(sec, "proposito", HOME_PROPOSITO);
  const conexao = section<Bloco>(sec, "conexao", HOME_CONEXAO);
  const segHead = section<Bloco>(sec, "seg_head", HOME_SEG_HEAD);
  const segCards = section<HomeCard[]>(sec, "seg_cards", HOME_SEG_CARDS);
  const vivHead = section<Bloco>(sec, "viv_head", HOME_VIV_HEAD);
  const vivCards = section<HomeCard[]>(sec, "viv_cards", HOME_VIV_CARDS);
  const espHead = section<Bloco>(sec, "esp_head", HOME_ESP_HEAD);
  const espFotos = section<GalFoto[]>(sec, "esp_fotos", HOME_ESP_FOTOS);
  const conexaoFeats = section<FeatItem[]>(sec, "conexao_feats", HOME_CONEXAO_FEATS);
  const fachada = section<Bloco>(sec, "fachada", HOME_FACHADA);
  const convite = section<Bloco>(sec, "convite", HOME_CONVITE);
  return (
    <div className="app">
      <Hero data={hero} loading={loading} />
      <Pillars pilares={pilares} />
      <Proposito data={proposito} />
      <Segmentos head={segHead} segs={segCards} />
      <Vivencias head={vivHead} vivs={vivCards} />
      <FachadaBand data={fachada} />
      <EspacoConvite data={convite} />
      <Espaco head={espHead} fotos={espFotos} />
      <Depoimentos />
      <DiarioBand data={diario} />
      <Conexao data={conexao} feats={conexaoFeats} />
      <Footer />
    </div>
  );
}
