import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Layout, WPP, usePageMeta } from "../components/site";
import { api, API_CONFIGURED } from "../lib/api";

const MAP = "https://www.google.com/maps?q=R.+Jos%C3%A9+Manhago,+194+-+Camobi,+Santa+Maria+-+RS&output=embed";

function MatriculaForm() {
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
        await api("/api/matriculas", {
          method: "POST",
          body: JSON.stringify({
            responsavel: f.resp,
            whatsapp: f.tel,
            nome_crianca: f.crianca,
            idade_crianca: f.idade,
            segmento: f.seg,
            mensagem: f.msg,
          }),
        });
      }
      setSent(true);
    } catch {
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
          <h3>Recebemos com carinho!</h3>
          <p>Obrigado{f.resp ? ", " + f.resp.split(" ")[0] : ""}. Em breve a equipe da CDA entra em contato para agendar sua visita.</p>
          <a className="cda-modal-wpp" href={WPP} target="_blank" rel="noreferrer"><Icon name="whatsapp" brand size={16} /> Adiantar pelo WhatsApp</a>
        </div>
      </div>
    );
  }
  return (
    <form className="contato-form" onSubmit={submit}>
      <span className="eyebrow">Formulário de interesse</span>
      <h3 style={{ marginTop: 8 }}>Vamos conversar?</h3>
      <p>Preencha os dados e nossa equipe entra em contato para agendar uma visita acolhedora.</p>
      {erro && <div className="cda-field-erro"><Icon name="circle-exclamation" size={14} /> {erro}</div>}
      <div className="form-grid">
        <div className="cda-field"><label htmlFor="resp">Responsável</label><input id="resp" type="text" placeholder="Seu nome" value={f.resp} onChange={set("resp")} required /></div>
        <div className="cda-field"><label htmlFor="tel">WhatsApp</label><input id="tel" type="tel" placeholder="(55) 9 0000-0000" value={f.tel} onChange={set("tel")} required /></div>
      </div>
      <div className="form-grid">
        <div className="cda-field"><label htmlFor="crianca">Nome da criança</label><input id="crianca" type="text" placeholder="Nome do(a) aluno(a)" value={f.crianca} onChange={set("crianca")} /></div>
        <div className="cda-field"><label htmlFor="idade">Idade da criança</label><input id="idade" type="text" placeholder="Ex.: 3 anos" value={f.idade} onChange={set("idade")} /></div>
      </div>
      <div className="cda-field"><label htmlFor="seg">Segmento</label>
        <select id="seg" value={f.seg} onChange={set("seg")} required>
          <option value="" disabled>Selecione…</option>
          <option>Educação Infantil</option>
          <option>Ensino Fundamental</option>
          <option>Contraturno</option>
          <option>Ainda não sei</option>
        </select>
      </div>
      <div className="cda-field"><label htmlFor="msg">Mensagem (opcional)</label><textarea id="msg" placeholder="Conte um pouco sobre o que você procura…" value={f.msg} onChange={set("msg")}></textarea></div>
      <button type="submit" className="primary-btn" style={{ width: "100%", marginTop: 4 }} disabled={loading}>
        {loading ? <><Icon name="spinner" size={15} /> Enviando…</> : "Quero falar com a escola"}
      </button>
    </form>
  );
}

type Info = { icon: string; brand?: boolean; wpp?: boolean; t: string; v: string; href?: string };
const INFO: Info[] = [
  { icon: "location-dot", t: "Endereço", v: "R. José Manhago, 194 - Camobi, Santa Maria - RS" },
  { icon: "whatsapp", brand: true, wpp: true, t: "WhatsApp", v: "(55) 3217-7947", href: WPP },
  { icon: "phone", t: "Telefone", v: "(55) 3217-7947", href: "tel:+555532177947" },
  { icon: "clock|r", t: "Horário", v: "Segunda a Sexta, 7h às 18h" },
];

export default function Matriculas() {
  usePageMeta("Matrículas Abertas — Escola CDA, Santa Maria/RS", "Matrículas abertas na Escola CDA. Agende uma visita, conheça a escola e fale com a gente pelo WhatsApp.");
  return (
    <Layout>
      <section className="page-hero reveal">
        <span className="eyebrow">Agende uma visita</span>
        <h1>Vamos conversar sobre o futuro do seu <span className="script">filho?</span></h1>
        <p>Estamos de portas abertas para receber a sua família. Escolha o caminho mais fácil para você — formulário, WhatsApp ou uma visita à escola.</p>
      </section>

      <div className="cda-panel reveal">
        <div className="contato-grid">
          <MatriculaForm />
          <div className="contato-info">
            {INFO.map((c, i) => (
              <div className={"info-card" + (c.wpp ? " wpp" : "")} key={i}>
                <div className="ic"><Icon name={c.icon} brand={c.brand} color={c.wpp ? "#25d366" : "#0b82f6"} size={19} /></div>
                <div>
                  <strong>{c.t}</strong>
                  {c.href ? <a href={c.href} target={c.wpp ? "_blank" : undefined} rel="noreferrer">{c.v}</a> : <span>{c.v}</span>}
                </div>
              </div>
            ))}
            <div className="info-card" style={{ background: "linear-gradient(135deg,#1a7ff5,#0a4fc4)", border: "none" }}>
              <div className="ic" style={{ background: "rgba(255,255,255,0.16)", color: "#fff" }}><Icon name="calendar-check" color="#fff" size={19} /></div>
              <div>
                <strong style={{ color: "#fff" }}>Prefere visitar?</strong>
                <a href={WPP} target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.9)" }}>Agende uma visita pelo WhatsApp →</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mapa reveal">
        <iframe src={MAP} title="Mapa — Escola CDA" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div className="cta-band reveal">
        <h2>Venha conhecer a CDA de perto</h2>
        <p>Agende uma visita e sinta o acolhimento de uma escola que acolhe, desenvolve e transforma há 15 anos.</p>
        <div className="cta-actions">
          <a className="btn-white" href={WPP} target="_blank" rel="noreferrer"><Icon name="whatsapp" brand size={16} /> Falar no WhatsApp</a>
          <Link className="btn-ghost" to="/sobre"><Icon name="arrow-right" size={15} /> Conhecer a escola</Link>
        </div>
      </div>
    </Layout>
  );
}
