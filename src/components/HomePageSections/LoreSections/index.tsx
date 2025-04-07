'use client';
import { Fragment, useState, useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Tooltip } from '@mui/material';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

import Typography from '@/components/Typography';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import Button from '@/components/Button';
import loreData from './loreData';

import styles from './styles.module.css';

const LoreSection = () => {
  const [selectedLore, setSelectedLore] = useState(loreData[0]);

  const isMobile = useIsMobile(998);

  const duration = 1;

  const tl = useRef<any>();
  const videoRef = useRef<any>();
  const contentRef = useRef<any>();

  const handleSelectLore = (index: number) => {
    setSelectedLore(loreData[index]);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(videoRef.current, {
        y: 100,
        opacity: 0,
        duration: duration,
      });
      gsap.set(contentRef.current, {
        y: -100,
        opacity: 0,
        duration: duration,
      });
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top bottom-=200',
        end: 'bottom',
        toggleActions: 'play reverse play reverse',
        preventOverlaps: true,
      },
    });

    tl.current
      .to(videoRef.current, {
        y: 0,
        opacity: 1,
        duration: duration,
      })
      .to(
        contentRef.current,
        {
          y: 0,
          opacity: 1,
          duration: duration,
        },
        '<'
      );

    return () => context.revert();
  }, []);

  return (
    <Container>
      <div className={styles.container}>
        <img
          className={styles.backgroundImage}
          src='/WolfAndFireGirl.png'
          alt='background image'
        />
        <video
          ref={videoRef}
          className={styles.wolfVideo}
          src='wolfAnimationVideo.webm'
          controls={false}
          autoPlay
          loop
          muted
        ></video>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.heading}>
            <Typography
              variant='h5'
              font='ternary'
              fontWeight='bold'
              color='var(--primary)'
              align={isMobile ? 'center' : 'left'}
            >
              Veni, Vidi, Evisceravi
            </Typography>
            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              font='ternary'
              fontWeight='black'
              align={isMobile ? 'center' : 'left'}
            >
              Wolves of Rome{' '}
              <Typography
                variant={isMobile ? 'h2' : 'h1'}
                font='ternary'
                fontWeight='black'
                color='var(--primary)'
                span
              >
                Lore
              </Typography>
            </Typography>
          </div>
          <div className={styles.loreTabs}>
            {loreData?.map((tab, index) => (
              <Fragment key={tab.title}>
                <Tooltip title={tab.title} placement='top' arrow>
                  <div
                    className={`${styles.tabContainer} ${
                      selectedLore.title === tab.title && styles.tabActive
                    }`}
                    onClick={() => handleSelectLore(index)}
                  >
                    <img src={tab.icon} alt={tab.title} />
                  </div>
                </Tooltip>
              </Fragment>
            ))}
          </div>
          <div className={styles.activeLoreContent}>
            <Typography
              variant='h4'
              font='ternary'
              fontWeight='black'
              color='var(--primary)'
              margin='0 0 10px 0'
            >
              {selectedLore.title}
            </Typography>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='medium'
              margin='0 0 20px 0'
              lineHeight={1.7}
            >
              {selectedLore.summery}
            </Typography>
            <Button
              as='a'
              href={selectedLore.url}
              target='_blank'
              variant='quaternary'
              size='sm'
            >
              READ MORE
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoreSection;
