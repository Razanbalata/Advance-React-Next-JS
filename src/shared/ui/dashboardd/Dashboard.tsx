'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootType } from "@/src/core/providers/store";

function Dashboard() {

  const router = useRouter();
  const user = useSelector((state: RootType) => state.auth.user);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <Image
          src="/team.png"
          alt="Team illustration"
          width={600}
          height={600}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-5 max-w-2xl">
        
        <h2 className="text-2xl font-bold text-[#4678a7] sm:text-3xl lg:text-4xl">
          User Management System
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Welcome to our simple and efficient User Management System.
          This platform allows users to register, log in, and manage their
          personal profiles with ease.
        </p>

        {/* الأزرار حسب حالة المستخدم */}

        {user ? (

          <button
            onClick={() => router.push('/user')}
            className="mt-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-green-700 hover:shadow-lg active:scale-95"
          >
            Go to Home
          </button>

        ) : (

          <button
            onClick={() => router.push('/signUp')}
            className="mt-2 rounded-full bg-[#4678a7] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#35648d] hover:shadow-lg active:scale-95"
          >
            Get Started
          </button>

        )}

      </div>
    </section>
  );
}

export default Dashboard;