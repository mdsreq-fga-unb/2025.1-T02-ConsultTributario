'use client';

import { ArrowLeft, User, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetClaimRecommendations, deleteDiagnosis, useGetDiagnoses } from '@/api/diagnoses';
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
import { useToast } from '@/components/ui/use-toast';

const DiagnosisDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const diagnosisId = params.id as string;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { recommendations, recommendationsLoading, recommendationsError, refreshRecommendations } =
    useGetClaimRecommendations(diagnosisId);

  const { refreshDiagnoses } = useGetDiagnoses();

  const handleDeleteDiagnosis = async () => {
    try {
      setIsDeleting(true);
      await deleteDiagnosis(diagnosisId);

      await refreshDiagnoses();

      toast({
        title: 'Diagnóstico excluído',
        description: 'O diagnóstico foi excluído com sucesso.',
        variant: 'default',
      });

      router.push('/diagnosticos');
    } catch (error) {
      console.error('Erro ao deletar diagnóstico:', error);

      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o diagnóstico. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
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
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-4'>
          <Link href='/diagnosticos'>
            <Button variant='ghost' size='icon' className='hover:bg-gray-100 text-gray-800'>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='text-3xl font-semibold text-gray-800'>Teses Recomendadas</h1>
        </div>
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
      {/* Client Information */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Informações do Diagnóstico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
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
          </div>
        </CardContent>
      </Card>{' '}
      {/* Teses Recomendadas */}
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
      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className='flex items-center gap-2 text-amber-500 mb-2'>
              <AlertTriangle className='h-5 w-5' />
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            </div>{' '}
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
