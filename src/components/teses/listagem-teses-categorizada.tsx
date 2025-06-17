'use client';

import { ChevronDown, ChevronUp, Plus, Minus, Edit } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

import { useGetTaxTypes } from '@/api/taxType';
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
  const { taxTypes, taxTypesLoading, taxTypesError } = useGetTaxTypes();
  const [tiposExpandidos, setTiposExpandidos] = useState<string[]>([]);
  const [tesesExpandidas, setTesesExpandidas] = useState<string[]>([]);
  const [detalhesExpandidos, setDetalhesExpandidos] = useState<
    Record<string, Record<string, boolean>>
  >({});

  // Agrupa as teses por tipo de imposto
  const tesesPorTipo = useMemo(() => {
    const grupos: Record<string, IClaim[]> = {};

    teses.forEach(tese => {
      const tipoNome = tese.taxType?.name || 'Sem tipo definido';
      if (!grupos[tipoNome]) {
        grupos[tipoNome] = [];
      }
      grupos[tipoNome].push(tese);
    });

    return grupos;
  }, [teses]);

  if (carregando || taxTypesLoading) {
    return <LoadingDisplay mensagem='Carregando teses tributárias...' />;
  }

  if (erro || taxTypesError) {
    return (
      <ErrorDisplay
        erro={erro || taxTypesError}
        titulo='Erro ao carregar dados'
        tentarNovamente={tentarNovamente}
      />
    );
  }

  const toggleTipo = (tipoNome: string) => {
    if (tiposExpandidos.includes(tipoNome)) {
      setTiposExpandidos(tiposExpandidos.filter(t => t !== tipoNome));
    } else {
      setTiposExpandidos([...tiposExpandidos, tipoNome]);
    }
  };

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

      {/* Lista de tipos de impostos */}
      <div className='space-y-4'>
        {Object.keys(tesesPorTipo).length === 0 ? (
          <div className='p-8 text-center text-gray-500 border rounded-lg'>{mensagemVazia}</div>
        ) : (
          Object.entries(tesesPorTipo).map(([tipoNome, tesesDoTipo]) => (
            <div
              key={tipoNome}
              className='bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'
            >
              {/* Cabeçalho do tipo de imposto */}
              <div
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors duration-200 ${
                  tiposExpandidos.includes(tipoNome) ? 'bg-blue-50' : 'hover:bg-blue-50'
                } border-l-4 border-blue-400`}
                onClick={() => toggleTipo(tipoNome)}
              >
                <div className='flex items-center gap-3'>
                  <h2 className='text-lg font-semibold text-gray-800'>{tipoNome}</h2>
                  <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
                    {tesesDoTipo.length} {tesesDoTipo.length === 1 ? 'tese' : 'teses'}
                  </Badge>
                </div>{' '}
                <div className='flex items-center'>
                  {tiposExpandidos.includes(tipoNome) ? (
                    <ChevronUp className='h-5 w-5 text-blue-600 transition-transform duration-300 ease-in-out' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-blue-600 transition-transform duration-300 ease-in-out' />
                  )}
                </div>
              </div>{' '}
              {/* Lista de teses do tipo */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  tiposExpandidos.includes(tipoNome)
                    ? 'max-h-[3000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
                style={{
                  transitionProperty: 'max-height, opacity, padding',
                  transitionDuration: tiposExpandidos.includes(tipoNome) ? '0.5s' : '0.3s',
                }}
              >
                <div
                  className={`bg-gray-50 ${tiposExpandidos.includes(tipoNome) ? 'p-4' : 'p-0'} transition-all duration-300`}
                >
                  <div className='space-y-3'>
                    {tesesDoTipo.map((tese: IClaim) => (
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
                              <Badge
                                variant='outline'
                                className='bg-red-50 text-red-700 border-red-200'
                              >
                                Pergunta inativa
                              </Badge>
                            )}
                          </div>{' '}
                          <div className='flex items-center'>
                            {tesesExpandidas.includes(tese._id) ? (
                              <ChevronUp className='h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out' />
                            ) : (
                              <ChevronDown className='h-5 w-5 text-gray-400 transition-transform duration-300 ease-in-out' />
                            )}
                          </div>
                        </div>{' '}
                        {tesesExpandidas.includes(tese._id) && (
                          <div
                            className={`border-t-2 border-gray-200 bg-gray-50 rounded-b-lg transition-all duration-400 ease-in-out overflow-hidden ${
                              tesesExpandidas.includes(tese._id)
                                ? 'max-h-[1500px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                            style={{
                              transitionProperty: 'max-height, opacity, padding',
                              transitionDuration: tesesExpandidas.includes(tese._id)
                                ? '0.4s'
                                : '0.2s',
                            }}
                          >
                            <div
                              className={`${tesesExpandidas.includes(tese._id) ? 'p-6' : 'p-0'} transition-all duration-300`}
                            >
                              {/* Objetivo */}
                              <div className='mb-4'>
                                <div
                                  className='flex items-center gap-2 cursor-pointer'
                                  onClick={() => toggleDetalhe(tese._id, 'OBJETIVO')}
                                >
                                  {' '}
                                  {detalhesExpandidos[tese._id]?.['OBJETIVO'] ? (
                                    <Minus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  ) : (
                                    <Plus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  )}
                                  <h3 className='text-blue-500 font-semibold'>OBJETIVO</h3>
                                </div>{' '}
                                {detalhesExpandidos[tese._id]?.['OBJETIVO'] && (
                                  <div className='mt-3 pl-6 text-gray-700 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-1'>
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
                                  {' '}
                                  {detalhesExpandidos[tese._id]?.['PERGUNTA RELACIONADA'] ? (
                                    <Minus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  ) : (
                                    <Plus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  )}
                                  <h3 className='text-blue-500 font-semibold'>REQUISITO DA TESE</h3>
                                </div>{' '}
                                {detalhesExpandidos[tese._id]?.['PERGUNTA RELACIONADA'] && (
                                  <div className='mt-3 pl-6 text-gray-700 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-1'>
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
                                  {' '}
                                  {detalhesExpandidos[tese._id]?.['RESUMO'] ? (
                                    <Minus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  ) : (
                                    <Plus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  )}
                                  <h3 className='text-blue-500 font-semibold'>RESUMO</h3>
                                </div>{' '}
                                {detalhesExpandidos[tese._id]?.['RESUMO'] && (
                                  <div className='mt-3 pl-6 text-gray-700 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-1 whitespace-pre-wrap'>
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
                                  {' '}
                                  {detalhesExpandidos[tese._id]?.['PERÍODO RECUPERÁVEL'] ? (
                                    <Minus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  ) : (
                                    <Plus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  )}
                                  <h3 className='text-blue-500 font-semibold'>
                                    PERÍODO RECUPERÁVEL
                                  </h3>
                                </div>{' '}
                                {detalhesExpandidos[tese._id]?.['PERÍODO RECUPERÁVEL'] && (
                                  <div className='mt-3 pl-6 text-gray-700 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-1 whitespace-pre-wrap'>
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
                                  {' '}
                                  {detalhesExpandidos[tese._id]?.['VALOR RECUPERÁVEL'] ? (
                                    <Minus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  ) : (
                                    <Plus className='h-4 w-4 text-blue-500 transition-transform duration-200 ease-in-out hover:scale-110' />
                                  )}
                                  <h3 className='text-blue-500 font-semibold'>VALOR RECUPERÁVEL</h3>
                                </div>{' '}
                                {detalhesExpandidos[tese._id]?.['VALOR RECUPERÁVEL'] && (
                                  <div className='mt-3 pl-6 text-gray-700 transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-top-1 whitespace-pre-wrap'>
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
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
