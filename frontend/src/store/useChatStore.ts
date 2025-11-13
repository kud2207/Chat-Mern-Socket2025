import toast from "react-hot-toast";
import type { ChatState, IUser } from "../types/type";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    //affiche Les User
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors du chargement des utilisateurs");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    //Fontion pour recupere les message
    getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            // pour forcer la sortie du msg en tableau
            const msgs = Array.isArray(res.data.data) ? res.data.data : [];
            set({ messages: msgs });
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors du chargement des messages");
            set({ messages: [] }); // sécurité
        } finally {
            set({ isMessagesLoading: false });
        }
    },


    //fontion pour select user
    setSelectedUser: async (user: IUser | null) => {
        set({ selectedUser: user });
    },


    //Fontion pour envoyer les message
    sendMessage: async (messageData) => {
        try {
            const { selectedUser, messages } = get();
            if (!selectedUser?._id) {
                toast.error("Aucun utilisateur sélectionné !",);

                return;
            }
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
            return res.data;
        } catch (error) {
            console.log("eeror envoi", error)
            toast.error(error.response.data.message)
            throw error; //relance l’erreur pour que le composant la capte
        }
    },

}));