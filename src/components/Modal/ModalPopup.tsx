'use client';

import { getModalObject } from '@/store/modal/selectors';
import { setIsOpen, setModalObject } from '@/store/modal/slice';
import { Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/index';
import ItemCard from '../ItemCard';
import { getRarityColor } from '@/helpers/utils/getRarityColor';

const ModalPopup = ({ handleYes }: { handleYes?: any }) => {
  const dispatch = useDispatch();
  const card = useSelector(getModalObject);

  return (
    <Grid
      container
      maxWidth='md'
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 3.5,
        p: 4,
        fontFamily: 'var(--secondary-font)',
      }}
    >
      <Grid item sm={5} xs={12}>
        <ItemCard
          image={card.ItemImageUrl === '' ? './pack.webp' : card.ItemImageUrl}
          title={card.DisplayName}
          description={card.Description ?? ''}
          category={card.Tags?.[0] ?? ''}
          categoryColor={getRarityColor(card.Tags?.[0])}
        />
      </Grid>
      <Grid
        item
        sm={7}
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          color: 'white',
        }}
        px={6}
      >
        <Box sx={{ fontWeight: 400 }}>
          {card?.actionType === 'shop' ? (
            <>Are you sure you want to buy this pack?</>
          ) : (
            <>Are you sure you want to open this pack?</>
          )}
        </Box>
        <Button
          as='button'
          size='md'
          variant='primary'
          fullWidth
          onClick={() => {
            handleYes && handleYes(card);
            dispatch(setIsOpen(false));
            dispatch(setModalObject({}));
          }}
        >
          Yes
        </Button>
        <Button
          as='button'
          size='md'
          variant='danger'
          fullWidth
          onClick={() => {
            dispatch(setIsOpen(false));
            dispatch(setModalObject({}));
          }}
        >
          No
        </Button>
      </Grid>
    </Grid>
  );
};

export default ModalPopup;
