import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = (): boolean => {
    const { email, password } = formData;

    if (!email.trim()) return toast.error("L'email est requis"), false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Format d'email invalide"), false;

    if (!password) return toast.error("Le mot de passe est requis"), false;

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(formData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100 text-base-content">
      {/* Section droite : formulaire */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-base-200 shadow-xl rounded-2xl p-8 space-y-8">
          {/* En-tête */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-md">
                <Lock className="text-primary w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Connecte-toi</h2>
            <p className="mt-2 opacity-70">
              Pas encore inscrit ?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium transition"
              >
                Crée ton compte
              </Link>
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Adresse email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 opacity-60 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 opacity-60 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 opacity-70 hover:opacity-100 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary w-full flex justify-center items-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* Lien bas */}
          <div className="text-center">
            <p className="mt-4 opacity-70">
              Vous avez oublié votre mot de passe ?{" "}
              <Link to="/forgot-password" className="text-primary hover:underline font-medium">
                Réinitialiser
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Section gauche */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-base-200">
        <AuthImagePattern
          title="Welcome back"
          subtitle="Reconnect with your friends and continue the conversation"
        />
      </div>
    </div>
  );
};

export default LoginPage;
