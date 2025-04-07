'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import FullHeightSection from '@/components/FullHeightSection';

import styles from './styles.module.css';

const HeroShop = () => {
  const tl = useRef<any>();
  const backgroundRef = useRef<any>();
  const characterRef = useRef<any>();
  const logoRef = useRef<any>();

  useEffect(() => {
    const context = gsap.context(() => {
      tl.current = gsap.timeline();

      gsap.set(backgroundRef.current, {
        left: '-100%',
      });
      gsap.set(characterRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
      });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      tl.current
        .to(backgroundRef.current, {
          left: '0',
          duration: 3,
        })
        .to(
          characterRef.current,
          {
            x: '-40%',
            opacity: 1,
            duration: 1,
          },
          '<'
        )
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
          },
          '-=2'
        );
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <FullHeightSection fullHeight>
      <div className={styles.heroContainer}>
        <div className={styles.heroBackground}>
          <img
            className={styles.heroShopBg}
            src='/heroShopBg_02.png'
            alt='hero background'
            ref={backgroundRef}
          />
          <img
            className={styles.character}
            src='/character_02.png'
            alt='hero background'
            ref={characterRef}
          />
          <div className={styles.backgroundGradient} />
          <img
            className={styles.logo}
            src='/renderedLogo.png'
            alt='logo'
            ref={logoRef}
          />
        </div>
      </div>
    </FullHeightSection>
  );
};

export default HeroShop;
