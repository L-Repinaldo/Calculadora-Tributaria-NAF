import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CalculoPF() {
  const [renda, setRenda] = useState("");
  const [custos, setCustos] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [showTooltipRenda, setShowTooltipRenda] = useState(false);
  const [showTooltipCustos, setShowTooltipCustos] = useState(false);
  const [profissao, setProfissao] = useState("psicologo");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRendaChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (valor > 15000) {
      setErro("O valor máximo permitido é R$ 15.000,00");
      setRenda(15000);
    } else {
      setErro("");
      setRenda(e.target.value);
    }
  };

  const calcularIRPF = async () => {
    const rendaNum = parseFloat(renda);
    const custosNum = parseFloat(custos);
    if (isNaN(rendaNum) || isNaN(custosNum)) {
      setErro("Por favor, insira valores válidos.");
      return;
    }
    setErro("");
    try {
      const response = await api.post("/calculos", { tipoProfissao: profissao, faturamento: rendaNum, custos: custosNum });
      const { impostoPF } = response.data.calculo;
      const base = rendaNum - custosNum;
      let faixa = "Isento", parcelaDedutivel = 0;
      if (base <= 2428.8) faixa = "Isento";
      else if (base <= 2826.65) { faixa = "7,5%"; parcelaDedutivel = 182.16; }
      else if (base <= 3751.05) { faixa = "15%"; parcelaDedutivel = 394.16; }
      else if (base <= 4664.68) { faixa = "22,5%"; parcelaDedutivel = 675.49; }
      else { faixa = "27,5%"; parcelaDedutivel = 908.73; }

      setResultado({ base, faixa, imposto: impostoPF, parcelaDedutivel });
      setMostrarEmail(false);
      setMensagemEnvio("");
    } catch (error) {
      setErro(error.response?.data?.error || "Erro ao processar cálculo no servidor.");
    }
  };

  const enviarEmail = () => {
    if (!email.includes("@")) {
      setMensagemEnvio("Por favor, insira um e-mail válido.");
      return;
    }
    setMensagemEnvio(`Resultados simulados e enviados para ${email} com sucesso!`);
    setEmail("");
  };

  return (
    <main id="conteudo" tabIndex={-1} className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 bg-naf-light outline-none min-h-screen">
      <div className={`w-full max-w-md bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-naf-gray/20 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h1 className="text-2xl font-bold text-center mb-6 text-naf-blue">Cálculo IR Pessoa Física</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="profissao-pf" className="block mb-1 text-sm font-medium text-naf-blue">Profissão</label>
            <select id="profissao-pf" value={profissao} onChange={(e) => setProfissao(e.target.value)} className="w-full border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition bg-white min-h-[44px]">
              <option value="psicologo">Psicólogo(a)</option>
              <option value="arquiteto">Arquiteto(a)</option>
              <option value="advogado">Advogado(a)</option>
              <option value="medico">Médico(a)</option>
              <option value="dentista">Dentista</option>
            </select>
          </div>

          <div>
            <div className="relative flex items-center gap-1 mb-1">
              <label htmlFor="renda-pf" className="text-sm font-medium text-naf-blue">Renda Mensal Bruta (R$)</label>
              <button type="button" id="btn-tooltip-renda" aria-describedby="tooltip-renda" className="text-naf-muted hover:text-naf-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded" onFocus={() => setShowTooltipRenda(true)} onBlur={() => setShowTooltipRenda(false)} onMouseEnter={() => setShowTooltipRenda(true)} onMouseLeave={() => setShowTooltipRenda(false)}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              </button>
              {showTooltipRenda && <div id="tooltip-renda" role="tooltip" className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg top-full left-0 mt-1 border border-naf-gray/30">É o valor total que você espera receber por mês com o seu trabalho, antes de qualquer desconto.</div>}
            </div>
            <input id="renda-pf" type="number" value={renda} onChange={handleRendaChange} max="15000" placeholder="Ex: 3000" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm min-h-[44px]" />
            {erro && <p role="alert" className="text-naf-red-dark text-sm mt-1 font-medium">{erro}</p>}
          </div>

          <div>
            <div className="relative flex items-center gap-1 mb-1">
              <label htmlFor="custos-pf" className="text-sm font-medium text-naf-blue">Despesas Dedutíveis (R$)</label>
              <button type="button" id="btn-tooltip-custos" aria-describedby="tooltip-custos" className="text-naf-muted hover:text-naf-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded" onFocus={() => setShowTooltipCustos(true)} onBlur={() => setShowTooltipCustos(false)} onMouseEnter={() => setShowTooltipCustos(true)} onMouseLeave={() => setShowTooltipCustos(false)}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
              </button>
              {showTooltipCustos && <div id="tooltip-custos" role="tooltip" className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg top-full left-0 mt-1 border border-naf-gray/30">Gastos essenciais para o seu trabalho (ex: aluguel, internet). Eles reduzem a base de cálculo.</div>}
            </div>
            <input id="custos-pf" type="number" value={custos} onChange={(e) => setCustos(e.target.value)} placeholder="Ex: 750" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm min-h-[44px]" />
          </div>

          <div>
            <button onClick={calcularIRPF} className="w-full bg-naf-blue text-white font-bold py-3 rounded-xl hover:bg-[#0c1825] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-blue transition hover:scale-105 shadow-md min-h-[44px]">
              Calcular
            </button>
          </div>

          <div aria-live="polite" className="mt-4">
            {resultado && typeof resultado !== "string" && (
              <div className="bg-naf-light border border-naf-gray/20 rounded-xl shadow-inner p-5 transition-all duration-400 ease-out">
                <div className="space-y-2 text-sm text-naf-blue">
                  <p><strong>Base de cálculo:</strong> R$ {resultado.base.toFixed(2)}</p>
                  <p><strong>Faixa IRPF:</strong> {resultado.faixa}</p>
                  <p><strong>Parcela a deduzir:</strong> R$ {resultado.parcelaDedutivel.toFixed(2)}</p>
                </div>
                <p className="text-lg font-bold text-naf-red-dark mt-3 pt-3 border-t border-naf-gray/30">
                  IR a pagar: R$ {resultado.imposto.toFixed(2)}
                </p>

                <div className="mt-5 pt-3 border-t border-naf-gray/30">
                  <p className="text-sm font-medium text-naf-blue mb-3 text-center">Deseja enviar essa simulação por e-mail?</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => setMostrarEmail(true)} className="bg-naf-blue text-white px-5 py-2 rounded-xl hover:bg-[#0c1825] transition shadow-sm text-sm font-medium min-h-[44px]">Sim, enviar</button>
                    <button onClick={() => setMostrarEmail(false)} className="bg-white border border-naf-gray text-naf-blue px-5 py-2 rounded-xl hover:bg-gray-100 transition shadow-sm text-sm font-medium min-h-[44px]">Não, obrigado</button>
                  </div>

                  {mostrarEmail && (
                    <div className="mt-4 space-y-3">
                      <label htmlFor="email-pf" className="sr-only">Seu e-mail</label>
                      <input id="email-pf" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent text-sm min-h-[44px]" />
                      <button onClick={enviarEmail} className="w-full bg-naf-red text-white py-2 rounded-xl hover:bg-[#a62b18] transition text-sm font-bold shadow-sm min-h-[44px]">Enviar resultados</button>
                    </div>
                  )}

                  {mensagemEnvio && <p role="status" className="text-green-700 mt-3 text-sm font-bold text-center bg-green-50 p-2 rounded-lg border border-green-200">{mensagemEnvio}</p>}
                </div>
              </div>
            )}
            {typeof resultado === "string" && <p className="text-naf-red-dark font-medium text-center">{resultado}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}