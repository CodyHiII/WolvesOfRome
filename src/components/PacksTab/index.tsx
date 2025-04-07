import React from 'react';
import { FaRegCircleDot } from 'react-icons/fa6';

import { PacksTabType } from '@/types';
import useIsMobile from '@/helpers/hooks/useIsMobile';

import styles from './styles.module.css';

const PacksTab = ({
  image,
  title,
  subTitle,
  isSelected,
  onClick,
  disabled,
  comingSoon,
  color,
}: PacksTabType) => {
  const isMobile = useIsMobile(1200);

  return (
    <div
      className={`${styles.tabContainer} ${isSelected && styles.selected}`}
      style={
        {
          filter: disabled ? 'grayscale(100%)' : 'initial',
          pointerEvents: disabled ? 'none' : 'initial',
          '--_accent-color': color ? color : 'var(--primary)',
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <div className={styles.contentContainer}>
        <div className={styles.imgContainer}>
          <img src={image} alt='tab image' />
        </div>
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subTitle}>
            {!comingSoon ? subTitle : 'Coming soon'}
          </p>
        </div>
      </div>

      {!isMobile && (
        <FaRegCircleDot
          className={styles.selectedIcon}
          style={{
            color: isSelected ? 'var(--_accent-color)' : 'var(--gray-5)',
          }}
        />
      )}
    </div>
  );
};

export default PacksTab;
