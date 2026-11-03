
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Verifica autenticação e fecha o menu ao mudar de rota
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token !== null);
    setMenuAberto(false);
  }, [location]);

  // Fecha o menu ao pressionar Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuAberto(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setMenuAberto(false);
    navigate("/");
  };

  return (
    <nav
      className="relative z-50 w-full bg-naf-blue shadow-lg border-b border-naf-gray/20"
      aria-label="Principal"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to={isAuthenticated ? "/home" : "/"}
            className="flex-shrink-0 text-lg md:text-xl font-bold text-white tracking-wide hover:text-naf-light transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1"
          >
            Calculadora Tributária
          </Link>

          {/* Botão Hambúrguer (Apenas Mobile) */}
          <button
            type="button"
            className="md:hidden text-white p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            aria-label={
              menuAberto
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuAberto ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menu de Links (Desktop: sempre visível | Mobile: controlado pelo botão) */}
          <div
            id="menu-principal"
            className={`absolute z-50 md:static top-16 left-0 w-full md:w-auto bg-naf-blue md:bg-transparent shadow-md md:shadow-none flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-1 p-4 md:p-0 transition-all duration-300 ${
              menuAberto ? "flex" : "hidden md:flex"
            }`}
          >

            {/* Links Privados */}
            {isAuthenticated && (
              <>

                <Link
                  to="/home"
                  className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Página Inicial
                </Link>

                <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

                <Link
                  to="/calculo-pf"
                  className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Cálculo PF
                </Link>

                <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

                <Link
                  to="/calculo-pj"
                  className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Cálculo PJ
                </Link>

                <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

                <Link
                  to="/comparativo"
                  className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Comparativo
                </Link>

                <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

                <Link
                  to="/historico"
                  className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
                >
                  Histórico
                </Link>
              </>
            )}

            {/* Links Públicos */}

            <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

            <Link
              to="/faq"
              className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
            >
              FAQ
            </Link>

            <div className="hidden md:block h-5 w-px bg-naf-gray/50 opacity-40 mx-1" />

            <Link
              to="/sobre"
              className="w-full md:w-auto px-3 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 min-h-[44px] flex items-center"
            >
              Sobre
            </Link>

            {/* Autenticação: Login, Cadastro ou Logout */}
            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 border-t md:border-t-0 border-naf-gray/30 pt-4 md:pt-0">

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="w-full md:w-auto text-center px-4 py-2 text-naf-light rounded-lg text-sm font-bold hover:text-white transition-all duration-300 min-h-[44px] flex items-center justify-center"
                  >
                    Entrar
                  </Link>

                  <Link
                    to="/cadastro"
                    className="w-full md:w-auto text-center px-4 py-2 bg-naf-red text-white rounded-lg text-sm font-bold hover:scale-105 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                  >
                    Criar Conta
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto px-4 py-2 bg-transparent border-2 border-naf-red text-naf-light rounded-lg text-sm font-bold hover:bg-naf-red hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer min-h-[44px]"
                >
                  Sair
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
