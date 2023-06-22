"use client";

import { useAppStore } from "@/store/app.store";
import { useRoomStore } from "@/store/room.store";
import { IMessage } from "@/types/interface";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketState {
  room: string;
  initialized: boolean;
  connected: boolean;
  connect(): void;
  createRoom(): void;
  disconnect(): void;
  emit(event: string, data: any): void;
  on: (event: string, fn: (...args: any[]) => void) => void;
}

const SocketStateContext = createContext<SocketState | null>(null);

export function useSocket() {
  const context = useContext(SocketStateContext);
  if (context === null) {
    throw Error("Please use this hook inside of SocketProvider");
  }
  return context;
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>();

  const { setUsers } = useAppStore();

  const { setRooms, setCurrentRoom, currentRoom } = useRoomStore();

  const [socketState, setSocketState] = useState<SocketState>({
    room: "lobby",
    initialized: false,
    connected: false,
    connect: () => {},
    createRoom: () => {},
    disconnect: () => {},
    emit: () => {},
    on: () => {},
  });
  useEffect(() => {
    const socket = io("ws://localhost:3000", {
      //   transports: ["websocket", "polling"],
      withCredentials: true,
      autoConnect: false,
    });

    socket.on("connect", () => {
      setSocketState((p) => ({
        ...p,
        connected: socket.connected,
      }));
    });

    socket.on("connect_error", (...args) => {
      console.log("connect_error", args);
    });

    socket.on("disconnect", (...args) => {
      console.log("disconnect", args);
      setSocketState((p) => ({
        ...p,
        connected: socket.connected,
      }));
    });

    socket.on("connected", (room, rooms) => {
      setRooms(rooms);
      setCurrentRoom(room);
    });

    socket.on("updatedRooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("disconnecting", (...args) => {
      console.log("disconnecting", args);
    });

    socket.on("newListener", (...args) => {
      console.log("newListener", args);
    });
    socket.on("removeListener", (...args) => {
      console.log("removeListener", args);
    });
    socket.on("lobby-message-list", (arg) => {
      console.log(arg); // world
    });
    socket.on("lobby-user-list", (arg) => {
      console.log(arg); // world
    });

    setSocketState((p) => ({
      ...p,
      initialized: true,
      connect: () => socket.connect(),
      disconnect: () => socket.disconnect(),
      createRoom: () => {
        socket.emit("create-room", "Yay", (response: any) => {
          console.log("create-room", response);
        });
      },
      emit: (event: string, data: any) => socket.emit(event, data),
      on: (event: string, fn: (...args: any[]) => void) => {
        socket.on(event, fn);
      },
    }));

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (socketRef.current && socketState.connected) {
      console.log("join-room", socketState.room);
      socketRef.current.emit("join-room", socketState.room, (response: any) => {
        console.log(response);
      });
    }
  }, [socketState.connected]);

  return (
    <SocketStateContext.Provider value={socketState}>
      {children}
    </SocketStateContext.Provider>
  );
}
