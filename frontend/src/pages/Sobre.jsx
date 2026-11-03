import { useState } from "react";

export default function Sobre() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nome: "", email: "", mensagem: "" });
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <main id="conteudo" tabIndex={-1} className="flex-grow flex flex-col items-center py-12 px-4 bg-naf-light outline-none min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-naf-gray/20">
        
        <div className="mb-12 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-naf-blue mb-4">Sobre o NAF</h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            O Núcleo de Apoio Contábil e Fiscal (NAF) é uma iniciativa desenvolvida em parceria com a Receita Federal. O nosso objetivo é proporcionar assistência e orientação tributária gratuita à comunidade, ao mesmo tempo em que oferecemos prática profissional aos estudantes.
          </p>
        </div>
        
        <div className="bg-naf-light p-6 md:p-8 rounded-2xl border border-naf-gray/20">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-naf-red">Contato por E-mail</h2>
            <p className="text-sm text-naf-muted mt-1">Envie a sua dúvida diretamente para a nossa equipa.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto text-left" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-naf-blue mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  id="nome"
                  name="nome" 
                  value={formData.nome} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-naf-gray px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-naf-blue mb-1">Seu E-mail</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full border border-naf-gray px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition" 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-naf-blue mb-1">Mensagem</label>
              <textarea 
                id="mensagem"
                name="mensagem" 
                value={formData.mensagem} 
                onChange={handleChange} 
                required 
                rows="4" 
                className="w-full border border-naf-gray px-4 py-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-naf-blue text-white font-bold py-3.5 rounded-xl hover:bg-[#0c1825] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-blue hover:-translate-y-0.5 transition-all shadow-md cursor-pointer min-h-[44px]"
            >
              Enviar Mensagem
            </button>
            
            {enviado && (
              <p role="status" aria-live="polite" className="text-green-700 font-bold text-center mt-3 bg-green-100 p-3 rounded-lg border border-green-300">
                A sua mensagem foi enviada com sucesso ao NAF!
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}