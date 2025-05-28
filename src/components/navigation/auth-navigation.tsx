'use client';

import Link from 'next/link';

import { useAuthContext } from '@/auth';

// ----------------------------------------------------------------------

export const AuthNavigation = () => {
  const { user, authenticated, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!authenticated) {
    return (
      <div className='flex items-center space-x-4'>
        <Link href='/login' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
          Entrar
        </Link>
        <Link
          href='/register'
          className='inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500'
        >
          Criar conta
        </Link>
      </div>
    );
  }

  return (
    <div className='flex items-center space-x-4'>
      <Link href='/dashboard' className='text-sm font-medium text-gray-700 hover:text-gray-900'>
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
      )}

      <div className='flex items-center space-x-2'>
        <span className='text-sm text-gray-600'>Olá, {user?.name}</span>
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
