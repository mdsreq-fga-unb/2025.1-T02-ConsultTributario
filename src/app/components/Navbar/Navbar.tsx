'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { useAuthContext, useRolePermission } from '@/auth';
import { AuthNavigation } from '@/components/navigation/auth-navigation';

const Navbar = () => {
  const { authenticated, loading } = useAuthContext();
  const { isAdmin } = useRolePermission();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Se ainda está carregando, pode mostrar uma navbar básica ou um skeleton
  if (loading) {
    return (
      <div className='w-full bg-white shadow-md border-b border-black-200'>
        <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-black-600'>Consult Tributário</h1>
          </div>
          <div className='hidden md:flex space-x-8'>{/* Loading state */}</div>
        </nav>
      </div>
    );
  }

  return (
    <div className='w-full bg-white shadow-md border-b border-black-200'>
      <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-bold text-black-600'>Consult Tributário</h1>
        </div>

        <div className='hidden md:flex space-x-8 text-black'>
          {/* Links disponíveis para usuários autenticados */}
          {authenticated && (
            <>
              {isAdmin() && (
                <div className='space-x-8'>
                  <Link
                    href='/perguntas'
                    className='text-lg text-black font-medium hover:text-black-600 transition-colors'
                  >
                    Perguntas
                  </Link>
                  <Link
                    href='/categoria'
                    className='text-lg text-black font-medium hover:text-black-600 transition-colors'
                  >
                    Categorias
                  </Link>
                </div>
              )}
              <Link
                href='/biblioteca-teses'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Biblioteca de teses
              </Link>
              <Link
                href='/diagnosticos'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Diagnósticos
              </Link>
            </>
          )}

          {/* Links públicos (sempre visíveis) */}
          {!authenticated && (
            <>
              {/* <Link
                href='/sobre'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Sobre
              </Link>
              <Link
                href='/beneficios'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Benefícios
              </Link>
              <Link
                href='/funcionalidades'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Funcionalidades
              </Link> */}
              <Link
                href='/login'
                className='text-lg text-black font-medium hover:text-black-600 transition-colors'
              >
                Entrar
              </Link>
            </>
          )}

          <AuthNavigation />
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='text-black hover:text-black-600 focus:outline-none focus:text-black-600'
          >
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-black-200'>
          <div className='container mx-auto px-4 py-4 space-y-4'>
            {authenticated ? (
              <>
                {isAdmin() && (
                  <Link
                    href='/perguntas'
                    className='block text-lg text-black font-medium hover:text-black-600 transition-colors'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Perguntas
                  </Link>
                )}
                <Link
                  href='/biblioteca-teses'
                  className='block text-lg text-black font-medium hover:text-black-600 transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Biblioteca de teses
                </Link>
                <Link
                  href='/diagnosticos'
                  className='block text-lg text-black font-medium hover:text-black-600 transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Diagnósticos
                </Link>
              </>
            ) : (
              <Link
                href='/login'
                className='block text-lg text-black font-medium hover:text-black-600 transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
            <div className='pt-4 border-t border-black-200'>
              <AuthNavigation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
