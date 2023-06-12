"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../components/socket";

export default function GamePage() {
  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const onChangeRoomName = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
    },
    []
  );
  const onClick = useCallback(() => {
    if (username) {
      socket.connect(username);
    }
  }, [socket, username]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!socket.connected ? (
        <input
          className="text-black"
          type="text"
          onChange={onChangeRoomName}
          value={username}
        />
      ) : null}
      Test
      <button
        type="button"
        className="border border-white rounded px-3 py-2"
        onClick={socket.connected ? socket.disconnect : socket.connect}
      >
        {socket.connected ? "Disconnect" : "Connect"}
      </button>
      {socket.connected ? (
        <button
          type="button"
          className="border border-white rounded px-3 py-2"
          onClick={socket.createRoom}
        >
          Create Room
        </button>
      ) : null}
    </main>
  );
}
