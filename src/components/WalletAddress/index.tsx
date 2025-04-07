import React from 'react';
import { IoClose } from 'react-icons/io5';
import { IoMdOpen } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import { openModal } from '@/store/modalX/slice';
import { shortenAddress } from '@/helpers/utils/shortenAddress';

import styles from './styles.module.css';

type AddressType = {
  address: string;
  onClick?: () => void;
};

const WalletAddress = ({ address, onClick }: AddressType) => {
  const dispatch = useDispatch();

  const openFullAddress = () => {
    dispatch(
      openModal({
        type: 'showFullAddress',
        props: {
          address,
        },
      })
    );
  };

  return (
    <div className={styles.addressContainer}>
      <div className={styles.statusIcon} />
      <p>{shortenAddress(address)}</p>
      <div className={styles.buttons}>
        <button
          className={`${styles.openBtn} ${styles.btn}`}
          onClick={openFullAddress}
        >
          <IoMdOpen />
        </button>
        <div className={styles.divider} />
        <button
          className={`${styles.closeBtn} ${styles.btn}`}
          onClick={onClick}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default WalletAddress;
