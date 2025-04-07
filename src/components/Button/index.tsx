import React, { KeyboardEvent, useMemo } from 'react';
import Link from 'next/link';

import { ButtonTypes } from '@/types';

import styles from './styles.module.css';

const Button = ({
  as = 'button',
  href,
  children,
  variant,
  startIcon,
  endIcon,
  fullWidth,
  size,
  onClick,
  target,
  download,
  disabled,
  className,
  margin,
}: ButtonTypes) => {
  const currentVariant = useMemo(() => styles[variant], [variant]);
  const btnSize = useMemo(() => styles[size], [size]);

  const width = useMemo(
    () => (fullWidth ? '100%' : 'max-content'),
    [fullWidth]
  );

  const Wrapper = useMemo(() => {
    switch (as) {
      case 'button':
        return 'button';
      case 'a':
        return 'a';
      case 'Link':
        return Link;
      default:
        return 'button';
    }
  }, [as]);

  const icon = useMemo(() => {
    return (icon: any) => {
      if (typeof icon === 'string') {
        return <img className={styles.icon} src={icon} alt='icon' />;
      } else if (React.isValidElement(icon)) {
        return icon;
      }
    };
  }, [startIcon, endIcon]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Wrapper
      href={href}
      target={target}
      download={download && href}
      style={{ width, margin }}
      className={`${styles.default} ${currentVariant} ${btnSize} ${
        disabled && styles.disabled
      } ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.mainBtnText}>
        {startIcon && <span className={styles.btnIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.btnIcon}>{icon(endIcon)}</span>}
      </span>
    </Wrapper>
  );
};

export default Button;
