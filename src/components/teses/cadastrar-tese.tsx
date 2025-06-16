'use client';

import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createClaim, useGetClaims } from '@/api/claim';
import { useGetQuestions } from '@/api/question';
import { useGetTaxTypes } from '@/api/taxType';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ICreateClaim } from '@/types/claim';

export const CadastrarTese = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { claims: tesesExistentes } = useGetClaims();
  const { taxTypes, taxTypesLoading } = useGetTaxTypes();

  // Estados do formulário
  const [formData, setFormData] = useState<ICreateClaim>({
    title: '',
    objective: '',
    summary: '',
    recoverable_period: '',
    recoverable_value: '',
    relatedQuestion: null,
    taxType: '',
  });

  // Estados de controle
  const [salvando, setSalvando] = useState(false);
  const { questions: perguntas, questionsLoading: carregandoPerguntas } = useGetQuestions();
  const [erros, setErros] = useState<Record<string, string>>({});
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<{
    _id: string;
    label: string;
  } | null>(null);

  // Função para atualizar campos do formulário
  const atualizarCampo = <T extends keyof ICreateClaim>(
    campo: T,
    valor: ICreateClaim[T] | undefined
  ) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (valor === undefined) {
        delete newData[campo];
      } else {
        newData[campo] = valor;
      }
      return newData;
    });

    // Limpar erro do campo quando o usuário começar a digitar
    if (erros[campo]) {
      setErros(prev => ({
        ...prev,
        [campo]: '',
      }));
    }
  };

  // Validação do formulário
  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!formData.title.trim()) {
      novosErros.title = 'O título é obrigatório';
    } else {
      const tituloExiste = tesesExistentes.some(
        tese => tese.title.toLowerCase().trim() === formData.title.toLowerCase().trim()
      );
      if (tituloExiste) {
        novosErros.title = 'Já existe uma tese com este título';
      }
    }

    if (formData.title.length > 150) {
      novosErros.title = 'O título deve ter no máximo 150 caracteres';
    }

    if (!formData.objective.trim()) {
      novosErros.objective = 'O objetivo é obrigatório';
    }

    if (formData.objective.length > 1000) {
      novosErros.objective = 'O objetivo deve ter no máximo 1000 caracteres';
    }

    if (!formData.summary.trim()) {
      novosErros.summary = 'O resumo é obrigatório';
    }

    if (formData.summary.length > 5000) {
      novosErros.summary = 'O resumo deve ter no máximo 5000 caracteres';
    }

    if (!formData.recoverable_period.trim()) {
      novosErros.recoverable_period = 'O período recuperável é obrigatório';
    }

    if (formData.recoverable_period.length > 1000) {
      novosErros.recoverable_period = 'O período recuperável deve ter no máximo 1000 caracteres';
    }

    if (!formData.recoverable_value.trim()) {
      novosErros.recoverable_value = 'O valor recuperável é obrigatório';
    }

    if (formData.recoverable_value.length > 1000) {
      novosErros.recoverable_value = 'O valor recuperável deve ter no máximo 1000 caracteres';
    }

    if (!formData.taxType.trim()) {
      novosErros.taxType = 'O tipo de imposto é obrigatório';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const salvarTese = async () => {
    if (!validarFormulario()) {
      return;
    }

    try {
      setSalvando(true);
      const dadosParaEnviar = {
        ...formData,
        relatedQuestion: perguntaSelecionada?._id ? perguntaSelecionada._id : null,
      };
      await createClaim(dadosParaEnviar);

      toast({
        variant: 'success',
        title: 'Sucesso',
        description: 'Tese cadastrada com sucesso',
      });

      router.push('/biblioteca-teses');
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : 'Erro ao cadastrar tese';
      toast({
        title: 'Erro',
        description: mensagemErro,
        variant: 'destructive',
      });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='text-gray-600 hover:text-gray-800 hover:bg-gray-100'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Voltar
        </Button>
      </div>

      <Card className='shadow-sm border border-gray-100'>
        <CardHeader className='border-b border-gray-100'>
          <CardTitle className='text-xl font-semibold text-gray-800'>Informações da Tese</CardTitle>
        </CardHeader>

        <CardContent className='p-6'>
          <div className='space-y-6'>
            {/* Título */}
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-gray-700 font-medium'>
                Título <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='title'
                value={formData.title}
                onChange={e => atualizarCampo('title', e.target.value)}
                placeholder='Digite o título da tese'
                className={erros.title ? 'border-red-500' : ''}
                maxLength={150}
              />
              <div className='flex justify-between items-center'>
                {erros.title && <p className='text-sm text-red-500'>{erros.title}</p>}
                <p
                  className={`text-sm ml-auto ${formData.title.length > 150 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {formData.title.length}/150
                </p>
              </div>
            </div>

            {/* Objetivo */}
            <div className='space-y-2'>
              <Label htmlFor='objective' className='text-gray-700 font-medium'>
                Objetivo <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='objective'
                value={formData.objective}
                onChange={e => atualizarCampo('objective', e.target.value)}
                placeholder='Descreva o objetivo da tese'
                className={`resize-none ${erros.objective ? 'border-red-500' : ''}`}
                rows={4}
                maxLength={1000}
              />
              <div className='flex justify-between items-center'>
                {erros.objective && <p className='text-sm text-red-500'>{erros.objective}</p>}
                <p
                  className={`text-sm ml-auto ${formData.objective.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {formData.objective.length}/1000
                </p>
              </div>
            </div>

            {/* Resumo */}
            <div className='space-y-2'>
              <Label htmlFor='summary' className='text-gray-700 font-medium'>
                Resumo <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='summary'
                value={formData.summary}
                onChange={e => atualizarCampo('summary', e.target.value)}
                placeholder='Digite um resumo da tese'
                className={`resize-none ${erros.summary ? 'border-red-500' : ''}`}
                rows={6}
                maxLength={5000}
              />
              <div className='flex justify-between items-center'>
                {erros.summary && <p className='text-sm text-red-500'>{erros.summary}</p>}
                <p
                  className={`text-sm ml-auto ${formData.summary.length > 5000 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {formData.summary.length}/5000
                </p>
              </div>
            </div>

            {/* Período Recuperável e Valor Recuperável */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='recoverable_period' className='text-gray-700 font-medium'>
                  Período Recuperável <span className='text-red-500'>*</span>
                </Label>
                <Textarea
                  id='recoverable_period'
                  value={formData.recoverable_period}
                  onChange={e => atualizarCampo('recoverable_period', e.target.value)}
                  placeholder='Ex: 12 meses, 5 anos'
                  className={`resize-none ${erros.recoverable_period ? 'border-red-500' : ''}`}
                  rows={4}
                  maxLength={1000}
                />
                <div className='flex justify-between items-center'>
                  {erros.recoverable_period && (
                    <p className='text-sm text-red-500'>{erros.recoverable_period}</p>
                  )}
                  <p
                    className={`text-sm ml-auto ${formData.recoverable_period.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {formData.recoverable_period.length}/1000
                  </p>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='recoverable_value' className='text-gray-700 font-medium'>
                  Valor Recuperável <span className='text-red-500'>*</span>
                </Label>
                <Textarea
                  id='recoverable_value'
                  value={formData.recoverable_value}
                  onChange={e => atualizarCampo('recoverable_value', e.target.value)}
                  placeholder='Ex: R$ 10.000,00'
                  className={`resize-none ${erros.recoverable_value ? 'border-red-500' : ''}`}
                  rows={4}
                  maxLength={1000}
                />
                <div className='flex justify-between items-center'>
                  {erros.recoverable_value && (
                    <p className='text-sm text-red-500'>{erros.recoverable_value}</p>
                  )}
                  <p
                    className={`text-sm ml-auto ${formData.recoverable_value.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {formData.recoverable_value.length}/1000
                  </p>
                </div>
              </div>
            </div>

            {/* Tipo de Imposto */}
            <div className='space-y-2'>
              <Label htmlFor='taxType' className='text-gray-700 font-medium'>
                Tipo de Tributo <span className='text-red-500'>*</span>
              </Label>
              <Select
                value={formData.taxType}
                onValueChange={value => atualizarCampo('taxType', value)}
              >
                <SelectTrigger className={`max-w-60 ${erros.taxType ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder='Selecione um tipo de tributo' />
                </SelectTrigger>
                <SelectContent>
                  {taxTypesLoading ? (
                    <SelectItem value='loading' disabled>
                      Carregando tipos de tributos...
                    </SelectItem>
                  ) : taxTypes.length === 0 ? (
                    <SelectItem value='empty' disabled>
                      Nenhum tipo de tributo disponível
                    </SelectItem>
                  ) : (
                    taxTypes.map(taxType => (
                      <SelectItem key={taxType._id} value={taxType._id}>
                        {taxType.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {erros.taxType && <p className='text-sm text-red-500'>{erros.taxType}</p>}
            </div>

            {/* Pergunta Relacionada */}
            <div className='space-y-2'>
              <Label className='text-gray-700 font-medium'>Pergunta Relacionada (opcional)</Label>
              <Select
                value={perguntaSelecionada?._id || 'none'}
                onValueChange={value => {
                  if (value === 'none') {
                    setPerguntaSelecionada(null);
                    return;
                  }
                  const pergunta = perguntas.find(p => p._id === value);
                  if (pergunta) {
                    setPerguntaSelecionada({
                      _id: pergunta._id,
                      label: pergunta.label,
                    });
                  }
                }}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecione uma pergunta relacionada' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='none'>Nenhuma pergunta relacionada</SelectItem>
                  {carregandoPerguntas ? (
                    <SelectItem value='loading' disabled>
                      Carregando perguntas...
                    </SelectItem>
                  ) : perguntas.length === 0 ? (
                    <SelectItem value='empty' disabled>
                      Nenhuma pergunta disponível
                    </SelectItem>
                  ) : (
                    perguntas.map(
                      pergunta =>
                        pergunta.isActive && (
                          <SelectItem key={pergunta._id} value={pergunta._id}>
                            {pergunta.label}
                          </SelectItem>
                        )
                    )
                  )}
                </SelectContent>
              </Select>
              {perguntaSelecionada && (
                <p className='text-sm text-gray-600'>
                  Pergunta selecionada:{' '}
                  <span className='font-medium'>{perguntaSelecionada.label}</span>
                </p>
              )}
            </div>
          </div>

          {/* Botões de ação */}
          <div className='flex gap-4 pt-8 border-t border-gray-100 mt-8'>
            <Button
              variant='outline'
              onClick={() => router.back()}
              className='border-gray-300 text-gray-700 hover:bg-gray-50'
              disabled={salvando}
            >
              Cancelar
            </Button>
            <Button
              onClick={salvarTese}
              className='bg-[#0099ff] hover:bg-[#0077cc] text-white'
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Salvar Tese
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
