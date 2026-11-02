import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Home from "./pages/Home";
import CalculoPF from "./pages/CalculoPF";
import CalculoPJ from "./pages/CalculoPJ";
import Comparativo from "./pages/Comparativo";
import Historico from "./pages/Historico";
import Navbar from "./components/Navbar/Navbar";
import Faq from "./pages/Faq";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

import Footer from "./components/Footer/Footer";
import RotasPosLogin from "./components/RotasPosLogin/RotasPosLogin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* --- ROTAS PÚBLICAS --- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sobre" element={<Sobre />} />

        {/* --- ROTAS PROTEGIDAS (Só acessa quem está logado) --- */}
        <Route element={<RotasPosLogin />}>
          <Route path="/home" element={<Home />} />
          <Route path="/calculo-pf" element={<CalculoPF />} />
          <Route path="/calculo-pj" element={<CalculoPJ />} />
          <Route path="/comparativo" element={<Comparativo />} />
          <Route path="/historico" element={<Historico />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;