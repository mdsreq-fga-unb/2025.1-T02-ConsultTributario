'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useGetClaims } from '@/api/claim';
import { ListagemTeses } from '@/components/teses/listagem-teses';
import { Button } from '@/components/ui/button';

const BibliotecaTesesPage = () => {
  const {
    claims: teses,
    claimsLoading: carregando,
    claimsError: erro,
    refreshClaims: carregarDados,
  } = useGetClaims();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'>Biblioteca de Teses</h1>
        <Link href='/biblioteca-teses/cadastrar-nova'>
          <Button className='bg-[#0099ff] hover:bg-[#0077cc] text-white'>
            <Plus className='h-4 w-4 mr-2' />
            Cadastrar Tese
          </Button>
        </Link>
      </div>
      <ListagemTeses
        teses={teses}
        carregando={carregando}
        erro={erro}
        tentarNovamente={carregarDados}
        descricao='Seu catálogo de oportunidades tributárias.'
        mensagemVazia='Nenhuma tese cadastrada.'
        linkEditar={id => `/biblioteca-teses/editar-tese/${id}`}
        mostrarBotoesAcao={true}
      />
    </div>
  );
};

export default BibliotecaTesesPage;
