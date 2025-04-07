'use client';
import { useEffect, useState } from 'react';
import useNavBarsHeight from '@/helpers/hooks/useNavBarsHeight';

type SectionType = {
  showFooter?: boolean;
  navPadding?: boolean;
  children: React.ReactNode;
  className?: string;
  flex?: boolean;
  justify?: 'center' | 'flex-end' | 'space-between' | 'space-around';
  align?: 'center' | 'flex-end' | 'space-between' | 'space-around';
  padding?: string;
  position?: 'relative' | 'absolute';
  customStyle?: React.CSSProperties;
  style?: React.CSSProperties;
};

type FullHeightType = {
  fullHeight: boolean;
  fullMinHeight?: never;
};

type FullMinHeightType = {
  fullHeight?: never;
  fullMinHeight: boolean;
};

type FullHeightSectionType = SectionType & (FullHeightType | FullMinHeightType);

const FullHeightSection = ({
  fullHeight,
  fullMinHeight,
  showFooter,
  navPadding,
  children,
  className,
  flex,
  justify,
  align,
  position,
  customStyle,
  style,
}: FullHeightSectionType) => {
  const { navHeight, footerHeight } = useNavBarsHeight();

  const [heightFooterCalc, setHeightFooterCalc] = useState(0);
  const [heightNavCalc, setHeightNavCalc] = useState(0);

  useEffect(() => {
    const finalFooterHeight = showFooter ? footerHeight : 0;
    const finalNavHeight = navHeight + 20;

    setHeightFooterCalc(finalFooterHeight);
    setHeightNavCalc(finalNavHeight);
  }, [navHeight, footerHeight]);

  const defaultStyle = {
    position,
    display: flex ? 'flex' : '',
    justifyContent: justify ? justify : 'flex-start',
    alignItems: align ? align : 'flex-start',
    width: '100%',
    margin: '0 auto',
    paddingTop: navPadding ? heightNavCalc : '0',
    height: fullHeight ? `calc(100vh - ${heightFooterCalc}px)` : 'auto',
    minHeight: fullMinHeight ? `calc(100vh - ${heightFooterCalc}px)` : '1px',
    overflow: 'hidden',
  };

  return (
    <section
      className={className}
      style={{ ...defaultStyle, ...customStyle, ...style }}
    >
      {children}
    </section>
  );
};

export default FullHeightSection;
