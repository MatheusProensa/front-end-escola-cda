import "./App.css";
import { useEffect, type ReactNode } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ContactProvider } from "./components/site";
import Home from "./pages/Home";
import Segmentos from "./pages/Segmentos";
import Vivencias from "./pages/Vivencias";
import Metodologia from "./pages/Metodologia";
import Espacos from "./pages/Espacos";
import Momentos from "./pages/Momentos";
import Sobre from "./pages/Sobre";
import Matriculas from "./pages/Matriculas";

// Painel administrativo (acesso só por URL /admin/*)
import { AuthProvider } from "./admin/auth";
import RequireAuth from "./admin/RequireAuth";
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import EditarHome from "./admin/pages/EditarHome";
import EditarSegmentos from "./admin/pages/EditarSegmentos";
import EditarVivencias from "./admin/pages/EditarVivencias";
import EditarEspacos from "./admin/pages/EditarEspacos";
import EditarSobre from "./admin/pages/EditarSobre";
import AdminMomentos from "./admin/pages/Momentos";
import Contato from "./admin/pages/Contato";
import Configuracoes from "./admin/pages/Configuracoes";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

// Site público (com navbar, rodapé, WhatsApp e modal de contato)
function PublicSite() {
  return (
    <ContactProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/segmentos" element={<Segmentos />} />
        <Route path="/vivencias" element={<Vivencias />} />
        <Route path="/metodologia" element={<Metodologia />} />
        <Route path="/espacos" element={<Espacos />} />
        <Route path="/momentos" element={<Momentos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/matriculas" element={<Matriculas />} />
      </Routes>
    </ContactProvider>
  );
}

// Área administrativa: provider de autenticação + rotas protegidas
function AdminArea() {
  const guard = (el: ReactNode) => <RequireAuth>{el}</RequireAuth>;
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={guard(<Dashboard />)} />
        <Route path="home" element={guard(<EditarHome />)} />
        <Route path="segmentos" element={guard(<EditarSegmentos />)} />
        <Route path="vivencias" element={guard(<EditarVivencias />)} />
        <Route path="espacos" element={guard(<EditarEspacos />)} />
        <Route path="sobre" element={guard(<EditarSobre />)} />
        <Route path="momentos" element={guard(<AdminMomentos />)} />
        <Route path="contato" element={guard(<Contato />)} />
        <Route path="configuracoes" element={guard(<Configuracoes />)} />
        <Route index element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Painel administrativo — só por URL /admin/*, protegido por login */}
        <Route path="/admin/*" element={<AdminArea />} />
        {/* Site público */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </>
  );
}
