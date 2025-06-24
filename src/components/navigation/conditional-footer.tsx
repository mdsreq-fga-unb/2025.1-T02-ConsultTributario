'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/app/components/Footer/Footer';

export const ConditionalFooter = () => {
  const pathname = usePathname();

  const authRoutes = ['/login', '/register'];

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isAuthRoute) {
    return null;
  }

  return <Footer />;
};
