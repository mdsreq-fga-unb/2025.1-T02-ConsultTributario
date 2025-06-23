'use client';

import { UserRole } from '../../types/auth';

import { useAuthContext } from './use-auth-context';

// ----------------------------------------------------------------------

export function useRolePermission() {
  const { user, authenticated } = useAuthContext();

  const currentRole = user?.role as UserRole;

  // Verificar se tem uma role específica
  const hasRole = (role: UserRole): boolean => {
    return authenticated && currentRole === role;
  };

  // Verificar se tem uma das roles permitidas
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return authenticated && roles.includes(currentRole);
  };

  // Verificar se é admin
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  // Verificar se é usuário comum
  const isUser = (): boolean => {
    return hasRole('user');
  };

  // Verificar se pode acessar área administrativa
  const canAccessAdmin = (): boolean => {
    return isAdmin();
  };

  // Verificar se pode editar usuários
  const canEditUsers = (): boolean => {
    return isAdmin();
  };

  return {
    currentRole,
    hasRole,
    hasAnyRole,
    isAdmin,
    isUser,
    canAccessAdmin,
    canEditUsers,
  };
}
