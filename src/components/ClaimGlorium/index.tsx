'use client';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { get, post } from '@/helpers/utils/fetch';
import { useBalanceUpdate } from '@/helpers/hooks/useBalanceUpdate';
import RegisterWalletCard from '../RegisterWalletCard';
import Button from '../Button';
import Glorium from '../Glorium';

import styles from './styles.module.css';
import Slider from '../Slider';

const ClaimGlorium = () => {
  const [stakingInfo, setStakingInfo] = useState({
    claimableGlorium: 0,
    gloriumPerYear: 0,
    gloriumPerYearPerMonth: 0,
    gloriumPerYearPerDay: 0,
  });
  const [gloriumDropText, setGloriumDropText] = useState('');

  const { updateBalance } = useBalanceUpdate();

  const getStakingInfo = () => {
    get({ url: '/api/staking/info' })
      .then((response) => {
        setStakingInfo({
          claimableGlorium: response.claimableGlorium,
          gloriumPerYear: response.gmPerYear,
          gloriumPerYearPerMonth: response.gmPerMonth,
          gloriumPerYearPerDay: response.gmPerDay,
        });
        setGloriumDropText(response.periodText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const claimClaimableGlorium = async () => {
    const purchaseToast = toast.loading('Loading...', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    await post({ url: '/api/staking/claim' });
    toast.update(purchaseToast, {
      render: () => 'Success',
      type: 'success',
      isLoading: false,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    updateBalance();
    getStakingInfo();
  };

  useEffect(() => {
    getStakingInfo();
  }, []);

  const gridData = [
    {
      id: 1,
      numberValue: stakingInfo.gloriumPerYearPerDay,
      numberCaption: 'Glorium Per Day:',
    },
    {
      id: 2,
      numberValue: stakingInfo.gloriumPerYearPerMonth,
      numberCaption: 'Glorium Per Month:',
    },
    {
      id: 3,
      numberValue: stakingInfo.gloriumPerYear,
      numberCaption: 'Glorium Per Year:',
    },
  ];

  return (
    <Container className='custom-container'>
      <Slider variant='secondary' margin='20px 0 20px 0' />
      <div className={styles.claimGloriumContainer}>
        <div className={styles.claimContainer}>
          <div className={styles.claimableGlorium}>
            <Glorium
              glorium={stakingInfo?.claimableGlorium ?? 0}
              fontSize={40}
              iconWidth={20}
              textCenteringMarginB={-7}
            />
            <p>Claimable Glorium</p>
          </div>
          <p className={styles.gloriumDropText}>{gloriumDropText}</p>
          <Button
            as='button'
            variant='primary'
            size='lg'
            className={styles.claimButton}
            onClick={claimClaimableGlorium}
            disabled={stakingInfo.claimableGlorium === 0}
          >
            Claim Glorium
          </Button>
          <div className={styles.gloriumStatsGrid}>
            {gridData.map((item: any) => (
              <div key={item.key} className={styles.gloriumStatCard}>
                <p>{item.numberCaption}</p>
                <Glorium
                  glorium={item?.numberValue ?? 0}
                  fontSize={20}
                  iconWidth={10}
                  textCenteringMarginB={0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.addressesCardContainer}>
          <RegisterWalletCard />
        </div>
      </div>
    </Container>
  );
};

export default ClaimGlorium;
