<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
=======
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useFormCalculo } from '../../hooks/useFormCalculo';
import { PROFISSOES } from '../../constants/profissoes';
>>>>>>> Stashed changes

// Imports corrigidos para buscar dentro das pastas
import ProfissaoSelect from '../ProfissaoSelect/ProfissaoSelect';
import ProLaboreInput from '../ProLaboreInput/ProLaboreInput';
import RendaInput from '../RendaInput/RendaInput';
import CustosInput from '../CustosInput/CustosInput';
import ResultadoCard from '../ResultadoCard/ResultadoCard';

export default function CalculoPJ() {
  const { renda, custos, profissao, proLabore, resultado, erro, loading, handleRendaChange, calcular, setProfissao, setProLabore, setCustos } = useFormCalculo();
  const [isVisible, setIsVisible] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [mensagemEnvio, setMensagemEnvio] = useState('');

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => { if (!token) navigate('/'); }, [token, navigate]);
  useEffect(() => { const timer = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(timer); }, []);

  const profissaoSelecionada = PROFISSOES.find(p => p.id === profissao);
  const usaFatorR = profissaoSelecionada?.usaFatorR || false;

  const handleProfissaoChange = (e) => { setProfissao(e.target.value); setProLabore(''); };
  const handleCalcular = () => calcular('PJ');
  const enviarEmail = () => {
    if (!email.includes('@')) { setMensagemEnvio('Por favor, insira um e-mail válido.'); return; }
    setMensagemEnvio(`Resultados simulados e enviados para ${email} com sucesso!`);
    setEmail('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className={`w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-naf-gray/20 transition-all duration-[700ms] ease-out delay-[100ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[300ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Cálculo IR Pessoa Jurídica
          </h2>
          <div className="space-y-4">
            <ProfissaoSelect value={profissao} onChange={handleProfissaoChange} />
            <ProLaboreInput value={proLabore} onChange={(e) => setProLabore(e.target.value)} visible={usaFatorR} />
            <RendaInput value={renda} onChange={handleRendaChange} erro={erro} />
            <CustosInput value={custos} onChange={(e) => setCustos(e.target.value)} />
            
            <button onClick={handleCalcular} disabled={loading} className="w-full bg-naf-blue text-white font-bold py-3 rounded-xl hover:bg-[#0c1825] hover:scale-105 transition-all duration-[400ms] ease-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Calculando...' : 'Calcular'}
            </button>

            {resultado && <ResultadoCard resultado={resultado} />}

            {resultado && typeof resultado !== 'string' && (
              <div className="mt-5 pt-3 border-t border-naf-gray/30">
                <p className="text-sm font-medium text-naf-blue mb-3 text-center">Deseja enviar essa simulação por e-mail?</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setMostrarEmail(true)} className="bg-naf-blue text-white px-5 py-2 rounded-xl hover:bg-[#0c1825] transition shadow-sm text-sm font-medium">Sim, enviar</button>
                  <button onClick={() => setMostrarEmail(false)} className="bg-white border border-naf-gray text-naf-blue px-5 py-2 rounded-xl hover:bg-gray-100 transition shadow-sm text-sm font-medium">Não, obrigado</button>
                </div>
                {mostrarEmail && (
                  <div className="mt-4 space-y-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none text-sm" />
                    <button onClick={enviarEmail} className="w-full bg-naf-red text-white py-2 rounded-xl hover:bg-[#a62b18] transition text-sm font-bold shadow-sm">Enviar resultados</button>
                  </div>
                )}
                {mensagemEnvio && <p className="text-green-600 mt-3 text-sm font-bold text-center">{mensagemEnvio}</p>}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}