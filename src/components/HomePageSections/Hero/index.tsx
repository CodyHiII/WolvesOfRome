'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

import Typography from '@/components/Typography';
import FullHeightSection from '@/components/FullHeightSection';
import Button from '@/components/Button';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import CustomParticles from '@/components/CustomParticles';
import embersParticlesConfig from '@/components/CustomParticles/configs/embersParticlesConfig';

import styles from './styles.module.css';

const Hero = () => {
  const isMobile = useIsMobile(501);
  const isTablet = useIsMobile();
  const playNowUrl = 'https://www.wolvesofrome.io/play-now/';

  const tl = useRef<any>();
  const logoRef = useRef<any>();
  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const buttonRef = useRef<any>();

  const duration = 1;
  const delay = '-=0.7';
  const y = 70;

  useEffect(() => {
    const context = gsap.context(() => {
      tl.current = gsap.timeline();

      gsap.set(logoRef.current, {
        opacity: 0,
        y: y,
      });
      gsap.set(titleRef.current, {
        opacity: 0,
        y: y,
      });
      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: y,
      });
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: y,
      });

      tl.current
        .to(
          logoRef.current,
          {
            opacity: 1,
            duration: 1.5,
            y: 0,
          },
          delay
        )
        .to(titleRef.current, {
          opacity: 1,
          duration: duration,
          y: 0,
        })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            duration: duration,
            y: 0,
          },
          delay
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            duration: duration,
            y: 0,
          },
          delay
        );
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <FullHeightSection fullHeight>
      <CustomParticles config={embersParticlesConfig} />
      <div className={styles.heroContainer}>
        <div className={styles.bgContainer}>
          {/* <img src='/Website_Hero_Image_1.png' alt='background' /> */}
          <img src='/hero2.png' alt='background' />
        </div>
        <div className={styles.heroContent}>
          <img
            ref={logoRef}
            className={styles.logo}
            src='/renderedLogo.png'
            alt='logo'
          />
          <div ref={titleRef}>
            <Typography
              variant={isTablet ? 'h4' : 'h2'}
              font='ternary'
              fontWeight='black'
              margin='0 0 10px 0'
              align='center'
            >
              {/* {isMobile ? 'COLLECT CONQUER OWN' : 'COLLECT - CONQUER - OWN'} */}
              VAMPIRE MINT
            </Typography>
          </div>
          <div ref={descriptionRef} className={styles.heroDescription}>
            {/* <Typography
              variant={isTablet ? 'body-1' : 'h6'}
              font='quaternary'
              fontWeight='medium'
              margin='0 0 20px 0'
              align='center'
              lineHeight={1.5}
            >
              Wolves of Rome is a Trading Card Game like No Other! Battle and
              gain Glory in an ancient Roman World of Magic and Dark Fantasy.
            </Typography> */}
            <Typography
              variant={isTablet ? 'body-1' : 'h6'}
              font='quaternary'
              fontWeight='medium'
              align='center'
              lineHeight={1.5}
            >
              Membership NFT Holders Phase: 1pm UTC - 2pm UTC
            </Typography>
            <Typography
              variant={isTablet ? 'body-1' : 'h6'}
              font='quaternary'
              fontWeight='medium'
              align='center'
              lineHeight={1.5}
            >
              Wolflist Phase: 2pm UTC - 5pm UTC
            </Typography>
            <Typography
              variant={isTablet ? 'body-1' : 'h6'}
              font='quaternary'
              fontWeight='medium'
              margin='0 0 20px 0'
              align='center'
              lineHeight={1.5}
            >
              Public Phase: 5pm UTC
            </Typography>
          </div>
          <div ref={buttonRef}>
            <Button
              as='a'
              // href='https://platform.gameswift.io/games/96460bb3-b117-405c-a306-0488c6c6077d-wolves-of-rome'
              href='https://pay.nmkr.io/?p=5a411b3b98bb4ef4ac1910449e0e56e8&c=1'
              target='_blank'
              variant='ternary'
              size={isTablet ? 'md' : 'lg'}
            >
              {/* PLAY NOW */}
              MINT NOW
            </Button>
          </div>
        </div>
      </div>
    </FullHeightSection>
  );
};

export default Hero;
