'use client';

import { ChevronDown, ChevronUp, Plus, Minus, Edit } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ErrorDisplay, LoadingDisplay } from '@/components/errors';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IClaim } from '@/types/claim';

interface ListagemTesesProps {
  teses: IClaim[];
  carregando?: boolean;
  erro?: any;
  tentarNovamente?: () => void;
  mostrarBotoesAcao?: boolean;
  linkEditar?: (id: string) => string;
  mensagemVazia?: string;
  titulo?: string;
  descricao?: string;
}

export const ListagemTeses = ({
  teses,
  carregando = false,
  erro,
  tentarNovamente,
  mostrarBotoesAcao = false,
  linkEditar = (id: string) => `/biblioteca-teses/editar-tese/${id}`,
  mensagemVazia = 'Nenhuma tese encontrada.',
  titulo,
  descricao,
}: ListagemTesesProps) => {
  const [tesesExpandidas, setTesesExpandidas] = useState<string[]>([]);
  const [detalhesExpandidos, setDetalhesExpandidos] = useState<
    Record<string, Record<string, boolean>>
  >({});

  if (carregando) {
    return <LoadingDisplay mensagem='Carregando teses tributárias...' />;
  }

  if (erro) {
    return (
      <ErrorDisplay erro={erro} titulo='Erro ao carregar teses' tentarNovamente={tentarNovamente} />
    );
  }

  const toggleTese = (id: string) => {
    if (tesesExpandidas.includes(id)) {
      setTesesExpandidas(tesesExpandidas.filter(t => t !== id));
    } else {
      setTesesExpandidas([...tesesExpandidas, id]);
      if (!detalhesExpandidos[id]) {
        setDetalhesExpandidos({
          ...detalhesExpandidos,
          [id]: {
            OBJETIVO: true,
            RESUMO: false,
            'PERÍODO RECUPERÁVEL': false,
            'VALOR RECUPERÁVEL': false,
            'PERGUNTA RELACIONADA': false,
          },
        });
      }
    }
  };

  const toggleDetalhe = (teseId: string, detalhe: string) => {
    setDetalhesExpandidos({
      ...detalhesExpandidos,
      [teseId]: {
        ...detalhesExpandidos[teseId],
        [detalhe]: !detalhesExpandidos[teseId]?.[detalhe],
      },
    });
  };

  return (
    <div className='mx-auto'>
      {titulo && <h1 className='text-3xl font-semibold text-gray-800 mb-4'>{titulo}</h1>}
      {descricao && <p className='text-sm text-gray-600 mb-6'>{descricao}</p>}

      {/* Lista de teses */}
      <div className='space-y-3'>
        {teses.length === 0 ? (
          <div className='p-8 text-center text-gray-500 border rounded-lg'>{mensagemVazia}</div>
        ) : (
          teses.map((tese: IClaim, index: number) => (
            <div
              key={tese._id}
              className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
            >
              {/* Cabeçalho da tese */}
              <div
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${
                  tesesExpandidas.includes(tese._id) ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => toggleTese(tese._id)}
              >
                <div className='flex items-center gap-2'>
                  <span className='text-gray-700 font-medium'>{tese.title}</span>
                  {!tese.relatedQuestion && (
                    <Badge
                      variant='outline'
                      className='bg-yellow-50 text-yellow-700 border-yellow-200'
                    >
                      Sem pergunta relacionada
                    </Badge>
                  )}
                  {tese.relatedQuestion && !tese.relatedQuestion.isActive && (
                    <Badge variant='outline' className='bg-red-50 text-red-700 border-red-200'>
                      Pergunta inativa
                    </Badge>
                  )}
                </div>
                <div className='flex items-center'>
                  {tesesExpandidas.includes(tese._id) ? (
                    <ChevronUp className='h-5 w-5 text-gray-400' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-gray-400' />
                  )}
                </div>
              </div>

              {tesesExpandidas.includes(tese._id) && (
                <div className='p-6 border-t-2 border-gray-200 bg-gray-50 rounded-b-lg animate-in fade-in-0 slide-in-from-top-2 duration-300'>
                  {/* Objetivo */}
                  <div className='mb-4'>
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => toggleDetalhe(tese._id, 'OBJETIVO')}
                    >
                      {detalhesExpandidos[tese._id]?.['OBJETIVO'] ? (
                        <Minus className='h-4 w-4 text-blue-500' />
                      ) : (
                        <Plus className='h-4 w-4 text-blue-500' />
                      )}
                      <h3 className='text-blue-500 font-semibold'>OBJETIVO</h3>
                    </div>
                    {detalhesExpandidos[tese._id]?.['OBJETIVO'] && (
                      <div className='mt-3 pl-6 text-gray-700 animate-in fade-in-0 slide-in-from-top-2 duration-300 whitespace-pre-wrap'>
                        {tese.objective}
                      </div>
                    )}
                  </div>

                  {/* Pergunta relacionada */}
                  <div className='mb-4'>
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => toggleDetalhe(tese._id, 'PERGUNTA RELACIONADA')}
                    >
                      {detalhesExpandidos[tese._id]?.['PERGUNTA RELACIONADA'] ? (
                        <Minus className='h-4 w-4 text-blue-500' />
                      ) : (
                        <Plus className='h-4 w-4 text-blue-500' />
                      )}
                      <h3 className='text-blue-500 font-semibold'>REQUISITO DA TESE</h3>
                    </div>
                    {detalhesExpandidos[tese._id]?.['PERGUNTA RELACIONADA'] && (
                      <div className='mt-3 pl-6 text-gray-700 animate-in fade-in-0 slide-in-from-top-2 duration-300'>
                        {tese.relatedQuestion
                          ? tese.relatedQuestion.label
                          : 'Nenhuma pergunta relacionada'}
                      </div>
                    )}
                  </div>

                  {/* Resumo */}
                  <div className='mb-4'>
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => toggleDetalhe(tese._id, 'RESUMO')}
                    >
                      {detalhesExpandidos[tese._id]?.['RESUMO'] ? (
                        <Minus className='h-4 w-4 text-blue-500' />
                      ) : (
                        <Plus className='h-4 w-4 text-blue-500' />
                      )}
                      <h3 className='text-blue-500 font-semibold'>RESUMO</h3>
                    </div>
                    {detalhesExpandidos[tese._id]?.['RESUMO'] && (
                      <div className='mt-3 pl-6 text-gray-700 animate-in fade-in-0 slide-in-from-top-2 duration-300 whitespace-pre-wrap'>
                        {tese.summary}
                      </div>
                    )}
                  </div>

                  {/* Período recuperável */}
                  <div className='mb-4'>
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => toggleDetalhe(tese._id, 'PERÍODO RECUPERÁVEL')}
                    >
                      {detalhesExpandidos[tese._id]?.['PERÍODO RECUPERÁVEL'] ? (
                        <Minus className='h-4 w-4 text-blue-500' />
                      ) : (
                        <Plus className='h-4 w-4 text-blue-500' />
                      )}
                      <h3 className='text-blue-500 font-semibold'>PERÍODO RECUPERÁVEL</h3>
                    </div>
                    {detalhesExpandidos[tese._id]?.['PERÍODO RECUPERÁVEL'] && (
                      <div className='mt-3 pl-6 text-gray-700 animate-in fade-in-0 slide-in-from-top-2 duration-300 whitespace-pre-wrap'>
                        {tese.recoverable_period}
                      </div>
                    )}
                  </div>

                  {/* Valor recuperável */}
                  <div className='mb-4'>
                    <div
                      className='flex items-center gap-2 cursor-pointer'
                      onClick={() => toggleDetalhe(tese._id, 'VALOR RECUPERÁVEL')}
                    >
                      {detalhesExpandidos[tese._id]?.['VALOR RECUPERÁVEL'] ? (
                        <Minus className='h-4 w-4 text-blue-500' />
                      ) : (
                        <Plus className='h-4 w-4 text-blue-500' />
                      )}
                      <h3 className='text-blue-500 font-semibold'>VALOR RECUPERÁVEL</h3>
                    </div>
                    {detalhesExpandidos[tese._id]?.['VALOR RECUPERÁVEL'] && (
                      <div className='mt-3 pl-6 text-gray-700 animate-in fade-in-0 slide-in-from-top-2 duration-300 whitespace-pre-wrap'>
                        {tese.recoverable_value}
                      </div>
                    )}
                  </div>

                  {/* Botões de ação */}
                  {mostrarBotoesAcao && (
                    <div className='flex gap-2 mt-6 justify-end'>
                      <Link href={linkEditar(tese._id)}>
                        <Button
                          variant='outline'
                          size='sm'
                          className='text-[#0099ff] border-[#0099ff] hover:bg-[#e6f5ff] hover:text-[#0077cc]'
                        >
                          <Edit className='h-4 w-4 mr-1' />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
