import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function page() {
  return (
    <div className="max-w-2xl mx-auto my-10 p-6 border border-gray-200 rounded-xl">
        <div className='flex flex-col gap-4'>
          <h1 className="text-xl font-bold">
            Criar Perguntas 
          </h1>
          <div className='flex flex-col gap-2'>
            <p>Descrição</p>
            <input 
              type="text" 
              className='bg-gray-200 rounded-xl p-2 border border-gray-300' 
            />
          </div>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-1 self-end'>
            <Link href="/perguntas" className='text-white hover:text-white no-underline'>
              Salvar
            </Link>
          </Button>
        </div>
    </div>
  )
}