'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

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
import { IQuestion, IQuestionCreate } from '@/types/question';

interface CriarPerguntaDialogProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (pergunta: IQuestionCreate) => void;
  perguntas: IQuestion[];
}

export const CriarPerguntaDialog = ({
  aberto,
  onFechar,
  onSalvar,
  perguntas,
}: CriarPerguntaDialogProps) => {
  const [label, setLabel] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [erro, setErro] = useState('');

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
      label,
      tooltip: tooltip || '',
      relatedQuestions,
    } as IQuestionCreate);

    setLabel('');
    setTooltip('');
    setRelatedQuestions([]);
    setErro('');
  };

  const handleFechar = () => {
    setLabel('');
    setTooltip('');
    setRelatedQuestions([]);
    setErro('');
    onFechar();
  };

  const adicionarPerguntaRelacionada = (id: string) => {
    if (!relatedQuestions.includes(id)) {
      setRelatedQuestions([...relatedQuestions, id]);
    }
  };

  const removerPerguntaRelacionada = (id: string) => {
    setRelatedQuestions(relatedQuestions.filter(p => p !== id));
  };

  const getLabelPorId = (id: string) => {
    const pergunta = perguntas.find(p => p._id === id);
    return pergunta ? pergunta.label : '';
  };

  return (
    <Dialog open={aberto} onOpenChange={handleFechar}>
      <DialogContent aria-describedby={undefined} className='sm:max-w-[600px]'>
        <DialogHeader aria-description='Crie uma nova pergunta para o quiz'>
          <DialogTitle className='text-xl font-semibold text-gray-800'>
            Criar Nova Pergunta
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='label' className='text-gray-700'>
              Pergunta <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='label'
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
                {label.length}/150 caracteres
              </p>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='tooltip' className='text-gray-700'>
              Dica de resposta (opcional)
            </Label>
            <Textarea
              id='tooltip'
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
              {tooltip.length}/500 caracteres
            </p>
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
                      pergunta => pergunta.isActive && !relatedQuestions.includes(pergunta._id)
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
              {relatedQuestions.map(id => (
                <Badge
                  key={id}
                  variant='secondary'
                  className='flex items-center gap-1 bg-[#e6f5ff] text-[#0077cc] hover:bg-[#cceeff]'
                >
                  {getLabelPorId(id)}
                  <X
                    className='h-3 w-3 cursor-pointer'
                    onClick={() => removerPerguntaRelacionada(id)}
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
            Criar Pergunta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
