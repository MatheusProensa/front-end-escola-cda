import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ContactProvider } from "./components/site";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Segmentos from "./pages/Segmentos";
import Vivencias from "./pages/Vivencias";
import Metodologia from "./pages/Metodologia";
import Espacos from "./pages/Espacos";
import Momentos from "./pages/Momentos";
import Sobre from "./pages/Sobre";
import Matriculas from "./pages/Matriculas";

// Painel administrativo carregado sob demanda — não pesa o site público.
const AdminArea = lazy(() => import("./admin/AdminArea"));

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

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        {/* Painel administrativo — só por URL /admin/*, protegido por login */}
        <Route path="/admin/*" element={<Suspense fallback={null}><AdminArea /></Suspense>} />
        {/* Site público */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </ErrorBoundary>
  );
}
