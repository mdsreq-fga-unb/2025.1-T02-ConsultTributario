'use client';

import Link from 'next/link';

import { useAuthContext } from '@/auth';

// ----------------------------------------------------------------------

export const AuthNavigation = () => {
  const { logout, authenticated } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className='flex items-center space-x-4'>
      {/* <Link href='/dashboard' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
        Dashboard
      </Link>

      {(user?.role === 'admin' || user?.role === 'super_admin') && (
        <>
          <Link href='/admin' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
            Admin
          </Link>
          <Link href='/users' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
            Usuários
          </Link>
        </>
      )} */}

      <div className='flex items-center space-x-2'>
        <button
          onClick={handleLogout}
          className='text-sm font-medium text-red-600 hover:text-red-700'
        >
          Sair
        </button>
      </div>
    </div>
  );
};
