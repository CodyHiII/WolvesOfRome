'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import HeroShop from './sections/HeroShop';
import BuyPacksShop from './sections/BuyPacksShop';
import Slider from '@/components/Slider';
import { Container } from 'react-bootstrap';

const ShopPage = () => {
  const tl = useRef<any>();
  const animatedContainerRef = useRef<any>();

  useEffect(() => {
    const context = gsap.context(() => {
      tl.current = gsap.timeline();

      gsap.set(animatedContainerRef.current, {
        opacity: 0,
      });

      tl.current.to(animatedContainerRef.current, {
        opacity: 1,
        duration: 1,
      });
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <HeroShop />
      <div ref={animatedContainerRef}>
        <Container
          className='custom-container'
          style={{ marginTop: '-200px', marginBottom: '50px' }}
        >
          <Slider variant='secondary' />
        </Container>
        <BuyPacksShop />
      </div>
    </>
  );
};

export default ShopPage;
