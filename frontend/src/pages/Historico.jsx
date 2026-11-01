import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Historico() {
  const [calculos, setCalculos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
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

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const response = await api.get("/calculos/historico");
        setCalculos(response.data);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
        setErro("Não foi possível carregar o seu histórico de simulações.");
      } finally {
        setCarregando(false);
      }
    };

    if (token) buscarHistorico();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EFEFEF]">

      <main className="flex-grow flex flex-col items-center py-10 px-4">
        {/* Cabeçalho */}
        <div className={`text-center mb-8 transition-all duration-[700ms] ease-out delay-[200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h1 className="text-3xl font-bold text-[#132436] mb-2">Suas Simulações Salvas</h1>
          <p className="text-[#B2B2B2] font-medium max-w-xl mx-auto">
            Confira abaixo o histórico de todos os cálculos e comparativos tributários guardados em sua conta.
          </p>
        </div>

        {/* Listagem / Tabela */}
        <div className={`w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 transition-all duration-[700ms] ease-out delay-[400ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          
          {carregando ? (
            <div className="text-center py-10 text-naf-gray font-medium animate-pulse">
              Carregando histórico do banco de dados...
            </div>
          ) : erro ? (
            <div className="text-center py-10 text-naf-red font-semibold">
              {erro}
            </div>
          ) : calculos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-naf-gray/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-naf-gray font-medium text-lg">Você ainda não realizou nenhuma simulação.</p>
              <button onClick={() => navigate("/comparativo")} className="mt-4 px-6 py-2.5 bg-naf-red text-white font-bold rounded-xl hover:bg-[#a62b18] transition shadow-md">
                Fazer Primeiro Cálculo
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-inner">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-[#132436] text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-4 text-left">Data</th>
                    <th className="py-4 px-4 text-left">Profissão</th>
                    <th className="py-4 px-4 text-left">Faturamento (Bruto)</th>
                    <th className="py-4 px-4 text-left">Livro Caixa (PF)</th>
                    <th className="py-4 px-4 text-left">Imposto PF</th>
                    <th className="py-4 px-4 text-left">Imposto PJ</th>
                    <th className="py-4 px-4 text-center">Melhor Opção</th>
                    <th className="py-4 px-4 text-right">Economia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {calculos.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-4 font-medium text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-4 px-4 capitalize font-semibold text-naf-blue">
                        {item.tipoProfissao}
                      </td>
                      <td className="py-4 px-4 font-medium">
                        R$ {item.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {item.custos ? `R$ ${item.custos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
                      </td>
                      <td className="py-4 px-4 text-[#CD371F] font-medium">
                        R$ {item.impostoPF.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-[#CD371F] font-medium">
                        R$ {item.impostoPJ.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          item.melhorOpcao.includes("PJ") 
                            ? "bg-green-50 text-green-700 border border-green-200" 
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {item.melhorOpcao.includes("PJ") ? "PJ" : "PF"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-green-600">
                        R$ {item.economiaMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
