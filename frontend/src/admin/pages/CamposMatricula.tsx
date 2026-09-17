import { useEffect, useState } from "react";
import { useToast } from "../ui";
import { API_CONFIGURED } from "../../lib/supabase";
import { usePageContent, section, savePage } from "../../lib/content";
import { MATRICULAS_CAMPOS, type MatriculasCampos } from "../../lib/textos";

// Editor dos rótulos, dicas, opções e mensagens do formulário de matrículas
// (seção "campos" da página). Salva direto no banco.
export default function CamposMatricula() {
  const [toast, toastNode] = useToast();
  const { sec, loading, erro } = usePageContent("matriculas");
  const [c, setC] = useState<MatriculasCampos>(MATRICULAS_CAMPOS);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading) setC(section<MatriculasCampos>(sec, "campos", MATRICULAS_CAMPOS));
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const setK = (k: keyof MatriculasCampos, v: string) => setC((p) => ({ ...p, [k]: v }));

  const salvar = async () => {
    if (erro) { toast("Não foi possível carregar o conteúdo atual. Recarregue a página antes de salvar.", true); return; }
    setSaving(true);
    try {
      if (API_CONFIGURED) await savePage("matriculas", { campos: c });
      toast("Campos salvos!");
    } catch { toast("Erro ao salvar.", true); }
    finally { setSaving(false); }
  };

  const campo = (k: keyof MatriculasCampos, label: string, area = false) => (
    <div key={k} style={{ marginBottom: 8 }}>
      <label className="adm-form-label" style={{ fontSize: 11.5 }}>{label}</label>
      {area
        ? <textarea className="adm-textarea" value={c[k]} onChange={(e) => setK(k, e.target.value)} style={{ minHeight: 58, fontSize: 12.5 }} />
        : <input className="adm-text" value={c[k]} onChange={(e) => setK(k, e.target.value)} style={{ padding: "7px 9px", fontSize: 12.5 }} />}
    </div>
  );

  const par = (a: React.ReactNode, b: React.ReactNode) => (
    <div className="adm-grid-fields">{a}{b}</div>
  );

  return (
    <div className="adm-card" style={{ marginTop: 18 }}>
      <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-pen-to-square"></i></div><h3>Campos do formulário</h3></div>
      <p className="hint" style={{ marginBottom: 12 }}>Rótulos e dicas de cada campo, as opções de segmento e as mensagens de sucesso.</p>

      {par(campo("lResp", "Rótulo — Responsável"), campo("phResp", "Dica — Responsável"))}
      {par(campo("lTel", "Rótulo — WhatsApp"), campo("phTel", "Dica — WhatsApp"))}
      {par(campo("lCrianca", "Rótulo — Nome da criança"), campo("phCrianca", "Dica — Nome da criança"))}
      {par(campo("lIdade", "Rótulo — Idade"), campo("phIdade", "Dica — Idade"))}
      {par(campo("lSeg", "Rótulo — Segmento"), campo("phSeg", "Texto “Selecione…”"))}
      {campo("opcoes", "Opções de segmento (uma por linha)", true)}
      {par(campo("lMsg", "Rótulo — Mensagem"), campo("phMsg", "Dica — Mensagem"))}

      <div className="adm-card-sec" style={{ marginTop: 14 }}><div className="si"><i className="fa-solid fa-circle-check"></i></div><h3 style={{ fontSize: 14 }}>Mensagem de sucesso</h3></div>
      {campo("sucessoTitulo", "Título")}
      {campo("sucessoTexto", "Texto (aparece depois de “Obrigado, [nome].”)", true)}
      {campo("sucessoBtn", "Botão do WhatsApp")}

      <div className="adm-card-sec" style={{ marginTop: 14 }}><div className="si"><i className="fa-solid fa-address-card"></i></div><h3 style={{ fontSize: 14 }}>Rótulos dos cartões de contato</h3></div>
      {par(campo("infoEndereco", "Endereço"), campo("infoWhats", "WhatsApp"))}
      {par(campo("infoTelefone", "Telefone"), campo("infoHorario", "Horário"))}
      {par(campo("visitaTitulo", "Cartão azul — Título"), campo("visitaLink", "Cartão azul — Link"))}

      <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto", marginTop: 12 }} onClick={salvar} disabled={saving}>
        {saving ? <><i className="fa-solid fa-spinner fa-spin"></i> Salvando…</> : <><i className="fa-solid fa-floppy-disk"></i> Salvar campos</>}
      </button>
      {toastNode}
    </div>
  );
}
