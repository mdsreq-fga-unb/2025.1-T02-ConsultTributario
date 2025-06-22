'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useGetDiagnoses } from '@/api/diagnoses';
import { ErrorDisplay, LoadingDisplay } from '@/components/errors';
import { Button } from '@/components/ui/button';
import { IDiagnosis } from '@/types/diagnoses';

const DiagnosticoPage = () => {
  const { diagnoses, diagnosesLoading, diagnosesError, diagnosesEmpty, refreshDiagnoses } =
    useGetDiagnoses();

  if (diagnosesLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'>Diagnósticos</h1>
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white' disabled={true}>
            <Plus className='h-4 w-4 mr-2' />
            Novo Diagnóstico
          </Button>
        </div>
        <LoadingDisplay mensagem='Carregando diagnósticos tributários...' />
      </div>
    );
  }

  if (diagnosesError) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-semibold text-gray-800'>Diagnósticos</h1>
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white' disabled={true}>
            <Plus className='h-4 w-4 mr-2' />
            Novo Diagnóstico
          </Button>
        </div>
        <ErrorDisplay
          erro={diagnosesError}
          titulo='Erro ao carregar diagnósticos'
          tentarNovamente={refreshDiagnoses}
        />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'>Diagnósticos</h1>
        {diagnosesError || diagnosesLoading ? (
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white' disabled={true}>
            <Plus className='h-4 w-4 mr-2' />
            Novo Diagnóstico
          </Button>
        ) : (
          <Link href='/diagnosticos/novo-diagnostico'>
            <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
              <Plus className='h-4 w-4 mr-2' />
              Novo Diagnóstico
            </Button>
          </Link>
        )}
      </div>

      <div className='space-y-4'>
        {diagnosesEmpty ? (
          <div className='p-8 text-center text-gray-500 border rounded-lg'>
            Nenhum diagnóstico cadastrado.
          </div>
        ) : (
          diagnoses.map((diagnosis: IDiagnosis, index: number) => (
            <div key={diagnosis._id} className='mb-4'>
              <Link href={`/diagnosticos/${diagnosis._id}`}>
                <div className='group p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#0099ff] hover:scale-[1.02]'>
                  <div className='flex justify-between items-start'>
                    <h2 className='text-xl font-semibold text-gray-800 group-hover:text-[#0099ff] transition-colors'>
                      {diagnosis.clientName}
                    </h2>
                  </div>
                  {/* <div className='flex justify-between items-center'>
                    <div>
                      <p className='text-gray-600 text-sm mb-1'>
                        Criado em: {new Date(diagnosis.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                      <p className='text-gray-600 text-sm'>
                        Atualizado em: {new Date(diagnosis.updatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className='text-[#0099ff] opacity-0 group-hover:opacity-100 transition-opacity'>
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </div>
                  </div> */}
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiagnosticoPage;
