"use client";
import { AppDispatch, RootType } from "@/src/core/providers/store";
import { logoutUser } from "@/src/modules/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const router = useRouter();
  const user = useSelector((state: RootType) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  async function handleLogout() {
    try {
      await dispatch(logoutUser());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className="sticky top-0 z-50 bg-[#4678a7] text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / Title */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg sm:text-xl font-bold tracking-wide transition hover:opacity-80"
        >
          User {user ? `Dashboard` : `Management`}
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 text-white px-4 py-2 font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-200 active:scale-95"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="rounded-lg bg-white text-[#4678a7] px-4 py-2 font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-200 active:scale-95"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signUp")}
                className="rounded-lg border border-white bg-transparent px-4 py-2 font-semibold text-white shadow-md hover:bg-white hover:text-[#4678a7] hover:shadow-lg transition duration-200 active:scale-95"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
