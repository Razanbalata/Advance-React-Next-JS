"use client";
import { AppDispatch, RootType } from "@/src/core/providers/store";
import { logoutUser } from "@/src/modules/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeToggle } from "../themeToggle/ThemeToggle";

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
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-brand-blue dark:bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Logo / Title */}
        <h1
          onClick={() => router.push("/")}
          className="cursor-pointer text-lg sm:text-xl font-bold tracking-wide transition hover:opacity-80 active:scale-95"
        >
          User {user ? `Dashboard` : `Management`}
        </h1>

        {/* Action Area */}
        <div className="flex items-center gap-3 sm:gap-6">
          <ThemeToggle />
          
          <div className="flex items-center gap-2 sm:gap-4 border-l border-white/20 pl-3 sm:pl-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-red-600 transition duration-200 active:scale-95"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md hover:bg-white hover:text-brand-blue transition duration-200 active:scale-95 border border-white/30"
                >
                  Login
                </button>

                <button
                  onClick={() => router.push("/signUp")}
                  className="hidden sm:block rounded-lg bg-white px-4 py-2 text-sm font-bold text-brand-blue shadow-md hover:bg-gray-100 transition duration-200 active:scale-95"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;