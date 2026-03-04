"use client";
import { AppDispatch } from "@/src/core/providers/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUser } from "../model/auth.logic";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    altmobile: "",
    role: "",
    img: '' ,
    password: "",
    confirmPassword: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const target = e.target as HTMLInputElement;

    if (target.type === "file" && target.files) {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.files![0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
    try {
      console.log("inside await")
      await dispatch(signUser(formData)).unwrap()
      alert("User Created Successfully!")
      router.push('/user')
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white flex flex-col items-center justify-center rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-[#4678a7] text-white mb-10 p-4 w-3/4 rounded-2xl">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4">
          {/* First Name */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="firstName"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="lastName"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="username"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="email"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="mobile"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="07XXXXXXXX"
              inputMode="numeric"
              className="input-style w-full sm:w-2/3"
            />
          </div>

          {/* Alt Mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="altmobile"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Alternative Mobile
            </label>
            <input
              type="tel"
              name="altmobile"
              id="altmobile"
              value={formData.altmobile}
              onChange={handleChange}
              placeholder="Optional"
              inputMode="numeric"
              className="input-style w-full sm:w-2/3"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="gender"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Gender
            </label>

            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-1 px-2 text-sm w-40 sm:w-52 focus:outline-none focus:ring-2 focus:ring-[#4678a7]/30 cursor-pointer"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Role */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="role"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-1 px-2 text-sm w-40 sm:w-52 focus:outline-none focus:ring-2 focus:ring-[#4678a7]/30 cursor-pointer"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="address"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
            />
          </div>

          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="img"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="img"
              id="img"
              onChange={handleChange}
              className="file-style w-full sm:w-2/3"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="password"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label
              htmlFor="confirmPassword"
              className="w-full sm:w-1/3 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-style w-full sm:w-2/3"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full sm:w-1/2 rounded-xl bg-[#4678a7] py-3 font-semibold text-white transition duration-300 hover:bg-[#35648d] hover:shadow-lg active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
