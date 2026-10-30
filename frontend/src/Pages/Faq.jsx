import Footer from "../components/Footer";

export default function Faq() {
  const faqs = [
    { 
      pergunta: "O que é o NAF?", 
      resposta: "O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto que oferece serviços contábeis e fiscais gratuitos para cidadãos de baixa renda, microempreendedores e instituições." 
    },
    { 
      pergunta: "Os dados da simulação ficam salvos?", 
      resposta: "Sim, ao realizar uma simulação estando logado, os resultados são guardados de forma segura no seu Histórico para consultas futuras." 
    },
    { 
      pergunta: "Qual a diferença entre a simulação PF e PJ?", 
      resposta: "A Pessoa Física (PF) atua como autônomo, pagando IRPF e podendo abater despesas no Livro Caixa. A Pessoa Jurídica (PJ) atua com CNPJ, pagando impostos unificados através do Simples Nacional." 
    },
    { 
      pergunta: "A calculadora substitui a orientação de um contador?", 
      resposta: "Não. A calculadora fornece apenas uma estimativa baseada nas alíquotas padrão. Situações reais exigem análise detalhada de um profissional contábil." 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-naf-light">
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-naf-gray/20">
          <h1 className="text-3xl font-bold text-naf-blue mb-8 text-center">Perguntas Frequentes (FAQ)</h1>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-5 border border-naf-gray/30 rounded-2xl hover:shadow-md transition-shadow bg-gray-50/50">
                <h3 className="text-lg font-bold text-naf-red mb-2">{faq.pergunta}</h3>
                <p className="text-gray-700 text-sm">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}