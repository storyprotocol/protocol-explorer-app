import Layout from '@/components/Navbar/Layout';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WagmiConfigWrapper from '../../providers/WagmiConfig';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Story Protocol Dashboard',
  description: 'Explore, create, and manage your IP.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfigWrapper>
          <Layout>
            <div className="flex flex-row w-full bg-gray-100 min-h-[calc(100vh-64px)]">{children}</div>
            <Toaster />
          </Layout>
        </WagmiConfigWrapper>
      </body>
    </html>
  );
}
