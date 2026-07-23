// Blocos reutilizáveis e editáveis: cabeçalho de seção e faixa de chamada (CTA).
// O texto vem do banco (page_content) com fallback nos padrões — igual ao resto do site.
import type { ReactNode } from "react";
import type { Bloco } from "../lib/textos";

// Cabeçalho de seção (eyebrow + título + destaque opcional + parágrafo opcional).
export function SecHead({ b }: { b: Bloco }) {
  return (
    <div className="sec-head">
      {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
      <h2>
        {b.titulo}
        {b.destaque && <> <span style={{ color: "#1b84ff" }}>{b.destaque}</span></>}
      </h2>
      {b.p1 && <p>{b.p1}</p>}
    </div>
  );
}

// Faixa de chamada no fim das páginas. Título e texto são editáveis;
// os botões (ações) são passados por quem usa, pois variam por página.
export function CtaBand({ b, children }: { b: Bloco; children: ReactNode }) {
  return (
    <div className="cta-band reveal">
      <h2>
        {b.titulo}
        {b.destaque && <> <span style={{ color: "#f0b400" }}>{b.destaque}</span></>}
      </h2>
      {b.p1 && <p>{b.p1}</p>}
      <div className="cta-actions">{children}</div>
    </div>
  );
}
