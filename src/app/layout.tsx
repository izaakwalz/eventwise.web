import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import ContractProvider from '@/hooks/connect-wallet';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'EventWise',
  description: 'Insurance for event planners...'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ContractProvider>
        <body>
          <Nav />
          <main className="container mx-auto w-full max-w-screen-2xl px-4 lg:px-[101px]">
            {children}
          </main>
          <Toaster position="bottom-right" />
          <Footer />
        </body>
      </ContractProvider>
    </html>
  );
}
