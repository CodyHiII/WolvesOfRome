'use client';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { get } from '@/helpers/utils/fetch';
import GloriumPack from '@/components/GloriumPack';
import FullHeightSection from '@/components/FullHeightSection';
import Loading from '@/components/Loading';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import Typography from '@/components/Typography';

import styles from './styles.module.css';

const GloriumShopPage = () => {
  const [gloriumPacks, setGloriumPacks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useIsMobile();

  const getGloriumPacks = () => {
    get({ url: '/api/payment/glorium/packs' })
      .then((response) => {
        setGloriumPacks(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGloriumPacks();
  }, []);

  const handleOrder = (orderId: string) => {
    get({ url: `/api/payment/user/invoice/${orderId}`, body: { orderId } })
      .then((response) => {
        const redirectLink = response.InvoiceLink;
        window.open(redirectLink, '_blank');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getImages = (price: number): string => {
    switch (price) {
      case 5:
        return '/glorium-lvl-1.png';
      case 10:
        return '/glorium-lvl-2.png';
      case 25:
        return '/glorium-lvl-3.png';
      case 100:
        return '/glorium-lvl-4.png';
      case 250:
        return '/glorium-lvl-5.png';
      default:
        return '/glorium-lvl-1.png';
    }
  };

  return (
    <FullHeightSection fullMinHeight showFooter navPadding position='relative'>
      <div className={styles.overlay} />

      <div className={styles.videoContainer}>
        <video
          className={styles.backgroundVideo}
          src='/xx.mp4'
          controls={false}
          autoPlay
          loop
          muted
        />
      </div>
      <Container className='custom-container'>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          font='quaternary'
          fontWeight='bold'
          margin='30px 0 10px 0'
          align={isMobile ? 'center' : 'left'}
        >
          Purchase Glorium
        </Typography>
        <Row className='d-flex justify-content-center align-items-center'>
          {gloriumPacks?.map((pack, index) => (
            <Col
              key={pack.OrderId}
              xs={10}
              md={5}
              lg={4}
              className='custom-xxl-20 col-margin'
            >
              {isLoading ? (
                <Loading height='400px' />
              ) : (
                <GloriumPack
                  priceAmount={pack.PriceAmount}
                  priceCurrency={pack.PriceCurrency}
                  rewardAmount={pack.RewardAmount}
                  totalAmount={pack.TotalAmount}
                  bonusRewardAmount={pack.BonusRewardAmount}
                  image={getImages(pack.PriceAmount)}
                  onClick={() => handleOrder(pack.OrderId)}
                  className={`${styles.gloriumPack} ${
                    !isLoading && styles.gloriumPackAnim
                  }`}
                />
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </FullHeightSection>
  );
};

export default GloriumShopPage;
