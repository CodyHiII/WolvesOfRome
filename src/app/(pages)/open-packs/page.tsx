'use client';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import gsap from 'gsap';

import FloatingImage from '@/components/FloatingImage';
import Button from '@/components/Button';
import PackCard from '@/components/PackCard';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import { getCurrency } from '@/store/currency/selectors';
import { routes } from '@/routes';
import { get, post } from '@/helpers/utils/fetch';
import { getRarityColor } from '@/helpers/utils/getRarityColor';
import FlipCard from '@/components/FlipCard';
import FullHeightSection from '@/components/FullHeightSection';

import styles from './styles.module.css';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';

const OpenPacksPage = () => {
  const [userPacks, setUserPacks] = useState<any>([]);
  const [selectedPack, setSelectedPack] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rewardedCards, setRewardedCards] = useState<any>([]);
  const [areUserPacksLoading, setAreUserPacksLoading] = useState(true);
  const [areImagesLoading, setAreImagesLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [animationFilePath, setAnimationFilePath] = useState('');
  const [flippedCard, setFlippedCard] = useState(
    Array(rewardedCards?.length).fill(true)
  );

  const isMobile = useIsMobile();
  const is2k = useIsMobile(2559);
  const userBallance = useSelector(getCurrency);

  const tl = useRef<any>();

  const getPacks = () => {
    get({ url: '/api/user/card-pack' })
      .then((response) => {
        setUserPacks(response);
        setAreUserPacksLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePackSelect = (pack: any) => {
    setSelectedPack((prevSelectedPack: any) => {
      if (prevSelectedPack === pack) {
        return null;
      }

      switch (`${pack.Rarity} ${pack.Extension}`) {
        case 'Common Classic':
          setAnimationFilePath('/classicCardPackOpenAnimation.mov');
          break;
        case 'Rare Classic':
          setAnimationFilePath('/rareCardPackOpenAnimation.mov');
          break;
        case 'Epic Classic':
          setAnimationFilePath('/epicCardPackOpenAnimation.mov');
          break;
        case 'Legendary Classic':
          setAnimationFilePath('/legendaryCardPackOpenAnimation.mov');
          break;
        case 'Common WildSeas':
          setAnimationFilePath('/whileSeasCardPackOpenAnimationCommon.mov');
          break;
        case 'Rare WildSeas':
          setAnimationFilePath('/whileSeasCardPackOpenAnimationRare.mov');
          break;
        case 'Epic WildSeas':
          setAnimationFilePath('/whileSeasCardPackOpenAnimationEpic.mov');
          break;
        case 'Legendary WildSeas':
          setAnimationFilePath('/whileSeasCardPackOpenAnimationLegendary.mov');
          break;
        default:
          setAnimationFilePath('');
      }

      return pack;
    });
  };

  const handleOpenPack = () => {
    setSelectedPack(null);
    setIsModalOpen(true);

    // play video
    const video = document.getElementById('yourVideo') as HTMLVideoElement;
    // fetch rewarded cards
    post({
      url: '/api/user/open/container',
      body: {
        ContainerItemInstanceId: selectedPack.ItemInstanceId,
      },
    }).then((response) => {
      setRewardedCards(response);
      setAreImagesLoading(false);
    });

    // close video at the end
    if (video && !isVideoPlaying) {
      video.pause();
      video.currentTime = 0;
      setIsVideoPlaying(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRewardedCards([]);
    setAreImagesLoading(true);
    setIsVideoPlaying(true);
  };

  const showSelectedPack = () => {
    if (!selectedPack) {
      return null;
    }

    return selectedPack.ItemImageUrl === ''
      ? './pack.webp'
      : selectedPack.ItemImageUrl;
  };

  const handleCardFlip = (index: number) => {
    const newFlippedCard = [...flippedCard];
    newFlippedCard[index] = !newFlippedCard[index];
    setFlippedCard(newFlippedCard);
  };

  useEffect(() => {
    getPacks();
  }, [rewardedCards]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'hidden';
    }

    return () => {
      document.removeEventListener('click', handleCloseModal);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const rewardedCards = gsap.utils.toArray('#rewardedCardContainer');

    const context = gsap.context(() => {
      tl.current = gsap.timeline();

      rewardedCards.forEach((card: any) => {
        gsap.set(card, {
          opacity: 0,
          x: '100px',
        });

        rewardedCards.forEach((card: any) => {
          tl.current.to(card, {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: 'back.out(1.7)',
          });
        });
      });
    });

    return () => {
      context.revert();
    };
  }, [isVideoPlaying]);

  const renderPacksContainer = () => {
    return (
      <div className={styles.packsContainer}>
        {areUserPacksLoading ? (
          <div className={styles.packsLoadingContainer}>
            <CircularProgress thickness={6} size='24px' color='inherit' />
          </div>
        ) : (
          <>
            {userPacks.length <= 0 ? (
              <div className={styles.noPacksContainer}>
                <h2>
                  Currently you have <span>0 Packs</span>
                </h2>
                <h3>
                  Visit the shop page to purchase more packs and enhance your
                  collection!
                </h3>
                <Button
                  as='Link'
                  href={routes.shop}
                  variant='primary'
                  size='md'
                >
                  Shop
                </Button>
              </div>
            ) : (
              userPacks.map((pack: any) => (
                <PackCard
                  key={pack.ItemInstanceId}
                  image={
                    pack.ItemImageUrl === '' ? './pack.webp' : pack.ItemImageUrl
                  }
                  name={pack.DisplayName}
                  isSelected={selectedPack === pack}
                  onClick={() => handlePackSelect(pack)}
                />
              ))
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.animationModal}>
          <div className={styles.animationContainer}>
            <div className={styles.videoContainer}>
              {isVideoPlaying && (
                <video
                  id='yourVideo'
                  src={animationFilePath}
                  controls={false}
                  onEnded={() => {
                    setIsVideoPlaying(false);
                  }}
                  autoPlay
                />
              )}
            </div>
            {!isVideoPlaying && (
              <div className={styles.rewardedCardsContainer}>
                {rewardedCards?.map((card: any, index: number) => (
                  <div
                    key={card.ItemId}
                    className={styles.cardContainer}
                    id='rewardedCardContainer'
                    onClick={() => handleCardFlip(index)}
                  >
                    <FlipCard
                      width='250px'
                      frontImage={card.ItemImageUrl}
                      backImage={
                        card.ItemBackImageUrl
                          ? card.ItemBackImageUrl
                          : '/pack.webp'
                      }
                      showHoverGlow
                      hoverGlowColor={getRarityColor(card.Rarity)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.closeModalBtnContainer}>
            <Button
              as='button'
              variant='primary'
              size='md'
              onClick={handleCloseModal}
              disabled={areImagesLoading}
            >
              {areImagesLoading ? (
                <CircularProgress
                  thickness={6}
                  size='24px'
                  color='inherit'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              ) : (
                'Close'
              )}
            </Button>
          </div>
        </div>
      )}
      <FullHeightSection fullHeight className={styles.openPacksContainer}>
        <div className={styles.background}>
          <img src='/OpenPack-bg.svg' alt='background' />
        </div>
        <div className={styles.selectedPackContainer}>
          <div className={styles.pedestalContainer}>
            <div className={styles.floatingImageContainer}>
              <FloatingImage
                image={showSelectedPack()}
                width={is2k ? (isMobile ? '100px' : '185px') : '385px'}
              />
            </div>
            <div className={styles.pedestal}>
              <img src='/OpenPack-pedestal.svg' alt='pedestal' />
            </div>
          </div>
        </div>
        <div className={styles.packsNavigationContainer}>
          <div className={styles.packsNavigation}>
            <div className={styles.info}>
              <p>
                Your balance:{' '}
                <span className={styles.balance}>
                  Glorium:{' '}
                  <span className={styles.glorium}>
                    {formatNumberWithCommas(userBallance!)}
                  </span>
                </span>
              </p>
              <p>
                Buy more Packs on the{' '}
                <Link href={routes.shop} className={styles.shopPageLink}>
                  shop page
                </Link>
              </p>
            </div>
            {!isMobile && renderPacksContainer()}
            <div className={styles.openPackBtnContainer}>
              <Button
                as='button'
                variant='primary'
                size={isMobile ? 'sm' : 'md'}
                disabled={selectedPack ? false : true}
                onClick={handleOpenPack}
              >
                OPEN PACK
              </Button>
            </div>
          </div>
          {isMobile && renderPacksContainer()}
        </div>
      </FullHeightSection>
    </>
  );
};

export default OpenPacksPage;
