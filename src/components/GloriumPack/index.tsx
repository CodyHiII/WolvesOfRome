import React from 'react';

import { GloriumPackTypes } from '@/types';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';

import styles from './styles.module.css';

const GloriumPack = ({
  priceAmount,
  priceCurrency,
  rewardAmount,
  bonusRewardAmount,
  totalAmount,
  image,
  onClick,
  className,
  id,
}: GloriumPackTypes) => {
  const getCurrency = (currency: string) => {
    switch (currency) {
      case 'usd':
        return '$';
      case 'eur':
        return '€';
      default:
        return undefined;
    }
  };

  return (
    <div
      className={`${styles.packContainer} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick && 'pointer' }}
      id={id}
    >
      <div className={styles.packInfo}>
        <div className={styles.gloriumImageContainer}>
          <img src={image ? image : './gloriumIcon.svg'} alt='glorium' />
        </div>
        <div className={styles.totalPrice}>
          <p>{formatNumberWithCommas(totalAmount)} Glorium</p>
        </div>
        <div className={styles.gloriumContainer}>
          <p className={styles.glorium}>
            {formatNumberWithCommas(rewardAmount)} Glorium
          </p>
          <p className={styles.bonusGlorium}>
            + {formatNumberWithCommas(bonusRewardAmount!)} bonus
          </p>
        </div>
        <div className={styles.packPrice}>
          <p className={styles.price}>
            {getCurrency(priceCurrency)} {priceAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GloriumPack;
