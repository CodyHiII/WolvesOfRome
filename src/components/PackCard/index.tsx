import React from 'react';

import styles from './styles.module.css';

type PackCardTypes = {
  image: string;
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
};

const PackCard = ({ image, name, isSelected, onClick }: PackCardTypes) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div
      className={`${styles.packContainer} ${isSelected && styles.selected}`}
      onClick={handleClick}
    >
      <div className={styles.leftSide}>
        <div className={styles.imageContainer}>
          <img src={image} alt='pack image' />
        </div>
        <p className={styles.name}>{name}</p>
      </div>
      <p className={`${styles.tag} ${isSelected && styles.selected}`}>
        {isSelected ? 'selected' : 'select'}
      </p>
    </div>
  );
};

export default PackCard;
