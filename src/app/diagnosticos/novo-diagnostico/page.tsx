'use client';

import { ArrowLeft } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

import { useGetQuestions } from '@/api/question';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IQuestion } from '@/types/question';

type Resposta = 'sim' | 'nao' | 'nao_sei';

interface RespostasDiagnostico {
  [perguntaId: string]: Resposta;
}

const NovoDiagnostico = () => {
  const router = useRouter();
  const { questions: perguntas, questionsLoading } = useGetQuestions();
  const [respostas, setRespostas] = useState<RespostasDiagnostico>({});

  // Filtrar apenas perguntas ativas e que atendem aos critérios de perguntas relacionadas
  const perguntasVisiveis = useMemo(() => {
    return perguntas.filter(pergunta => {
      // Se a pergunta não está ativa, não mostra
      if (!pergunta.isActive) return false;

      // Se a pergunta não tem perguntas relacionadas, mostra
      if (pergunta.relatedQuestions.length === 0) return true;

      // Verifica se todas as perguntas relacionadas foram respondidas com "sim" ou "não sei"
      return pergunta.relatedQuestions.every(relacionada => {
        const resposta = respostas[relacionada._id];
        return resposta === 'sim' || resposta === 'nao_sei';
      });
    });
  }, [perguntas, respostas]);

  const handleResposta = (perguntaId: string, resposta: Resposta) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: resposta,
    }));
  };

  const voltar = () => {
    router.back();
  };

  if (questionsLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-gray-500'>Carregando perguntas...</div>
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
      </div>

      <div className='space-y-3'>
        {perguntasVisiveis.map(pergunta => (
          <Card key={pergunta._id}>
            <CardHeader>
              <CardTitle className='text-md font-medium text-gray-800 flex items-center gap-2'>
                {pergunta.label}
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
              </CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NovoDiagnostico;
