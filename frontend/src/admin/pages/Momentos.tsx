import AdminShell from "../AdminShell";
import { useToast } from "../ui";
import { asset } from "../../lib/assets";

const logo = () => asset("logo-cda-15anos-semborda.webp");
type Album = { img: string; t: string; date: string; fotos: number; st: string };
const ALBUNS: Album[] = [
  { img: "aniversario-15.webp", t: "Aniversário da Escola CDA — 15 anos", date: "31 de Março · 2026", fotos: 132, st: "pub" },
  { img: "biblioteca.webp", t: "Feira do Livro", date: "11 de Abril · 2026", fotos: 7, st: "pub" },
  { img: "eventos/festa-familia-1sem/010.webp", t: "Festa da Família — 1º semestre", date: "09 de Maio · 2026", fotos: 45, st: "pub" },
];

export default function Momentos() {
  const [toast, toastNode] = useToast();
  return (
    <AdminShell active="momentos" title="Momentos" subtitle="Galeria de álbuns exibida no site" logoSrc={logo()}>
      <div className="adm-page-head">
        <div className="ph-ic"><i className="fa-solid fa-camera-retro"></i></div>
        <div><h1>Momentos</h1><p>Crie álbuns de fotos dos eventos e celebrações da escola — exibidos na página Momentos do site.</p></div>
        <div className="ph-act">
          <a className="adm-btn adm-btn-ghost adm-btn-sm" href="/momentos" target="_blank"><i className="fa-solid fa-up-right-from-square"></i> Ver no site</a>
          <button className="adm-btn adm-btn-primary adm-btn-sm" style={{ width: "auto" }} onClick={() => toast("Novo álbum criado!")}><i className="fa-solid fa-plus"></i> Novo álbum</button>
        </div>
      </div>

      <div className="adm-stats" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        <div className="adm-stat"><div className="adm-stat-top"><div className="adm-stat-ic ic-blue"><i className="fa-solid fa-images"></i></div></div><div className="adm-stat-num">3</div><div className="adm-stat-lbl">Álbuns publicados</div></div>
        <div className="adm-stat"><div className="adm-stat-top"><div className="adm-stat-ic ic-gold"><i className="fa-regular fa-image"></i></div></div><div className="adm-stat-num">184</div><div className="adm-stat-lbl">Fotos no total</div></div>
        <div className="adm-stat"><div className="adm-stat-top"><div className="adm-stat-ic ic-green"><i className="fa-solid fa-calendar-check"></i></div></div><div className="adm-stat-num">Mar/26</div><div className="adm-stat-lbl">Próximo evento</div></div>
      </div>

      <div className="adm-card">
        <div className="adm-card-sec"><div className="si"><i className="fa-solid fa-folder-open"></i></div><h3>Todos os álbuns</h3></div>
        <p className="hint">Cada álbum representa um evento/momento. Clique para editar capa, data e fotos.</p>
        <div className="adm-img-grid">
          {ALBUNS.map((a, i) => (
            <div key={i} style={{ border: "1px solid var(--adm-line)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
              <div className="adm-img-slot" style={{ aspectRatio: "16/10", border: "none", borderRadius: 0 }}>
                <img src={asset(a.img)} alt={a.t} />
                <span className={"adm-badge " + a.st} style={{ position: "absolute", top: 10, left: 10, zIndex: 3 }}>{a.st === "pub" ? "Publicado" : "Rascunho"}</span>
                <div className="adm-img-over"><span className="chip"><i className="fa-solid fa-arrows-rotate"></i> Trocar capa</span></div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <input className="adm-text" defaultValue={a.t} style={{ padding: "8px 10px", fontSize: 13, marginBottom: 8 }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11.5, color: "var(--adm-ink-3)", fontWeight: 600 }}><i className="fa-regular fa-calendar"></i> {a.date} · {a.fotos} fotos</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="adm-mini-btn" title="Gerir fotos"><i className="fa-regular fa-images"></i></button>
                    <button className="adm-mini-btn del" title="Excluir"><i className="fa-regular fa-trash-can"></i></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toastNode}
    </AdminShell>
  );
}
