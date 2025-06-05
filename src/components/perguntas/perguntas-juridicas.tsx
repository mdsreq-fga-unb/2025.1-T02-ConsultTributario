'use client';

import { PlusIcon, ChevronDownIcon, ChevronUpIcon, Pencil, Trash2 } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

import { useGetQuestions, createQuestion, updateQuestion, deleteQuestion } from '@/api/question';
import { ConfirmarExclusaoDialog } from '@/components/perguntas/confirmar-exclusao-dialog';
import { CriarPerguntaDialog } from '@/components/perguntas/criar-pergunta-dialog';
import { EditarPerguntaDialog } from '@/components/perguntas/editar-pergunta-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { IQuestion, IQuestionCreate, IQuestionUpdate } from '@/types/question';

export const PerguntasJuridicas = () => {
  // Estado para controlar qual pergunta está expandida
  const [expandida, setExpandida] = useState<string | null>(null);
  const { toast } = useToast();

  // Estados para controlar os diálogos
  const [criarDialogAberto, setCriarDialogAberto] = useState(false);
  const [editarDialogAberto, setEditarDialogAberto] = useState(false);
  const [excluirDialogAberto, setExcluirDialogAberto] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState<IQuestion | null>(null);

  // Hook para buscar perguntas da API
  const { questions: perguntas, questionsLoading, refreshQuestions } = useGetQuestions();

  // Função para alternar a expansão de uma pergunta
  const toggleExpansao = (id: string) => {
    if (expandida === id) {
      setExpandida(null);
    } else {
      setExpandida(id);
    }
  };

  // Função para adicionar uma nova pergunta
  const adicionarPergunta = async (pergunta: IQuestionCreate) => {
    try {
      await createQuestion(pergunta);
      refreshQuestions();
      setCriarDialogAberto(false);
      toast({
        title: 'Sucesso!',
        description: 'Pergunta criada com sucesso.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Erro ao criar pergunta:', error);
      toast({
        title: 'Erro!',
        description: 'Não foi possível criar a pergunta. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  // Função para editar uma pergunta
  const editarPergunta = async (perguntaEditada: IQuestionUpdate) => {
    try {
      const { _id, ...questionData } = perguntaEditada;
      await updateQuestion(_id, questionData);
      refreshQuestions();
      setEditarDialogAberto(false);
      toast({
        title: 'Sucesso!',
        description: 'Pergunta atualizada com sucesso.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Erro ao editar pergunta:', error);
      toast({
        title: 'Erro!',
        description: 'Não foi possível editar a pergunta. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  // Função para excluir uma pergunta
  const excluirPergunta = async () => {
    if (perguntaAtual) {
      try {
        await deleteQuestion(perguntaAtual._id);
        refreshQuestions();
        setExcluirDialogAberto(false);
        toast({
          title: 'Sucesso!',
          description: 'Pergunta excluída com sucesso.',
          variant: 'default',
        });
      } catch (error) {
        console.error('Erro ao excluir pergunta:', error);
        toast({
          title: 'Erro!',
          description: 'Não foi possível excluir a pergunta. Tente novamente.',
          variant: 'destructive',
        });
      }
    }
  };

  if (questionsLoading) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center text-gray-500'>
        Carregando perguntas...
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100'>
      <div className='p-4 border-b border-gray-100 flex justify-between items-center'>
        <h2 className='text-lg font-medium text-gray-800'>Lista de Perguntas</h2>
        <Button
          onClick={() => setCriarDialogAberto(true)}
          className='bg-[#0099ff] hover:bg-[#0077cc] text-white'
        >
          <PlusIcon className='h-4 w-4 mr-2' />
          Criar Pergunta
        </Button>
      </div>

      <div className='divide-y divide-gray-100'>
        {perguntas.length === 0 ? (
          <div className='p-8 text-center text-gray-500'>
            Nenhuma pergunta cadastrada. Clique em &quot;Criar Pergunta&quot; para adicionar.
          </div>
        ) : (
          perguntas.map(pergunta => (
            <div key={pergunta._id} className='transition-all duration-200'>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50
                  ${expandida === pergunta._id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                onClick={() => toggleExpansao(pergunta._id)}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className={`font-medium ${!pergunta.isActive ? 'text-gray-400' : 'text-gray-700'}`}
                  >
                    {pergunta.label}
                  </div>
                  {!pergunta.isActive && (
                    <Badge variant='secondary' className='bg-gray-100 text-gray-500'>
                      Inativa
                    </Badge>
                  )}
                </div>
                <div>
                  {expandida === pergunta._id ? (
                    <ChevronUpIcon className='h-5 w-5 text-gray-400' />
                  ) : (
                    <ChevronDownIcon className='h-5 w-5 text-gray-400' />
                  )}
                </div>
              </div>

              {expandida === pergunta._id && (
                <div className='p-4 bg-gray-50 border-t-2 border-gray-100 animate-in fade-in-0 slide-in-from-top-1 duration-200'>
                  <div className='space-y-3'>
                    {pergunta.tooltip && (
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-start gap-2'>
                          <span className='text-gray-500 font-medium min-w-[120px]'>
                            Dica de resposta:
                          </span>
                          <div className='flex-1 text-gray-700'>
                            <div className='whitespace-pre-wrap break-words'>
                              {pergunta.tooltip.replace(/\\u003c/g, '<').replace(/\\u003e/g, '>')}
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className='h-4 w-4 text-[#0099ff] mt-1 cursor-help' />
                                </TooltipTrigger>
                                <TooltipContent className='max-w-md'>
                                  <p className='whitespace-pre-wrap break-words'>
                                    {pergunta.tooltip
                                      .replace(/\\u003c/g, '<')
                                      .replace(/\\u003e/g, '>')}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='flex items-start gap-2'>
                      <span className='text-gray-500 font-medium min-w-[120px]'>
                        Perguntas relacionadas:
                      </span>
                      <div className='text-gray-700'>
                        {pergunta.relatedQuestions.length > 0 ? (
                          <ul className='list-disc pl-5 space-y-1'>
                            {pergunta.relatedQuestions.map(perguntaRelacionada => (
                              <li key={perguntaRelacionada._id}>{perguntaRelacionada.label}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className='text-gray-500 italic'>Nenhuma pergunta relacionada</span>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-2 pt-3 justify-end'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-[#0099ff] border-[#0099ff] hover:bg-[#e6f5ff] hover:text-[#0077cc]'
                        onClick={e => {
                          e.stopPropagation();
                          setPerguntaAtual(pergunta);
                          setEditarDialogAberto(true);
                        }}
                      >
                        <Pencil className='h-4 w-4 mr-1' />
                        Editar
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600'
                        onClick={e => {
                          e.stopPropagation();
                          setPerguntaAtual(pergunta);
                          setExcluirDialogAberto(true);
                        }}
                      >
                        <Trash2 className='h-4 w-4 mr-1' />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Diálogo para criar pergunta */}
      <CriarPerguntaDialog
        aberto={criarDialogAberto}
        onFechar={() => setCriarDialogAberto(false)}
        onSalvar={adicionarPergunta}
        perguntas={perguntas}
      />

      {/* Diálogo para editar pergunta */}
      {perguntaAtual && (
        <EditarPerguntaDialog
          aberto={editarDialogAberto}
          onFechar={() => setEditarDialogAberto(false)}
          onSalvar={editarPergunta}
          pergunta={perguntaAtual}
          perguntas={perguntas.filter(p => p._id !== perguntaAtual._id)}
        />
      )}

      {/* Diálogo para confirmar exclusão */}
      <ConfirmarExclusaoDialog
        aberto={excluirDialogAberto}
        onFechar={() => setExcluirDialogAberto(false)}
        onConfirmar={excluirPergunta}
        pergunta={perguntaAtual}
      />
    </div>
  );
};
