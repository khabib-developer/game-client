import { useRoom } from "@/hooks/room.hook";
import { FormEvent, useState } from "react";

export const CreateRoom = () => {
  const { createRoom } = useRoom();
  const [name, setName] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createRoom(name);
    setName("");
  };
  return (
    <div className="border-2 border-solid rounded p-4 px-8  mt-6 cursor-pointer">
      <h3>Create Room</h3>
      <form
        onSubmit={handleSubmit}
        className="pt-3 flex flex-col align-top justify-start gap-4"
      >
        <input
          placeholder="Name of room"
          className="bg-black border-0 border-b-2 border-white outline-none"
          value={name}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button type="submit" className="border-2 border-white py-1 rounded-sm">
          Create
        </button>
      </form>
    </div>
  );
};
