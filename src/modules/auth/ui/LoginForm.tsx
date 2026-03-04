'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { authLogic } from '../model/auth.logic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/core/providers/store';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter()
const dispatch = useDispatch<AppDispatch>();
const [formData,setFormData] = useState({
  email:"",
  password:""
})

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }

 async function handleSubmit(e:React.FormEvent){
      e.preventDefault();
      try{
        console.log("inside await")
        await dispatch(authLogic(formData)).unwrap()
        alert("login Successfully!")
        router.push('/user')
      }catch(error){
        console.log(error)
      }
 } 

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-zinc-900">
      
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-800">
        
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Login to Your Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          {/* Email / Username */}
          <input
            type="text"
            placeholder="Enter your email or username"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-[#4678a7] focus:ring-2 focus:ring-[#4678a7]/30 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
            name="email"
            value={formData.email}
           onChange={handleChange}
         />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-[#4678a7] focus:ring-2 focus:ring-[#4678a7]/30 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white"
           name="password"
            value={formData.password}
          onChange={handleChange}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 rounded-lg bg-[#4678a7] py-2 font-semibold text-white transition duration-300 hover:bg-[#35648d] hover:shadow-lg active:scale-95"
          >
            Login
          </button>

          {/* Sign up link */}
          <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link
              href="/signUp"
              className="font-semibold text-[#4678a7] transition hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;