import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso ao NAF!');
        setFormData({ nome: "", email: "", mensagem: "" });
      } else {
        alert('Houve um erro ao enviar a mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro:", error);
      alert('Erro de conexão com o servidor. Como o backend da NP3 não está rodando, a simulação visual funcionou!');
      setFormData({ nome: "", email: "", mensagem: "" });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">

      <main className="flex-grow flex flex-col items-center py-10 px-4 md:px-6">
        
        {/* SEÇÃO 1: CABEÇALHO E CARDS DE NAVEGAÇÃO */}
        <section className="w-full max-w-6xl mb-16">
          <div className={`text-center mb-10 transition-all duration-[700ms] ease-out delay-[200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="text-4xl font-bold text-naf-blue mb-3">Painel Tributário</h1>
            <p className="text-naf-gray font-medium text-lg max-w-2xl mx-auto">
              Simule e compare regimes de tributação de forma rápida. Escolha a modalidade abaixo para começar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card PF */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg border border-naf-gray/20 flex flex-col justify-between transition-all duration-[700ms] ease-out delay-[400ms] hover:shadow-xl hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div>
                <div className="w-12 h-12 bg-naf-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-naf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-naf-blue mb-2">Pessoa Física (PF)</h3>
                <p className="text-sm text-naf-gray mb-6">
                  Cálculo baseado na tabela do IRPF mensal. Permite abater despesas dedutíveis (Livro Caixa) da sua base de cálculo.
                </p>
              </div>
              <button onClick={() => handleNavigate("/calculo-pf")} className="w-full py-3 bg-naf-blue text-white font-medium rounded-xl hover:bg-[#0c1825] transition-colors cursor-pointer">
                Simular PF
              </button>
            </div>

            {/* Card PJ */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg border border-naf-gray/20 flex flex-col justify-between transition-all duration-[700ms] ease-out delay-[600ms] hover:shadow-xl hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div>
                <div className="w-12 h-12 bg-naf-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-naf-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-naf-blue mb-2">Pessoa Jurídica (PJ)</h3>
                <p className="text-sm text-naf-gray mb-6">
                  Cálculo focado no Simples Nacional e Contribuição Previdenciária (INSS) sobre o pró-labore da sua categoria.
                </p>
              </div>
              <button onClick={() => handleNavigate("/calculo-pj")} className="w-full py-3 bg-naf-blue text-white font-medium rounded-xl hover:bg-[#0c1825] transition-colors cursor-pointer">
                Simular PJ
              </button>
            </div>

            {/* Card Comparativo */}
            <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-naf-red flex flex-col justify-between transition-all duration-[700ms] ease-out delay-[800ms] hover:shadow-xl hover:-translate-y-2 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="absolute top-0 right-0 bg-naf-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Recomendado</div>
              <div>
                <div className="w-12 h-12 bg-naf-red/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-naf-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-naf-blue mb-2">Comparativo Completo</h3>
                <p className="text-sm text-naf-gray mb-6">
                  Analise PF e PJ lado a lado. Descubra a opção mais vantajosa para sua renda e gere um relatório em PDF.
                </p>
              </div>
              <button onClick={() => handleNavigate("/comparativo")} className="w-full py-3 bg-naf-red text-white font-bold rounded-xl hover:bg-[#a62b18] transition-colors cursor-pointer">
                Gerar Comparativo
              </button>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: COMO FUNCIONA */}
        <section className={`w-full max-w-6xl bg-white rounded-3xl shadow-md border border-naf-gray/20 p-8 mb-12 transition-all duration-[700ms] ease-out delay-[1000ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-2xl font-bold text-naf-blue mb-6 border-b border-naf-gray/20 pb-4">Entendendo os Cálculos</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-naf-red mb-3">Pessoa Física (PF)</h3>
              <p className="text-sm text-gray-700 mb-4">
                A tributação da PF utiliza a tabela progressiva do IRPF. O sistema abate os seus <strong>custos mensais</strong> (despesas de livro caixa) da sua <strong>renda</strong>. O valor restante é a "Base de Cálculo", que é encaixada na tabela abaixo:
              </p>
              
              <div className="overflow-x-auto rounded-xl border border-naf-gray/30">
                <table className="min-w-full text-xs text-gray-700">
                  <thead className="bg-naf-blue text-white">
                    <tr>
                      <th className="py-2 px-3 text-left">Base (R$)</th>
                      <th className="py-2 px-3 text-left">Alíquota</th>
                      <th className="py-2 px-3 text-left">Deduzir (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50 border-b border-naf-gray/20">
                      <td className="py-2 px-3">Até 2.428,80</td>
                      <td className="py-2 px-3 font-semibold text-green-600">Isento</td>
                      <td className="py-2 px-3">—</td>
                    </tr>
                    <tr className="border-b border-naf-gray/20">
                      <td className="py-2 px-3">2.428,81 a 2.826,65</td>
                      <td className="py-2 px-3">7,5%</td>
                      <td className="py-2 px-3">182,16</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-naf-gray/20">
                      <td className="py-2 px-3">2.826,66 a 3.751,05</td>
                      <td className="py-2 px-3">15%</td>
                      <td className="py-2 px-3">394,16</td>
                    </tr>
                    <tr className="border-b border-naf-gray/20">
                      <td className="py-2 px-3">3.751,06 a 4.664,68</td>
                      <td className="py-2 px-3">22,5%</td>
                      <td className="py-2 px-3">675,49</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-3">Acima de 4.664,68</td>
                      <td className="py-2 px-3 font-semibold text-naf-red">27,5%</td>
                      <td className="py-2 px-3">908,73</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-naf-red mb-3">Pessoa Jurídica (PJ)</h3>
              <p className="text-sm text-gray-700 mb-4">
                A tributaçãoPJ é simulada com base no <strong>Simples Nacional</strong>. A alíquota inicial varia conforme a sua categoria profissional, além de englobar a contribuição previdenciária obrigatória (INSS).
              </p>
              <ul className="space-y-3 text-sm text-gray-700 bg-naf-light/50 p-5 rounded-xl border border-naf-gray/20">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-naf-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span><strong>Psicólogos e Arquitetos (Anexo III):</strong> Iniciam com 6% de imposto sobre o faturamento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-naf-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span><strong>Advogados (Anexo IV):</strong> Iniciam com 4,5% de imposto sobre o faturamento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-naf-blue mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span><strong>INSS (Pró-labore):</strong> Calculado em 11% sobre 28% do faturamento (respeitando o mínimo de 1 salário mínimo vigente).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: CONTATO NAF */}
        <section className={`w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-naf-gray/20 p-8 mb-4 transition-all duration-[700ms] ease-out delay-[1200ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-naf-blue">Fale com o NAF</h2>
            <p className="text-sm text-naf-gray mt-1">Sua situação é muito complexa? Envie uma mensagem para nossa equipe.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-naf-blue mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-naf-blue mb-1">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-naf-blue mb-1">Sua Mensagem / Dúvida</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={enviando}
              className={`cursor-pointer w-full bg-naf-blue text-white py-3 rounded-xl hover:bg-[#0c1825] transition-all duration-[400ms] ease-out text-base font-bold shadow-md ${enviando ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
            >
              {enviando ? "Enviando para o NAF..." : "Enviar Mensagem"}
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
}
