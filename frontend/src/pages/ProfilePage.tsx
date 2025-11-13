import React, { useState } from "react";
import { Camera, User, Mail, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore"; // ton store pour le theme

const ProfilePage: React.FC = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { theme } = useThemeStore(); // récupère le thème actuel
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        const base64Image = reader.result as string;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      } catch {
        toast.error("Erreur lors du téléchargement de la photo");
      } finally {
        e.target.value = "";
      }
    };
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200" data-theme={theme}>
        <div className="text-center text-base-content">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="mb-6">Connectez-vous pour accéder à votre profil.</p>
          <a
            href="/login"
            className="inline-block px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-12 px-4" data-theme={theme}>
      <div className="max-w-md mx-auto">
        <div className="bg-base-100 rounded-xl p-6 shadow-md space-y-6 border border-base-300">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-base-content">Mon profil</h1>
            <p className="text-sm opacity-70 mt-1">Gérez vos informations personnelles</p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/express.png"}
                alt="Profil"
                className="w-24 h-24 rounded-full object-cover border-4 border-base-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-primary hover:bg-primary-focus p-2 rounded-full cursor-pointer transition-all ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-primary-content" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>
            <p className="text-xs opacity-70">Cliquez sur la caméra pour changer la photo</p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-base-content mb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-base-content" />
                Nom complet
              </label>
              <p className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base-content">
                {authUser.fullName}
              </p>
            </div>

            <div>
              <label className="block text-xs text-base-content mb-1 flex items-center gap-1">
                <Mail className="w-4 h-4 text-base-content" />
                Adresse e-mail
              </label>
              <p className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base-content">
                {authUser.email}
              </p>
            </div>
          </div>

          {/* Infos */}
          <div className="pt-4 border-t border-base-300 space-y-3 text-sm text-base-content">
            <div className="flex justify-between">
              <span>Membre depuis</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Statut du compte</span>
              <span className="flex items-center gap-1 text-success">
                <CheckCircle2 className="w-4 h-4" />
                Actif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
