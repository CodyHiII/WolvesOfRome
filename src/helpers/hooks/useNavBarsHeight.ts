import { useState, useEffect } from 'react';

const useNavBarsHeight = () => {
  const [navHeight, setNavHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const navElement = document.getElementById('navBar');
      const footerElement = document.getElementById('footer');

      if (navElement) {
        setNavHeight(navElement.offsetHeight);
      }

      if (footerElement) {
        setFooterHeight(footerElement.offsetHeight);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return { navHeight, footerHeight };
};

export default useNavBarsHeight;
