import { Inter } from 'next/font/google';
import './globals.css';
import { SWRConfig } from 'swr';

import Footer from '@/app/components/Footer/Footer';
import Navbar from '@/app/components/Navbar/Navbar';
import { AuthProvider } from '@/auth';
import { Toaster } from '@/components/ui/toaster';
import { swrConfig } from '@/utils/axios';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='pt-BR'>
      <SWRConfig value={{ ...swrConfig }}>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <AuthProvider>
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </body>
      </SWRConfig>
    </html>
  );
};

export default RootLayout;
