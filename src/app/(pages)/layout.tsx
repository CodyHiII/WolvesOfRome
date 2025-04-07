import type { Metadata } from 'next';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { barlow, calSans, dmSans, poppins } from '@/fonts';

export const metadata: Metadata = {
  title: 'Wolves of Rome',
  description:
    'Wolves of Rome is a trading card game about building your deck around legendary  commanders and pitting them against other players in epic competitive battles.',
};

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} ${calSans.variable} ${barlow.variable} ${poppins.variable}`}
      style={{ fontFamily: 'var(--primary-font)' }}
    >
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
