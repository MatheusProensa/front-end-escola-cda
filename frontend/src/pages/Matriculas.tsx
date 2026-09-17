import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, track, usePageMeta, useSettings } from "../components/site";
import { CtaBand } from "../components/blocks";
import { usePageContent, section } from "../lib/content";
import { MATRICULAS_HERO, MATRICULAS_FORM, MATRICULAS_CTA, MATRICULAS_CAMPOS, type Bloco, type MatriculasCampos } from "../lib/textos";
import { supabase, API_CONFIGURED } from "../lib/supabase";

// Endereço padrão do mapa; se o endereço do painel (Contato) estiver preenchido, ele manda.
const MAP_FALLBACK = "R. José Manhago, 194 - Camobi, Santa Maria - RS";
const mapaUrl = (endereco: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(endereco || MAP_FALLBACK)}&output=embed`;

function MatriculaForm({ txt, campos }: { txt: Bloco; campos: MatriculasCampos }) {
  const s = useSettings();
  const opcoes = String(campos.opcoes || "").split("\n").map((x) => x.trim()).filter(Boolean);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [f, setF] = useState({ resp: "", crianca: "", idade: "", seg: "", tel: "", msg: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      if (API_CONFIGURED) {
        const { error } = await supabase.from("matriculas").insert({
          responsavel: f.resp,
          whatsapp: f.tel,
          nome_crianca: f.crianca,
          idade_crianca: f.idade,
          segmento: f.seg,
          mensagem: f.msg,
        });
        if (error) throw error;
      }
      track("matricula_enviada", { segmento: f.seg });
      setSent(true);
    } catch {
      track("matricula_erro");
      setErro("Não foi possível enviar. Tente novamente ou fale pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="contato-form">
        <div className="cda-success">
          <div className="cda-success-ic"><Icon name="heart" color="#fff" size={26} /></div>
          <h3>{campos.sucessoTitulo}</h3>
          <p>Obrigado{f.resp ? ", " + f.resp.split(" ")[0] : ""}. {campos.sucessoTexto}</p>
          <a className="cda-modal-wpp" href={s.wpp_link} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { local: "matriculas_sucesso" })}><Icon name="whatsapp" brand size={16} /> {campos.sucessoBtn}</a>
        </div>
      </div>
    );
  }
  return (
    <form className="contato-form" onSubmit={submit}>
      <span className="eyebrow">{txt.eyebrow}</span>
      <h3 style={{ marginTop: 8 }}>{txt.titulo}</h3>
      <p>{txt.p1}</p>
      {erro && <div className="cda-field-erro"><Icon name="circle-exclamation" size={14} /> {erro}</div>}
      <div className="form-grid">
        <div className="cda-field"><label htmlFor="resp">{campos.lResp}</label><input id="resp" type="text" maxLength={80} placeholder={campos.phResp} value={f.resp} onChange={set("resp")} required /></div>
        <div className="cda-field"><label htmlFor="tel">{campos.lTel}</label><input id="tel" type="tel" maxLength={20} placeholder={campos.phTel} value={f.tel} onChange={set("tel")} required /></div>
      </div>
      <div className="form-grid">
        <div className="cda-field"><label htmlFor="crianca">{campos.lCrianca}</label><input id="crianca" type="text" maxLength={80} placeholder={campos.phCrianca} value={f.crianca} onChange={set("crianca")} /></div>
        <div className="cda-field"><label htmlFor="idade">{campos.lIdade}</label><input id="idade" type="text" maxLength={30} placeholder={campos.phIdade} value={f.idade} onChange={set("idade")} /></div>
      </div>
      <div className="cda-field"><label htmlFor="seg">{campos.lSeg}</label>
        <select id="seg" value={f.seg} onChange={set("seg")} required>
          <option value="" disabled>{campos.phSeg}</option>
          {opcoes.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="cda-field"><label htmlFor="msg">{campos.lMsg}</label><textarea id="msg" maxLength={1000} placeholder={campos.phMsg} value={f.msg} onChange={set("msg")}></textarea></div>
      <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: 4 }} disabled={loading}>
        {loading ? <><Icon name="spinner" size={15} /> Enviando…</> : (txt.btn || "Quero falar com a escola")}
      </button>
    </form>
  );
}

type Info = { icon: string; brand?: boolean; wpp?: boolean; t: string; v: string; href?: string };

export default function Matriculas() {
  usePageMeta("Matrículas Abertas — Escola CDA, Santa Maria/RS", "Matrículas abertas na Escola CDA. Agende uma visita, conheça a escola e fale com a gente pelo WhatsApp.");
  const s = useSettings();
  const { sec } = usePageContent("matriculas");
  const hero = section<Bloco>(sec, "hero", MATRICULAS_HERO);
  const formTxt = section<Bloco>(sec, "form", MATRICULAS_FORM);
  const cta = section<Bloco>(sec, "cta", MATRICULAS_CTA);
  const campos = section<MatriculasCampos>(sec, "campos", MATRICULAS_CAMPOS);
  const INFO: Info[] = [
    { icon: "location-dot", t: campos.infoEndereco, v: s.endereco },
    { icon: "whatsapp", brand: true, wpp: true, t: campos.infoWhats, v: s.whatsapp, href: s.wpp_link },
    { icon: "phone", t: campos.infoTelefone, v: s.telefone, href: "tel:+" + s.telefone.replace(/\D/g, "") },
    { icon: "clock|r", t: campos.infoHorario, v: s.horario },
  ];
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>{hero.titulo} <span className="script">{hero.destaque}</span></h1>
        <p>{hero.p1}</p>
      </section>

      <div className="cda-panel reveal">
        <div className="contato-grid">
          <MatriculaForm txt={formTxt} campos={campos} />
          <div className="contato-info">
            {INFO.map((c, i) => (
              <div className={"info-card" + (c.wpp ? " wpp" : "")} key={i}>
                <div className="ic"><Icon name={c.icon} brand={c.brand} color={c.wpp ? "#25d366" : "#0b82f6"} size={19} /></div>
                <div>
                  <strong>{c.t}</strong>
                  {c.href ? <a href={c.href} target={c.wpp ? "_blank" : undefined} rel="noreferrer" onClick={c.wpp ? () => track("whatsapp_click", { local: "matriculas_info" }) : undefined}>{c.v}</a> : <span>{c.v}</span>}
                </div>
              </div>
            ))}
            <div className="info-card" style={{ background: "linear-gradient(135deg,#1a7ff5,#0a4fc4)", border: "none" }}>
              <div className="ic" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}><Icon name="calendar-check" color="#fff" size={19} /></div>
              <div>
                <strong style={{ color: "#fff" }}>{campos.visitaTitulo}</strong>
                <a href={s.wpp_link} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.9)" }} onClick={() => track("whatsapp_click", { local: "matriculas_visita" })}>{campos.visitaLink}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mapa reveal">
        <iframe src={mapaUrl(s.endereco)} title="Mapa — Escola CDA" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <CtaBand b={cta}>
        <a className="btn-white" href={s.wpp_link} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { local: "matriculas_cta_band" })}><Icon name="whatsapp" brand size={16} /> {cta.btn || "Falar no WhatsApp"}</a>
        <Link className="btn-ghost" to="/sobre"><Icon name="arrow-right" size={15} /> {cta.p2 || "Conhecer a escola"}</Link>
      </CtaBand>
    </Layout>
  );
}
