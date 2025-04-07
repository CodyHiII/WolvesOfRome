'use client';
import FullHeightSection from '@/components/FullHeightSection';
import Typography from '@/components/Typography';
import useIsMobile from '@/helpers/hooks/useIsMobile';

const Token = () => {
  const isMobile = useIsMobile();

  return (
    <FullHeightSection
      navPadding
      showFooter
      flex
      fullHeight
      justify='center'
      align='center'
      style={{
        background: 'url(/tokenImg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant={isMobile ? 'h3' : 'h1'}
        font='ternary'
        fontWeight='bold'
        align='center'
      >
        WOR Token coming soon
      </Typography>
    </FullHeightSection>
  );
};

export default Token;
