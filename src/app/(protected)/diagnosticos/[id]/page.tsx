'use client';

import { ArrowLeft, User, Trash2, AlertTriangle, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  useGetClaimRecommendations,
  deleteDiagnosis,
  useGetDiagnoses,
  getDiagnosisByCnpj,
} from '@/api/diagnoses';
import { ListagemTeses } from '@/components/teses/listagem-teses';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DiagnosisDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const diagnosisId = params.id as string;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCnpjDialog, setShowCnpjDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [cnpjError, setCnpjError] = useState('');
  const [dadosEmpresa, setDadosEmpresa] = useState<any>(null);

  const { recommendations, recommendationsLoading, recommendationsError, refreshRecommendations } =
    useGetClaimRecommendations(diagnosisId);
  const { refreshDiagnoses } = useGetDiagnoses();

  const handleDeleteDiagnosis = async () => {
    try {
      setIsDeleting(true);
      await deleteDiagnosis(diagnosisId);
      await refreshDiagnoses();
      toast.success('Diagnóstico excluído', {
        description: 'O diagnóstico foi excluído com sucesso.',
      });
      router.push('/diagnosticos');
    } catch (error) {
      console.error('Erro ao deletar diagnóstico:', error);
      toast.error('Erro ao excluir', {
        description: 'Não foi possível excluir o diagnóstico. Tente novamente.',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleCnpjConsultation = async () => {
    setCnpjError('');

    if (!cnpj.trim()) {
      setCnpjError('CNPJ inválido');
      return;
    }

    const cnpjLimpo = cnpj.replace(/\D/g, '');

    if (cnpjLimpo.length !== 14) {
      setCnpjError('CNPJ inválido');
      return;
    }

    try {
      setIsConsulting(true);

      const dadosEmpresa = await getDiagnosisByCnpj(cnpjLimpo);

      setDadosEmpresa(dadosEmpresa);

      toast.success('Consulta realizada com sucesso', {
        description: `Dados da empresa ${dadosEmpresa.razao_social || dadosEmpresa.nome_fantasia || 'encontrada'} foram encontrados.`,
      });

      setShowCnpjDialog(false);
      setCnpj('');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      const statusCode = error.response?.status || 500;

      if (statusCode === 400) {
        toast.error('CNPJ inválido', {
          description: errorMessage,
        });
      } else if (statusCode === 404) {
        toast.error('Empresa não encontrada', {
          description: 'Empresa não encontrada ou sem dados disponíveis',
        });
      } else if (statusCode === 429) {
        toast.error('Muitas requisições', {
          description: 'Limite de consultas atingido. Tente novamente em alguns minutos.',
        });
      } else if (statusCode >= 500) {
        toast.error('Serviço indisponível', {
          description: 'O serviço está temporariamente indisponível. Tente novamente mais tarde.',
        });
      } else {
        toast.error('Erro na consulta', {
          description: errorMessage,
        });
      }
    } finally {
      setIsConsulting(false);
    }
  };

  const formatCnpj = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= 14) {
      return cleanValue
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCnpj(e.target.value);
    setCnpj(formattedValue);
    if (cnpjError) {
      setCnpjError('');
    }
  };

  if (recommendationsLoading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-gray-500'>Carregando diagnóstico...</div>
      </div>
    );
  }

  if (recommendationsError || !recommendations) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center text-red-500'>
          {recommendationsError
            ? 'Erro ao carregar recomendações'
            : 'Recomendações não encontradas'}
        </div>
        <div className='text-center mt-4'>
          <Link href='/diagnosticos'>
            <Button variant='ghost' size='icon' className='hover:bg-gray-100 text-gray-800'>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-4'>
          <Link href='/diagnosticos'>
            <Button variant='ghost' size='icon' className='hover:bg-gray-100 text-gray-800'>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold text-gray-800'>Teses Recomendadas</h1>
        </div>

        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setCnpj('');
              setCnpjError('');
              setShowCnpjDialog(true);
            }}
            className='text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300'
          >
            <Search className='h-4 w-4 mr-2' />
            Buscar mais dados
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() => setShowDeleteDialog(true)}
            className='text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Excluir Diagnóstico
          </Button>
        </div>
      </div>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Informações do Diagnóstico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm font-medium text-gray-600'>Nome do Cliente</label>
              <p className='text-lg font-semibold text-gray-800'>
                {recommendations.diagnosis.clientName}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-600'>Data de Criação</label>
              <p className='text-gray-800'>
                {new Date(recommendations.diagnosis.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            {dadosEmpresa && (
              <>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Razão Social</label>
                  <p className='text-lg font-semibold text-gray-800'>{dadosEmpresa.razao_social}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Nome Fantasia</label>
                  <p className='text-gray-800'>{dadosEmpresa.nome_fantasia || 'Não informado'}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Natureza Jurídica</label>
                  <p className='text-gray-800'>{dadosEmpresa.naturaza_juridica}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Situação Cadastral</label>
                  <p className='text-gray-800'>{dadosEmpresa.situacao_cadastral}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Data de Abertura</label>
                  <p className='text-gray-800'>
                    {new Date(dadosEmpresa.data_abertura).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Localização</label>
                  <p className='text-gray-800'>
                    {dadosEmpresa.municipio} - {dadosEmpresa.uf}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <ListagemTeses
        teses={recommendations?.recommendedClaims || []}
        carregando={recommendationsLoading}
        erro={recommendationsError}
        tentarNovamente={refreshRecommendations}
        linkEditar={id => `/biblioteca-teses/editar-tese/${id}`}
        mensagemVazia='Nenhuma tese recomendada encontrada.'
        titulo='Teses Recomendadas'
        descricao={`Foram encontrada(s) ${recommendations?.recommendedClaims.length || 0} oportunidades(s) para este diagnóstico.`}
      />

      <Dialog open={showCnpjDialog} onOpenChange={setShowCnpjDialog}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Search className='h-5 w-5 text-blue-500' />
              Buscar mais dados
            </DialogTitle>
            <DialogDescription>
              Informe o CNPJ da empresa para buscar informações adicionais que podem gerar novas
              oportunidades.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='cnpj'>Adicione o CNPJ da empresa</Label>
              <Input
                id='cnpj'
                placeholder='00.000.000/0000-00'
                value={cnpj}
                onChange={handleCnpjChange}
                maxLength={18}
                className={`font-mono ${cnpjError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              />
              {cnpjError && <p className='text-sm text-red-600'>{cnpjError}</p>}
            </div>
          </div>

          <DialogFooter className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                setShowCnpjDialog(false);
                setCnpj('');
                setCnpjError('');
              }}
              disabled={isConsulting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCnpjConsultation}
              disabled={isConsulting}
              className='bg-blue-500 hover:bg-blue-600'
            >
              {isConsulting ? 'Consultando...' : 'Consultar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex items-center gap-2 text-amber-500 mb-2'>
              <AlertTriangle className='h-5 w-5' />
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            </div>
            <AlertDialogDescription className='text-gray-600'>
              Você tem certeza que deseja excluir este diagnóstico do cliente{' '}
              <span className='font-medium text-gray-800'>
                &quot;{recommendations?.diagnosis.clientName}&quot;
              </span>
              ?
              <br />
              Esta ação não pode ser desfeita e todas as recomendações associadas serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className='border-gray-300 text-gray-700 hover:bg-gray-50'
              disabled={isDeleting}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDiagnosis}
              className='bg-red-500 hover:bg-red-600 text-white'
              disabled={isDeleting}
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DiagnosisDetailsPage;
