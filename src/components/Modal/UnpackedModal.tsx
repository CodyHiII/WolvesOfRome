'use client';

import { Grid, Box, Modal } from '@mui/material';
import Image from 'next/image';
import bg from '../../../public/base.png';
import ImageWrapper from '../ImageWrapper';
import useIsMobile from '@/helpers/hooks/useIsMobile';

const UnpackedModal = ({
  isOpen,
  onClose,
  cards,
}: {
  isOpen: boolean;
  onClose: any;
  cards: any[];
}) => {
  const isMobile = useIsMobile();

  const titleColor = (type: string) => {
    switch (type) {
      case 'Legendary':
        return 'var(--primary)';
      case 'Rare':
        return '#3354FF';
      case 'Mythical':
        return '#CB38FF';
      default:
        return 'white';
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onClick={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        backgroundImage: `url(${bg?.src})`,
        display: 'flex',
        justifyContent: 'center',
        itemsAlign: 'center',
        overflowY: 'scroll',
        padding: isMobile ? '40px 0' : '0',
      }}
    >
      <Grid
        container
        maxWidth='md'
        justifyContent={'center'}
        alignItems={'center'}
        gap={0}
        spacing={0}
      >
        {cards.map((card, index) => (
          <Grid
            key={index}
            item
            xs={5}
            sm={4}
            md={3}
            sx={{
              textAlign: 'center',
              color: titleColor(card.Tags[0]),
              fontFamily: 'var(--secondary-font)',
            }}
          >
            {card.Tags[0]}
            <Box
              sx={{
                width: '100%',
                height: '300px',
                position: 'relative',
              }}
            >
              <ImageWrapper ItemImageUrl={card.ItemImageUrl} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Modal>
  );
};

export default UnpackedModal;
