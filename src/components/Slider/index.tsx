'use client';
import { useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { firebaseApp } from '@/app/remoteConfig';
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from 'firebase/remote-config';

import styles from './styles.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './customSliderCss.css';
import Typography from '../Typography';
import Button from '../Button';
import { ButtonTypes } from '@/types';
import useIsMobile from '@/helpers/hooks/useIsMobile';

type SliderType = {
  variant: 'primary' | 'secondary';
  margin?: string;
};

type ButtonItem = {
  buttonText: string;
  buttonUrl: string;
  buttonShape: ButtonTypes['variant'];
  buttonSize: ButtonTypes['size'];
};

type DateType = {
  text: string;
  color: string;
  variant: 'primary' | 'secondary';
};

type SlideItem = {
  title: string;
  backgroundImage: string;
  sideImage: string;
  overlay: string;
  showSideImageOnMobile: boolean;
  date: DateType;
  bulletPointsList: { bulletPoint: string }[];
  buttons: ButtonItem[];
};

const Slider = ({ margin, variant }: SliderType) => {
  const currentVariant = useMemo(() => styles[variant], [variant]);

  const [slides, setSlides] = useState<SlideItem[]>([]);

  const isMobile = useIsMobile(998);

  const remoteConfig = getRemoteConfig(firebaseApp);
  fetchAndActivate(remoteConfig)
    .then(() => {
      const value = getValue(
        remoteConfig,
        process.env.NEXT_PUBLIC_SLIDER as string
      );
      const valueString = value.asString();
      const data = JSON.parse(valueString);
      setSlides(data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 6000,
        pauseOnMouseEnter: true,
      }}
      speed={1000}
      navigation
      pagination={{ clickable: true }}
      grabCursor={true}
      className={`${styles.swiper} ${currentVariant} custom-slide`}
      style={{ margin }}
    >
      {slides.map((slide) => (
        <SwiperSlide className={styles.swiperSlide}>
          <div
            className={styles.overlay}
            style={{ opacity: slide?.overlay ? slide?.overlay : '0' }}
          />
          <div className={`${styles.slideContent} ${currentVariant}`}>
            <div
              className={styles.slideBackground}
              style={{
                background: `url(${slide.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className={styles.slideTextContent}>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                font='ternary'
                fontWeight='bold'
                margin='0 0 10px 0'
              >
                {slide.title}
              </Typography>
              <ul>
                {slide.bulletPointsList &&
                  slide.bulletPointsList.length !== 0 &&
                  slide.bulletPointsList.map((listItem) => (
                    <li className={styles.bulletPointListItem}>
                      <Typography
                        variant={isMobile ? 'body-2' : 'body-1'}
                        font='quaternary'
                        fontWeight='regular'
                        color='var(--text-color)'
                      >
                        {listItem.bulletPoint}
                      </Typography>
                    </li>
                  ))}
              </ul>
              {slide.date && (
                <div
                  className={`${styles.dateContainer} ${
                    styles[slide.date.variant]
                  }`}
                  style={{
                    border: `1px solid ${
                      slide.date.color ? slide.date.color : 'white'
                    }`,
                  }}
                >
                  <Typography
                    variant={isMobile ? 'body-2' : 'body-1'}
                    font='quaternary'
                    fontWeight='bold'
                    color={slide.date.color ? slide.date.color : 'white'}
                  >
                    {slide.date.text}
                  </Typography>
                </div>
              )}
              <div className={styles.buttonContainer}>
                {slide?.buttons &&
                  slide?.buttons.length !== 0 &&
                  slide?.buttons.map((button) => (
                    <Button
                      as='a'
                      href={button.buttonUrl}
                      variant={button.buttonShape}
                      size={button.buttonSize}
                    >
                      {button.buttonText}
                    </Button>
                  ))}
              </div>
            </div>

            {!slide.showSideImageOnMobile && !isMobile && slide.sideImage && (
              <div className={styles.sideImgContainer}>
                <img src={slide.sideImage} alt={`${slide.title} image`} />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
