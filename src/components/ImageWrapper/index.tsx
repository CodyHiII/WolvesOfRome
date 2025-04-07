'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material/index';
import Image from 'next/image';

const ImageWrapper = ({ ItemImageUrl }: { ItemImageUrl: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
  }, [ItemImageUrl]);
  return (
    <>
      {!isLoaded && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
          }}
        >
          <CircularProgress color='inherit' />
        </Box>
      )}
      <Image
        src={ItemImageUrl}
        alt='card-image'
        layout='fill'
        objectFit='contain'
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
      />
    </>
  );
};

export default ImageWrapper;
