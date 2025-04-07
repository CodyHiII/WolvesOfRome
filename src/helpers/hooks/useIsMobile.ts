import { useState, useEffect } from 'react';
import useWindowSize from './useWindowSize';

const useIsMobile = (breakpoint: number = 768): boolean => {
  const { width } = useWindowSize()!;
  const [isMobile, setMobile] = useState<boolean>(
    width! <= (breakpoint || 768),
  );

  useEffect(() => {
    setMobile(width! <= (breakpoint || 768));
  }, [width, breakpoint]);

  return isMobile;
};

export default useIsMobile;
