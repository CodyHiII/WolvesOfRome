import Typography from '@/components/Typography';

const MembershipNFTs = () => {
  return (
    <div>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Our Membership NFTs are divided into 7 collections.
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 20px 0'
      >
        Each collection represents an Empire from Wolves of Rome, hence the
        nickname “Empire NFTs.”
      </Typography>
      <Typography
        variant='body-1'
        font='quaternary'
        fontWeight='medium'
        align='center'
        margin='0 0 40px 0'
      >
        They all come with many, many useful Utilities and valuable Rewards.
      </Typography>
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        RARITY CHART
      </Typography>
      <img
        className='img-fluid w-100'
        src='/membersiftNFTS.png'
        alt='RARITY CHART IMAGE'
        style={{ marginBottom: '40px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        STAKING REWARDS
      </Typography>
      <img
        className='img-fluid w-100'
        src='/membersiftNFTSStaking.png'
        alt='STAKING REWARDS IMAGE'
        style={{ marginBottom: '40px' }}
      />
      <Typography
        variant='h6'
        font='quaternary'
        fontWeight='bold'
        align='center'
        margin='0 0 20px 0'
      >
        EXCLUSIVE HOLDER REWARDS
      </Typography>
      <img
        className='img-fluid w-100'
        src='/membershipNFTSRewards.png'
        alt='EXCLUSIVE HOLDER REWARDS IMAGE'
        style={{ marginBottom: '40px' }}
      />
    </div>
  );
};

export default MembershipNFTs;
