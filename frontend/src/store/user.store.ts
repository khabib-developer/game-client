import { IUser, IUserStore } from "@/types/interface";
import { create } from "zustand";

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => {
    return set({ user });
  },
}));
