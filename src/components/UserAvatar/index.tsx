import React from 'react';
import { GiWolfHowl } from 'react-icons/gi';

import { UserAvatarType } from '@/types';

import styles from './styles.module.css';

const UserAvatar = ({ frame, image, avatarWidth = '55px' }: UserAvatarType) => {
  return (
    <div className={styles.avatarContainer} style={{ width: avatarWidth }}>
      <img className={styles.frame} src={frame} alt='avatar frame' />
      {image ? (
        <img
          className={styles.avatarImage}
          src={image}
          alt='user avatar image'
        />
      ) : (
        <div className={styles.defaultAvatar}>
          <GiWolfHowl size={'40%'} />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
