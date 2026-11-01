import { useState } from "react";
import Footer from "../components/Footer";

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
    <div className="flex flex-col min-h-screen bg-naf-light">
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-naf-gray/20">
          
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-naf-blue mb-4">Sobre o NAF</h1>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              O Núcleo de Apoio Contábil e Fiscal (NAF) é uma iniciativa desenvolvida em parceria com a Receita Federal. O nosso objetivo é proporcionar assistência e orientação tributária gratuita à comunidade, ao mesmo tempo em que oferecemos prática profissional aos estudantes.
            </p>
          </div>
          
          <div className="bg-[#EFEFEF] p-6 md:p-8 rounded-2xl border border-naf-gray/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-naf-red">Contato por E-mail</h2>
              <p className="text-sm text-gray-600 mt-1">Envie a sua dúvida diretamente para a nossa equipa.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-naf-blue mb-1">Nome Completo</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-naf-blue mb-1">Seu E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-naf-blue mb-1">Mensagem</label>
                <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} required rows="4" className="w-full border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-naf-blue text-white font-bold py-3.5 rounded-xl hover:bg-[#0c1825] hover:-translate-y-0.5 transition-all shadow-md cursor-pointer">
                Enviar Mensagem
              </button>
              
              {enviado && (
                <p className="text-green-600 font-bold text-center mt-3 bg-green-50 p-2 rounded-lg border border-green-200">
                  A sua mensagem foi enviada com sucesso ao NAF!
                </p>
              )}
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}