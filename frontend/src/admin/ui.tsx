import { useEffect, useState } from "react";

/* Helpers de UI reutilizáveis do painel */

// Toast de confirmação ou erro
export function useToast(): [(m: string, err?: boolean) => void, React.ReactNode] {
  const [state, setState] = useState<{ msg: string; err: boolean } | null>(null);
  const toast = (m: string, err = false) => {
    setState({ msg: m, err });
    window.setTimeout(() => setState(null), 2600);
  };
  const node = (
    <div className={"adm-toast" + (state ? " show" : "") + (state?.err ? " err" : "")}>
      <i className={"fa-solid " + (state?.err ? "fa-circle-exclamation" : "fa-circle-check")}></i>
      {state?.msg}
    </div>
  );
  return [toast, node];
}

// Barra de salvar / publicar
export function SaveBar({ onSave, saving }: { onSave: () => void; saving?: boolean }) {
  return (
    <div className="adm-savebar">
      <div className="msg"><i className="fa-solid fa-circle-info"></i> Alterações ainda não publicadas</div>
      <div className="sp">
        <button className="adm-btn adm-btn-ghost adm-btn-sm" disabled={saving}>Descartar</button>
        <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={onSave} disabled={saving}>
          {saving
            ? <><i className="fa-solid fa-spinner fa-spin"></i> Salvando…</>
            : <><i className="fa-solid fa-cloud-arrow-up"></i> Salvar e publicar</>}
        </button>
      </div>
    </div>
  );
}

// Slot de imagem (upload conecta ao backend futuramente)
export function ImgSlot({ src, label, ratio }: { src?: string; label?: string; ratio?: string }) {
  return (
    <div className="adm-img-slot" style={ratio ? { aspectRatio: ratio } : undefined}>
      {src
        ? <img src={src} alt={label || ""} />
        : <div className="adm-img-empty"><i className="fa-solid fa-cloud-arrow-up"></i><span>{label || "Enviar imagem"}</span></div>}
      <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar imagem</span></div>
    </div>
  );
}

// Interruptor (toggle)
export function Toggle({ on }: { on?: boolean }) {
  const [v, setV] = useState(!!on);
  return <button type="button" className={"adm-switch" + (v ? " on" : "")} onClick={() => setV(!v)}></button>;
}

// Número com contagem animada
export function CountNum({ value }: { value: string | number }) {
  const [n, setN] = useState(0);
  const num = typeof value === "number" ? value : parseInt(value, 10);
  useEffect(() => {
    if (isNaN(num)) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [num]);
  return <>{isNaN(num) ? value : n}</>;
}
