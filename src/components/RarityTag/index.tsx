import { useMemo } from 'react';

import { TagType } from '@/types';

import styles from './styles.module.css';

type RarityTagType = {
  variant: TagType;
  fontSize?: string;
  padding?: string;
  fullWidth?: boolean;
};

const RarityTag = ({
  variant,
  fontSize = '12px',
  padding = '5px 10px',
  fullWidth,
}: RarityTagType) => {
  const currentVariant = useMemo(() => styles[variant], [variant]);

  return (
    <div
      className={`${styles.tag} ${currentVariant}`}
      style={{ fontSize, padding, width: fullWidth ? '100%' : 'max-content' }}
    >
      {variant}
    </div>
  );
};

export default RarityTag;
