import React from 'react'

export default function Beneficios() {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-col max-w-6xl px-4 w-full py-12'>

        <div className='mb-6'>
          <div className='bg-gray-200 inline-block px-4 py-1.5 rounded'>
            <p className='text-sm font-medium'>Sobre</p>
          </div>
        </div>
        
        <div className='flex flex-col mb-8'>
          <h1 className='text-4xl font-bold mb-3'>Sobre o ConsultTributario</h1>
          <div className='max-w-4xl'>
            <p className='text-sm md:text-base mb-6'>
              O ConsultTributario surge como uma alternativa acessível às plataformas consolidadas no mercado, oferecendo maior flexibilidade e personalização a um custo reduzido.
            </p>
            <p className='text-sm md:text-base'>
              Nossa missão é fortalecer a presença digital dos advogados tributaristas e ampliar seu alcance comercial, facilitando a oferta de diagnósticos tributários como porta de entrada para novos atendimentos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}