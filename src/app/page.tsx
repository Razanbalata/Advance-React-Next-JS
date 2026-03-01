"use client";
import Image from "next/image";
import { useEffect } from "react";
import { AppDispatch, RootType, store } from "../core/providers/store";
import { setUser } from "../modules/auth/model/auth.store";
import { useDispatch, useSelector } from "react-redux";
import { authApi, authLogic, signUser, updateUser } from "../modules/auth";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootType) => state.auth);

  useEffect(() => {
    // Dispatch مباشرة في useEffect أو أي مكان للاختبار
dispatch(updateUser({
  uid: "wDJ5kyLt8SM4qkgrGF8gO5oq7wV2",
  firstName: "Jane",
  lastName: "Doe",
  role: "admin"
}));
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
