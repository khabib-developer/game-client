"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketState {
  room: string;
  connected: boolean;
  connect(username: string): void;
  createRoom(): void;
  disconnect(): void;
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

  const [socketState, setSocketState] = useState<SocketState>({
    room: "lobby",
    connected: false,
    connect: () => {},
    createRoom: () => {},
    disconnect: () => {},
  });
  useEffect(() => {
    const socket = io("http://localhost:3000", {
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
      connect: (username) => socket.connect(),
      disconnect: () => socket.disconnect(),
      createRoom: () => {
        socket.emit("create-room", "Yay", (response) => {
          console.log("create-room", response);
        });
      },
    }));

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    if (socketRef.current && socketState.connected) {
      console.log("join-room", socketState.room);
      socketRef.current.emit("join-room", socketState.room, (response) => {
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
