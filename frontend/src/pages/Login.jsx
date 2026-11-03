import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [erroGeral, setErroGeral] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Por favor, preencha o campo de email.";
    else if (!email.includes("@") || !email.includes(".")) newErrors.email = "Por favor, informe um email válido.";
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroGeral("");
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) {
      setErroGeral(error.response?.data?.error || "Erro ao conectar ao servidor.");
    }
  };

  return (
    <main id="conteudo" tabIndex={-1} className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4 outline-none">
      <h1 className={`text-3xl font-bold text-center mb-2 text-naf-blue transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
        Login
      </h1>
      <p className={`text-center text-naf-muted mb-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>Calculadora de Imposto de Renda</p>

      <div className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-naf-gray/30 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {erroGeral && (
          <div role="alert" className="mb-4 p-3 bg-red-50 border border-naf-red-dark/20 rounded-lg">
            <p className="text-sm font-medium text-naf-red-dark">{erroGeral}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <label htmlFor="login-email" className="block mb-2 text-sm font-medium text-naf-blue">Email</label>
            <input
              type="email" id="login-email" autoComplete="email" placeholder="Digite seu email" value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "erro-email" : undefined}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm min-h-[44px]"
            />
            {errors.email && <p id="erro-email" role="alert" className="mt-1 text-sm text-naf-red-dark font-medium">{errors.email}</p>}
          </div>

          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <label htmlFor="login-password" className="block mb-2 text-sm font-medium text-naf-blue">Senha</label>
            <input
              type="password" id="login-password" autoComplete="current-password" placeholder="Digite sua senha" value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={errors.password ? "erro-password" : undefined}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm min-h-[44px]"
            />
            {errors.password && <p id="erro-password" role="alert" className="mt-1 text-sm text-naf-red-dark font-medium">{errors.password}</p>}
          </div>

          <div className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <button type="submit" className="w-full bg-naf-red text-white font-bold py-3 rounded-xl hover:bg-[#a62b18] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-red transition hover:scale-105 shadow-md min-h-[44px]">
              Entrar
            </button>
          </div>
        </form>

        <div className={`text-center text-sm text-naf-muted mt-6 space-y-2 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <p>Não tem conta? <Link to="/cadastro" className="text-naf-red-dark underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded px-1">Cadastre-se</Link></p>
          <p>Esqueceu a senha? <Link to="/recuperar-senha" className="text-naf-red-dark underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded px-1">Recuperar Senha</Link></p>
        </div>
      </div>
    </main>
  );
}