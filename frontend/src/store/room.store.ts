import { IRoom, IRoomItem, IRoomStore } from "@/types/interface";
import { create } from "zustand";

export const useRoomStore = create<IRoomStore>((set) => ({
  currentRoom: null,
  setCurrentRoom: (currentRoom: IRoom | null) => {
    return set({ currentRoom });
  },
  rooms: [],
  setRooms: (rooms: IRoomItem[]) => {
    return set({ rooms });
  },
}));
