'use client';

import { usePathname } from 'next/navigation';

import Navbar from '@/app/components/Navbar/Navbar';

export const ConditionalNavbar = () => {
  const pathname = usePathname();

  const authRoutes = ['/login', '/register'];

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute) {
    return null;
  }

  return <Navbar />;
};
