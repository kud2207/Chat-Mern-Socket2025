import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { AuthState, LoginData, photoProfileData, SignupData } from "../types/type";
import toast from "react-hot-toast";


export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],

  // Vérifie si le cookie de connexion est présent
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); 
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Fonction de login
  login: async(data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Fonction pour s'inscrire
  signup: async (data :SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });  
      toast.success(res.data.message);
    } catch (error) {
      console.error("error de signup", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }

  },

  // Fonction Photo profile
  updateProfile: async (data: photoProfileData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success(res.data.message);
    } catch (error) {
      console.error("error de update", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

//Fontion de deconnection
logout: async()=>{
  try {
    await axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Vous êtes déconnecté");
 } catch (error) {
         console.error("error de logout", error);
      toast.error(error.response?.data?.message);
  }
}



    
}));
