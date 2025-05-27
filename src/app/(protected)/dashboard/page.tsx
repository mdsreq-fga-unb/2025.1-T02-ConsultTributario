'use client';

import { useAuthContext } from '@/auth';

// ----------------------------------------------------------------------

const DashboardPage = () => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
            <p className='mt-2 text-sm text-gray-600'>Bem-vindo ao seu painel de controle!</p>

            <div className='mt-6'>
              <h2 className='text-lg font-medium text-gray-900'>Informações do Usuário</h2>
              <div className='mt-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Nome:</span> {user?.name}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Email:</span> {user?.email}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Role:</span> {user?.role}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Email Verificado:</span>{' '}
                  {user?.isEmailVerified ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className='mt-6'>
              <button
                type='button'
                onClick={handleLogout}
                className='inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
