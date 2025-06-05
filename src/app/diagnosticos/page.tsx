import { Plus } from 'lucide-react';
import Link from 'next/link';

import { BibliotecaTeses } from '@/components/teses/biblioteca-teses';
import { Button } from '@/components/ui/button';

const DiagnosticoPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'>Diagnósticos</h1>
        <Link href='/diagnosticos/novo-diagnostico'>
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
            <Plus className='h-5 w-5 mr-2' />
            Novo Diagnóstico
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DiagnosticoPage;
