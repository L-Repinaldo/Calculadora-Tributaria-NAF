import { useState } from 'react';

export default function CustosInput({ value, onChange }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <div className="relative flex items-center gap-1 mb-1">
        <label htmlFor="custos" className="text-sm font-medium text-naf-blue">
          Despesas Dedutíveis (Livro Caixa)
        </label>
        <button
          type="button"
          className="text-naf-gray hover:text-naf-blue focus:outline-none"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
        {showTooltip && (
          <div className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg -top-2 left-full ml-2 border border-naf-gray/30">
            São os gastos essenciais para o seu trabalho acontecer (ex: aluguel de consultório/escritório, internet, energia).
          </div>
        )}
      </div>
      <input
        type="number"
        id="custos"
        value={value}
        onChange={onChange}
        placeholder="Ex: 750"
        className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
      />
    </div>
  );
}