import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-naf-blue text-white py-6 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        <div className="text-center md:text-left">
<span className="font-bold text-lg mb-1 tracking-wide block">Calculadora Tributária NAF</span>          <p className="text-sm text-naf-gray">
            Desenvolvido por <span className="font-medium text-white">Alisson Almeida de Oliveira</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a href="https://unichristus.edu.br/" target="_blank" rel="noopener noreferrer" className="hover:text-naf-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1">
            Portal Unichristus <span className="sr-only">(abre em uma nova aba)</span>
          </a>
          <a href="https://www.instagram.com/naf.unichristus/" target="_blank" rel="noopener noreferrer" className="hover:text-naf-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1">
            Instagram do NAF <span className="sr-only">(abre em uma nova aba)</span>
          </a>
          <a href="https://www.gov.br/receitafederal/pt-br" target="_blank" rel="noopener noreferrer" className="hover:text-naf-red transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1">
            Receita Federal <span className="sr-only">(abre em uma nova aba)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}