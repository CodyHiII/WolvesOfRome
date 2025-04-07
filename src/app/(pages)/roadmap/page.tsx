'use client';
import FullHeightSection from '@/components/FullHeightSection';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import React from 'react';

const Roadmap = () => {
  const isMobile = useIsMobile(1400);

  return (
    <div
      style={{
        maxWidth: '2000px',
        margin: '0 auto',
        paddingTop: isMobile ? '100px' : '0',
        background: 'black',
      }}
    >
      <img className='img-fluid' src='/roadmap1.png' alt='achievements image' />
      <img className='img-fluid' src='/roadmap2.png' alt='roadmap image' />
    </div>
  );
};

export default Roadmap;
