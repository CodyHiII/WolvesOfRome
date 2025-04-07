'use client';

import { ReactNode, useState, useCallback } from 'react';

import Button from '../Button';
import RarityTag from '../RarityTag';
import { TagType } from '@/types';

import styles from './styles.module.css';
import { CircularProgress } from '@mui/material';

type InventoryItemType = {
  image: string | ReactNode;
  title: string;
  tag?: TagType;
  description?: string;
  amountOfItemOwn?: string | number;
  onClick?: () => void;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  showInteractButton?: boolean;
  interactButtonText?: string;
  onInteractButtonClick?: () => void;
};

const InventoryItem = ({
  image,
  title,
  tag,
  description,
  amountOfItemOwn,
  onClick,
  showButton,
  buttonText,
  onButtonClick,
  showInteractButton,
  interactButtonText,
  onInteractButtonClick,
}: InventoryItemType) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const onLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{ cursor: onClick && 'pointer' }}
    >
      <div className={styles.imageContainer}>
        {typeof image === 'string' ? (
          <>
            <div
              className={styles.loadingContainer}
              style={{ display: isImageLoading ? 'flex' : 'none' }}
            >
              <CircularProgress thickness={6} size='24px' color='inherit' />
            </div>
            <img
              src={image}
              alt={`${title} image`}
              onLoad={onLoad}
              style={{ display: isImageLoading ? 'none' : 'block' }}
            />
          </>
        ) : (
          <div className={styles.imageComponentContainer}>{image}</div>
        )}
        {showInteractButton && (
          <button
            className={styles.interactButton}
            onClick={(event) => {
              event.stopPropagation();

              onInteractButtonClick!();
            }}
          >
            {interactButtonText}
          </button>
        )}
      </div>
      <div className={styles.cardInfo}>
        <h1 className={styles.title}>{title}</h1>
        <RarityTag variant={tag!} />
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {showButton && (
        <Button
          as='button'
          variant='primary'
          size='sm'
          fullWidth
          onClick={(event) => {
            event.stopPropagation();

            onButtonClick!();
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default InventoryItem;
