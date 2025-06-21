import Link from 'next/link';
import React from 'react';

import { AuthNavigation } from '@/components/navigation/auth-navigation';

const Navbar = () => {
  return (
    <div className='w-full bg-white shadow-md border-b border-black-200'>
      <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <Link href={'/'}>
            <h1 className='text-2xl font-bold text-black-600'>Consult Tributário</h1>
          </Link>
        </div>

        <div className='hidden md:flex space-x-8 text-black'>
          <Link
            href='/funcionalidades'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Funcionalidades
          </Link>
          <Link
            href='/beneficios'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Benefícios
          </Link>
          <Link
            href='/sobre'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Sobre
          </Link>
          <Link
            href='/perguntas'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Perguntas
          </Link>
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
          <Link
            href='/categoria'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Categoria
          </Link>
        </div>

        <AuthNavigation />
      </nav>
    </div>
  );
};

export default Navbar;
