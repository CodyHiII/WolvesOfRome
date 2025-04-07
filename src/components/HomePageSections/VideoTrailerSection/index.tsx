'use client';
import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Slider from '@/components/Slider';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { FaPlay } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { openModal } from '@/store/modalX/slice';
import useIsMobile from '@/helpers/hooks/useIsMobile';

import styles from './styles.module.css';

const VideoTrailerSection = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile(998);

  const tl = useRef<any>();
  const sliderTl = useRef<any>();
  const glowTl = useRef<any>();
  const mouseOutTl = useRef<any>();
  const containerRef = useRef<any>();
  const textRef = useRef<any>();
  const videoRef = useRef<any>();
  const glowRef = useRef<any>();
  const sliderRef = useRef<any>();

  const duration = 1;

  const playFullScreenTrailer = () => {
    dispatch(
      openModal({
        type: 'fullScreenTrailer',
        props: {
          src: '/TrailerCompress.mp4',
        },
      })
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.set(textRef.current, {
        x: -200,
        opacity: 0,
        duration: duration,
      });
      gsap.set(videoRef.current, {
        x: 200,
        opacity: 0,
        duration: duration,
      });
    });

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top bottom-=200',
        end: 'bottom',
        toggleActions: 'play reverse play reverse',
        preventOverlaps: true,
      },
    });

    tl.current
      .to(textRef.current, {
        x: 0,
        opacity: 1,
        duration: duration,
      })
      .to(
        videoRef.current,
        {
          x: 0,
          opacity: 1,
          duration: duration,
        },
        '<'
      );

    sliderTl.current = gsap.timeline();

    gsap.set(sliderRef.current, {
      opacity: 0,
      y: 100,
    });

    sliderTl.current.to(sliderRef.current, {
      opacity: 1,
      duration: 0.5,
      delay: 1.5,
      y: 0,
    });

    videoRef.current.onmousemove = (e: any) => {
      if (!videoRef.current) return;

      const videoRect = (
        videoRef.current as HTMLElement
      ).getBoundingClientRect();
      const videoCenterX = videoRect.left + videoRect.width / 2;

      let videoPercent = {
        x: (e.clientX - videoCenterX) / videoRect.width / 2,
      };

      let distFromCenter = 1 - Math.abs(videoPercent.x);

      glowTl.current = gsap
        .timeline({
          defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' },
        })
        .to(glowRef.current, {
          opacity: distFromCenter - 0.7,
          duration: 0.5,
        });
    };

    videoRef.current.onmouseleave = () => {
      mouseOutTl.current = gsap.timeline().to(
        glowRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      );
    };

    return () => context.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.bgContainer}>
        <img src='/VideoSectionBackground.png' alt='background' />
      </div>
      <Container>
        <div ref={sliderRef} className={styles.sliderContainer}>
          <Typography
            variant='h6'
            font='ternary'
            fontWeight='bold'
            margin={isMobile ? '0 0 5px 30px' : '0 0 5px 40px'}
          >
            LATEST NEWS
          </Typography>
          <Slider variant='primary' />
        </div>
        <div className={styles.content}>
          <div ref={textRef} className={styles.text}>
            <Typography
              variant={isMobile ? 'h2' : 'h1'}
              font='ternary'
              fontWeight='black'
              align={isMobile ? 'center' : 'left'}
              margin='0 0 10px 0'
            >
              Are You Up For the{' '}
              <Typography
                variant={isMobile ? 'h2' : 'h1'}
                font='ternary'
                fontWeight='black'
                color='var(--primary)'
                span
                align={isMobile ? 'center' : 'left'}
              >
                Challenge
              </Typography>
            </Typography>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='medium'
              margin='0 0 10px 0'
              align={isMobile ? 'center' : 'left'}
            >
              Dive into nerve-wrecking gameplay.
            </Typography>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='medium'
              margin='0 0 30px 0'
              align={isMobile ? 'center' : 'left'}
            >
              Strategize with your cards or Unleash Hell! What we do in life
              echoes in eternity!
            </Typography>
            <div className={styles.buttonContainer}>
              <Button
                as='a'
                href='https://platform.gameswift.io/games/96460bb3-b117-405c-a306-0488c6c6077d-wolves-of-rome'
                target='_blank'
                variant='ternary'
                size='md'
                margin={isMobile ? '0 auto' : 'initial'}
              >
                PLAY NOW
              </Button>
            </div>
          </div>
          <Tilt
            style={{
              height: '100%',
              width: '90%',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            tiltReverse={true}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            transitionEasing={'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}
          >
            <div
              ref={videoRef}
              className={styles.video}
              onClick={playFullScreenTrailer}
            >
              <div ref={glowRef} className={styles.glow} />
              <img
                className={styles.videoThumbnail}
                src='/videoThumbnail.png'
                alt='video trailer'
              />
              <button className={styles.playButton}>
                <FaPlay />
              </button>
            </div>
          </Tilt>
        </div>
      </Container>
    </div>
  );
};

export default VideoTrailerSection;
