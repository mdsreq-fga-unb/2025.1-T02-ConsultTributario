'use client';

import { Edit, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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

interface Categoria {
  id: number;
  name: string;
}

// Mudança 1: Mudou de function declaration para arrow function
const Component = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' },
  ]);
  const [newCategoriaName, setNewCategoriaName] = useState('');
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [editName, setEditName] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddCategoria = () => {
    if (!newCategoriaName.trim()) {
      toast({
        title: 'Error',
        description: 'Category name is required',
        variant: 'destructive',
      });
      return;
    }

    const newCategoria: Categoria = {
      id: Math.max(...categorias.map(c => c.id), 0) + 1,
      name: newCategoriaName.trim(),
    };

    setCategorias([...categorias, newCategoria]);
    setNewCategoriaName('');
    setIsAddDialogOpen(false);
    toast({
      title: 'Success',
      description: 'Category added successfully',
    });
  };

  const handleEditCategoria = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setEditName(categoria.name);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategoria = () => {
    if (!editName.trim()) {
      toast({
        title: 'Error',
        description: 'Category name is required',
        variant: 'destructive',
      });
      return;
    }

    if (!editingCategoria) return;

    setCategorias(
      categorias.map(c => (c.id === editingCategoria.id ? { ...c, name: editName.trim() } : c))
    );
    setIsEditDialogOpen(false);
    setEditingCategoria(null);
    setEditName('');
    toast({
      title: 'Success',
      description: 'Category updated successfully',
    });
  };

  const handleDeleteCategoria = (id: number) => {
    setCategorias(categorias.filter(c => c.id !== id));
    toast({
      title: 'Success',
      description: 'Category deleted successfully',
    });
  };

  return (
    <div className='container mx-auto p-6 max-w-4xl'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-2xl'>Administre Categorias</CardTitle>
              <CardDescription>
                Adicione, edite ou remova categorias se voce precisar.
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className='mr-2 h-4 w-4' />
                  Adicionar Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>Enter the name for the new category.</DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='new-name'>Category Name</Label>
                    <Input
                      id='new-name'
                      value={newCategoriaName}
                      onChange={e => setNewCategoriaName(e.target.value)}
                      placeholder='Enter category name'
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleAddCategoria();
                        }
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategoria}>Add Category</Button>
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
                  <TableHead className='w-[100px]'>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className='text-center py-8 text-muted-foreground'>
                      No categories found. Add your first category to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  categorias.map(categoria => (
                    <TableRow key={categoria.id}>
                      <TableCell className='font-medium'>{categoria.id}</TableCell>
                      <TableCell>{categoria.name}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex justify-end gap-2'>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() => handleEditCategoria(categoria)}
                          >
                            <Edit className='h-4 w-4' />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant='outline' size='sm'>
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {/* Mudança 2: Escapou as aspas usando entidades HTML */}
                                  This action cannot be undone. This will permanently delete the
                                  category &quot;
                                  {categoria.name}&quot;.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCategoria(categoria.id)}
                                  className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category name.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label htmlFor='edit-name'>Category Name</Label>
              <Input
                id='edit-name'
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder='Enter category name'
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleUpdateCategoria();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategoria}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Component;
