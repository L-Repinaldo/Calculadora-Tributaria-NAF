import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    if (!email) {
      setError("Por favor, preencha o campo de email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um formato de email válido.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");
    console.log("Recuperação solicitada para:", email);
    alert("Se este email estiver cadastrado, enviaremos instruções de recuperação em instantes.");
    navigate("/");
  };

  return (
    <main id="conteudo" tabIndex={-1} className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4 outline-none">
      <h1 className={`text-3xl font-bold text-center mb-6 text-naf-blue transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
        Recuperar Senha
      </h1>

      <div className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-naf-gray/30 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className={`text-2xl font-bold text-center mb-2 text-naf-blue transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          Esqueceu sua senha?
        </h2>

        <p className={`text-center text-sm text-naf-muted mb-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Informe seu email e enviaremos as instruções para redefinir sua senha de acesso.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <label htmlFor="recuperar-email" className="block mb-2 text-sm font-medium text-naf-blue">
              Email Cadastrado
            </label>
            <input
              id="recuperar-email"
              autoComplete="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? "true" : undefined}
              aria-describedby={error ? "erro-email" : undefined}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm"
            />
            {error && (
              <p id="erro-email" role="alert" className="mt-1 text-sm text-naf-red-dark font-medium">
                {error}
              </p>
            )}
          </div>

          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <button
              type="submit"
              className="w-full bg-naf-blue text-white font-bold py-3 rounded-xl hover:bg-[#0c1825] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-blue transition duration-250 ease-in-out hover:scale-105 shadow-md cursor-pointer min-h-[44px]"
            >
              Enviar Instruções
            </button>
          </div>
        </form>

        <p className={`text-center text-sm text-naf-muted mt-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          Lembrou sua senha?{" "}
          <Link to="/login" className="text-naf-red-dark underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}