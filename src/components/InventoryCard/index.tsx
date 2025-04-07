import Tilt from 'react-parallax-tilt';

import { TagType } from '@/types';
import Typography from '../Typography';
import RarityTag from '../RarityTag';

import styles from './styles.module.css';
import { getRarityColor } from '@/helpers/utils/getRarityColor';

type InventoryCardType = {
  image: string;
  title?: string;
  tag?: TagType;
  quantity?: number;
  showButton?: boolean;
  buttonText?: string | React.ReactNode;
  onImgClick?: () => void;
  onButtonClick?: () => void;
};

const InventoryCard = ({
  image,
  title,
  tag,
  showButton,
  buttonText,
  onImgClick,
  onButtonClick,
  quantity,
}: InventoryCardType) => {
  const maxTiltAngle = 15;

  return (
    <div className={styles.cardContainer}>
      {quantity! > 1 && <div className={styles.quantity}>x{quantity}</div>}
      <div
        className={styles.cardBackground}
        style={{
          background: `linear-gradient(
                0deg,
                ${getRarityColor(tag, 0.5)} 0%,
                ${getRarityColor(tag, 0.3)} 25%,
                ${getRarityColor(tag, 0.2)} 50%,
                ${getRarityColor(tag, 0)} 75%,
                ${getRarityColor(tag, 0)} 100%
              )`,
        }}
      />
      <div className={styles.imageContainer} onClick={onImgClick!}>
        <Tilt
          tiltReverse={true}
          tiltMaxAngleX={maxTiltAngle}
          tiltMaxAngleY={maxTiltAngle}
          transitionEasing={'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}
        >
          <img src={image} alt={title} />
        </Tilt>
      </div>
      <Typography
        variant='h6'
        font='ternary'
        fontWeight='bold'
        align='center'
        margin='0 0 10px 0'
      >
        {title!.length > 19 ? `${title!.slice(0, 19)}...` : title}
      </Typography>
      <div className={styles.details}>
        <RarityTag variant={tag!} fontSize='16px' fullWidth />
        {showButton && (
          <button onClick={onButtonClick!} className={styles.button}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default InventoryCard;
