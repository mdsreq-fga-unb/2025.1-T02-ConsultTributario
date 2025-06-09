'use client';

import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

import { createDiagnosis } from '@/api/diagnoses';
import { useGetQuestions } from '@/api/question';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { IQuestion } from '@/types/question';

type Resposta = 'sim' | 'nao' | 'nao_sei';

interface RespostasDiagnostico {
  [perguntaId: string]: Resposta;
}

const NovoDiagnostico = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { questions: perguntas, questionsLoading } = useGetQuestions();
  const [respostas, setRespostas] = useState<RespostasDiagnostico>({});
  const [clientName, setClientName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [historicoPerguntas, setHistoricoPerguntas] = useState<IQuestion[][]>([]);

  // Calcula as páginas dinamicamente baseado nas dependências
  const paginas = useMemo(() => {
    // Função para verificar se uma pergunta deve ser visível baseada nas suas dependências
    const perguntaDeveSerVisivel = (pergunta: IQuestion): boolean => {
      // Se a pergunta não está ativa, não mostra
      if (!pergunta.isActive) return false;

      // Se a pergunta não tem perguntas relacionadas, mostra
      if (pergunta.relatedQuestions.length === 0) return true;

      // Verifica se todas as perguntas relacionadas foram respondidas com "sim" ou "não sei"
      return pergunta.relatedQuestions.every(relacionada => {
        const resposta = respostas[relacionada._id];
        return resposta === 'sim' || resposta === 'nao_sei';
      });
    };
    const todasPerguntasVisiveis = perguntas.filter(perguntaDeveSerVisivel);

    if (todasPerguntasVisiveis.length === 0) return [];

    const paginasCalculadas: IQuestion[][] = [];
    const perguntasProcessadas = new Set<string>();

    // Primeira página: perguntas sem dependências
    const primeiraPagina = todasPerguntasVisiveis.filter(p => p.relatedQuestions.length === 0);

    if (primeiraPagina.length > 0) {
      paginasCalculadas.push(primeiraPagina);
      primeiraPagina.forEach(p => perguntasProcessadas.add(p._id));
    }

    // Páginas seguintes: perguntas que se tornaram visíveis
    let perguntasRestantes = todasPerguntasVisiveis.filter(p => !perguntasProcessadas.has(p._id));

    while (perguntasRestantes.length > 0) {
      const proximaPagina = perguntasRestantes.filter(pergunta => {
        // Verifica se todas as dependências já foram processadas
        return pergunta.relatedQuestions.every(dep => {
          return (
            perguntasProcessadas.has(dep._id) &&
            (respostas[dep._id] === 'sim' || respostas[dep._id] === 'nao_sei')
          );
        });
      });

      if (proximaPagina.length === 0) break; // Evita loop infinito

      paginasCalculadas.push(proximaPagina);
      proximaPagina.forEach(p => perguntasProcessadas.add(p._id));

      perguntasRestantes = perguntasRestantes.filter(p => !perguntasProcessadas.has(p._id));
    }

    return paginasCalculadas;
  }, [perguntas, respostas]);

  // Atualiza o histórico de perguntas quando as páginas mudam
  useEffect(() => {
    if (paginas.length > historicoPerguntas.length) {
      setHistoricoPerguntas(paginas);
    }
  }, [paginas, historicoPerguntas.length]);

  // Perguntas da página atual
  const perguntasPaginaAtual = useMemo(() => {
    return historicoPerguntas[paginaAtual] || [];
  }, [historicoPerguntas, paginaAtual]);

  // Verifica se pode ir para próxima página
  const podeIrProximaPagina = useMemo(() => {
    // Todas as perguntas da página atual devem estar respondidas
    const todasRespondidas = perguntasPaginaAtual.every(p => respostas[p._id] !== undefined);

    // E deve haver mais páginas disponíveis
    return todasRespondidas && paginaAtual < historicoPerguntas.length - 1;
  }, [perguntasPaginaAtual, respostas, paginaAtual, historicoPerguntas.length]);

  // Verifica se existem mais perguntas que podem aparecer
  const existemMaisPerguntasPotenciais = useMemo(() => {
    if (!podeIrProximaPagina) {
      // Verifica se há perguntas que ainda podem ser desbloqueadas
      const perguntasNaoVisiveis = perguntas.filter(
        p => p.isActive && !historicoPerguntas.flat().some(hp => hp._id === p._id)
      );

      return perguntasNaoVisiveis.some(pergunta => {
        return pergunta.relatedQuestions.every(dep => {
          return respostas[dep._id] === 'sim' || respostas[dep._id] === 'nao_sei';
        });
      });
    }
    return false;
  }, [perguntas, historicoPerguntas, respostas, podeIrProximaPagina]);

  // É a última página se não pode ir para próxima e não existem mais perguntas potenciais
  const isUltimaPagina = !podeIrProximaPagina && !existemMaisPerguntasPotenciais;

  const handleResposta = (perguntaId: string, resposta: Resposta) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: resposta,
    }));
  };

  const proximaPagina = () => {
    if (podeIrProximaPagina) {
      setPaginaAtual(prev => prev + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(prev => prev - 1);
    }
  };

  const voltar = () => {
    router.back();
  };

  const mapearResposta = (resposta: Resposta): 'yes' | 'no' | 'dont_know' => {
    switch (resposta) {
      case 'sim':
        return 'yes';
      case 'nao':
        return 'no';
      case 'nao_sei':
        return 'dont_know';
      default:
        return 'dont_know';
    }
  };

  const enviarDiagnostico = async () => {
    if (!clientName.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, informe o nome do cliente.',
        variant: 'destructive',
      });
      return;
    }

    if (Object.keys(respostas).length === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, responda pelo menos uma pergunta.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const questionResponses = Object.entries(respostas).map(([questionId, resposta]) => ({
        questionId,
        answer: mapearResposta(resposta),
      }));

      const { _id: diagnosisId } = await createDiagnosis({
        clientName: clientName.trim(),
        questionResponses,
      });

      toast({
        title: 'Sucesso',
        description: 'Diagnóstico criado com sucesso!',
      });

      router.push(`/diagnosticos/${diagnosisId}`);
    } catch (error) {
      console.error('Erro ao criar diagnóstico:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao criar diagnóstico. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (questionsLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-gray-500'>Carregando perguntas...</div>
      </div>
    );
  }

  if (historicoPerguntas.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center gap-4 mb-8'>
          <Button variant='ghost' size='icon' onClick={voltar} className='hover:bg-gray-100'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <h1 className='text-3xl font-semibold text-gray-800'>Novo Diagnóstico</h1>
        </div>
        <div className='text-center text-gray-500'>
          Nenhuma pergunta disponível para este diagnóstico.
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center gap-4 mb-8'>
        <Button variant='ghost' size='icon' onClick={voltar} className='hover:bg-gray-100'>
          <ArrowLeft className='h-5 w-5' />
        </Button>
        <h1 className='text-3xl font-semibold text-gray-800'>Novo Diagnóstico</h1>
        <div className='ml-auto text-sm text-gray-500'>
          Página {paginaAtual + 1} de {historicoPerguntas.length}
          {existemMaisPerguntasPotenciais && '+'}
        </div>
      </div>

      <Card>
        <CardHeader>
          <Label className='text-sm text-gray-600 mb-2'>Nome do cliente</Label>
          <Input
            type='text'
            placeholder='Digite o nome do cliente'
            className='w-full mb-4'
            value={clientName}
            onChange={e => setClientName(e.target.value)}
          />
        </CardHeader>
        <CardContent className='space-y-6'>
          {perguntasPaginaAtual.map((pergunta: IQuestion) => (
            <div key={pergunta._id} className='mb-4'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-md font-medium text-gray-800'>{pergunta.label}</span>
                {pergunta.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className='h-4 w-4 text-[#0099ff] cursor-help' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='max-w-xs'>{pergunta.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <RadioGroup
                value={respostas[pergunta._id]}
                onValueChange={(value: Resposta) => handleResposta(pergunta._id, value)}
                className='flex gap-3'
              >
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='sim' id={`${pergunta._id}-sim`} />
                  <Label htmlFor={`${pergunta._id}-sim`}>Sim</Label>
                </div>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='nao_sei' id={`${pergunta._id}-nao_sei`} />
                  <Label htmlFor={`${pergunta._id}-nao_sei`}>Não sei</Label>
                </div>
                <div className='flex items-center space-x-1'>
                  <RadioGroupItem value='nao' id={`${pergunta._id}-nao`} />
                  <Label htmlFor={`${pergunta._id}-nao`}>Não</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </CardContent>

        <div className='m-4 flex justify-between items-center'>
          <div className='flex gap-2'>
            {paginaAtual !== 0 && (
              <Button
                variant='outline'
                onClick={paginaAnterior}
                disabled={paginaAtual === 0}
                className='flex items-center gap-2'
              >
                <ChevronLeft className='h-4 w-4' />
                Anterior
              </Button>
            )}
            {podeIrProximaPagina && (
              <Button
                onClick={proximaPagina}
                className='flex items-center gap-2 bg-[#0099ff] hover:bg-[#0077cc]'
              >
                Próxima
                <ChevronRight className='h-4 w-4' />
              </Button>
            )}
          </div>

          {isUltimaPagina && (
            <Button
              onClick={enviarDiagnostico}
              disabled={
                perguntasPaginaAtual.some(p => !respostas[p._id]) ||
                !clientName.trim() ||
                isSubmitting
              }
              className='bg-green-600 hover:bg-green-700'
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Diagnóstico'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NovoDiagnostico;
