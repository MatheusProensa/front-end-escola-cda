import { type ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth";
import RequireAuth from "./RequireAuth";
import AdminLogin from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditarHome from "./pages/EditarHome";
import EditarSegmentos from "./pages/EditarSegmentos";
import EditarMetodologia from "./pages/EditarMetodologia";
import EditarVivencias from "./pages/EditarVivencias";
import EditarEspacos from "./pages/EditarEspacos";
import EditarSobre from "./pages/EditarSobre";
import EditarMatriculasPagina from "./pages/EditarMatriculasPagina";
import AdminMomentos from "./pages/Momentos";
import AdminDepoimentos from "./pages/Depoimentos";
import AdminMatriculas from "./pages/AdminMatriculas";
import Contato from "./pages/Contato";
import Estatisticas from "./pages/Estatisticas";
import HistoricoEdicoes from "./pages/HistoricoEdicoes";
import Configuracoes from "./pages/Configuracoes";

// Área administrativa: provider de autenticação + rotas protegidas.
// Carregada sob demanda (lazy) — não entra no bundle do site público.
export default function AdminArea() {
  const guard = (el: ReactNode) => <RequireAuth>{el}</RequireAuth>;
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={guard(<Dashboard />)} />
        <Route path="home" element={guard(<EditarHome />)} />
        <Route path="segmentos" element={guard(<EditarSegmentos />)} />
        <Route path="metodologia" element={guard(<EditarMetodologia />)} />
        <Route path="vivencias" element={guard(<EditarVivencias />)} />
        <Route path="espacos" element={guard(<EditarEspacos />)} />
        <Route path="sobre" element={guard(<EditarSobre />)} />
        <Route path="pagina-matriculas" element={guard(<EditarMatriculasPagina />)} />
        <Route path="momentos" element={guard(<AdminMomentos />)} />
        <Route path="depoimentos" element={guard(<AdminDepoimentos />)} />
        <Route path="matriculas" element={guard(<AdminMatriculas />)} />
        <Route path="contato" element={guard(<Contato />)} />
        <Route path="estatisticas" element={guard(<Estatisticas />)} />
        <Route path="historico" element={guard(<HistoricoEdicoes />)} />
        <Route path="configuracoes" element={guard(<Configuracoes />)} />
        <Route index element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
