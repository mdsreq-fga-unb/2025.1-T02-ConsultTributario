import { Plus } from 'lucide-react';
import Link from 'next/link';

import { BibliotecaTeses } from '@/components/teses/biblioteca-teses';
import { Button } from '@/components/ui/button';

const BibliotecaTesesPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'>Biblioteca de Teses</h1>
        <Link href='/biblioteca-teses/cadastrar-nova'>
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
            <Plus className='h-4 w-4 mr-2' />
            Cadastrar Tese
          </Button>
        </Link>
      </div>
      <BibliotecaTeses />
    </div>
  );
};

export default BibliotecaTesesPage;
