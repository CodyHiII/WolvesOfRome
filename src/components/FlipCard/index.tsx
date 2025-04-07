'use client';
import { useState } from 'react';

import styles from './styles.module.css';

type FlipCardTypes = {
  frontImage: string;
  backImage: string;
  width: string;
  showHoverGlow?: boolean;
  hoverGlowColor?: string;
};

const FlipCard = ({
  width,
  frontImage,
  backImage,
  showHoverGlow,
  hoverGlowColor = 'white',
}: FlipCardTypes) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const handleCardClick = () => {
    setIsCardFlipped(!isCardFlipped);
    setShowGlow(true);
  };

  return (
    <div
      className={styles.container}
      style={{ width }}
      onClick={handleCardClick}
    >
      <div className={`${styles.card} ${isCardFlipped && styles.flipped}`}>
        <div className={styles.cardFront}>
          <img src={frontImage} alt='card' />
        </div>
        <div className={styles.cardBack}>
          <img src={backImage} alt='card back' />
        </div>
      </div>
      {showHoverGlow && (
        <div
          className={`${styles.hoverGlow} ${showGlow && styles.glowActive}`}
          style={{
            background: hoverGlowColor,
          }}
        />
      )}
    </div>
  );
};

export default FlipCard;
