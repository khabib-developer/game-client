import { useRoomStore } from "@/store/room.store";
import { useSocket } from "./socket";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";

export const useRoom = () => {
  const { rooms, currentRoom, setCurrentRoom, setRooms } = useRoomStore();
  const socket = useSocket();
  const { user } = useUserStore();

  const [createdRoom, setCreatedRoom] = useState(false);

  useEffect(() => {
    if (currentRoom && socket) {
      socket.on("message", (data) => {
        setCurrentRoom({
          ...currentRoom,
          messages: [...(currentRoom.messages || []), data],
        });
      });

      socket.on("createRoom", (data, room) => {
        console.log(data, room);
        setRooms(data);
        if (createdRoom) {
          switchRoom(room.id);
        }
      });

      socket.on("switchRoom", (room) => {
        setCurrentRoom(room);
        console.log(room);
      });
    }
  }, [currentRoom, rooms, setCurrentRoom, setRooms, socket, createdRoom]);

  const sendMessage = useCallback(
    (text: string) => {
      socket.emit("message", {
        text,
        username: user?.username,
        roomId: currentRoom?.id,
        date: Date.now(),
      });
    },
    [socket, user, currentRoom]
  );

  const createRoom = useCallback(
    (name: string) => {
      setCreatedRoom(true);
      socket.emit("createRoom", {
        name,
        username: user?.username,
      });
    },
    [socket, user]
  );

  const switchRoom = useCallback(
    (roomId: string) => {
      socket.emit("switchRoom", {
        username: user?.username,
        currentRoomId: currentRoom?.id,
        roomId,
      });
    },
    [socket, user, currentRoom]
  );

  return { sendMessage, createRoom, switchRoom };
};
