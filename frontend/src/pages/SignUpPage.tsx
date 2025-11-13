import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = (): boolean => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) return toast.error("Le nom complet est requis"), false;
    if (!email.trim()) return toast.error("L'email est requis"), false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Format d'email invalide"), false;
    if (!password) return toast.error("Le mot de passe est requis"), false;
    if (password.length < 6)
      return toast.error("Le mot de passe doit contenir au moins 6 caractères"), false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100 text-base-content">
      {/* Formulaire d'inscription */}
      <div className="flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-base-200 shadow-xl rounded-2xl p-8 space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-md">
                <User className="text-primary w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Crée ton compte</h2>
            <p className="mt-2 opacity-70">
              Déjà membre ?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Connecte-toi ici
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-3 opacity-60 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Entrez votre nom complet"
                  className="input input-bordered w-full pl-10"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 opacity-60 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className="input input-bordered w-full pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 opacity-60 w-5 h-5 bg-amber-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Choisissez un mot de passe"
                  className="input input-bordered w-full pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full flex justify-center items-center gap-2"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Activation du compte...
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="mt-4 opacity-70">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image d'accompagnement */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-base-200">
        <AuthImagePattern
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your friends."
        />
      </div>
    </div>
  );
};

export default SignUpPage;
