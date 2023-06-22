import { useRoom } from "@/hooks/room.hook";
import { useRoomStore } from "@/store/room.store";

export const RoomsList = () => {
  const { rooms, currentRoom } = useRoomStore();

  const { switchRoom } = useRoom();

  return (
    <div className="border-2 border-solid rounded mt-8 p-4 px-8">
      <h3 className="pb-6">Rooms</h3>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => switchRoom(room.id)}
          className="flex justify-between cursor-pointer "
        >
          <span
            className={
              currentRoom?.id === room.id ? "text-lime-500" : "text-white"
            }
          >
            {room.name}
          </span>
          <span className="text-white">{room.users}</span>
        </div>
      ))}
    </div>
  );
};
