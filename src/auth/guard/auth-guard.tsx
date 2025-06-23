'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../hooks/use-auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = () => {
    if (!loading) {
      if (!authenticated) {
        router.replace('/login');
      } else {
        setChecked(true);
      }
    }
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderiza nada (vai redirecionar)
  if (!authenticated) {
    return null;
  }

  // Só renderiza os children se estiver autenticado E verificado
  if (!checked) {
    return null;
  }

  return children;
};
