import React from 'react';

import { ShowFullAddressType } from '@/types';

import styles from './styles.module.css';

const ShowFullAddress = ({ address }: ShowFullAddressType) => {
  return (
    <div className={styles.addressContainer}>
      <p>{address}</p>
    </div>
  );
};

export default ShowFullAddress;
