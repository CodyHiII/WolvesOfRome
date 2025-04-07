import { CSSProperties } from 'react';

export type ItemCardType = {
  image: string;
  title: string;
  category?: string;
  description?: string;
  amountOfItemOwned?: string;
  onClick?: () => void;
  showButton?: boolean;
  style?: CSSProperties;
  categoryColor?: string;
  imageHeight?: string;
  glorium?: number;
  gloriumText?: string;
  btnText?: string;
};
