import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Tilt from 'react-parallax-tilt';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import gsap from 'gsap';

import { ItemMoreDetailsType } from '@/types/ItemMoreDetailsType';
import { closeModal } from '@/store/modalX/slice';

import styles from './styles.module.css';
import RarityTag from '@/components/RarityTag';
import Typography from '@/components/Typography';
import useIsMobile from '@/helpers/hooks/useIsMobile';

const ItemMoreDetails = ({
  items,
  index,
  totalItems,
  pageSize,
  currentPage,
}: ItemMoreDetailsType) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  const tl = useRef<any>();
  const tlDetails = useRef<any>();
  const imageRef = useRef<any>();
  const imageDetailsRef = useRef<any>();
  const textDetailsRef = useRef<any>();

  const maxTiltAngle = 15;

  console.log(items[index]);

  const getPrevCard = () => {
    if (isPrevButtonDisabled) return;

    setIsPrevButtonDisabled(true);

    const tlDismount = gsap.timeline({
      onComplete: () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
        setTimeout(() => {
          setIsPrevButtonDisabled(false);
        }, 500);
      },
    });
    const tlMount = gsap.timeline();

    tlDismount
      .fromTo(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          rotate: '0',
        },
        {
          opacity: 0,
          x: 200,
          rotate: '5deg',
        }
      )
      .call(() => {
        tlMount.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: -200,
            rotate: '-5deg',
          },
          {
            opacity: 1,
            x: 0,
            rotate: '0',
          }
        );
      });
  };

  const getNextCard = () => {
    if (isNextButtonDisabled) return;

    setIsNextButtonDisabled(true);

    const tlDismount = gsap.timeline({
      onComplete: () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        setTimeout(() => {
          setIsNextButtonDisabled(false);
        }, 500);
      },
    });
    const tlMount = gsap.timeline();

    tlDismount
      .fromTo(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          rotate: '0',
        },
        {
          opacity: 0,
          x: -200,
          rotate: '-5deg',
        }
      )
      .call(() => {
        tlMount.fromTo(
          imageRef.current,
          {
            opacity: 0,
            x: 200,
            rotate: '5deg',
          },
          {
            opacity: 1,
            x: 0,
            rotate: '0',
          }
        );
      });
  };

  const handleCoseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const context = gsap.context(() => {
      tl.current = gsap.timeline();
      tlDetails.current = gsap.timeline();

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(imageDetailsRef.current, {
        opacity: 0,
        x: -100,
      });

      gsap.set(textDetailsRef.current, {
        opacity: 0,
        x: 150,
      });

      tl.current.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
      });
    });

    tlDetails.current
      .to(imageDetailsRef.current, {
        opacity: 1,
        x: 0,
      })
      .to(
        textDetailsRef.current,
        {
          opacity: 1,
          x: 0,
        },
        0
      );

    return () => {
      context.revert();
    };
  }, [showCardDetails]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={handleCoseModal}>
          <IoClose />
        </button>
        {!showCardDetails && (
          <button
            className={`${styles.navButtons} ${styles.navPrevButton}`}
            onClick={getPrevCard}
            style={{ pointerEvents: isPrevButtonDisabled ? 'none' : 'unset' }}
          >
            <IoIosArrowBack />
          </button>
        )}
        {showCardDetails ? (
          <div className={styles.cardDetailsContainer}>
            <div ref={imageDetailsRef} className={styles.cardDetailsWrapper}>
              <img
                className={styles.detailsImg}
                src={items?.[currentIndex]?.ItemImageUrl}
                alt=''
              />
              <div ref={textDetailsRef} className={styles.details}>
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  font='ternary'
                  fontWeight='bold'
                  align={isMobile ? 'center' : 'left'}
                >
                  {items?.[currentIndex]?.DisplayName}
                </Typography>
                <RarityTag
                  variant={items?.[currentIndex]?.Rarity}
                  fontSize='25px'
                  padding='10px 20px'
                />
                <Typography
                  variant={isMobile ? 'body-1' : 'h6'}
                  font='quaternary'
                  fontWeight='medium'
                  align={isMobile ? 'center' : 'left'}
                >
                  {items?.[currentIndex]?.Description}
                </Typography>
                <div>
                  <Typography
                    variant={isMobile ? 'body-2' : 'body-1'}
                    font='quaternary'
                    fontWeight='medium'
                    align={isMobile ? 'center' : 'left'}
                    margin='0 0 5px 0'
                  >
                    <Typography
                      variant={isMobile ? 'body-2' : 'body-1'}
                      font='quaternary'
                      fontWeight='bold'
                      span
                      color='var(--primary)'
                    >
                      Empire:{' '}
                    </Typography>{' '}
                    {items?.[currentIndex]?.Empire}
                  </Typography>
                  <Typography
                    variant={isMobile ? 'body-2' : 'body-1'}
                    font='quaternary'
                    fontWeight='medium'
                    align={isMobile ? 'center' : 'left'}
                    margin='0 0 5px 0'
                  >
                    <Typography
                      variant={isMobile ? 'body-2' : 'body-1'}
                      font='quaternary'
                      fontWeight='bold'
                      span
                      color='var(--primary)'
                    >
                      Collection:{' '}
                    </Typography>{' '}
                    {items?.[currentIndex]?.Extension}
                  </Typography>
                  <Typography
                    variant={isMobile ? 'body-2' : 'body-1'}
                    font='quaternary'
                    fontWeight='medium'
                    align={isMobile ? 'center' : 'left'}
                    margin='0 0 5px 0'
                  >
                    <Typography
                      variant={isMobile ? 'body-2' : 'body-1'}
                      font='quaternary'
                      fontWeight='bold'
                      span
                      color='var(--primary)'
                    >
                      Card Type:{' '}
                    </Typography>{' '}
                    {items?.[currentIndex]?.CardType}
                  </Typography>
                </div>
              </div>
            </div>
            <button
              className={styles.seeDetailsBtn}
              onClick={() => setShowCardDetails(false)}
            >
              See Less
            </button>
          </div>
        ) : (
          <div className={styles.imageContainer}>
            <Tilt
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              tiltReverse={true}
              tiltMaxAngleX={maxTiltAngle}
              tiltMaxAngleY={maxTiltAngle}
              transitionEasing={'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}
            >
              <img
                ref={imageRef}
                className={styles.bigImg}
                src={items?.[currentIndex]?.ItemImageUrl}
                alt=''
              />
            </Tilt>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='medium'
              align='center'
              margin='10px 0 0 0'
            >
              {currentIndex + 1} / {pageSize! * (currentPage! + 1)} of{' '}
              {totalItems}
            </Typography>

            <button
              className={styles.seeDetailsBtn}
              onClick={() => setShowCardDetails(true)}
            >
              See More
            </button>
          </div>
        )}
        {!showCardDetails && (
          <button
            className={`${styles.navButtons} ${styles.navNextButton}`}
            onClick={getNextCard}
            style={{ pointerEvents: isPrevButtonDisabled ? 'none' : 'unset' }}
          >
            <IoIosArrowForward />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemMoreDetails;
