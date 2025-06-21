'use client';

import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  erro: any;
  titulo?: string;
  tentarNovamente?: () => void;
  textoBotao?: string;
  className?: string;
  tamanhoMaximo?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
}

export const ErrorDisplay = ({
  erro,
  titulo = 'Erro ao carregar dados',
  tentarNovamente,
  textoBotao = 'Tentar Novamente',
  className = '',
  tamanhoMaximo = '6xl',
}: ErrorDisplayProps) => {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${maxWidthClass[tamanhoMaximo]} mx-auto ${className}`}>
      <div className='bg-white rounded-md border border-gray-200 p-8 text-center'>
        <div className='text-red-500 mb-4'>
          <svg className='h-12 w-12 mx-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-gray-900 mb-2'>{titulo}</h3>
        <p className='text-gray-500 mb-4'>
          {erro?.message || erro?.error || erro || 'Ocorreu um erro inesperado'}
        </p>
        {tentarNovamente && (
          <Button onClick={tentarNovamente} className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
            {textoBotao}
          </Button>
        )}
      </div>
    </div>
  );
};
