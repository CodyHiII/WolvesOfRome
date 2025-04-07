import React from 'react';

import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';

import styles from './styles.module.css';

type GloriumType = {
  glorium: number | string;
  fontSize: number;
  iconWidth: number;
  textCenteringMarginB: number;
};

const Glorium = ({
  glorium,
  fontSize,
  iconWidth,
  textCenteringMarginB,
}: GloriumType) => {
  return (
    <div className={styles.gloriumContainer}>
      <img
        src='/gloriumIcon.png'
        alt='glorium icon'
        className={styles.gloriumIcon}
        style={{ width: iconWidth }}
      />{' '}
      <p style={{ fontSize, marginBottom: textCenteringMarginB }}>
        {formatNumberWithCommas(glorium)}
      </p>
    </div>
  );
};

export default Glorium;
