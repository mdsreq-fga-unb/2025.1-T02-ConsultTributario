import { CadastrarTese } from '@/components/teses/cadastrar-tese';

const CadastrarTesePage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold text-center text-gray-800 mb-8'>Cadastrar Nova Tese</h1>
      <CadastrarTese />
    </div>
  );
};

export default CadastrarTesePage;
