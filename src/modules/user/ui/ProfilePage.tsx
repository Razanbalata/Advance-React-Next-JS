'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootType } from '@/src/core/providers/store';
import Image from 'next/image';
import '@/src/app/globals.css'
import EditProfileDialog from './EditProfileForm';
import { updateUser } from '../../auth';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootType) => state.auth.user);
   const [open, setOpen] = useState(false);
   const dispatch = useDispatch<AppDispatch>()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to view your profile.</p>
      </div>
    );
  }
  function handleSave(formData:FormData){
      if (!user) return;

  const updates = Object.fromEntries(formData.entries());
  console.log(updates)
     dispatch(updateUser({
      uid:user.uid,
      ...updates
     }))
  }

  // هذا الكود يتأكد أن النص ليس فارغاً، وليس كلمة "null"، ويبدأ بمسار صحيح
const getValidImageUrl = (url: any) => {
  console.log(url)
  if (typeof url !== 'string') return '/default-avatar.png';
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl || trimmedUrl === 'null' || trimmedUrl === 'undefined') {
    return '/default-avatar.png';
  }

  // إذا كان الرابط لا يبدأ بـ / ولا بـ http، فهو رابط غير صالح لـ Next.js
  if (!trimmedUrl.startsWith('/') && !trimmedUrl.startsWith('http')) {
    return '/default-avatar.png';
  }

  return trimmedUrl;
};

const imageSrc = getValidImageUrl(user.img);

  return (
    <div className="main min-h-screen  p-6">
      <div className="dashboard">
        <div className="profile-section bg-white shadow-lg p-6 rounded-lg w-full text-center">
          <h2 className="text-lg font-semibold mb-2">
            Hello,{' '}
            <span className="text-teal-600 capitalize">{user.firstName}</span>
          </h2>
          <hr className="border-gray-300 mb-4" />

          <Image
            src={imageSrc}
            alt="User Image"
            className="profile-image w-32 h-32 mx-auto rounded-full object-cover mb-4"
           height={300}
           width={300}
         />

          <h3 className="text-xl font-medium mb-4">
            {user.firstName} {user.lastName}
          </h3>

          <div className="info-grid grid grid-cols-1 gap-3 text-left mb-6">
            <div className="info-card">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="info-card">
              <strong>Gender:</strong> {user.gender}
            </div>
            <div className="info-card">
              <strong>Mobile:</strong> {user.mobile}
            </div>
            <div className="info-card">
              <strong>Address:</strong> {user.address}
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="edit-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <EditProfileDialog open={open} onClose={() => setOpen(false)} onSave={handleSave}/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;