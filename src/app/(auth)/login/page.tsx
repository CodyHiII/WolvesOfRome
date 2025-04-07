'use client';
import { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Link from 'next/link';

import Input from '@/components/Input';
import Button from '@/components/Button';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import { routes } from '@/routes';
import { setToken } from '@/store/auth/slice';
import { getUserData } from '@/store/user/slice';
import { RootState } from '@/store/createStore';
import { userTokenSelector } from '@/store/auth/selectors';

import styles from './styles.module.css';
// import { GoogleLogin } from '@react-oauth/google';

const LogInPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(992);

  const tokenSelector = useSelector(userTokenSelector);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/login', userData);
      const token = response.data.accessTokens;

      dispatch(setToken(token));

      setError('');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        setError('Incorrect credentials');
      } else {
        console.log('Login Error', error);
      }
    }
  };

  const handleKeyPress = (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      onLogin();
    }
  };

  const dispatchUserData = async () => {
    if (tokenSelector && isLoading === false) {
      await (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
        getUserData()
      );
    }
  };

  const googleResponseMessage = (response: any) => {
    console.log(response);
  };

  useEffect(() => {
    dispatchUserData();
  }, [tokenSelector]);

  return (
    <div className={styles.container}>
      {!isTablet && (
        <div className={styles.mainImgContainer}>
          <img
            className={styles.mainBgImg}
            src='/01RO015.png'
            alt='background image'
          />
        </div>
      )}
      <div className={styles.formContainer}>
        <div className={styles.worLogo}>
          <Link href='/'>
            <img src='/LogoWhite.png' alt='wolves of rome logo' />
          </Link>
        </div>
        <h1 className={styles.formTitle}>Sign in</h1>
        <p className={styles.formSubtitle}>to continue to The Hub</p>
        <div className={styles.inputContainer}>
          <Input
            label='Email'
            showLabel={false}
            placeholder='E-mail'
            type='email'
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <Input
            label='Password'
            showLabel={false}
            placeholder='Password'
            type='password'
            value={userData.password}
            onKeyDown={handleKeyPress}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          {error && <p className={styles.errorMsg}>{error}</p>}
          <Button
            as='button'
            size={isMobile ? 'lg' : 'xl'}
            variant='primary'
            onClick={onLogin}
          >
            {isLoading ? (
              <CircularProgress
                thickness={6}
                size='24px'
                color='inherit'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              'Submit'
            )}
          </Button>
          {/* <GoogleLogin
            onSuccess={googleResponseMessage}
            theme='filled_black'
            shape='pill'
            text='continue_with'
          /> */}
          <Link href={routes.signup} className={styles.loginRouteBtn}>
            Want to Create a Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
