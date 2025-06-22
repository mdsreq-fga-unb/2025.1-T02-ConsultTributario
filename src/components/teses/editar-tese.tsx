'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useGetClaims, updateClaim } from '@/api/claim';
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
import { IClaim, ICreateClaim } from '@/types/claim';

export const EditarTese = ({ id }: { id: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { claims: teses, claimsLoading } = useGetClaims();
  const { questions: perguntas, questionsLoading: carregandoPerguntas } = useGetQuestions();
  const [formData, setFormData] = useState<ICreateClaim | null>(null);
  const [perguntaSelecionada, setPerguntaSelecionada] = useState<{
    _id: string;
    label: string;
  } | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});
  const { taxTypes, taxTypesLoading } = useGetTaxTypes();

  useEffect(() => {
    if (!claimsLoading && !taxTypesLoading) {
      const tese = teses.find((t: IClaim) => t._id === id);
      if (tese) {
        const taxTypeId = taxTypes.find(taxType => taxType.name === tese.taxType.name)?._id || '';

        setFormData({
          title: tese.title,
          objective: tese.objective,
          summary: tese.summary,
          recoverable_period: tese.recoverable_period,
          recoverable_value: tese.recoverable_value,
          taxType: taxTypeId,
        });
        if (tese.relatedQuestion) {
          setPerguntaSelecionada({
            _id: tese.relatedQuestion._id,
            label: tese.relatedQuestion.label,
          });
        }
      }
    }
  }, [teses, id, claimsLoading, taxTypes, taxTypesLoading]);

  const atualizarCampo = <T extends keyof ICreateClaim>(
    campo: T,
    valor: ICreateClaim[T] | undefined
  ) => {
    setFormData(prev => {
      if (!prev) return prev;
      const newData = { ...prev };
      if (valor === undefined) {
        delete newData[campo];
      } else {
        newData[campo] = valor;
      }
      return newData;
    });
    if (erros[campo]) {
      setErros(prev => ({ ...prev, [campo]: '' }));
    }
  };

  const validarFormulario = (): boolean => {
    if (!formData) return false;
    const novosErros: Record<string, string> = {};
    if (!formData.title.trim()) novosErros.title = 'O título é obrigatório';
    if (!formData.objective.trim()) novosErros.objective = 'O objetivo é obrigatório';
    if (!formData.summary.trim()) novosErros.summary = 'O resumo é obrigatório';
    if (!formData.recoverable_period.trim())
      novosErros.recoverable_period = 'O período recuperável é obrigatório';
    if (!formData.recoverable_value.trim())
      novosErros.recoverable_value = 'O valor recuperável é obrigatório';
    setErros(novosErros);

    if (formData.title.length > 150) {
      novosErros.title = 'O título deve ter no máximo 150 caracteres';
    }

    if (formData.objective.length > 1000) {
      novosErros.objective = 'O objetivo deve ter no máximo 1000 caracteres';
    }

    if (formData.summary.length > 5000) {
      novosErros.summary = 'O resumo deve ter no máximo 5000 caracteres';
    }

    if (formData.recoverable_period.length > 1000) {
      novosErros.recoverable_period = 'O período recuperável deve ter no máximo 1000 caracteres';
    }

    if (formData.recoverable_value.length > 1000) {
      novosErros.recoverable_value = 'O valor recuperável deve ter no máximo 1000 caracteres';
    }

    if (!formData.taxType.trim()) {
      novosErros.taxType = 'O tipo de imposto é obrigatório';
    }

    return Object.keys(novosErros).length === 0;
  };

  const salvarTese = async () => {
    if (!validarFormulario() || !formData) return;
    try {
      setSalvando(true);
      const dadosParaEnviar = {
        ...formData,
        relatedQuestion: perguntaSelecionada ? perguntaSelecionada._id : null,
      };
      await updateClaim(id, dadosParaEnviar);
      toast({ variant: 'success', title: 'Sucesso', description: 'Tese atualizada com sucesso' });
      router.push('/biblioteca-teses');
    } catch (error) {
      const mensagemErro = error instanceof Error ? error.message : 'Erro ao atualizar tese';
      toast({ title: 'Erro', description: mensagemErro, variant: 'destructive' });
    } finally {
      setSalvando(false);
    }
  };

  if (claimsLoading || taxTypesLoading || !formData) {
    return (
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-md border border-gray-200 p-8 text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-500'>Carregando dados...</p>
        </div>
      </div>
    );
  }

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
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-gray-700 font-medium'>
                Título <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='title'
                value={formData.title}
                onChange={e => atualizarCampo('title', e.target.value)}
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
            <div className='space-y-2'>
              <Label htmlFor='objective' className='text-gray-700 font-medium'>
                Objetivo <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='objective'
                value={formData.objective}
                onChange={e => atualizarCampo('objective', e.target.value)}
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
            <div className='space-y-2'>
              <Label htmlFor='summary' className='text-gray-700 font-medium'>
                Resumo <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='summary'
                value={formData.summary}
                onChange={e => atualizarCampo('summary', e.target.value)}
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='recoverable_period' className='text-gray-700 font-medium'>
                  Período Recuperável <span className='text-red-500'>*</span>
                </Label>
                <Textarea
                  id='recoverable_period'
                  value={formData.recoverable_period}
                  onChange={e => atualizarCampo('recoverable_period', e.target.value)}
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
                  if (pergunta)
                    setPerguntaSelecionada({ _id: pergunta._id, label: pergunta.label });
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
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
