'use client';

import { RoleBasedGuard, useAuthContext, useRolePermission } from '@/auth';

// ----------------------------------------------------------------------

const AdminPage = () => {
  const { user } = useAuthContext();
  const { currentRole, isAdmin, canAccessAdmin, canEditUsers } = useRolePermission();

  return (
    <RoleBasedGuard roles={['admin']} hasContent>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <h2 className='text-lg font-medium text-gray-900'>Painel Administrativo</h2>
              <div className='mt-4 space-y-2'>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Email:</span> {user?.email}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Role:</span> {currentRole}
                </p>
                <div className='mt-4'>
                  <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                    Acesso de Administrador
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <h2 className='text-lg font-medium text-gray-900'>Permissões do Usuário</h2>
            <div className='mt-4 space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>É Admin:</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    isAdmin() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isAdmin() ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Pode acessar admin:</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    canAccessAdmin() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {canAccessAdmin() ? 'Sim' : 'Não'}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Pode editar usuários:</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    canEditUsers() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {canEditUsers() ? 'Sim' : 'Não'}
                </span>
              </div>
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
              </div>{' '}
            </div>
          </div>
        </div>
      </div>
    </RoleBasedGuard>
  );
};

export default AdminPage;
