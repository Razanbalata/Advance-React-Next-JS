"use client";
import React, { useState, useEffect } from "react";
import { Camera, X } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean; onClose: () => void; onSave: (formData: FormData) => void; user?: any;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", gender: "male", address: "", mobile: "", img: '',
  });
  const [imgPreview, setImgPreview] = useState<string>("");

  useEffect(() => {
    if (user && open) {
      setFormData({
        firstName: user.firstName || "", lastName: user.lastName || "",
        email: user.email || "", gender: user.gender || "male",
        address: user.address || "", mobile: user.mobile || "", img: '',
      });
      setImgPreview(user.img || "");
    }
  }, [user, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border dark:border-gray-800 max-h-[90vh] overflow-y-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#4678a7] mb-8">Edit Profile</h2>

        <form className="flex flex-col gap-5" onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData();
          Object.entries(formData).forEach(([k, v]) => data.append(k, v));
          onSave(data); onClose();
        }}>
          
          {/* الصورة الشخصية */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-1/3 text-sm font-bold text-gray-700 dark:text-gray-300">Profile Image</label>
            <div className="relative">
              <img src={imgPreview || "/default-avatar.png"} className="w-24 h-24 rounded-full object-cover border-2 border-[#0ead82]" alt="Preview" />
              <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-1.5 rounded-full border border-gray-200 dark:border-gray-700 cursor-pointer">
                <Camera size={16} className="text-gray-600 dark:text-gray-300" />
                <input type="file" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImgPreview(URL.createObjectURL(file));
                    setFormData(p => ({ ...p, img: file as any }));
                  }
                }} />
              </label>
            </div>
          </div>

          {/* الحقول */}
          {["firstName", "lastName", "email", "mobile", "address"].map(field => (
            <div key={field} className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full sm:w-1/3 text-sm font-bold text-gray-700 dark:text-gray-300 capitalize">{field}</label>
              <input
                name={field}
                className="w-full sm:w-2/3 p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white outline-none focus:border-[#4678a7] transition"
                value={(formData as any)[field]}
                onChange={(e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))}
              />
            </div>
          ))}

          {/* النوع */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-1/3 text-sm font-bold text-gray-700 dark:text-gray-300">Gender</label>
            <div className="w-full sm:w-2/3 flex gap-6 dark:text-gray-200">
              {["male", "female"].map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={(e) => setFormData(p => ({ ...p, gender: e.target.value }))} className="accent-[#4678a7]" />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400">Cancel</button>
            <button type="submit" className="bg-[#4678a7] text-white px-8 py-2 rounded-lg font-bold shadow-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileDialog;