"use client";
import Image from "next/image";
import { useEffect } from "react";
import { AppDispatch, RootType, store } from "../../core/providers/store";
import { setUser } from "../../modules/auth/model/auth.store";
import { useDispatch, useSelector } from "react-redux";
import { authApi, authLogic, logoutUser, signUser, updateUser } from "../../modules/auth";
import Dashboard from "@/src/shared/ui/dashboardd/Dashboard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootType) => state.auth);

  // useEffect(() => {
  //   async function runTests() {
  //     try {
  //       console.log("=== START TEST ===");

  //       // 1️⃣ Signup مستخدم جديد
  //       const newUser = await store.dispatch(signUser({
  //         email: "testuser@example.com",
  //         password: "12345678",
  //         firstName: "John",
  //         lastName: "Doe",
  //         role: "user",
  //       })).unwrap();
  //       console.log("Signup User:", newUser);

  //       // 2️⃣ Login بنفس المستخدم
  //       const loggedInUser = await store.dispatch(authLogic({
  //         email: "testuser@example.com",
  //         password: "12345678"
  //       })).unwrap();
  //       console.log("Login User:", loggedInUser);

  //       // 3️⃣ تحديث بيانات المستخدم
  //       const updatedUser = await store.dispatch(updateUser({
  //         uid: loggedInUser.uid,
  //         firstName: "Jane",
  //         lastName: "Smith",
  //         role: "admin"
  //       })).unwrap();
  //       console.log("Updated User:", updatedUser);

  //       // 4️⃣ Logout
  //       await store.dispatch(logoutUser());
  //       console.log("Logout done. Current state:", store.getState());

  //       console.log("=== END TEST ===");
  //     } catch (error) {
  //       console.error("Test failed:", error);
  //     }
  //   }

  //   runTests();
  // }, []);
  // console.log(authState);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
  <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <main className="p-4 dark:bg-zinc-900 sm:p-6 lg:p-8">
      <Dashboard />
    </main>
  </div>
</div>
  );
}
