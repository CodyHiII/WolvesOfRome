import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

import UserAvatar from '../UserAvatar';
import Typography from '../Typography';
import { UserAvatarType } from '@/types';
import { TypographyVariant } from '@/types';
import { get } from '@/helpers/utils/fetch';

import styles from './styles.module.css';

type UserPanelTypes = {
  userName: string;
  userNameTextVariant?: TypographyVariant;
  buttonTextVariant?: TypographyVariant;
  direction?: 'horizontal' | 'vertical';
};

type Types = UserPanelTypes & UserAvatarType;

const UserPanel = ({
  direction = 'horizontal',
  avatarWidth,
  userNameTextVariant = 'h5',
  buttonTextVariant = 'body-3',
}: Types) => {
  const [userName, setUserName] = useState('Anon');

  const getUser = () => {
    get({ url: '/api/user' })
      .then((response) => {
        setUserName(response.DisplayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className={styles.userPanelContainer}
      style={{
        flexDirection: direction === 'vertical' ? 'column' : 'initial',
      }}
    >
      <UserAvatar frame='/IconFrame-Common.svg' avatarWidth={avatarWidth} />
      <div
        className={styles.userName}
        style={{
          alignItems: direction === 'vertical' ? 'center' : 'flex-start',
        }}
      >
        <Typography
          variant={userNameTextVariant}
          font='ternary'
          fontWeight='bold'
        >
          {userName}
        </Typography>
        <Tooltip title='Coming Soon' placeholder='bottom' arrow>
          <button className={`${styles.seeProfileBtn} ${styles.disabled}`}>
            <Typography
              variant={buttonTextVariant}
              font='quaternary'
              fontWeight='semibold'
              color='var(--text-color)'
            >
              See Profile
            </Typography>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserPanel;
