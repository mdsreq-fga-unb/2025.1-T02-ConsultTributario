'use client';
import { AlertTriangle } from 'lucide-react';

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
import { IQuestion } from '@/types/question';

interface ConfirmarExclusaoDialogProps {
  aberto: boolean;
  onFechar: () => void;
  onConfirmar: () => void;
  pergunta: IQuestion | null;
}

export const ConfirmarExclusaoDialog = ({
  aberto,
  onFechar,
  onConfirmar,
  pergunta,
}: ConfirmarExclusaoDialogProps) => {
  if (!pergunta) return null;

  return (
    <AlertDialog open={aberto} onOpenChange={onFechar}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-center gap-2 text-amber-500 mb-2'>
            <AlertTriangle className='h-5 w-5' />
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
          </div>
          <AlertDialogDescription className='text-gray-600'>
            Você tem certeza que deseja excluir a pergunta{' '}
            <span className='font-medium text-gray-800'>&quot;{pergunta.label}&quot;</span>?
            <br />
            Esta ação não pode ser desfeita. Além disso, essa pergunta será removida de todas as
            teses e questionários respondidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='border-gray-300 text-gray-700 hover:bg-gray-50'>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirmar}
            className='bg-red-500 hover:bg-red-600 text-white'
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
