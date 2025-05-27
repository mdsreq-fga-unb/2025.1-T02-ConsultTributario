'use client';

import { useGetUsers } from '@/api/user';

// ----------------------------------------------------------------------

const UsersPage = () => {
  const { users, usersLoading, usersError } = useGetUsers();

  if (usersLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div className='rounded-md bg-red-50 p-4'>
            <div className='text-sm text-red-700'>
              Erro ao carregar usuários: {usersError.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='bg-white shadow sm:rounded-lg'>
          <div className='px-4 py-5 sm:p-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-medium text-gray-900'>Gerenciar Usuários</h2>
              <button
                type='button'
                className='inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
              >
                Novo Usuário
              </button>
            </div>

            <div className='mt-6'>
              {users.length === 0 ? (
                <div className='text-center py-12'>
                  <p className='text-sm text-gray-500'>Nenhum usuário encontrado.</p>
                </div>
              ) : (
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                          Nome
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                          Email
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                          Role
                        </th>
                        <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500'>
                          Status
                        </th>
                        <th className='relative px-6 py-3'>
                          <span className='sr-only'>Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                            {user.name}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                            {user.email}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                            <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
                              {user.role}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.isEmailVerified
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {user.isEmailVerified ? 'Verificado' : 'Pendente'}
                            </span>
                          </td>
                          <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                            <button type='button' className='text-blue-600 hover:text-blue-900'>
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
