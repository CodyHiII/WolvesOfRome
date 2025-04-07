'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

import Typography from '@/components/Typography';
import expansionsData from './data';
import { routes } from '@/routes';
import useEnsureLoginBeforeRedirect from '@/helpers/hooks/useEnsureLoginBeforeRedirect';
import Button from '@/components/Button';

import styles from './styles.module.css';

const PacksShowcase = () => {
  const [selectedExpansion, setSelectedExpansion] = useState(expansionsData[0]);

  const ensureLoginBeforeRedirect = useEnsureLoginBeforeRedirect();

  const tl = useRef<any>();
  const imageRef = useRef<any>();
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const buttonRef = useRef<any>();

  const duration = 1;
  const delay = '-=0.8';

  const handleTabClick = (index: number) => {
    setSelectedExpansion(expansionsData[index]);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(imageRef.current, {
        y: 200,
        opacity: 0,
        duration: duration,
      });
      gsap.set(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: duration,
      });
      gsap.set(descriptionRef.current, {
        y: 100,
        opacity: 0,
        duration: duration,
      });
      gsap.set(buttonRef.current, {
        y: 100,
        opacity: 0,
        duration: duration,
      });
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top bottom-=400',
        end: 'bottom',
        toggleActions: 'play none none none',
        preventOverlaps: true,
      },
    });

    tl.current
      .to(
        imageRef.current,
        {
          y: 0,
          opacity: 1,
          duration: duration,
        },
        delay
      )
      .to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: duration,
        },
        delay
      )
      .to(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
          duration: duration,
        },
        delay
      )
      .to(
        buttonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: duration,
        },
        delay
      );

    return () => context.revert();
  }, [selectedExpansion]);

  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <img src='/PacksShowcaseBackground.png' alt='background' />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.heading}>
          <div className={styles.iconContainer}>
            <img src='/packIcon.svg' alt='packIcon' />
          </div>
          <Typography
            variant='h6'
            font='quaternary'
            fontWeight='bold'
            color='var(--primary)'
          >
            CHOSE EXPANSION
          </Typography>
          <Typography variant='h2' font='ternary' fontWeight='black' noWrap>
            OPEN CARD
          </Typography>
          <Typography variant='h2' font='ternary' fontWeight='black'>
            PACKS
          </Typography>
        </div>
        <div className={styles.content}>
          <div className={styles.circleContainer}>
            <div className={styles.circleDecorationContainer}>
              <img
                className={styles.circleDecoration}
                src='/circleDecoration.svg'
                alt='decoration'
              />
            </div>
            <div className={styles.circle}>
              <img ref={imageRef} src={selectedExpansion.image} alt='image' />
            </div>
          </div>
          <div className={styles.description}>
            <div ref={titleRef}>
              <Typography
                variant='h5'
                font='ternary'
                fontWeight='bold'
                margin='0 0 10px 0'
                uppercase
                align='center'
                color='var(--primary)'
              >
                {selectedExpansion.title}
              </Typography>
            </div>
            <div ref={descriptionRef}>
              <Typography
                variant='h6'
                font='ternary'
                fontWeight='medium'
                margin='0 0 20px 0'
                align='center'
              >
                {selectedExpansion.description}
              </Typography>
            </div>
            <div ref={buttonRef}>
              <Button
                as='button'
                onClick={() =>
                  ensureLoginBeforeRedirect({
                    path: routes.shop,
                    newTab: false,
                  })
                }
                variant='ternary'
                size={'md'}
                margin='0 auto 0 auto'
              >
                BUY PACKS
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
          {expansionsData.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.tabContainer} ${
                item.id === selectedExpansion.id && styles.active
              }`}
              onClick={() => handleTabClick(index)}
            >
              <div className={styles.typoContainer}>
                <Typography variant='h6' font='quaternary' fontWeight='bold'>
                  {item.tabTitle}
                </Typography>
              </div>
              <div className={styles.tabImgContainer}>
                <img src={item.tabImage} alt='expansion image' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PacksShowcase;
