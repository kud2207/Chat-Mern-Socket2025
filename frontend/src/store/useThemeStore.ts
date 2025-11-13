import { create } from "zustand";
import type { UseThemeStore } from "../types/type";

export const useThemeStore = create<UseThemeStore>((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
