import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import api from "../services/api";
import ResultadoComparativo from "../components/Comparativo/ResultadoComparativo";

export default function Comparativo() {
  const [renda, setRenda] = useState("");
  const [custos, setCustos] = useState("");
  const [erro, setErro] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltipRenda, setShowTooltipRenda] = useState(false);
  const [showTooltipCustos, setShowTooltipCustos] = useState(false);
  const [profissao, setProfissao] = useState("psicologo");
  
  const [mostrarEmail, setMostrarEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [mensagemEnvio, setMensagemEnvio] = useState("");
  const [gerandoPdf, setGerandoPdf] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
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

  const calcularComparativo = async () => {
    const rendaNum = parseFloat(renda);
    const custosNum = parseFloat(custos);

    if (isNaN(rendaNum) || isNaN(custosNum)) {
      setErro("Por favor, insira valores válidos.");
      return;
    }
    setErro("");

    try {
      const response = await api.post("/calculos", {
        tipoProfissao: profissao,
        faturamento: rendaNum,
        custos: custosNum
      });

      const { impostoPF, impostoPJ, melhorOpcao, economiaMensal } = response.data.calculo;
      const basePF = rendaNum - custosNum;
      let faixaPF = "Isento", parcelaDedutivel = 0;

      if (basePF <= 2428.8) faixaPF = "Isento";
      else if (basePF <= 2826.65) { faixaPF = "7,5%"; parcelaDedutivel = 182.16; }
      else if (basePF <= 3751.05) { faixaPF = "15%"; parcelaDedutivel = 394.16; }
      else if (basePF <= 4664.68) { faixaPF = "22,5%"; parcelaDedutivel = 675.49; }
      else { faixaPF = "27,5%"; parcelaDedutivel = 908.73; }

      const aliquotaPJ = profissao === "advogado" ? "4,5%" : "6%";
      const salario28 = rendaNum * 0.28;
      const salarioMin = 1621;
      const salarioBase = salario28 < salarioMin ? salarioMin : salario28;
      const inss = salarioBase * 0.11;
      const siglaVencedora = melhorOpcao.includes("PJ") ? "PJ" : "PF";

      setResultado({
        pf: { base: basePF, faixa: faixaPF, parcelaDedutivel, imposto: impostoPF },
        pj: { simples: rendaNum * (profissao === "advogado" ? 0.045 : 0.06), aliquota: aliquotaPJ, salarioBase, inss, total: impostoPJ },
        maisVantajoso: melhorOpcao,
        siglaVencedora,
        diferenca: economiaMensal
      });

      setMostrarEmail(false);
      setMensagemEnvio("");
    } catch (error) {
      console.error("Erro ao salvar comparativo no banco:", error);
      setResultado(error.response?.data?.error || "Erro ao processar o comparativo no servidor.");
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

  const gerarPDF = async () => {
    setGerandoPdf(true);
    const elemento = document.getElementById("resultado-comparativo");
    if (!elemento) {
      setGerandoPdf(false);
      return;
    }
    try {
      const opcoes = {
        margin: 10,
        filename: `Comparativo_Tributario_${profissao}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().set(opcoes).from(elemento).save();
    } catch (error) {
      console.error("Falha ao processar o arquivo PDF:", error);
    } finally {
      setGerandoPdf(false);
    }
  };

  const formatarMoeda = (valor) => Number(valor ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const nomesProfissoes = { psicologo: "Psicólogo(a)", arquiteto: "Arquiteto(a)", advogado: "Advogado(a)", medico: "Médico(a)", dentista: "Dentista" };


  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <main id="conteudo" tabIndex={-1} className="flex-grow flex flex-col items-center py-10 px-4 outline-none">
        <div className={`text-center mb-8 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1 className="text-3xl font-bold text-naf-blue mb-2">Descubra onde você paga menos impostos</h1>
          <p className="text-naf-muted font-medium max-w-xl mx-auto">
            Preencha os dados abaixo e o sistema fará um raio-x completo comparando o regime como Autônomo (PF) e como Empresa (PJ).
          </p>
        </div>

        <div className={`w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-naf-gray/20 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="w-full">
              <label htmlFor="comp-profissao" className="block mb-2 text-sm font-medium text-naf-blue">Sua Profissão</label>
              <select id="comp-profissao" value={profissao} onChange={(e) => setProfissao(e.target.value)} className="w-full border border-naf-gray px-4 py-3 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-red focus:border-transparent transition cursor-pointer bg-white min-h-[44px]">
                <option value="psicologo">Psicólogo(a)</option>
                <option value="arquiteto">Arquiteto(a)</option>
                <option value="advogado">Advogado(a)</option>
                <option value="medico">Médico(a)</option>
                <option value="dentista">Dentista</option>
              </select>
            </div>

            <div className="w-full">
              <div className="relative flex items-center gap-1 mb-2">
                <label htmlFor="comp-renda" className="text-sm font-medium text-naf-blue">Renda Mensal (R$)</label>
                <button type="button" id="btn-tooltip-renda-comp" aria-describedby="tooltip-renda-comp" className="text-naf-muted hover:text-naf-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded" onFocus={() => setShowTooltipRenda(true)} onBlur={() => setShowTooltipRenda(false)} onMouseEnter={() => setShowTooltipRenda(true)} onMouseLeave={() => setShowTooltipRenda(false)}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </button>
                {showTooltipRenda && <div id="tooltip-renda-comp" role="tooltip" className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg top-full left-0 mt-1 border border-naf-gray/30">Sua receita bruta total prevista para o mês.</div>}
              </div>
              <input id="comp-renda" type="number" value={renda} onChange={handleRendaChange} max="15000" placeholder="Ex: 5000" className="w-full border border-naf-gray px-4 py-3 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-red focus:border-transparent transition min-h-[44px]" />
              {erro && <p role="alert" className="text-naf-red-dark text-xs mt-1 font-medium">{erro}</p>}
            </div>

            <div className="w-full">
              <div className="relative flex items-center gap-1 mb-2">
                <label htmlFor="comp-custos" className="text-sm font-medium text-naf-blue">Custos Dedutíveis (R$)</label>
                <button type="button" id="btn-tooltip-custos-comp" aria-describedby="tooltip-custos-comp" className="text-naf-muted hover:text-naf-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded" onFocus={() => setShowTooltipCustos(true)} onBlur={() => setShowTooltipCustos(false)} onMouseEnter={() => setShowTooltipCustos(true)} onMouseLeave={() => setShowTooltipCustos(false)}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </button>
                {showTooltipCustos && <div id="tooltip-custos-comp" role="tooltip" className="absolute z-10 w-64 p-3 text-sm text-white bg-naf-blue rounded-xl shadow-lg top-full left-0 mt-1 border border-naf-gray/30">Despesas do seu negócio. Usado apenas para abater a base da PF.</div>}
              </div>
              <input id="comp-custos" type="number" value={custos} onChange={(e) => setCustos(e.target.value)} placeholder="Ex: 800" className="w-full border border-naf-gray px-4 py-3 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-red focus:border-transparent transition min-h-[44px]" />
            </div>
          </div>

          <div className="px-6 md:px-8 pb-8">
            <button onClick={calcularComparativo} className="w-full bg-naf-red text-white font-bold py-4 rounded-xl hover:bg-[#a62b18] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-red transition hover:scale-[1.01] shadow-md text-lg cursor-pointer min-h-[44px]">
              Analisar Vantagem Tributária
            </button>
          </div>
          
          <div aria-live="polite" className="border-t border-naf-gray/20 bg-naf-light rounded-b-3xl">
            {typeof resultado === "string" ? (
              <p className="text-naf-red-dark font-medium text-center py-8">{resultado}</p>
            ) : resultado ? (
              <>
                <ResultadoComparativo resultado={resultado} renda={renda} custos={custos} profissao={profissao} nomesProfissoes={nomesProfissoes} formatarMoeda={formatarMoeda} />
                <div className="px-6 md:px-8 pb-8 pt-4 flex flex-col gap-4 border-t border-naf-gray/20">
                  <button onClick={gerarPDF} disabled={gerandoPdf} className={`w-full bg-naf-blue text-white font-bold py-3 rounded-xl transition-all duration-400 shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${gerandoPdf ? "opacity-70 cursor-wait" : "hover:bg-[#0c1825] hover:-translate-y-1"}`}>
                    <svg className={`w-5 h-5 ${gerandoPdf ? "animate-bounce" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {gerandoPdf ? "Processando e Baixando PDF..." : "Baixar Relatório Oficial em PDF"}
                  </button>

                  <div className="text-center mt-2">
                    <button onClick={() => setMostrarEmail(!mostrarEmail)} className="text-sm font-bold text-naf-muted hover:text-naf-blue transition-colors underline cursor-pointer bg-transparent border-none min-h-[44px] px-2">
                      Deseja enviar os resultados para o seu e-mail?
                    </button>
                  </div>

                  {mostrarEmail && (
                    <div className="mt-2 space-y-3 p-4 bg-white border border-naf-gray rounded-xl shadow-sm">
                      <label htmlFor="comp-email" className="block text-sm font-medium text-naf-blue">Qual e-mail deve receber a simulação?</label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input id="comp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contato@exemplo.com" className="flex-grow border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent outline-none text-sm min-h-[44px]" />
                        <button onClick={enviarEmail} className="bg-naf-red text-white px-6 py-2 rounded-xl hover:bg-[#a62b18] transition text-sm font-bold cursor-pointer shadow-sm min-h-[44px]">Enviar Agora</button>
                      </div>
                      {mensagemEnvio && <p role="status" className="text-sm font-bold text-green-700 bg-green-50 p-2 rounded-lg border border-green-200">{mensagemEnvio}</p>}
                    </div>
                  )}
                </div>

                <div className="px-6 md:px-8 pb-8 pt-6 border-t border-naf-gray/20 bg-white rounded-b-3xl">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-naf-blue uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-naf-red" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                      Conteúdo Recomendado Para Você
                    </h4>
                    <p className="text-sm text-naf-muted">Separamos este vídeo do Sebrae para te ajudar a entender melhor o regime {resultado.siglaVencedora}.</p>
                  </div>
                  <div className="aspect-video w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-naf-gray/20">
                    {resultado.siglaVencedora === "PJ" ? (
                      <iframe className="w-full h-full" src="https://www.youtube.com/embed/yMlNDLDlk2c" title="Como funciona o Simples Nacional" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    ) : (
                      <iframe className="w-full h-full" src="https://www.youtube.com/embed/QtPQq3di4xI" title="Como fazer o Carnê-Leão e Livro Caixa" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}