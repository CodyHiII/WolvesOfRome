import ClaimGlorium from '@/components/ClaimGlorium';
import NftsGrid from '@/components/NftsGrid';
import FullHeightSection from '@/components/FullHeightSection';

const StakingPlatformPage = () => {
  return (
    <FullHeightSection fullMinHeight navPadding showFooter>
      <ClaimGlorium />
      <NftsGrid />
    </FullHeightSection>
  );
};

export default StakingPlatformPage;
