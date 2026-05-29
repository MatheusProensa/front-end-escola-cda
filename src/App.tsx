import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ContactProvider } from "./components/site";
import Home from "./pages/Home";
import Segmentos from "./pages/Segmentos";
import Vivencias from "./pages/Vivencias";
import Espacos from "./pages/Espacos";
import Momentos from "./pages/Momentos";
import Sobre from "./pages/Sobre";
import Matriculas from "./pages/Matriculas";

// Painel administrativo (acesso só por URL /admin/*)
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
        <Route path="/espacos" element={<Espacos />} />
        <Route path="/momentos" element={<Momentos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/matriculas" element={<Matriculas />} />
      </Routes>
    </ContactProvider>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Painel administrativo — acessível apenas digitando /admin/... na URL */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/home" element={<EditarHome />} />
        <Route path="/admin/segmentos" element={<EditarSegmentos />} />
        <Route path="/admin/vivencias" element={<EditarVivencias />} />
        <Route path="/admin/espacos" element={<EditarEspacos />} />
        <Route path="/admin/sobre" element={<EditarSobre />} />
        <Route path="/admin/momentos" element={<AdminMomentos />} />
        <Route path="/admin/contato" element={<Contato />} />
        <Route path="/admin/configuracoes" element={<Configuracoes />} />

        {/* Site público */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </>
  );
}
