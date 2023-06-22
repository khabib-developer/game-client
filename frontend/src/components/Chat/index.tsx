import { useRoom } from "@/hooks/room.hook";
import { useRoomStore } from "@/store/room.store";
import dateFormat from "dateformat";
import { ChangeEventHandler, FormEvent, useState } from "react";
export const Chat = () => {
  const messages = [
    {
      username: "khabib",
      text: "some text",
      date: Date.now(),
    },
    {
      username: "Mirjon",
      text: "some text 1",
      date: Date.now() - 10000,
    },
    {
      username: "Islom",
      text: "some text 2",
      date: Date.now() - 121234,
    },
  ];

  const { currentRoom } = useRoomStore();

  const { sendMessage } = useRoom();

  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  return (
    <div className="w-9/12 flex flex-col gap-5 flex-auto justify-end">
      <div className="w-full px-4 flex-col align-bottom  flex justify-end flex-auto  border-2 border-slate-800 rounded-lg">
        {currentRoom?.messages?.map((message, i) => (
          <div key={i} className="pb-3 px-3 flex justify-between">
            <div>
              <span className="text-indigo-500">{message.username}: </span>
              <span>{message.text}</span>
            </div>

            <span className="text-xs">
              {dateFormat(new Date(message.date), " mmmm dS, h:MM TT")}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex px-4 text-gray-500">
        <input
          value={message}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          placeholder="write message"
          className="w-full bg-black border-0 outline-none text-white border-b-2 border-white"
        />
        <button className="pl-6 border-b-2 border-white">send</button>
      </form>
    </div>
  );
};
