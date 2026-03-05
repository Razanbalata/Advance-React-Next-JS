'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '@/src/core/providers/store';
import { useRouter } from 'next/navigation';
import { User, Users, MessageCircle } from 'lucide-react'; // استخدام أيقونات Lucide أجمل من الـ Emoji

const HomePage = () => {
  const user = useSelector((state: RootType) => state.auth.user);
  const role = user?.role || 'user';
  const router = useRouter();
  console.log(user)

  return (
    <div className="p-10 min-h-screen bg-background text-foreground transition-colors duration-300 flex flex-col items-center">
      
      {/* الترحيب */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-text-main mb-2">
          مرحباً بك، <span className="text-brand-blue">{user?.firstName}</span> ✨
        </h1>
        <p className="text-text-muted text-lg">
          أنت الآن في لوحة تحكم <span className="text-brand-green font-bold">{role === 'admin' ? 'الإدارة' : 'المستخدم'}</span>
        </p>
      </div>

      {/* الأزرار الرئيسية (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* زر البروفايل */}
        <button 
          onClick={() => router.push('/profile')}
          className="group p-8 bg-card-bg rounded-3xl shadow-md hover:shadow-xl transition-all border border-card-border flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
            <User size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">عرض البروفايل</h3>
          <p className="text-text-muted text-sm px-4">تعديل بياناتك الشخصية، الاسم، الصورة، ومعلومات التواصل.</p>
        </button>

        {/* زر الأدمن أو الدعم الفني */}
        {role === 'admin' ? (
          <button 
            onClick={() => router.push('/usersTable')}
            className="group p-8 bg-card-bg rounded-3xl shadow-md hover:shadow-xl transition-all border border-card-border flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">إدارة المستخدمين</h3>
            <p className="text-text-muted text-sm px-4">عرض كافة المسجلين في النظام والتحكم في صلاحياتهم.</p>
          </button>
        ) : (
          <button 
            className="group p-8 bg-card-bg rounded-3xl shadow-md hover:shadow-xl transition-all border border-card-border flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">الدعم الفني</h3>
            <p className="text-text-muted text-sm px-4">هل لديك استفسار؟ تواصل مع إدارة النظام مباشرة.</p>
          </button>
        )}

      </div>

      {/* لمسة جمالية سفلية */}
      <div className="mt-16 text-text-muted text-sm italic opacity-70">
        نظام إدارة المستخدمين v1.0
      </div>
    </div>
  );
};

export default HomePage;