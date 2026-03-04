"use client";
import { AppDispatch } from "@/src/core/providers/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../auth";
import { X } from "lucide-react"; // أيقونة إغلاق أرتب

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    dispatch(changePassword(formData.newPassword));
    setSuccess("Password changed successfully!");
    
    // تأخير بسيط للإغلاق عشان اليوزر يشوف رسالة النجاح
    setTimeout(() => {
      onClose();
      setSuccess("");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* غيرنا bg-black لـ bg-white مع دعم الدارك مود */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border dark:border-gray-800 transition-colors">
        
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#4678a7] mb-6">
          Change Password
        </h2>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 mb-4 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 mb-4 rounded-lg text-sm border border-green-100 dark:border-green-900/30">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* الستايل القديم: ليبل فوق والإنبوت تحت */}
          {[
            { label: "Current Password", name: "currentPassword" },
            { label: "New Password", name: "newPassword" },
            { label: "Confirm New Password", name: "confirmPassword" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                {field.label}
              </label>
              <input
                type="password"
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#4678a7] focus:ring-1 focus:ring-[#4678a7] transition-all"
                required
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-[#4678a7] text-white font-bold hover:bg-[#35648d] transition shadow-md active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordDialog;