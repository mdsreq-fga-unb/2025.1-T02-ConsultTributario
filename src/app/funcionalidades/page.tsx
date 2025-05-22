import React from 'react'

export default function Funcionalidades() {
  return (
    <div className='w-full -screen flex flex-col items-center'>
      <div className='flex flex-col gap-6 max-w-6xl px-4 w-full py-12'>
        <div className='flex justify-center mb-4'>
          <div className='bg-gray-200 px-4 py-2 rounded-md'>
            <p className='text-sm md:text-base font-medium rounded-3xl'>Funcionalidades</p>
          </div>
        </div>
        
        <div className='flex flex-col items-center text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>Tudo que você precisa</h1>
          <p className='text-lg md:text-xl max-w-4xl'> 
            Nossa plataforma oferece todas as ferramentas necessárias para otimizar seu trabalho de consultoria tributária.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>
              Questionários Personalizáveis
            </h2>
            <p className='text-sm md:text-base text-gray-700'>
              Crie questionários adaptados ao perfil 
              de cada empresa para coleta precisa de 
              informações.
            </p>
          </div>
          
          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>
              Teses Tributárias
            </h2>
            <p className='text-sm md:text-base text-gray-700'>
              Cadastre e associe teses tributárias a critérios específicos para identificação automática.
            </p>
          </div>
          
          <div className='flex flex-col'>
            <h2 className='text-xl md:text-2xl font-semibold mb-2'>
              Relatórios Automáticos
            </h2>
            <p className='text-sm md:text-base text-gray-700'>
              Gere relatórios detalhados com as teses tributárias aplicáveis a cada caso analisado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}