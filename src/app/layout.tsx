import type { Metadata } from 'next';

import { barlow, calSans, dmSans, poppins } from '@/fonts';
import Providers from './Providers';
import ProtectedRoutes from './ProtectedRoutes';
import ModalX from '@/components/ModalX';

import './globals.css';

export const metadata: Metadata = {
  title: 'Wolves of Rome',
  description:
    'Wolves of Rome is a trading card game about building your deck around legendary  commanders and pitting them against other players in epic competitive battles.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${dmSans.variable} ${calSans.variable} ${barlow.variable} ${poppins.variable}`}
        style={{ fontFamily: 'var(--primary-font)' }}
      >
        <Providers>
          <ProtectedRoutes>
            <ModalX />
            {children}
          </ProtectedRoutes>
        </Providers>
      </body>
    </html>
  );
}
