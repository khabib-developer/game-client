import { useRoomStore } from "@/store/room.store";

export const UsersList = () => {
  const { currentRoom } = useRoomStore();

  return (
    <div>
      {currentRoom?.participants.map((u) => (
        <div key={u.socketId} className="pt-3">
          username: <span className="text-lime-500 pl-2">{u.username}</span>
        </div>
      ))}
    </div>
  );
};
