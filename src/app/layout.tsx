import { Inter } from 'next/font/google';
import './globals.css';
import { SWRConfig } from 'swr';

import { AuthProvider } from '@/auth';
import { ConditionalFooter } from '@/components/navigation/conditional-footer';
import { ConditionalNavbar } from '@/components/navigation/conditional-navbar';
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
            <ConditionalNavbar />
            <main className='flex-grow'>{children}</main>
            <ConditionalFooter />
            <Toaster />
          </AuthProvider>
        </body>
      </SWRConfig>
    </html>
  );
};

export default RootLayout;
