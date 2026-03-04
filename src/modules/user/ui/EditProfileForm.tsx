'use client';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootType } from "@/src/core/providers/store";
import { Camera } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const user = useSelector((state: RootType) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    img: null as File | null,
  });

  const [imgPreview, setImgPreview] = useState<string>("");

  // جلب بيانات المستخدم عند فتح المودال
  useEffect(() => {
    if (user && open) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "male",
        address: user.address || "",
        mobile: user.mobile || "",
        img: null,
      });
      setImgPreview(user.img ||  "");
    }
  }, [user, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.type === "file" && target.files) {
      const file = target.files[0];
      setFormData(prev => ({ ...prev, img: file }));
      setImgPreview(URL.createObjectURL(file));
    } else {
      setFormData(prev => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "img" && value) {
        data.append(key, value);
      } else {
        data.append(key, value as string);
      }
    });
    onSave(data);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-[#4678a7] mb-8">Edit Profile</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Profile Image */}
          <div className="flex flex-col sm:flex-row items-center gap-4 relative">
            <label className="w-full sm:w-1/3 text-sm font-medium">Profile Image</label>
            <div className="w-full sm:w-2/3 flex items-center gap-4 relative">
              <div className="relative">
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="Profile Preview"
                    className="w-28 h-28 rounded-full object-cover border-2 border-teal-500"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
                    👤
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full border cursor-pointer hover:bg-gray-100">
                  <Camera className="text-gray-600" />
                  <input type="file" className="hidden" onChange={handleChange} name="img" />
                </label>
              </div>
            </div>
          </div>

          {/* باقي الحقول */}
          {["firstName","lastName","email","mobile","address"].map(field => (
            <div key={field} className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full sm:w-1/3 text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                className="input-style w-full sm:w-2/3"
                value={formData[field as keyof typeof formData] as string}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Gender */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-full sm:w-1/3 text-sm font-medium">Gender</label>
            <div className="w-full sm:w-2/3 flex gap-6">
              {["male","female"].map(g => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-[#4678a7] text-white hover:bg-[#35648d] transition shadow-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileDialog;