'use client';
import { useState } from 'react';

import { ItemCardType } from '@/types';
import Loading from '../Loading';

import styles from './styles.module.css';

const ItemCard = ({
  image,
  title,
  category,
  description,
  style,
  categoryColor,
  imageHeight,
  glorium,
  gloriumText,
}: ItemCardType) => {
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div style={style} className={styles.card}>
      <div className={styles.img} style={{ height: imageHeight ?? 'initial' }}>
        {imageLoading ? (
          <Loading height='310px' />
        ) : (
          <img src={image} alt='item image' onLoad={handleImageLoad} />
        )}
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionContent}>
          {category && (
            <p
              className={styles.category}
              style={{ color: categoryColor ?? 'var(--primary)' }}
            >
              {category}
            </p>
          )}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      <div className={styles.gloriumContainer}>
        {glorium && (
          <>
            <p className={styles.glorium}>{glorium}</p>
            <p className={styles.gloriumText}>{gloriumText}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
