import { useState } from "react";

export default function Faq() {
  const [faqAberto, setFaqAberto] = useState(null);
  const faqs = [
    { pergunta: "O que é o NAF?", resposta: "O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto que oferece serviços contábeis e fiscais gratuitos para cidadãos de baixa renda, microempreendedores e instituições." },
    { pergunta: "Os dados da simulação ficam salvos?", resposta: "Sim, ao realizar uma simulação estando logado, os resultados são guardados de forma segura no seu Histórico para consultas futuras." },
    { pergunta: "Qual a diferença entre a simulação PF e PJ?", resposta: "A Pessoa Física (PF) atua como autônomo, pagando IRPF e podendo abater despesas no Livro Caixa. A Pessoa Jurídica (PJ) atua com CNPJ, pagando impostos unificados através do Simples Nacional." },
    { pergunta: "A calculadora substitui a orientação de um contador?", resposta: "Não. A calculadora fornece apenas uma estimativa baseada nas alíquotas padrão. Situações reais exigem análise detalhada de um profissional contábil." }
  ];

  return (
    <main id="conteudo" tabIndex={-1} className="flex-grow flex flex-col items-center py-12 px-4 bg-naf-light outline-none min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-naf-gray/20">
        <h1 className="text-2xl md:text-3xl font-bold text-naf-blue mb-8 text-center">Perguntas Frequentes (FAQ)</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const aberto = faqAberto === index;
            return (
              <div key={index} className="bg-naf-light/50 border border-naf-gray/30 rounded-2xl overflow-hidden">
                <h2>
                  <button
                    type="button"
                    id={`faq-botao-${index}`}
                    aria-expanded={aberto}
                    aria-controls={`faq-painel-${index}`}
                    onClick={() => setFaqAberto(aberto ? null : index)}
                    className="w-full flex justify-between items-center gap-4 p-5 text-left hover:bg-white transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-naf-blue"
                  >
                    <span className="font-bold text-naf-blue text-base md:text-lg">{faq.pergunta}</span>
                    <svg aria-hidden="true" className={`w-5 h-5 md:w-6 md:h-6 shrink-0 text-naf-red transform transition-transform duration-300 ${aberto ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h2>

                <div
                  id={`faq-painel-${index}`}
                  aria-hidden={!aberto}
                  className={`grid transition-all duration-300 ease-in-out ${aberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-700 text-sm md:text-base leading-relaxed">{faq.resposta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}