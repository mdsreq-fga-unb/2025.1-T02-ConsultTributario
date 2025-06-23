'use client';

import { UserRole } from '../../types/auth';
import { useAuthContext } from '../hooks/use-auth-context';

// ----------------------------------------------------------------------

type Props = {
  hasContent?: boolean;
  roles?: UserRole[];
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export const RoleBasedGuard = ({
  hasContent = false,
  roles,
  requiredRole,
  fallback,
  children,
}: Props) => {
  const { user, authenticated } = useAuthContext();

  // Se não está autenticado, não tem acesso
  if (!authenticated || !user) {
    return hasContent ? (
      <div className='flex h-96 flex-col items-center justify-center'>
        <h3 className='text-lg font-semibold text-gray-900'>Acesso Negado</h3>
        <p className='mt-2 text-sm text-gray-600'>
          Você precisa estar logado para acessar esta página.
        </p>
      </div>
    ) : null;
  }

  const currentRole = user.role as UserRole;

  // Verificar se tem permissão baseada em roles múltiplas
  if (roles && !roles.includes(currentRole)) {
    return (
      fallback ||
      (hasContent ? (
        <div className='flex h-96 flex-col items-center justify-center'>
          <h3 className='text-lg font-semibold text-gray-900'>Acesso Negado</h3>
          <p className='mt-2 text-sm text-gray-600'>
            Você não tem permissão para acessar esta página.
          </p>
          <p className='mt-1 text-xs text-gray-500'>Permissão necessária: {roles.join(' ou ')}</p>
        </div>
      ) : null)
    );
  }

  // Verificar se tem permissão baseada em role específica
  if (requiredRole && currentRole !== requiredRole) {
    return (
      fallback ||
      (hasContent ? (
        <div className='flex h-96 flex-col items-center justify-center'>
          <h3 className='text-lg font-semibold text-gray-900'>Acesso Negado</h3>
          <p className='mt-2 text-sm text-gray-600'>
            Você não tem permissão para acessar esta página.
          </p>
          <p className='mt-1 text-xs text-gray-500'>Permissão necessária: {requiredRole}</p>
        </div>
      ) : null)
    );
  }

  return { children };
};
