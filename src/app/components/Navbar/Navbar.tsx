import Link from 'next/link';
import React from 'react';

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
            href='/funcionalidades/'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Funcionalidades
          </Link>
          <Link
            href='beneficios'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Benefícios
          </Link>
          <Link
            href='sobre'
            className='text-lg text-black font-medium hover:text-black-600 transition-colors'
          >
            Sobre
          </Link>
        </div>

        <div className='flex space-x-4'>
          <button className='px-4 py-2 text-lg text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition-colors'>
            Entrar
          </button>

          <button className='px-4 py-2 text-lg text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors'>
            Registrar
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
