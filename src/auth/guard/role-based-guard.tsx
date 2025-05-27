'use client';

import { useAuthContext } from '../hooks/use-auth-context';

// ----------------------------------------------------------------------

type Props = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export const RoleBasedGuard = ({ hasContent = false, roles, children }: Props) => {
  const { user } = useAuthContext();

  const currentRole = user?.role;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole || '')) {
    return hasContent ? (
      <div className='flex h-96 flex-col items-center justify-center'>
        <h3 className='text-lg font-semibold text-gray-900'>Acesso Negado</h3>
        <p className='mt-2 text-sm text-gray-600'>
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    ) : null;
  }

  return children;
};
