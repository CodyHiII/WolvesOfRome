import { ReactNode } from 'react';

export type TypographyVariant =
  | 'h0'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'nav'
  | 'body-1'
  | 'body-2'
  | 'body-3'
  | 'body-4';

export type TypographyProps = {
  variant: TypographyVariant;
  align?: 'left' | 'right' | 'center';
  underline?: boolean;
  color?: string;
  lineHeight?: number;
  font?: 'primary' | 'secondary' | 'ternary' | 'quaternary';
  className?: string;
  span?: boolean;
  margin?: string;
  fontWeight?:
    | number
    | 'black'
    | 'bold'
    | 'extrabold'
    | 'semibold'
    | 'medium'
    | 'regular'
    | 'light';
  children: ReactNode;
  uppercase?: boolean;
  noWrap?: boolean;
  ref?: React.Ref<any>;
};
