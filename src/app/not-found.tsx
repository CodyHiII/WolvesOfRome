'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import { routes } from '@/routes';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace(routes.shop);
  }, []);

  return (
    <div style={{ fontFamily: 'var(--primary-font)' }}>
      <Loading />
    </div>
  );
}
