import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { erro: boolean };

// Rede de segurança: se qualquer parte da página lançar um erro em tempo de
// renderização, mostramos uma mensagem amigável em vez de uma tela branca.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: false };

  static getDerivedStateFromError(): State {
    return { erro: true };
  }

  componentDidCatch(error: unknown) {
    // registra no console para diagnóstico (não quebra o site)
    console.error("Erro capturado pela ErrorBoundary:", error);
  }

  render() {
    if (this.state.erro) {
      return (
        <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
            <h2 style={{ color: "#0e2d6e", margin: "0 0 8px", fontSize: 22 }}>Ops, algo não carregou</h2>
            <p style={{ color: "#5b6b8c", fontSize: 15, lineHeight: 1.6, margin: "0 0 20px" }}>
              Tivemos um probleminha ao exibir esta parte do site. Tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: "linear-gradient(135deg,#1a7ff5,#0a4fc4)", color: "#fff", border: "none", borderRadius: 999, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
