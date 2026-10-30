import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import api from "../services/api";

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
      setResultado("Por favor, insira valores válidos.");
      return;
    }

    try {
      const response = await api.post("/calculos", {
        tipoProfissao: profissao,
        faturamento: rendaNum,
        custos: custosNum
      });

      const { impostoPF, impostoPJ, melhorOpcao, economiaMensal } = response.data.calculo;

      const basePF = rendaNum - custosNum;
      let faixaPF = "Isento";
      let parcelaDedutivel = 0;

      if (basePF <= 2428.8) faixaPF = "Isento";
      else if (basePF <= 2826.65) { faixaPF = "7,5%"; parcelaDedutivel = 182.16; }
      else if (basePF <= 3751.05) { faixaPF = "15%"; parcelaDedutivel = 394.16; }
      else if (basePF <= 4664.68) { faixaPF = "22,5%"; parcelaDedutivel = 675.49; }
      else { faixaPF = "27,5%"; parcelaDedutivel = 908.73; }

      let aliquotaPJ = profissao === "advogado" ? "4,5%" : "6%";
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
      const mensagemErro = error.response?.data?.error || "Erro ao processar o comparativo no servidor.";
      setResultado(mensagemErro);
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
      console.error("Erro interno: A div do PDF não foi encontrada.");
      setGerandoPdf(false);
      return;
    }

    try {
      const opcoes = {
        margin:       10,
        filename:     `Comparativo_Tributario_${profissao}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true }, 
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opcoes).from(elemento).save();
    } catch (error) {
      console.error("Falha ao processar o arquivo PDF:", error);
    } finally {
      setGerandoPdf(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EFEFEF]">
      
      <main className="flex-grow flex flex-col items-center py-10 px-4">
        {/* CABEÇALHO DA PÁGINA */}
        <div className={`text-center mb-8 transition-all duration-[700ms] ease-out delay-[200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1 className="text-3xl font-bold text-[#132436] mb-2">Descubra onde você paga menos impostos</h1>
          <p className="text-[#B2B2B2] font-medium max-w-xl mx-auto">
            Preencha os dados abaixo e o sistema fará um raio-x completo comparando o regime como Autônomo (PF) e como Empresa (PJ).
          </p>
        </div>

        {/* CONTAINER DOS INPUTS */}
        <div
          className={`w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 transition-all duration-[700ms] ease-out delay-[400ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-[#132436]">Sua Profissão</label>
              <select
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#CD371F] outline-none transition cursor-pointer"
              >
                <option value="psicologo">Psicólogo(a)</option>
                <option value="arquiteto">Arquiteto(a)</option>
                <option value="advogado">Advogado(a)</option>
              </select>
            </div>

            <div className="w-full">
              <div className="relative flex items-center gap-1 mb-2">
                <label className="text-sm font-medium text-[#132436]">Renda Mensal (R$)</label>
                <button
                  type="button"
                  className="text-gray-400 hover:text-[#132436] focus:outline-none cursor-help"
                  onMouseEnter={() => setShowTooltipRenda(true)}
                  onMouseLeave={() => setShowTooltipRenda(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </button>
                {showTooltipRenda && <div className="absolute z-10 w-64 p-3 text-sm text-white bg-[#132436] rounded-xl shadow-lg -top-2 left-full ml-2 border border-gray-200">Sua receita bruta total prevista para o mês.</div>}
              </div>
              <input
                type="number"
                value={renda}
                onChange={handleRendaChange}
                max="15000"
                placeholder="Ex: 5000"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#CD371F] outline-none transition"
              />
              {erro && <p className="text-[#CD371F] text-xs mt-1 absolute font-medium">{erro}</p>}
            </div>

            <div className="w-full">
              <div className="relative flex items-center gap-1 mb-2">
                <label className="text-sm font-medium text-[#132436]">Custos Dedutíveis (R$)</label>
                <button
                  type="button"
                  className="text-gray-400 hover:text-[#132436] focus:outline-none cursor-help"
                  onMouseEnter={() => setShowTooltipCustos(true)}
                  onMouseLeave={() => setShowTooltipCustos(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                </button>
                {showTooltipCustos && <div className="absolute z-10 w-64 p-3 text-sm text-white bg-[#132436] rounded-xl shadow-lg -top-2 right-full mr-2 border border-gray-200">Despesas do seu negócio (aluguel, internet, etc). Usado apenas para abater a base da PF.</div>}
              </div>
              <input
                type="number"
                value={custos}
                onChange={(e) => setCustos(e.target.value)}
                placeholder="Ex: 800"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#CD371F] outline-none transition"
              />
            </div>
          </div>

          <div className="px-6 md:px-8 pb-8">
            <button onClick={calcularComparativo} className="w-full bg-[#CD371F] text-white font-bold py-4 rounded-xl hover:bg-[#a62b18] hover:scale-[1.01] transition-all duration-[400ms] ease-out shadow-md text-lg cursor-pointer">
              Analisar Vantagem Tributária
            </button>
          </div>

          {/* ÁREA DE RESULTADOS E PDF */}
          {resultado && typeof resultado === "string" ? (
            <p className="text-[#CD371F] font-medium text-center pb-8">{resultado}</p>
          ) : resultado && (
            <div className="border-t border-gray-200 bg-gray-50 rounded-b-3xl">
              <div id="resultado-comparativo" className="p-6 md:p-8 bg-[#ffffff]">
                <div className="mb-8 p-6 rounded-2xl border-2 text-center shadow-sm" style={{ borderColor: resultado.siglaVencedora === 'PJ' ? '#22c55e' : '#3b82f6', backgroundColor: resultado.siglaVencedora === 'PJ' ? '#f0fdf4' : '#eff6ff' }}>
                  <h3 className="text-xl font-bold text-[#1f2937] mb-1">A melhor opção para você é:</h3>
                  <p className="text-3xl font-extrabold mb-2" style={{ color: resultado.siglaVencedora === 'PJ' ? '#16a34a' : '#2563eb' }}>{resultado.maisVantajoso}</p>
                  <p className="text-[#374151] font-medium">Atuando como {resultado.siglaVencedora}, você tem uma <span className="font-bold underline decoration-2">economia de R$ {resultado.diferenca.toFixed(2)}</span> todos os meses.</p>
                </div>

                <h4 className="text-center font-bold text-[#132436] mb-4 uppercase tracking-wider text-sm">Resumo Detalhado dos Cálculos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl border-2 shadow-md" style={{ borderColor: resultado.siglaVencedora === 'PF' ? '#3b82f6' : '#e5e7eb', backgroundColor: resultado.siglaVencedora === 'PF' ? '#ffffff' : '#f3f4f6', opacity: resultado.siglaVencedora === 'PF' ? 1 : 0.7 }}>
                    <h3 className="font-bold text-xl text-[#132436] mb-4 border-b border-[#e5e7eb] pb-2 flex items-center justify-between">Pessoa Física (PF) {resultado.siglaVencedora === 'PF' && <span className="text-xs bg-[#eff6ff] text-[#1d4ed8] px-2 py-1 rounded-full uppercase">Recomendado</span>}</h3>
                    <div className="space-y-3 text-sm text-[#374151]">
                      <div className="flex justify-between"><span>Base de Cálculo:</span> <span className="font-semibold">R$ {resultado.pf.base.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Faixa IRPF:</span> <span className="font-semibold">{resultado.pf.faixa}</span></div>
                      <div className="flex justify-between"><span>Dedução Permitida:</span> <span className="font-semibold text-[#16a34a]">- R$ {resultado.pf.parcelaDedutivel.toFixed(2)}</span></div>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#e5e7eb] flex justify-between items-end"><span className="font-bold text-[#132436]">Custo Mensal:</span><span className="text-2xl font-black text-[#CD371F]">R$ {resultado.pf.imposto.toFixed(2)}</span></div>
                  </div>

                  <div className="p-5 rounded-xl border-2 shadow-md" style={{ borderColor: resultado.siglaVencedora === 'PJ' ? '#22c55e' : '#e5e7eb', backgroundColor: resultado.siglaVencedora === 'PJ' ? '#ffffff' : '#f3f4f6', opacity: resultado.siglaVencedora === 'PJ' ? 1 : 0.7 }}>
                    <h3 className="font-bold text-xl text-[#132436] mb-4 border-b border-[#e5e7eb] pb-2 flex items-center justify-between">Pessoa Jurídica (PJ) {resultado.siglaVencedora === 'PJ' && <span className="text-xs bg-[#f0fdf4] text-[#15803d] px-2 py-1 rounded-full uppercase">Recomendado</span>}</h3>
                    <div className="space-y-3 text-sm text-[#374151]">
                      <div className="flex justify-between"><span>Simples ({resultado.pj.aliquota}):</span> <span className="font-semibold">R$ {resultado.pj.simples.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Pró-labore base:</span> <span className="font-semibold">R$ {resultado.pj.salarioBase.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>INSS Mensal (11%):</span> <span className="font-semibold">R$ {resultado.pj.inss.toFixed(2)}</span></div>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#e5e7eb] flex justify-between items-end"><span className="font-bold text-[#132436]">Custo Mensal:</span><span className="text-2xl font-black text-[#CD371F]">R$ {resultado.pj.total.toFixed(2)}</span></div>
                  </div>
                </div>
              </div>

              <div className="px-6 md:px-8 pb-8 pt-4 flex flex-col gap-4 border-t border-gray-200">
                <button onClick={gerarPDF} disabled={gerandoPdf} className={`w-full bg-[#132436] text-white font-bold py-3 rounded-xl transition-all duration-[400ms] shadow-md flex items-center justify-center gap-2 cursor-pointer ${gerandoPdf ? 'opacity-70 cursor-wait' : 'hover:bg-[#0c1825] hover:-translate-y-1'}`}>
                  <svg className={`w-5 h-5 ${gerandoPdf ? 'animate-bounce' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  {gerandoPdf ? "Processando e Baixando PDF..." : "Baixar Relatório Oficial em PDF"}
                </button>

                <div className="text-center mt-2">
                  <button onClick={() => setMostrarEmail(!mostrarEmail)} className="text-sm font-bold text-gray-500 hover:text-[#132436] transition-colors underline cursor-pointer bg-transparent border-none">Deseja enviar os resultados para o seu e-mail?</button>
                </div>

                {mostrarEmail && (
                  <div className="mt-2 space-y-3 p-4 bg-white border border-gray-300 rounded-xl shadow-sm">
                    <label className="block text-sm font-medium text-[#132436]">Qual e-mail deve receber a simulação?</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contato@exemplo.com" className="flex-grow border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-[#132436] outline-none text-sm" />
                      <button onClick={enviarEmail} className="bg-[#CD371F] text-white px-6 py-2 rounded-xl hover:bg-[#a62b18] transition text-sm font-bold cursor-pointer shadow-sm">Enviar Agora</button>
                    </div>
                    {mensagemEnvio && <p className="text-sm font-bold text-green-600">{mensagemEnvio}</p>}
                  </div>
                )}
              </div>

              <div className="px-6 md:px-8 pb-8 pt-6 border-t border-gray-200 bg-white rounded-b-3xl">
                <div className="text-center mb-4">
                  <h4 className="font-bold text-[#132436] uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#CD371F]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    Conteúdo Recomendado Para Você
                  </h4>
                  <p className="text-sm text-gray-500">Separamos este vídeo do Sebrae para te ajudar a entender melhor o regime {resultado.siglaVencedora}.</p>
                </div>
                
                <div className="aspect-video w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  {resultado.siglaVencedora === 'PJ' ? (
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/yMlNDLDlk2c" title="Como funciona o Simples Nacional" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  ) : (
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/QtPQq3di4xI" title="Como fazer o Carnê-Leão e Livro Caixa" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
