'use client';

import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { useAuthContext } from '@/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ----------------------------------------------------------------------

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    // Email validation
    if (!formData.email) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(
        error?.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear general error when user makes changes
    if (error) {
      setError('');
    }
  };

  return (
    <div className='flex-1 flex items-center justify-center p-4 min-h-0'>
      <div className='w-full max-w-md'>
        <Card className='shadow-2xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='space-y-1 text-center pb-8'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
              <Lock className='w-8 h-8 text-white' />
            </div>
            <CardTitle className='text-3xl font-bold text-slate-800'>Bem-vindo de volta</CardTitle>
            <CardDescription className='text-slate-600 text-base'>
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6 px-8 pb-8'>
            {error && (
              <Alert variant='destructive' className='border-red-200 bg-red-50'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription className='text-red-800'>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-semibold text-slate-700'>
                  Email
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='seu@email.com'
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-11 h-12 text-base ${
                      fieldErrors.email
                        ? 'border-red-300 focus-visible:ring-red-500 bg-red-50'
                        : 'border-slate-200 focus-visible:ring-blue-500'
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-semibold text-slate-700'>
                  Senha
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    placeholder='••••••••'
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-12 text-base ${
                      fieldErrors.password
                        ? 'border-red-300 focus-visible:ring-red-500 bg-red-50'
                        : 'border-slate-200 focus-visible:ring-blue-500'
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1'
                  >
                    {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className='flex items-center justify-between pt-2'>
                <label className='flex items-center space-x-2 cursor-pointer group'>
                  <input
                    type='checkbox'
                    className='rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 h-4 w-4'
                  />
                  <span className='text-sm text-slate-600 group-hover:text-slate-800 transition-colors'>
                    Lembrar-me
                  </span>
                </label>
                <a
                  href='/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors'
                >
                  Esqueceu a senha?
                </a>
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 h-12 text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              >
                {loading ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Entrando...</span>
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className='text-center pt-4'>
              <p className='text-slate-600'>
                Não tem uma conta?{' '}
                <a
                  href='/register'
                  className='font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                >
                  Criar conta
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
