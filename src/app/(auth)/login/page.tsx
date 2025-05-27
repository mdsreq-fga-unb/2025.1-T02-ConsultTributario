'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthContext } from '@/auth';

// ----------------------------------------------------------------------

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Aqui você pode adicionar tratamento de erro (toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Faça login em sua conta
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4 rounded-md shadow-sm'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='relative block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Senha
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='relative block w-full rounded-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                placeholder='Senha'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50'
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
