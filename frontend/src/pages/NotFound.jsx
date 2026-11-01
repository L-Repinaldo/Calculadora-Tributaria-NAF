import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <Link to="/" className="text-blue-600 hover:underline font-bold">
        Voltar para o início
      </Link>
    </div>
  );
}