'use client';

import { Edit, Plus } from 'lucide-react';
import { useState } from 'react';

import { useGetTaxTypes, createTaxType, updateTaxType } from '@/api/taxType';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { ITaxType } from '@/types/taxType';

const Component = () => {
  const { taxTypes, taxTypesLoading, taxTypesError, refreshTaxTypes } = useGetTaxTypes();
  const [newCategoriaName, setNewCategoriaName] = useState('');
  const [editingCategoria, setEditingCategoria] = useState<ITaxType | null>(null);
  const [editName, setEditName] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCategoria = async () => {
    if (!newCategoriaName.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome da categoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createTaxType({ name: newCategoriaName.trim() });
      await refreshTaxTypes();
      setNewCategoriaName('');
      setIsAddDialogOpen(false);
      toast({
        title: 'Sucesso',
        description: 'Categoria criada com sucesso',
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao criar categoria',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCategoria = (categoria: ITaxType) => {
    setEditingCategoria(categoria);
    setEditName(categoria.name);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategoria = async () => {
    if (!editName.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome da categoria é obrigatório',
        variant: 'destructive',
      });
      return;
    }

    if (!editingCategoria) return;

    setIsSubmitting(true);
    try {
      await updateTaxType(editingCategoria._id, { name: editName.trim() });
      await refreshTaxTypes();
      setIsEditDialogOpen(false);
      setEditingCategoria(null);
      setEditName('');
      toast({
        title: 'Sucesso',
        description: 'Categoria atualizada com sucesso',
      });
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar categoria',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (taxTypesLoading) {
    return (
      <div className='container mx-auto p-6 max-w-4xl'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg'>Carregando categorias...</div>
        </div>
      </div>
    );
  }

  if (taxTypesError) {
    return (
      <div className='container mx-auto p-6 max-w-4xl'>
        <div className='flex items-center justify-center h-64'>
          <div className='text-lg text-red-600'>
            Erro ao carregar categorias: {taxTypesError.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl'>Tipos de Impostos</CardTitle>
              <CardDescription>Adicione e edite tipos de impostos.</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={isSubmitting} className='bg-[#0099ff] hover:bg-[#0077cc]'>
                  <Plus className='mr-2 h-4 w-4' />
                  Adicionar Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicione uma nova categoria</DialogTitle>
                  <DialogDescription>Coloque o nome da nova categoria.</DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='new-name'>Nome da Categoria</Label>
                    <Input
                      id='new-name'
                      value={newCategoriaName}
                      onChange={e => setNewCategoriaName(e.target.value)}
                      placeholder='Digite o nome da categoria'
                      disabled={isSubmitting}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !isSubmitting) {
                          handleAddCategoria();
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={() => setIsAddDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleAddCategoria} disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Adicionar'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Atualizado em</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                      Nenhuma categoria encontrada. Adicione sua primeira categoria para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  taxTypes.map((categoria: ITaxType) => (
                    <TableRow key={categoria._id}>
                      <TableCell>{categoria.name}</TableCell>
                      <TableCell>
                        {new Date(categoria.updatedAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleEditCategoria(categoria)}
                          disabled={isSubmitting}
                        >
                          <Edit className='h-4 w-4' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>Atualize o nome da categoria.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-name'>Nome da Categoria</Label>
              <Input
                id='edit-name'
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder='Digite o nome da categoria'
                disabled={isSubmitting}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !isSubmitting) {
                    handleUpdateCategoria();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdateCategoria} disabled={isSubmitting}>
              {isSubmitting ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Component;
