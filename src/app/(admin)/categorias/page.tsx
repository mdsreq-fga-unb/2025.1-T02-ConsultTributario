'use client';

import { Edit, Plus, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';

import { useGetTaxTypes, createTaxType, updateTaxType } from '@/api/taxType';
import { LoadingDisplay } from '@/components/errors';
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
  const [newCategoriaNameError, setNewCategoriaNameError] = useState('');
  const [editNameError, setEditNameError] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>('desc');
  const [sortField, setSortField] = useState<'name' | 'updatedAt' | null>('updatedAt');

  const sortedTaxTypes = useMemo(() => {
    if (!sortOrder || !sortField) return taxTypes;

    return [...taxTypes].sort((a, b) => {
      if (sortField === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else if (sortField === 'updatedAt') {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();

        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      }

      return 0;
    });
  }, [taxTypes, sortOrder, sortField]);

  const handleSortByName = () => {
    if (sortField === 'name' && sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
    setSortField('name');
  };

  const handleSortByDate = () => {
    if (sortField === 'updatedAt' && sortOrder === 'desc') {
      setSortOrder('asc');
    } else {
      setSortOrder('desc');
    }
    setSortField('updatedAt');
  };

  const handleAddCategoria = async () => {
    if (!newCategoriaName.trim()) {
      setNewCategoriaNameError('Nome do imposto é obrigatório');
      return;
    }

    const nameExists = taxTypes.some(
      taxType => taxType.name.toLowerCase() === newCategoriaName.trim().toLowerCase()
    );

    if (nameExists) {
      setNewCategoriaNameError('Já existe um imposto com este nome');
      return;
    }

    setNewCategoriaNameError('');
    setIsSubmitting(true);
    try {
      await createTaxType({ name: newCategoriaName.trim() });
      toast({
        title: 'Sucesso',
        description: 'Imposto criado com sucesso',
        variant: 'success',
      });
      setNewCategoriaName('');
      setNewCategoriaNameError('');
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao criar imposto',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      await refreshTaxTypes();
    }
  };

  const handleEditCategoria = (categoria: ITaxType) => {
    setEditingCategoria(categoria);
    setEditName(categoria.name);
    setEditNameError('');
    setIsEditDialogOpen(true);
  };

  const isNameChanged = editingCategoria && editName.trim() !== editingCategoria.name;

  const handleUpdateCategoria = async () => {
    if (!editName.trim()) {
      setEditNameError('Nome do imposto é obrigatório');
      return;
    }

    const nameExists = taxTypes.some(
      taxType =>
        taxType.name.toLowerCase() === editName.trim().toLowerCase() &&
        taxType._id !== editingCategoria?._id
    );

    if (nameExists) {
      setEditNameError('Já existe um imposto com este nome');
      return;
    }

    if (!editingCategoria) return;

    setEditNameError('');
    setIsSubmitting(true);
    try {
      await updateTaxType(editingCategoria._id, { name: editName.trim() });
      toast({
        title: 'Sucesso',
        description: 'Imposto atualizado com sucesso',
        variant: 'success',
      });
      setEditingCategoria(null);
      setEditName('');
      setEditNameError('');
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao atualizar imposto',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      await refreshTaxTypes();
    }
  };

  if (taxTypesLoading) {
    return (
      <div className='pt-6'>
        <LoadingDisplay mensagem='Carregando categorias...' />
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
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={open => {
                setIsAddDialogOpen(open);
                if (!open) {
                  setNewCategoriaNameError('');
                  setNewCategoriaName('');
                }
              }}
            >
              <DialogTrigger asChild>
                <Button disabled={isSubmitting} className='bg-[#0099ff] hover:bg-[#0077cc]'>
                  <Plus className='h-4 w-4' />
                  Adicionar Imposto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicione um novo imposto</DialogTitle>
                  <DialogDescription>
                    Este imposto será usado para agrupar as teses tributárias.
                  </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-1'>
                  <div className='space-y-2'>
                    <Label htmlFor='new-name'>Nome do Imposto</Label>
                    <Input
                      id='new-name'
                      value={newCategoriaName}
                      onChange={e => {
                        setNewCategoriaName(e.target.value);
                        if (newCategoriaNameError) {
                          setNewCategoriaNameError('');
                        }
                      }}
                      placeholder='Digite o nome do imposto'
                      disabled={isSubmitting}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !isSubmitting) {
                          handleAddCategoria();
                        }
                      }}
                      maxLength={30}
                      className={newCategoriaNameError ? 'border-red-500' : ''}
                    />
                    <div className='flex justify-between items-center'>
                      {newCategoriaNameError && (
                        <p className='text-sm text-red-500'>{newCategoriaNameError}</p>
                      )}
                      <p
                        className={`text-sm ml-auto ${newCategoriaName.length > 30 ? 'text-red-500' : 'text-gray-500'}`}
                      >
                        {newCategoriaName.length}/30
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setNewCategoriaNameError('');
                      setNewCategoriaName('');
                    }}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className='bg-[#0099ff] hover:bg-[#0077cc]'
                    onClick={handleAddCategoria}
                    disabled={isSubmitting}
                  >
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
                  <TableHead>
                    <div
                      className='flex items-center gap-2 cursor-pointer hover:text-blue-600 w-fit'
                      onClick={handleSortByName}
                    >
                      Nome
                      <div className='w-4 h-4 flex items-center justify-center'>
                        {sortField === 'name' && sortOrder === 'asc' && (
                          <ChevronUp className='h-4 w-4' />
                        )}
                        {sortField === 'name' && sortOrder === 'desc' && (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </div>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div
                      className='flex items-center gap-2 cursor-pointer hover:text-blue-600 w-fit'
                      onClick={handleSortByDate}
                    >
                      Atualizado em
                      <div className='w-4 h-4 flex items-center justify-center'>
                        {sortField === 'updatedAt' && sortOrder === 'desc' && (
                          <ChevronDown className='h-4 w-4' />
                        )}
                        {sortField === 'updatedAt' && sortOrder === 'asc' && (
                          <ChevronUp className='h-4 w-4' />
                        )}
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTaxTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                      Nenhuma categoria encontrada. Adicione sua primeira categoria para começar.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedTaxTypes.map((categoria: ITaxType) => (
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
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={open => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditNameError('');
            setEditingCategoria(null);
            setEditName('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Imposto</DialogTitle>
            <DialogDescription>Atualize o nome do imposto.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-name'>Nome do Imposto</Label>
              <Input
                id='edit-name'
                value={editName}
                onChange={e => {
                  setEditName(e.target.value);
                  if (editNameError) {
                    setEditNameError('');
                  }
                }}
                placeholder='Digite o nome do imposto'
                disabled={isSubmitting}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !isSubmitting) {
                    handleUpdateCategoria();
                  }
                }}
                className={editNameError ? 'border-red-500' : ''}
                maxLength={30}
              />
              <div className='flex justify-between items-center'>
                {editNameError && <p className='text-sm text-red-500'>{editNameError}</p>}
                <p
                  className={`text-sm ml-auto ${editName.length > 30 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {editName.length}/30
                </p>
              </div>
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
            <Button
              className='bg-[#0099ff] hover:bg-[#0077cc] text-white'
              onClick={handleUpdateCategoria}
              disabled={isSubmitting || !isNameChanged}
            >
              {isSubmitting ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Component;
