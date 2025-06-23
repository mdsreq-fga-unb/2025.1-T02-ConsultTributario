'use client';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useGetClaims } from '@/api/claim';
import { useRolePermission } from '@/auth/hooks/use-role-permission';
import { ListagemTeses } from '@/components/teses/listagem-teses-categorizada';
import { Button } from '@/components/ui/button';

const BibliotecaTesesPage = () => {
  const {
    claims: teses,
    claimsLoading: carregando,
    claimsError: erro,
    refreshClaims: carregarDados,
  } = useGetClaims();

  const { isAdmin } = useRolePermission();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'>Biblioteca de Teses</h1>{' '}
        {isAdmin() &&
          (erro || carregando ? (
            <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white' disabled={true}>
              <Plus className='h-4 w-4 mr-2' />
              Cadastrar Tese
            </Button>
          ) : (
            <Link href='/biblioteca-teses/cadastrar-nova'>
              <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
                <Plus className='h-4 w-4 mr-2' />
                Cadastrar Tese
              </Button>
            </Link>
          ))}
      </div>
      <ListagemTeses
        teses={teses}
        carregando={carregando}
        erro={erro}
        tentarNovamente={carregarDados}
        descricao='Seu catálogo de oportunidades tributárias.'
        mensagemVazia='Nenhuma tese cadastrada.'
        linkEditar={id => `/biblioteca-teses/editar-tese/${id}`}
        mostrarBotoesAcao={isAdmin()}
      />
    </div>
  );
};

export default BibliotecaTesesPage;
