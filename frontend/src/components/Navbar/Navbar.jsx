import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full bg-naf-blue shadow-lg border-b border-naf-gray/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          <div 
            onClick={() => navigate('/Home')}
            className="flex-shrink-0 text-xl font-bold text-white tracking-wide cursor-pointer hover:text-naf-gray transition-colors duration-300"
            title="Voltar para a Página Inicial"
          >
            Calculadora Tributária
          </div>

          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigate('/Home')}
                className="px-2.5 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Página Inicial
              </button>

              <div className="h-5 w-px bg-naf-gray/50 opacity-40 mx-0.5" />

              <button
                onClick={() => navigate('/calculo-pf')}
                className="px-2.5 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Cálculo PF
              </button>

              <div className="h-5 w-px bg-naf-gray/50 opacity-40 mx-0.5" />

              <button
                onClick={() => navigate('/calculo-pj')}
                className="px-2.5 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Cálculo PJ
              </button>

              <div className="h-5 w-px bg-naf-gray/50 opacity-40 mx-0.5" />

              <button
                onClick={() => navigate('/comparativo')}
                className="px-2.5 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Comparativo
              </button>

              <div className="h-5 w-px bg-naf-gray/50 opacity-40 mx-0.5" />

              <button
                onClick={() => navigate('/historico')}
                className="px-2.5 py-2 rounded-lg text-sm font-medium text-naf-light hover:bg-naf-red hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Histórico
              </button>
            </div>

            <button
              onClick={() => handleLogout()}
              className="ml-5 px-4 py-2 bg-transparent border-2 border-naf-red text-naf-light rounded-lg text-sm font-bold hover:bg-naf-red hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
