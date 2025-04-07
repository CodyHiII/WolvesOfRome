'use client';
import { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import Loading from '../Loading';
import { setIsOpen } from '@/store/modal/slice';

import styles from './styles.module.css';

const DynamicRegisterCardanoWalletButton = dynamic(
  () => import('../RegisterCardanoWalletButton'),
  {
    ssr: false,
    loading: () => <Loading height='50px' />,
  }
);

type RegisterCardanoWalletType = {
  onSuccess?: () => void;
  setShowRegisterEternlWallet?: Dispatch<SetStateAction<boolean>>;
};

const RegisterCardanoWallets = ({
  onSuccess,
  setShowRegisterEternlWallet,
}: RegisterCardanoWalletType) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setIsOpen(false));
    setShowRegisterEternlWallet!(false);
  };

  return (
    <div className={styles.popupWrapper} onClick={handleCloseModal}>
      <div className={styles.popupContainer}>
        <h3>Cardano Wallet Register</h3>
        <div className={styles.buttonsContainer}>
          <DynamicRegisterCardanoWalletButton
            wallet='eternl'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='nami'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='lace'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='flint'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='begin'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='gero'
            onSuccess={onSuccess}
          />
          <DynamicRegisterCardanoWalletButton
            wallet='nufi'
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterCardanoWallets;
