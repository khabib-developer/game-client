"use client";
import { useCallback } from "react";
import { IForm, IUser } from "../types/interface";
import { useAppStore } from "../store/app.store";
import { useUserStore } from "@/store/user.store";
import useAxios from "./http.hook";
import { useRouter } from "next/navigation";
import { useSocket } from "./socket";

export const useAuth = () => {
  const { setUser } = useUserStore();

  const router = useRouter();

  const { fetchData } = useAxios();

  const auth = useCallback(
    async (data: IForm, url: string) => {
      const userData = await fetchData(`/auth/${url}`, "POST", data);
      if (userData) {
        setUser(userData);
        router.push("/game");
      }
    },
    [fetchData, router, setUser]
  );

  const check = useCallback(async () => {
    const cookies = document.cookie.split(";");
    if (cookies.find((cookie) => cookie.startsWith("token="))) {
      const userData: IUser = await fetchData(`/auth/check`, "GET");
      if (userData) {
        setUser(userData);
        return userData;
      }
    }
    router.push("/auth");
  }, [fetchData, router, setUser]);

  const logout = useCallback(async () => {
    setUser(null);
    await fetchData(`/auth/logout`, "GET");
    router.push("/");
  }, [setUser, router, fetchData]);

  return { auth, check, logout };
};
