import Image from 'next/image';

const Home = () => {
  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-gray-100'>
      <section className='py-20 px-4 md:px-6 max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center gap-12'>
          <div className='md:w-1/2 space-y-6'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900'>
              Simplifique sua consultoria tributária
            </h1>
            <p className='text-lg text-gray-600'>
              Identifique oportunidades de recuperação tributária com eficiência e precisão. Uma
              alternativa acessível e personalizável para advogados tributaristas.
            </p>
            <div className='flex gap-4'>
              <button className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors'>
                Comece Agora
              </button>
              <button className='px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors'>
                Saiba Mais
              </button>
            </div>
          </div>
          <div className='md:w-1/2'>
            <Image
              src='/image.png'
              alt='Consultoria Tributária'
              width={1000}
              height={850}
              className='rounded-xl shadow-2xl'
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
