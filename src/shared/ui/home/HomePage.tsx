'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '@/src/core/providers/store';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const user = useSelector((state: RootType) => state.auth.user);
  const role = user?.role || 'user';
  const router = useRouter();

  return (
    <div className="p-10 min-h-screen bg-gray-50 flex flex-col items-center">
      {/* الترحيب */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          مرحباً بك، {user?.firstName} ✨
        </h1>
        <p className="text-gray-500 text-lg">
          أنت الآن في لوحة تحكم <span className="text-teal-600 font-bold">{role === 'admin' ? 'الإدارة' : 'المستخدم'}</span>
        </p>
      </div>

      {/* الأزرار الرئيسية (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* زر البروفايل - متاح للجميع */}
        <button 
          onClick={() => router.push('/profile')}
          className="group p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            👤
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">عرض البروفايل</h3>
          <p className="text-gray-500 text-sm">تعديل بياناتك الشخصية، الاسم، الصورة، ومعلومات التواصل.</p>
        </button>

        {/* زر الأدمن - يظهر فقط للأدمن */}
        {role === 'admin' ? (
          <button 
            onClick={() => router.push('/usersTable')}
            className="group p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">إدارة المستخدمين</h3>
            <p className="text-gray-500 text-sm">عرض كافة المسجلين في النظام والتحكم في صلاحياتهم.</p>
          </button>
        ) : (
          /* زر إضافي لليوزر العادي - مثلاً تواصل مع الإدارة */
          <button 
            className="group p-8 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
              💬
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">الدعم الفني</h3>
            <p className="text-gray-500 text-sm">هل لديك استفسار؟ تواصل مع إدارة النظام مباشرة.</p>
          </button>
        )}

      </div>

      {/* لمسة جمالية سفلية */}
      <div className="mt-16 text-gray-400 text-sm italic">
        نظام إدارة المستخدمين v1.0
      </div>
    </div>
  );
};

export default HomePage;