import { IoCheckmarkCircle } from 'react-icons/io5';

import Typography from '@/components/Typography';

const CardPacksCards = () => {
  return (
    <div>
      <Typography
        variant='h3'
        font='ternary'
        fontWeight='bold'
        align='center'
        margin='0 0 40px 0'
      >
        I. CARD PACKS
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        There are 4 different tiers of Card Packs.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Higher tier Packs have increased chances of higher tier Cards.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        The Cards can be minted into NFTs through the Wolves of Rome Hub.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 40px 0'
      >
        Card Packs are limited in volume and only sold for a limited time.
      </Typography>
      <IoCheckmarkCircle
        size='50'
        color='var(--primary)'
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        VOLUME & PRICE OF FIRST EDITION
      </Typography>
      <img
        className='img-fluid w-100'
        src='/cardPacks.png'
        alt='VOLUME & PRICE OF FIRST EDITION IMAGE'
        style={{ marginBottom: '40px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 30px 0'
      >
        CHANCES
      </Typography>
      <img
        className='img-fluid w-100'
        src='/chance.png'
        alt='CHANCES IMAGE'
        style={{ marginBottom: '40px' }}
      />
      <Typography
        variant='h3'
        font='ternary'
        fontWeight='bold'
        align='center'
        margin='0 0 40px 0'
      >
        II. CARDS
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Cards come in different tiers.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Cards have an inherent deflationary mechanic.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 40px 0'
      >
        Wolves of Rome only sells Card Packs, Players sell Card NFTs.
      </Typography>
      <IoCheckmarkCircle
        size='50'
        color='var(--primary)'
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        VOLUME, SCARCITY, DEFLATION OF CARDS
      </Typography>
      <img
        className='img-fluid w-100'
        src='/cardNFT.png'
        alt='VOLUME, SCARCITY, DEFLATION OF CARDS IMAGE'
        style={{ marginBottom: '40px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        CARD MINTING & FORGING
      </Typography>
      <img
        className='img-fluid w-100'
        src='/cardNFT2.png'
        alt='CARD MINTING & FORGING IMAGE'
        style={{ marginBottom: '40px' }}
      />
    </div>
  );
};

export default CardPacksCards;
