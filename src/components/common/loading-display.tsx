'use client';

interface LoadingDisplayProps {
  mensagem?: string;
  className?: string;
  tamanhoMaximo?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';
  tamanhoSpinner?: 'sm' | 'md' | 'lg';
}

export const LoadingDisplay = ({
  mensagem = 'Carregando...',
  className = '',
  tamanhoMaximo = '6xl',
  tamanhoSpinner = 'md',
}: LoadingDisplayProps) => {
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

  const spinnerSizeClass = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`${maxWidthClass[tamanhoMaximo]} mx-auto ${className}`}>
      <div className='bg-white rounded-md border border-gray-200 p-8 text-center'>
        <div
          className={`animate-spin rounded-full ${spinnerSizeClass[tamanhoSpinner]} border-b-2 border-blue-500 mx-auto mb-4`}
        ></div>
        <p className='text-gray-500'>{mensagem}</p>
      </div>
    </div>
  );
};
