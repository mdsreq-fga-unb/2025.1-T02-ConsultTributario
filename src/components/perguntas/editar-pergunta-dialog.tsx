'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { IQuestion, IQuestionUpdate, IRelatedQuestion } from '@/types/question';

import { Switch } from '../ui/switch';

interface EditarPerguntaDialogProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (pergunta: IQuestionUpdate) => void;
  pergunta: IQuestion;
  perguntas: IQuestion[];
}

export const EditarPerguntaDialog = ({
  aberto,
  onFechar,
  onSalvar,
  pergunta,
  perguntas,
}: EditarPerguntaDialogProps) => {
  const [label, setLabel] = useState(pergunta.label);
  const [tooltip, setTooltip] = useState(pergunta.tooltip || '');
  const [relatedQuestions, setRelatedQuestions] = useState<IRelatedQuestion[]>(
    pergunta.relatedQuestions
  );
  const [isActive, setIsActive] = useState(pergunta.isActive);
  const [erro, setErro] = useState('');

  useEffect(() => {
    setLabel(pergunta.label);
    setTooltip(pergunta.tooltip || '');
    setRelatedQuestions(pergunta.relatedQuestions);
    setIsActive(pergunta.isActive);
  }, [pergunta]);

  const handleSalvar = () => {
    if (!label.trim()) {
      setErro('O campo Pergunta é obrigatório!');
      return;
    }

    if (label.length > 150) {
      setErro('A pergunta deve ter no máximo 150 caracteres!');
      return;
    }

    if (tooltip.length > 500) {
      setErro('A dica de resposta deve ter no máximo 500 caracteres!');
      return;
    }

    const perguntaExistente = perguntas.find(
      pergunta => pergunta.label.toLowerCase().trim() === label.toLowerCase().trim()
    );

    if (perguntaExistente) {
      setErro('Essa pergunta já existe!');
      return;
    }

    onSalvar({
      _id: pergunta._id,
      label,
      tooltip: tooltip || '',
      isActive: isActive,
      relatedQuestions: relatedQuestions.map(q => q._id),
    });

    setErro('');
  };

  const handleFechar = () => {
    setLabel(pergunta.label);
    setTooltip(pergunta.tooltip || '');
    setRelatedQuestions(pergunta.relatedQuestions);
    setErro('');
    onFechar();
  };

  const adicionarPerguntaRelacionada = (id: string) => {
    const perguntaEncontrada = perguntas.find(p => p._id === id);
    if (perguntaEncontrada && !relatedQuestions.some(rq => rq._id === id)) {
      setRelatedQuestions([...relatedQuestions, { _id: id, label: perguntaEncontrada.label }]);
    }
  };

  const removerPerguntaRelacionada = (id: string) => {
    setRelatedQuestions(relatedQuestions.filter(p => p._id !== id));
  };

  return (
    <Dialog open={aberto} onOpenChange={handleFechar}>
      <DialogContent aria-describedby={undefined} className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-gray-800'>Editar Pergunta</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='edit-label' className='text-gray-700'>
              Pergunta <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='edit-label'
              value={label}
              onChange={e => {
                setLabel(e.target.value);
                if (e.target.value.trim()) setErro('');
              }}
              placeholder='Digite a pergunta'
              className={erro ? 'border-red-500' : ''}
              maxLength={150}
            />
            <div className='flex justify-between items-center'>
              {erro && <p className='text-sm text-red-500'>{erro}</p>}
              <p
                className={`text-sm ml-auto ${label.length > 150 ? 'text-red-500' : 'text-gray-500'}`}
              >
                {label.length}/150
              </p>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='edit-tooltip' className='text-gray-700'>
              Dica de resposta (opcional)
            </Label>
            <Textarea
              id='edit-tooltip'
              value={tooltip}
              onChange={e => setTooltip(e.target.value)}
              placeholder='Informações adicionais sobre a pergunta'
              className='resize-none'
              rows={6}
              maxLength={500}
            />
            <p
              className={`text-sm text-right ${tooltip.length > 500 ? 'text-red-500' : 'text-gray-500'}`}
            >
              {tooltip.length}/500
            </p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center'>
              <Label htmlFor='status' className='text-gray-700'>
                Status da Pergunta
              </Label>
              <div className='flex items-center space-x-2 ml-4'>
                <Switch id='status' checked={isActive} onCheckedChange={setIsActive} />
                <span className='text-sm text-gray-600'>{isActive ? 'Ativa' : 'Inativa'}</span>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Label className='text-gray-700'>Perguntas Relacionadas</Label>
            <Select onValueChange={adicionarPerguntaRelacionada} value=''>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Selecione perguntas relacionadas' />
              </SelectTrigger>
              <SelectContent>
                {perguntas.length === 0 ? (
                  <SelectItem value='empty' disabled>
                    Nenhuma pergunta disponível
                  </SelectItem>
                ) : (
                  perguntas
                    .filter(
                      pergunta =>
                        pergunta.isActive && !relatedQuestions.some(rq => rq._id === pergunta._id)
                    )
                    .map(pergunta => (
                      <SelectItem key={pergunta._id} value={pergunta._id}>
                        <div className='flex items-center gap-2'>
                          <span className='text-gray-800'>{pergunta.label}</span>
                        </div>
                      </SelectItem>
                    ))
                )}
              </SelectContent>
            </Select>

            <div className='flex flex-wrap gap-2 mt-2'>
              {relatedQuestions.map(rq => (
                <Badge
                  key={rq._id}
                  variant='secondary'
                  className='flex items-center gap-1 bg-[#e6f5ff] text-[#0077cc] hover:bg-[#cceeff]'
                >
                  {rq.label}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => removerPerguntaRelacionada(rq._id)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={handleFechar}
            className='border-gray-300 text-gray-700 hover:bg-gray-50'
          >
            Cancelar
          </Button>
          <Button onClick={handleSalvar} className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
