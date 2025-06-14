import { PerguntasJuridicas } from '@/components/perguntas/perguntas-juridicas';

const PerguntasPage = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold text-gray-800 mb-8'>Perguntas Jurídicas</h1>
      <PerguntasJuridicas />
    </div>
  );
};

export default PerguntasPage;
