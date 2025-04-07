'use client';
import { useMemo, useState } from 'react';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { Container, Row } from 'react-bootstrap';

import CardPacksCards from './tabs/CardPacksCards';
import MembershipNFTs from './tabs/MembershipNFTs';
import Glorium from './tabs/Glorium';

type TabsType = 'cardPackCards' | 'membershipNFTs' | 'glorium';

const Wolfpaper = () => {
  const [activeTab, setActiveTab] = useState('cardPackCards');

  const ActiveContent = useMemo(() => {
    switch (activeTab) {
      case 'cardPackCards':
        return <CardPacksCards />;
      case 'membershipNFTs':
        return <MembershipNFTs />;
      case 'glorium':
        return <Glorium />;
      default:
        return <CardPacksCards />;
    }
  }, [activeTab]);

  const handleTabSelect = (tab: TabsType) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div
        style={{
          padding: '250px 0 50px 0',
          background: 'url(/wolfpaperImg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography
          variant='h2'
          font='ternary'
          fontWeight='black'
          color='var(--primary)'
          align='center'
        >
          WOLFPAPER
        </Typography>
      </div>
      <Container>
        <Row className='align-items-center justify-content-center gap-5 py-5'>
          <Button
            as='button'
            variant={
              activeTab === 'cardPackCards'
                ? 'quaternary'
                : 'quaternary-ternary'
            }
            size='md'
            onClick={() => handleTabSelect('cardPackCards')}
          >
            Card Packs & Cards
          </Button>

          <Button
            as='button'
            variant={
              activeTab === 'membershipNFTs'
                ? 'quaternary'
                : 'quaternary-ternary'
            }
            size='md'
            onClick={() => handleTabSelect('membershipNFTs')}
          >
            Membership NFTs
          </Button>

          <Button
            as='button'
            variant={
              activeTab === 'glorium' ? 'quaternary' : 'quaternary-ternary'
            }
            size='md'
            onClick={() => handleTabSelect('glorium')}
          >
            Glorium
          </Button>
        </Row>
        <Row>{ActiveContent}</Row>
      </Container>
    </>
  );
};

export default Wolfpaper;
