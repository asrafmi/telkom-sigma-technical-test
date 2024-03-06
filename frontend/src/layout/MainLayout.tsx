'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/navbar';

type MainLayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  if (pathname === '/register' || pathname === '/login') {
    return <body className="h-full">{children}</body>;
  }

  return (
    <body className="h-full">
      <Navbar />
      {children}
    </body>
  );
};

export default MainLayout;
