'use client';

import { Grid, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import Button from '../Button/index';
import pack from '../../../public/pack.webp';
import { setIsOpen, setModalObject } from '@/store/modal/slice';
import { envCurrency } from '@/helpers/utils/getEnvCurrency';

const ShopCard = ({
  card,
}: {
  card: {
    displayName: string;
    imageUrl: string;
    virtualCurrencyPrices: { GT?: string; GM?: string };
    description?: string;
    itemClass?: string;
    itemId?: string;
  };
}) => {
  const dispatch = useDispatch();
  const {
    displayName,
    imageUrl,
    virtualCurrencyPrices,
    description,
    itemClass,
    itemId,
  } = card;

  return (
    <Grid container py={{ xs: 4, sm: 10 }} px={{ xs: 3 }}>
      <Grid xs={12} sm={6} item pr={{ xs: 0, sm: 6 }}>
        <Box
          sx={{
            width: '100%',
            height: { xs: 200, sm: '100%' },
            position: 'relative',
          }}
        >
          <Image
            src={imageUrl ?? pack.src}
            alt='test'
            layout='fill'
            objectFit='contain'
            style={{
              borderRadius: 10,
              maxHeight: 380,
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} sm={6} item pb={1}>
        <Typography
          sx={{
            color: 'var(--primary)',
            fontSize: 14,
            fontFamily: 'var(--secondary-font)',
            fontWeight: 700,
          }}
          mb={1.5}
          mt={{ xs: 1, sm: 0 }}
        >
          Wolves of Rome
        </Typography>
        <Typography sx={{ fontSize: 36, fontWeight: 600 }} mb={1.5}>
          {displayName}
        </Typography>
        <Typography
          sx={{
            color: 'var(--primary)',
            fontSize: 14,
            fontFamily: 'var(--secondary-font)',
          }}
          mb={4}
        >
          {itemClass}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            fontFamily: 'var(--secondary-font)',
          }}
          color='var(--text-color-active)'
          mb={8}
        >
          {description}
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            gap: 1.5,
            backgroundColor: 'var(--normal)',
            border: '1px solid var(--gray-one)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          }}
          px={4}
          py={3}
        >
          <Typography
            sx={{ fontFamily: 'var(--secondary-font)', fontWeight: 700 }}
          >
            {virtualCurrencyPrices[envCurrency]} Glorium
          </Typography>
          <Button
            as='button'
            size='md'
            variant='primary'
            fullWidth
            onClick={() => {
              dispatch(
                setModalObject({
                  ItemClass: 'Pack',
                  DisplayName: displayName,
                  CatalogVersion: 'test',
                  ItemImageUrl: imageUrl ?? pack.src,
                  actionType: 'shop',
                  ItemId: itemId,
                  Price: virtualCurrencyPrices[envCurrency] ?? 0,
                })
              );
              dispatch(setIsOpen(true));
            }}
          >
            Buy
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShopCard;
