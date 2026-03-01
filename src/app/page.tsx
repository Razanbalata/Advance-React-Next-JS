"use client";
import Image from "next/image";
import { useEffect } from "react";
import { AppDispatch, RootType, store } from "../core/providers/store";
import { setUser } from "../modules/auth/model/auth.store";
import { useDispatch, useSelector } from "react-redux";
import { authApi, authLogic, signUser } from "../modules/auth";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootType) => state.auth);

  useEffect(() => {
    dispatch(
signUser({
        email: "newuser@example.com",
        password: "12345678",
        firstName: "John",
        lastName: "Doe",
        role: "user",
      })    );
  }, [dispatch]);
  console.log(authState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        redux project
      </main>
    </div>
  );
}
