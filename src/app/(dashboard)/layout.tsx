import Header from '@/src/shared/ui/header/Header';
import React, { ReactNode } from 'react';

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header/>
        <div>{children}</div>
      
    </div>
  );
}

export default layout;
