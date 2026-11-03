import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1} className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4 outline-none">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-naf-blue text-center">404 - Página não encontrada</h1>
      <p className="text-naf-muted mb-8 text-center">A página que você está procurando não existe ou foi movida.</p>
      <Link 
        to="/" 
        className="text-naf-red-dark font-bold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded px-2 py-1"
      >
        Voltar para o início
      </Link>
    </main>
  );
}