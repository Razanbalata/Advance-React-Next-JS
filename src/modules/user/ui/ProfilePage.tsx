"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootType } from '@/src/core/providers/store';
import Image from 'next/image';
import EditProfileDialog from './EditProfileForm';
import { updateUser } from '../../auth';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootType) => state.auth.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  if (!user) return <div className="p-10 text-center">Please login...</div>;

  const handleSave = (formData: FormData) => {
    const updates = Object.fromEntries(formData.entries());
    dispatch(updateUser({ uid: user.uid, ...updates }));
  };

  const imageSrc = user.img && user.img !== 'null' ? user.img : '/default-avatar.png';

  return (
    <div className="main min-h-screen p-6 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="dashboard mx-auto max-w-[900px] mt-10">
        <div className="profile-section bg-white dark:bg-gray-900 shadow-lg p-8 rounded-xl text-center border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Hello, <span className="text-[#0ead82] capitalize">{user.firstName}</span>
          </h2>
          <hr className="border-gray-200 dark:border-gray-700 mb-6" />

          <Image
            src={imageSrc}
            alt="User Image"
            className="profile-image w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-[#0ead82]"
            height={130} width={130}
          />

          <h3 className="text-2xl font-bold mb-6 dark:text-gray-100 uppercase">
            {user.firstName} {user.lastName}
          </h3>

          <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
            {[
              { label: "Email", value: user.email },
              { label: "Gender", value: user.gender },
              { label: "Mobile", value: user.mobile },
              { label: "Address", value: user.address },
            ].map((info, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <strong className="block text-gray-500 dark:text-gray-400 text-sm mb-1">{info.label}:</strong>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{info.value || "-"}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="edit-btn bg-[#4678a7] text-white px-8 py-2 rounded-lg hover:bg-[#35648d] transition shadow-md font-bold"
          >
            Edit Profile
          </button>
          
          <EditProfileDialog open={open} onClose={() => setOpen(false)} onSave={handleSave} user={user}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;