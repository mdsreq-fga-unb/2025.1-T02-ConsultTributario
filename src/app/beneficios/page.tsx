import React from 'react';

const Funcionalidades = () => {
  return (
    <div className='w-full -screen flex flex-col items-center'>
      <div className='flex flex-col gap-6 max-w-6xl px-4 w-full py-12'>
        <div className='flex justify-center mb-4'>
          <div className='bg-gray-200 px-4 py-2 rounded-md'>
            <p className='text-sm md:text-base font-medium rounded-3xl'>Beneficios</p>
          </div>
        </div>

        <div className='flex flex-col items-center text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>
            Por que escolher o ConsultTributario?
          </h1>
          <p className='text-lg md:text-xl max-w-4xl'>
            Descubra como nossa plataforma pode transformar sua prática tributária.{' '}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>Redução de Custos</h2>
            <p className='text-sm md:text-base text-gray-700'>
              Elimine despesas com mensalidades elevadas de ferramentas de terceiros.
            </p>
          </div>

          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>Solução Personalizada</h2>
            <p className='text-sm md:text-base text-gray-700'>
              Plataforma ajustada às suas necessidades específicas e fluxo de trabalho.
            </p>
          </div>

          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>Vantagem Competitiva</h2>
            <p className='text-sm md:text-base text-gray-700'>
              Destaque-se no mercado com diagnósticos tributários ágeis e eficientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funcionalidades;
