import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const [faqAberto, setFaqAberto] = useState(null);

  const faqs = [
    {
      pergunta: "Para quem é esta calculadora?",
      resposta: "Foi desenvolvida especialmente para Psicólogos, Arquitetos e Advogados que desejam descobrir de forma rápida se é mais barato atuar como Pessoa Física ou abrir um CNPJ (Pessoa Jurídica)."
    },
    {
      pergunta: "Quais tributos são considerados no comparativo?",
      resposta: "Para Pessoa Física, utilizamos a Tabela Progressiva do IRPF abatendo as despesas do Livro Caixa. Para Pessoa Jurídica, aplicamos as alíquotas do Simples Nacional (Anexos III ou IV, dependendo da profissão) e o INSS obrigatório sobre o Pró-labore."
    },
    {
      pergunta: "Vale a pena abrir CNPJ ganhando pouco?",
      resposta: "Muitas vezes, sim! É um mito que CNPJ é só para quem ganha muito. O nosso comparativo vai te mostrar o ponto de virada onde os 27,5% da Pessoa Física se tornam mais caros que os impostos do Simples Nacional."
    },
    {
      pergunta: "O que é o Fator R que o sistema menciona?",
      resposta: "O Fator R é uma regra do Simples Nacional que afeta Psicólogos e Arquitetos. Ela diz que se a sua folha de pagamento (incluindo seu pró-labore) for igual ou maior que 28% do faturamento, seu imposto cai para 6% (Anexo III). A nossa ferramenta já faz esse cálculo automaticamente para você!"
    },
    {
      pergunta: "A calculadora substitui um contador?",
      resposta: "Não. A calculadora é uma ferramenta de simulação e tomada de decisão tributária. Após descobrir o regime mais vantajoso, é fundamental contratar um contador habilitado para realizar a abertura da empresa e gerir as obrigações fiscais."
    },
    {
      pergunta: "Qual é o ano-base dos cálculos da ferramenta?",
      resposta: "Todos os cálculos, limites de isenção e o salário mínimo vigente (R$ 1.621,00) estão projetados e atualizados rigorosamente para o ano-calendário de 2026."
    },
    {
      pergunta: "O sistema armazena meus dados financeiros?",
      resposta: "Não. Suas simulações tributárias, informações de renda e custos são processadas localmente no seu navegador e não são armazenadas em nosso banco de dados, garantindo total privacidade."
    }
  ];

  const toggleFaq = (index) => {
    if (faqAberto === index) {
      setFaqAberto(null);
    } else {
      setFaqAberto(index);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <nav className="w-full bg-naf-blue shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-wide cursor-default">
            Calculadora Tributária
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="text-white font-medium hover:text-naf-red transition cursor-pointer"
            >
              Entrar
            </button>
            <button 
              onClick={() => navigate("/cadastro")}
              className="bg-naf-red text-white px-5 py-2 rounded-lg font-bold hover:bg-[#a62b18] transition shadow-md hover:scale-105 cursor-pointer"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="w-full py-20 px-6 text-center bg-gradient-to-b from-naf-blue to-[#0c1825] text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Pare de perder dinheiro para o Leão. <br />
              <span className="text-naf-red">Simule seus impostos em segundos.</span>
            </h1>
            <p className="text-lg md:text-xl text-naf-gray mb-10 max-w-2xl mx-auto">
              Nossa calculadora inteligente ajuda profissionais autônomos a compararem os encargos entre Pessoa Física e Pessoa Jurídica para tomar a melhor decisão financeira.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate("/login")}
                className="bg-naf-red text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-[#a62b18] transition shadow-lg hover:scale-105 cursor-pointer"
              >
                Acessar Calculadora
              </button>
              <button 
                onClick={() => document.getElementById('faq-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-naf-gray text-white text-lg font-bold px-8 py-4 rounded-xl hover:border-white transition cursor-pointer"
              >
                Como funciona?
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq-section" className="w-full py-20 px-6 bg-naf-light">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-naf-blue mb-2">Dúvidas Frequentes (FAQ)</h2>
            <p className="text-center text-naf-gray mb-10 font-medium">Entenda como a nossa ferramenta pode ajudar na sua rotina</p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-naf-gray/20 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span className="font-bold text-naf-blue text-lg">{faq.pergunta}</span>
                    <svg 
                      className={`w-6 h-6 text-naf-red transform transition-transform duration-300 ${faqAberto === index ? 'rotate-180' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div 
                    className={`px-6 text-gray-700 text-sm md:text-base leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${faqAberto === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.resposta}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
