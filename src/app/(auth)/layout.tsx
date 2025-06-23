'use client';

import type React from 'react';

import { GuestGuard } from '@/auth';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <GuestGuard>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
          <div className='absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
        </div>

        <div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25'></div>

        <div className='relative z-10 flex flex-col min-h-screen'>{children}</div>
      </div>
    </GuestGuard>
  );
};

export default AuthLayout;
