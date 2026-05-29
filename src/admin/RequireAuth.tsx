import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./auth";

// Protege rotas do painel: sem sessão válida, redireciona para o login.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuth, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#0e2d6e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <span><i className="fa-solid fa-spinner fa-spin"></i> Carregando…</span>
      </div>
    );
  }
  if (!isAuth) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
