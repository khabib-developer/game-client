import { IAppStore, IUser } from "@/types/interface";
import { create } from "zustand";

export const useAppStore = create<IAppStore>((set) => ({
  users: [],
  setUsers: (users: IUser[]) => {
    return set({ users });
  },
  loading: false,
  setLoading: (loading: boolean) => {
    return set({ loading });
  },

  info: null,
  setInfo: (info: null | string) => {
    return set({ info });
  },
  error: null,
  setError: (error: string | null) => set({ error }),
}));
