import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!name) newErrors.name = "Por favor, preencha o campo de nome.";
    if (!email) newErrors.email = "Por favor, preencha o campo de email.";
    else if (!email.includes("@") || !email.includes(".")) newErrors.email = "Por favor, informe um email válido.";
    if (!password) newErrors.password = "Por favor, preencha o campo de senha.";
    if (!confirmPassword) newErrors.confirmPassword = "Por favor, confirme sua senha.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem.";
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
      await api.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (error) {
      setErroGeral(error.response?.data?.error || "Erro ao conectar com o servidor.");
    }
  };

  return (
    <main id="conteudo" tabIndex={-1} className="flex flex-col items-center justify-center min-h-screen bg-naf-light p-4 outline-none">
      <h1 className={`text-3xl font-bold text-center mb-2 text-naf-blue transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
        Criar Conta
      </h1>
      <p className={`text-center text-naf-muted mb-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>Calculadora de Imposto de Renda</p>

      <div className={`w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-naf-gray/30 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {erroGeral && (
          <div role="alert" className="mb-4 p-3 bg-red-50 border border-naf-red-dark/20 rounded-lg">
            <p className="text-sm font-medium text-naf-red-dark">{erroGeral}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {[
            { id: "name", label: "Nome Completo", type: "text", auto: "name", placeholder: "Digite seu nome", value: name, setter: setName },
            { id: "email", label: "Email", type: "email", auto: "email", placeholder: "Digite seu email", value: email, setter: setEmail },
            { id: "password", label: "Senha", type: "password", auto: "new-password", placeholder: "Crie uma senha segura", value: password, setter: setPassword },
            { id: "confirmPassword", label: "Confirmar Senha", type: "password", auto: "new-password", placeholder: "Repita a senha", value: confirmPassword, setter: setConfirmPassword }
          ].map((field, idx) => (
            <div key={field.id} className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: `${(idx + 1) * 100}ms` }}>
              <label htmlFor={`cadastro-${field.id}`} className="block mb-1 text-sm font-medium text-naf-blue">{field.label}</label>
              <input
                id={`cadastro-${field.id}`}
                type={field.type}
                autoComplete={field.auto}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => {
                  field.setter(e.target.value);
                  if (errors[field.id]) setErrors((prev) => ({ ...prev, [field.id]: undefined }));
                }}
                aria-invalid={errors[field.id] ? "true" : undefined}
                aria-describedby={errors[field.id] ? `erro-${field.id}` : undefined}
                className="w-full px-4 py-2 border border-naf-gray rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition hover:shadow-sm min-h-[44px]"
              />
              {errors[field.id] && <p id={`erro-${field.id}`} role="alert" className="mt-1 text-xs text-naf-red-dark font-medium">{errors[field.id]}</p>}
            </div>
          ))}

          <div className={`pt-2 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{ transitionDelay: "500ms" }}>
            <button type="submit" className="w-full bg-naf-red text-white font-bold py-3 rounded-xl hover:bg-[#a62b18] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-naf-red transition hover:scale-105 shadow-md min-h-[44px]">
              Cadastrar
            </button>
          </div>
        </form>

        <p className={`text-center text-sm text-naf-muted mt-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "600ms" }}>
          Já tem conta? <Link to="/login" className="text-naf-red-dark underline font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-naf-blue rounded px-1">Faça login</Link>
        </p>
      </div>
    </main>
  );
}