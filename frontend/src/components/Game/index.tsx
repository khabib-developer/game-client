"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/socket";
import { useUserStore } from "@/store/user.store";
import { useAuth } from "@/hooks/auth.hook";
import { useAppStore } from "@/store/app.store";
import { UsersList } from "../UsersList";
import { RoomsList } from "../RoomList";
import { CreateRoom } from "../RoomList/create";
import { Chat } from "../Chat";
import { useRoomStore } from "@/store/room.store";
import Link from "next/link";

export default function Game() {
  const socket = useSocket();

  const [permission, setPermission] = useState(false);

  const { user } = useUserStore();

  const { currentRoom } = useRoomStore();
  const { check, logout } = useAuth();

  const handleLogout = () => {
    setPermission(false);

    socket.disconnect();
    logout();
  };

  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    if (socket.initialized && !socket.connected && user) {
      socket.connect();
      setPermission(true);
    }
  }, [user, socket]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      {!permission ? (
        "loading..."
      ) : (
        <div className="w-full flex flex-1 flex-col">
          <div className="text-center">Username: {user?.username}</div>
          <div className="text-center">Group: {currentRoom?.name}</div>
          <div className="flex flex-col gap-1 max-h-[32rem] absolute right-24">
            <div className="border-2 border-solid rounded p-4  px-8">
              <h4>
                Online users - {currentRoom?.participants.length}{" "}
                <span
                  onClick={handleLogout}
                  className="cursor-pointer pl-3 text-red-600"
                >
                  logout
                </span>
              </h4>
              <UsersList />
            </div>
            <RoomsList />
            <CreateRoom />
            <div className="border-2 border-solid rounded p-4 mt-4 px-8">
              <Link href="/game/134">Start</Link>
            </div>
          </div>
          <Chat />
        </div>
      )}
    </main>
  );
}
