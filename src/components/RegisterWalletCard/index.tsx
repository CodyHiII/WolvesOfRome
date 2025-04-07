'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { deleteRequest, get } from '@/helpers/utils/fetch';
import WalletAddress from '@/components/WalletAddress';
import { AddressType } from '@/types';
import CustomModal from '@/components/Modal';
import { setIsOpen } from '@/store/modal/slice';
import RegisterMetaMaskButton from '@/components/RegisterMetaMaskButton';
import RegisterCardanoWallets from '@/components/RegisterCardanoWallets';
import CardanoLogo from '../../../public/cardanoLogo.svg';

import styles from './styles.module.css';

const RegisterWalletCard = () => {
  const [userAddresses, setUserAddresses] = useState<AddressType[]>([]);
  const [showRegisterEternlWallet, setShowRegisterEternlWallet] =
    useState(false);

  const dispatch = useDispatch();

  const closeModalAndRefetch = () => {
    dispatch(setIsOpen(false));
    getUserAddresses();
  };

  const getUserAddresses = () => {
    get({ url: 'api/user/wallet/all' })
      .then((response) => {
        setUserAddresses(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAddress = (address: AddressType) => {
    deleteRequest({
      url: '/api/user/wallet/delete',
      body: {
        NetworkId: address.NetworkId,
        ChainId: address.ChainId,
        BlockchainName: address.BlockchainName,
        PublicAddress: address.PublicAddress,
      },
    })
      .then(() => {
        getUserAddresses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserAddresses();
  }, []);

  return (
    <>
      <CustomModal
        onClose={() => setShowRegisterEternlWallet(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          itemsAlign: 'center',
        }}
      >
        {!showRegisterEternlWallet ? (
          <div className={styles.registerWalletsButtonsContainer}>
            <RegisterMetaMaskButton
              as='button'
              variant='primary'
              size='lg'
              buttonText='Register with MetaWallet'
              onSuccess={closeModalAndRefetch}
            />
            <div className={styles.divider} />
            <div className={styles.cardanoButtonContainer}>
              <button
                className={styles.cardanoButton}
                onClick={() => {
                  dispatch(setIsOpen(false));
                  setShowRegisterEternlWallet(true);
                  dispatch(setIsOpen(true));
                }}
              >
                <CardanoLogo />
                Register with Cardano
              </button>
            </div>
          </div>
        ) : (
          <RegisterCardanoWallets
            onSuccess={closeModalAndRefetch}
            setShowRegisterEternlWallet={setShowRegisterEternlWallet}
          />
        )}
      </CustomModal>

      <div className={styles.card}>
        <div className={styles.walletsHeader}>
          <h1>Wallet Addresses</h1>
          <button
            className={styles.registerWalletButton}
            onClick={() => dispatch(setIsOpen(true))}
          >
            Register New Wallet
          </button>
        </div>
        <div className={styles.addressContainer}>
          {userAddresses.length === 0 ? (
            <h6
              style={{
                textAlign: 'center',
                fontFamily: 'var(--secondary-font)',
                paddingTop: '20px',
                color: 'var(--text-color-2)',
              }}
            >
              You have no registered addresses
            </h6>
          ) : (
            userAddresses?.map((address) => (
              <div key={address.PublicAddress} className={styles.walletAddress}>
                <WalletAddress
                  address={address.PublicAddress}
                  onClick={() => handleDeleteAddress(address)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterWalletCard;
