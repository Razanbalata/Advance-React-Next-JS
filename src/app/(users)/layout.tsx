import Header from '@/src/shared/ui/header/Header';
import Sidebar from '@/src/shared/ui/sidebar/Sidebar';
import React from 'react';

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex '>
      <Sidebar/>
       <div className='w-full bg-gray-100'>
        <div className='w-[90%] m-auto'>
          <Header />
          </div>
        {children}
        </div>
    </div>
  );
}

export default layout;
