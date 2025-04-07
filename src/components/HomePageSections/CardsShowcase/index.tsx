'use client';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Pagination,
  Mousewheel,
  FreeMode,
} from 'swiper/modules';

import Typography from '@/components/Typography';
import useEnsureLoginBeforeRedirect from '@/helpers/hooks/useEnsureLoginBeforeRedirect';
import { routes } from '@/routes';
import Button from '@/components/Button';
import sliderCards from './data';

import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './styles.module.css';

const CardsShowcase = () => {
  const ensureLoginBeforeRedirect = useEnsureLoginBeforeRedirect();

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <img src='/MultipleCardsBackground.png' alt='background' />
          <div className={styles.title}>
            <Typography
              variant='h3'
              font='ternary'
              fontWeight='black'
              align='center'
              className={styles.titleType}
            >
              Collect 'Em All
            </Typography>
          </div>
        </div>
        <div className={styles.slider}>
          <Swiper
            effect={'coverflow'}
            slidesPerView={2.5}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            allowTouchMove={true}
            mousewheel={true}
            autoplay={{
              delay: 1000,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              scale: 1,
              slideShadows: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
            }}
            modules={[EffectCoverflow, Pagination, Mousewheel, FreeMode]}
          >
            {sliderCards?.map((item: any, index: number) => (
              <SwiperSlide key={item.id}>
                <img
                  style={{ width: '100%' }}
                  src={item.card}
                  alt={`card ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.description}>
          <Typography
            variant='body-1'
            font='quaternary'
            fontWeight='medium'
            align='center'
            lineHeight={1.5}
          >
            Join the card-collecting frenzy! Assemble a deck of rare cards, each
            with its own unique rarity, for a strategic gameplay experience
            that'll transport you into a world of thrills and strategy.
          </Typography>
          <Button
            as='button'
            onClick={() =>
              ensureLoginBeforeRedirect({ path: routes.gallery, newTab: false })
            }
            variant='ternary'
            size={'md'}
          >
            SEE ALL CARDS
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CardsShowcase;
