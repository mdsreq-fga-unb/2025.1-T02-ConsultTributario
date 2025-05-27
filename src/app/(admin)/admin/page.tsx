'use client';

import { useAuthContext } from '@/auth';

// ----------------------------------------------------------------------

const AdminPage = () => {
  const { user } = useAuthContext();

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h2 className='text-lg font-medium text-gray-900'>Usuário Atual</h2>
            <div className='mt-4 space-y-2'>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Nome:</span> {user?.name}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Role:</span> {user?.role}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-8 bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h2 className='text-lg font-medium text-gray-900'>Funcionalidades Admin</h2>
            <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='font-medium text-gray-900'>Gerenciar Usuários</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  Visualizar, criar, editar e excluir usuários do sistema.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='font-medium text-gray-900'>Configurações</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  Configurar parâmetros gerais do sistema.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='font-medium text-gray-900'>Relatórios</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  Gerar e visualizar relatórios do sistema.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 p-4'>
                <h3 className='font-medium text-gray-900'>Logs</h3>
                <p className='mt-1 text-sm text-gray-600'>
                  Visualizar logs de atividades do sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
