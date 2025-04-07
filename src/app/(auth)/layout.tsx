import type { Metadata } from 'next';

import { calSans, dmSans } from '@/fonts';

export const metadata: Metadata = {
  title: 'Wolves of Rome',
  description:
    'Wolves of Rome is a trading card game about building your deck around legendary  commanders and pitting them against other players in epic competitive battles.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} ${calSans.variable}`}
      style={{ fontFamily: 'var(--primary-font)' }}
    >
      {children}
    </div>
  );
}
