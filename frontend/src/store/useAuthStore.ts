import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { UseAuthState, LoginData, photoProfileData, SignupData, } from "../types/type";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL: string = "http://localhost:5000"

export const useAuthStore = create<UseAuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [], //recuper all User connect
  socket: null,

  // Vérifie si le cookie de connexion est présent
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket(); //recuper l'etat de connection
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Fonction de login
  login: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data });
      toast.success(res.data.message);

      get().connectSocket(); //recuper l'etat de connection
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Fonction pour s'inscrire
  signup: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.data });
      toast.success(res.data.message);

      get().connectSocket(); //recuper l'etat de connection
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
      set({ authUser: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      console.error("error de update", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  //Fontion de deconnection
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Vous êtes déconnecté");

      get().disConnectSocket()
    } catch (error) {
      console.error("error de logout", error);
      toast.error(error.response?.data?.message);
    }
  },


  //Fontion pour dire qu'il est connecté au server
  connectSocket: async () => {
    try {
      const { authUser } = get();
      if (!authUser || get().socket?.connected) return;

      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id
        }
      });
      
      socket.connect();
      set({ socket: socket });

      /**
       * envoie les userconect au back et on 
       * utilise le mm "" comme pour le back io.emmi
       */
      socket.on("getOnlineUsers", (userIds)=>{ 
        set({onlineUsers:userIds})
      })
    } catch (error) {
      console.error("error de conectSocke", error);
      toast.error(error.response?.data?.message);
    }

  },

  //Fontion pour dire qu'il est deconnecté au server
  disConnectSocket: async () => {
    try {
      if (get().socket?.connected) get().socket?.disconnect();
    } catch (error) {
      console.error("error de disconectSocke", error);
      toast.error(error.response?.data?.message);
    }

  },

})); 
