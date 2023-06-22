"use client";
import { useRouter } from "next/navigation";

export const Main = () => {
  const router = useRouter();

  return (
    <div className="p-24">
      <button
        onClick={() => router.push("/game")}
        className="m-auto text-3xl border-solid rounded-md border-amber-300 border-2 py-5 px-12 cursor hover:bg-amber-300 hover:text-black"
      >
        Play
      </button>
    </div>
  );
};
