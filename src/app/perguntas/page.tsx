'use client';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Perguntas = () => {
  const questions = ['Pergunta 1', 'Pergunta 2', 'Pergunta 3'];

  return (
    <div className='max-w-4xl mx-auto my-10 p-6 border border-gray-200 rounded-xl'>
      <div className='flex justify-between items-center mb-6 border-b pb-2'>
        <h1 className='text-lg font-bold'>Perguntas</h1>
        <Button
          className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-1'
          asChild
        >
          <Link href='/perguntas/adicionar' className='text-white hover:text-white no-underline'>
            <div className='flex items-center gap-1'>
              <Plus className='h-4 w-4' />
              <span>Criar nova Pergunta</span>
            </div>
          </Link>
        </Button>
      </div>
      <div className='space-y-4'>
        {questions.map((question, index) => (
          <div key={index} className='flex items-center justify-between'>
            <div className='flex-grow p-3 border border-gray-200 rounded-xl text-gray-700'>
              {question}
            </div>

            <div className='flex gap-2 ml-4'>
              <Button className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl' size='sm'>
                Editar
              </Button>
              <Button className='bg-red-600 hover:bg-red-700 text-white rounded-xl' size='sm'>
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentName;
