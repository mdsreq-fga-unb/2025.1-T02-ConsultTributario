'use client';

import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { useAuthContext } from '@/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { IRegisterRequest } from '@/types/auth';

// ----------------------------------------------------------------------

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const errors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Nome é obrigatório';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Nome deve ter pelo menos 2 caracteres';
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      errors.password = 'Senha deve ter pelo menos 8 caracteres';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Senha deve conter ao menos: 1 maiúscula, 1 minúscula e 1 número';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirmação de senha é obrigatória';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Muito fraca', color: 'text-red-500' };
      case 2:
        return { text: 'Fraca', color: 'text-orange-500' };
      case 3:
        return { text: 'Média', color: 'text-yellow-500' };
      case 4:
        return { text: 'Forte', color: 'text-blue-500' };
      case 5:
        return { text: 'Muito forte', color: 'text-blue-600' };
      default:
        return { text: '', color: '' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(formData as IRegisterRequest);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Register error:', error);
      setError(error?.message || 'Erro ao criar conta. Tente novamente.');
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

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordStrengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className='flex-1 flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4 min-h-0'>
      <div className='w-full max-w-md'>
        <Card className='shadow-2xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='space-y-1 text-center pb-6'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
              <User className='w-8 h-8 text-white' />
            </div>
            <CardTitle className='text-3xl font-bold text-blue-800'>Criar nova conta</CardTitle>
            <CardDescription className='text-blue-600 text-base'>
              Preencha os dados abaixo para criar sua conta
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
                <Label htmlFor='name' className='text-sm font-semibold text-slate-700'>
                  Nome completo
                </Label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
                  <Input
                    id='name'
                    name='name'
                    type='text'
                    autoComplete='name'
                    placeholder='Seu nome completo'
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-11 h-12 text-base ${
                      fieldErrors.name
                        ? 'border-red-300 focus-visible:ring-red-500 bg-red-50'
                        : 'border-slate-200 focus-visible:ring-blue-500'
                    }`}
                  />
                </div>
                {fieldErrors.name && (
                  <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

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
                    autoComplete='new-password'
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
                {formData.password && (
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <div className='flex-1 bg-slate-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength <= 1
                              ? 'bg-red-500 w-1/5'
                              : passwordStrength === 2
                                ? 'bg-orange-500 w-2/5'
                                : passwordStrength === 3
                                  ? 'bg-yellow-500 w-3/5'
                                  : passwordStrength === 4
                                    ? 'bg-blue-500 w-4/5'
                                    : 'bg-blue-600 w-full'
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${passwordStrengthInfo.color}`}>
                        {passwordStrengthInfo.text}
                      </span>
                    </div>
                  </div>
                )}
                {fieldErrors.password && (
                  <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword' className='text-sm font-semibold text-slate-700'>
                  Confirmar senha
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='••••••••'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-12 text-base ${
                      fieldErrors.confirmPassword
                        ? 'border-red-300 focus-visible:ring-red-500 bg-red-50'
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? 'border-blue-300 focus-visible:ring-blue-500 bg-blue-50'
                          : 'border-slate-200 focus-visible:ring-blue-500'
                    }`}
                  />
                  <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1'>
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <Check className='h-4 w-4 text-blue-500' />
                    )}
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='text-slate-400 hover:text-slate-600 transition-colors p-1'
                    >
                      {showConfirmPassword ? (
                        <EyeOff className='h-5 w-5' />
                      ) : (
                        <Eye className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </div>
                {fieldErrors.confirmPassword && (
                  <p className='text-sm text-red-600 mt-1 flex items-center gap-1'>
                    <AlertCircle className='h-3 w-3' />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className='pt-2'>
                <div className='text-xs text-slate-600 space-y-1'>
                  <p className='font-medium'>Sua senha deve conter:</p>
                  <div className='grid grid-cols-1 gap-1'>
                    <div
                      className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-blue-600' : 'text-slate-500'}`}
                    >
                      {formData.password.length >= 8 ? (
                        <Check className='h-3 w-3' />
                      ) : (
                        <div className='w-3 h-3 rounded-full border border-slate-300' />
                      )}
                      <span>Pelo menos 8 caracteres</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-blue-600' : 'text-slate-500'}`}
                    >
                      {/[A-Z]/.test(formData.password) ? (
                        <Check className='h-3 w-3' />
                      ) : (
                        <div className='w-3 h-3 rounded-full border border-slate-300' />
                      )}
                      <span>Uma letra maiúscula</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${/[a-z]/.test(formData.password) ? 'text-blue-600' : 'text-slate-500'}`}
                    >
                      {/[a-z]/.test(formData.password) ? (
                        <Check className='h-3 w-3' />
                      ) : (
                        <div className='w-3 h-3 rounded-full border border-slate-300' />
                      )}
                      <span>Uma letra minúscula</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${/\d/.test(formData.password) ? 'text-blue-600' : 'text-slate-500'}`}
                    >
                      {/\d/.test(formData.password) ? (
                        <Check className='h-3 w-3' />
                      ) : (
                        <div className='w-3 h-3 rounded-full border border-slate-300' />
                      )}
                      <span>Um número</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 h-12 text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              >
                {loading ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Criando conta...</span>
                  </div>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </form>

            <div className='text-center pt-4'>
              <p className='text-slate-600'>
                Já tem uma conta?{' '}
                <button
                  type='button'
                  onClick={() => router.push('/login')}
                  className='font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors'
                >
                  Faça login
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
