import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';

import styles from './styles.module.css';
import Typography from '../Typography';
import { routes } from '@/routes';

type BallancePanelType = {
  ballance: any;
};

const BallancePanel = ({ ballance }: BallancePanelType) => {
  const { push } = useRouter();

  return (
    <div className={styles.panelContainer}>
      <img
        className={styles.gloriumIcon}
        src='/gloriumIcon.svg'
        alt='glorium'
      />
      <div className={styles.balanceContainer}>
        <Typography
          variant='h5'
          font='ternary'
          fontWeight='bold'
          color='var(--primary)'
        >
          {formatNumberWithCommas(ballance)}
        </Typography>
        <button
          className={styles.buyButton}
          onClick={() => push(routes.gloriumShop)}
        >
          <Typography
            span
            variant='body-2'
            font='quaternary'
            fontWeight='medium'
          >
            Buy Glorium
          </Typography>
          <div className={styles.iconContainer}>
            <FaPlus className={styles.icon} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default BallancePanel;
