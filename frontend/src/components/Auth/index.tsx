"use client";
import { useAppStore } from "@/store/app.store";
import { authText } from "@/types/enum";
import { IForm } from "@/types/interface";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/hooks/auth.hook";

export default function Auth() {
  const { loading } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(
      yup
        .object({
          username: yup.string().required().min(4),
          password: yup.string().required().min(4),
        })
        .required()
    ),
  });

  const { auth } = useAuth();

  const [state, setState] = useState(authText.login);

  const handleSwitch = () => {
    setState((prev) =>
      prev === authText.login ? authText.register : authText.login
    );
  };

  const onSubmit: SubmitHandler<IForm> = (data) =>
    auth(data, state.toLocaleLowerCase());

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            className={`peer block border-b-2 ${
              errors.username ? "text-red-700" : "text-white"
            } min-h-[auto] w-full  
            border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none`}
            id="exampleFormControlInput2"
            placeholder="Username"
            {...register("username")}
          />
        </div>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="password"
            className={`peer border-solid border-b-2 border-0 ${
              !errors.password ? "border-slate-100" : "border-red-700"
            } block min-h-[auto] w-full  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none `}
            id="exampleFormControlInput22"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        <div className="text-center lg:text-left">
          <button
            type="submit"
            className="rounded bg-primary border-2 w-full py-2 hover:bg-white hover:text-black"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            {loading ? "loading..." : state}
          </button>

          <div className="mb-0 mt-2 flex pt-1 text-sm font-semibold">
            {"Don't have an account?"}
            <div
              onClick={handleSwitch}
              className="text-danger pl-3 cursor-pointer text transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
            >
              {state === authText.login ? authText.register : authText.login}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
