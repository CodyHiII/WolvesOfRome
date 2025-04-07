import { useMemo } from 'react';

import { TypographyProps } from '@/types';

import styles from './styles.module.css';

const Typography = ({
  ref,
  variant,
  align,
  underline,
  color = 'var(--text-color)',
  lineHeight,
  font = 'primary',
  className,
  span = false,
  margin,
  fontWeight,
  children,
  uppercase,
  noWrap,
}: TypographyProps) => {
  const textVariant = useMemo(() => styles[variant], [variant]);

  const TextComponent = useMemo(() => {
    if (span) {
      return 'span';
    }
    switch (variant) {
      case 'h0':
        return 'h1';
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      default:
        return 'p';
    }
  }, [variant, span]);

  const getFontWeight = useMemo(() => {
    switch (fontWeight) {
      case 'black':
        return '900';
      case 'extrabold':
        return '800';
      case 'bold':
        return '700';
      case 'semibold':
        return '600';
      case 'medium':
        return '500';
      case 'regular':
        return '400';
      case 'light':
        return '300';
      default:
        return '400';
    }
  }, [fontWeight]);

  return (
    <TextComponent
      ref={ref}
      style={{
        color,
        lineHeight,
        margin,
        fontWeight: getFontWeight,
        textDecoration: underline ? 'underline' : '',
        textAlign: align,
        fontFamily: `var(--${font}-font)`,
        textTransform: uppercase ? 'uppercase' : 'initial',
        whiteSpace: noWrap ? 'nowrap' : 'initial',
      }}
      className={`
      ${styles.default}
      ${className}
      ${textVariant}
      `}
    >
      {children}
    </TextComponent>
  );
};

export default Typography;
