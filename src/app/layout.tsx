import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Footer from '@/app/components/Footer/Footer';
import Navbar from '@/app/components/Navbar/Navbar';
import { AuthProvider } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
