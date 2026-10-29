import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Por favor, preencha o campo de nome.";
    if (!email) {
      newErrors.email = "Por favor, preencha o campo de email.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Por favor, informe um email válido (contendo '@' e '.').";
    }
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Por favor, confirme sua senha.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      await api.post("/auth/register", { name, email, password });

      alert("Cadastro realizado com sucesso! Agora você pode fazer o login.");
      navigate("/login");

    } catch (error) {
      const mensagemErro = error.response?.data?.error || "Erro ao conectar com o servidor.";
      alert(mensagemErro);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4">
      <h1
        className={`text-3xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[100ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        CALCULADORA DE IMPOSTO DE RENDA
      </h1>

      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-naf-gray/30 transition-all duration-[700ms] ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[200ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Criar Conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div
            className={`transition-all duration-[700ms] ease-out delay-[300ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-1 text-sm font-medium text-naf-blue">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-naf-red font-medium">{errors.name}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[400ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-1 text-sm font-medium text-naf-blue">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-naf-red font-medium">{errors.email}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[500ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-1 text-sm font-medium text-naf-blue">
              Senha
            </label>
            <input
              type="password"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-naf-red font-medium">{errors.password}</p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[600ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-1 text-sm font-medium text-naf-blue">
              Confirmar Senha
            </label>
            <input
              type="password"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-naf-red font-medium">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div
            className={`pt-2 transition-all duration-[700ms] ease-out delay-[700ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <button
              type="submit"
              className="w-full bg-naf-red text-white font-bold py-3 rounded-xl hover:bg-[#a62b18] transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-105 shadow-md cursor-pointer"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p
          className={`text-center text-sm text-naf-gray mt-6 transition-all duration-[700ms] ease-out delay-[800ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Já tem conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-naf-red hover:underline font-bold bg-transparent border-none p-0 cursor-pointer"
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}
