import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CalculoPJ() {
  const [renda, setRenda] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [profissao, setProfissao] = useState("psicologo");
  const [showTooltipRenda, setShowTooltipRenda] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
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

  const calcularPJ = async () => {
    const rendaNum = parseFloat(renda);
    if (isNaN(rendaNum)) {
      setResultado("Por favor, insira um valor válido.");
      return;
    }

    try {
      const response = await api.post("/calculos", {
        tipoProfissao: profissao,
        faturamento: rendaNum,
        custos: 0
      });

      const { impostoPJ } = response.data.calculo;

      let simples = 0;
      let aliquota = "";

      if (profissao === "advogado") {
        simples = rendaNum * 0.045;
        aliquota = "4,5%";
      } else {
        simples = rendaNum * 0.06;
        aliquota = "6%";
      }

      const salario28 = rendaNum * 0.28;
      const salarioMin = 1621;
      const salarioBase = salario28 < salarioMin ? salarioMin : salario28;
      const inss = salarioBase * 0.11;

      setResultado({
        simples,
        aliquota,
        salarioBase,
        inss,
        total: impostoPJ,
      });

      setMostrarEmail(false);
      setMensagemEnvio("");

    } catch (error) {
      console.error("Erro ao salvar cálculo PJ:", error);
      const msg = error.response?.data?.error || "Erro ao processar cálculo no servidor.";
      setResultado(msg);
    }
  };

  const enviarEmail = () => {
    if (!email.includes("@")) {
      setMensagemEnvio("Por favor, insira um e-mail válido.");
      return;
    }
    setMensagemEnvio(`Resultados enviados para ${email} com sucesso!`);
    setEmail("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className={`w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-naf-gray/20 transition-all duration-[700ms] ease-out delay-[200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className={`text-2xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[400ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            Cálculo IR Pessoa Jurídica
          </h2>

          <div className="space-y-4">
            <div className={`transition-all duration-[700ms] ease-out delay-[500ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <label className="block mb-1 text-sm font-medium text-naf-blue">Profissão</label>
              <select value={profissao} onChange={(e) => setProfissao(e.target.value)} className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out">
                <option value="psicologo">Psicólogo(a)</option>
                <option value="arquiteto">Arquiteto(a)</option>
                <option value="advogado">Advogado(a)</option>
              </select>
            </div>

            <div className={`transition-all duration-[700ms] ease-out delay-[600ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="relative flex items-center gap-1 mb-1">
                <label className="text-sm font-medium text-naf-blue">Faturamento Mensal (R$)</label>
                <button type="button" className="text-naf-gray hover:text-naf-blue focus:outline-none" onMouseEnter={() => setShowTooltipRenda(true)} onMouseLeave={() => setShowTooltipRenda(false)}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
                {showTooltipRenda && (
                  <div className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg -top-2 left-full ml-2 border border-naf-gray/30">
                    É o valor total bruto recebido no mês pelas notas fiscais emitidas no seu CNPJ.
                  </div>
                )}
              </div>
              <input type="number" value={renda} onChange={handleRendaChange} max="15000" placeholder="Ex: 3000" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm" />
              {erro && <p className="text-naf-red text-sm mt-1 font-medium">{erro}</p>}
            </div>

            <div className={`transition-all duration-[700ms] ease-out delay-[800ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <button onClick={calcularPJ} className="w-full bg-naf-blue text-white font-bold py-3 rounded-xl hover:bg-[#0c1825] hover:scale-105 transition-all duration-[400ms] ease-out shadow-md">
                Calcular
              </button>
            </div>

            {resultado && (
              <div className={`bg-gray-50 border border-naf-gray/20 rounded-xl shadow-inner mt-4 p-5 transition-all duration-[700ms] ease-out delay-[200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0"}`}>
                {typeof resultado === "string" ? (
                  <p className="text-naf-red font-medium">{resultado}</p>
                ) : (
                  <>
                    <div className="space-y-2 text-sm text-naf-blue">
                      <p><strong>Simples Nacional ({resultado.aliquota}):</strong> R$ {resultado.simples.toFixed(2)}</p>
                      <p><strong>Pró-labore base:</strong> R$ {resultado.salarioBase.toFixed(2)}</p>
                      <p><strong>INSS (11%):</strong> R$ {resultado.inss.toFixed(2)}</p>
                    </div>
                    <p className="text-lg font-bold text-naf-red mt-3 pt-3 border-t border-naf-gray/30">
                      Total a pagar: R$ {resultado.total.toFixed(2)}
                    </p>

                    <div className="mt-5 pt-3 border-t border-naf-gray/30">
                      <p className="text-sm font-medium text-naf-blue mb-3 text-center">Deseja receber os resultados por e-mail?</p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => setMostrarEmail(true)} className="bg-naf-blue text-white px-5 py-2 rounded-xl hover:bg-[#0c1825] transition shadow-sm text-sm font-medium">Sim</button>
                        <button onClick={() => setMostrarEmail(false)} className="bg-white border border-naf-gray text-naf-blue px-5 py-2 rounded-xl hover:bg-gray-100 transition shadow-sm text-sm font-medium">Não</button>
                      </div>

                      {mostrarEmail && (
                        <div className="mt-4 space-y-3">
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none text-sm" />
                          <button onClick={enviarEmail} className="w-full bg-naf-red text-white py-2 rounded-xl hover:bg-[#a62b18] transition text-sm font-bold shadow-sm">Enviar resultados</button>
                        </div>
                      )}

                      {mensagemEnvio && <p className="text-green-600 mt-3 text-sm font-bold text-center">{mensagemEnvio}</p>}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
