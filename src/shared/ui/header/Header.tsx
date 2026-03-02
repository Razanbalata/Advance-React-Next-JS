'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-[#4678a7] text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        <h1 
          onClick={() => router.push('/')}
          className="cursor-pointer text-lg font-bold tracking-wide transition hover:opacity-80 sm:text-xl"
        >
          User Management
        </h1>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            onClick={() => router.push('/login')}
            className="rounded-lg bg-white px-4 py-1.5 font-semibold text-[#4678a7] transition duration-200 hover:bg-gray-100 hover:shadow-md active:scale-95"
          >
            Login
          </button>

          <button
            onClick={() => router.push('/signUp')}
            className="rounded-lg border border-white bg-transparent px-4 py-1.5 font-semibold text-white transition duration-200 hover:bg-white hover:text-[#4678a7] hover:shadow-md active:scale-95"
          >
            Sign Up
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;