import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Por favor, preencha o campo de email.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Por favor, informe um email válido (contendo '@' e '.').";
    }
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
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
      const response = await api.post('/auth/login', { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login realizado com sucesso!");
      navigate("/Home");

    } catch (error) {
      const mensagemErro = error.response?.data?.error || "Erro ao conectar ao servidor.";
      alert(mensagemErro);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4"
    >
      <h1
        className={`text-3xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[200ms]
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        CALCULADORA DE IMPOSTO DE RENDA
      </h1>

      <div
        className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl transition-all duration-[700ms] ease-out delay-[300ms] border border-naf-gray/30
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 text-naf-blue transition-all duration-[700ms] ease-out delay-[500ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div
            className={`transition-all duration-[700ms] ease-out delay-[700ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-naf-blue">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  const val = e.target.value;
                  if (val && val.includes("@") && val.includes(".")) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }
              }}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:shadow-md"
            />
            <div>
              <p className="mt-1 text-sm text-naf-red font-medium">
                {errors.email || " "}
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[850ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <label className="block mb-2 text-sm font-medium text-naf-blue">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-naf-gray rounded-xl focus:ring-2 focus:ring-naf-red focus:border-transparent outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:-translate-y-1 hover:shadow-md"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-naf-red font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <div
            className={`transition-all duration-[700ms] ease-out delay-[1000ms] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <button
              type="submit"
              className="w-full bg-naf-red text-white font-bold py-3 rounded-xl hover:bg-[#a62b18] transition delay-[80ms] duration-[400ms] ease-in-out hover:scale-105 shadow-md"
            >
              Entrar
            </button>
          </div>
        </form>

        <p
          className={`text-center text-sm text-naf-gray mt-6 transition-all duration-[700ms] ease-out delay-[1150ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Não tem conta?{" "}
          <a href="/Cadastro" className="text-naf-red hover:underline font-bold">
            Cadastre-se
          </a>
        </p>

        <p
          className={`text-center text-sm text-naf-gray mt-2 transition-all duration-[700ms] ease-out delay-[1250ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Esqueceu a senha?{" "}
          <a href="/RecuperarSenha" className="text-naf-red hover:underline font-bold">
            Recuperar Senha
          </a>
        </p>
      </div>

      <h2
        className={`block mb-2 mt-6 text-sm font-medium text-naf-gray p-1 transition-all duration-[700ms] ease-out delay-[1350ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
      </h2>
    </div>
  );
}
