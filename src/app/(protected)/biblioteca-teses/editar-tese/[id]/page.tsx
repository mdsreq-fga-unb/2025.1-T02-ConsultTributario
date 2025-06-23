import { EditarTese } from '@/components/teses/editar-tese';

const EditarTesePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold text-center text-gray-800 mb-8'>Editar Tese</h1>
      <EditarTese id={id} />
    </div>
  );
};

export default EditarTesePage;
