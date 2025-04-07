'use client';
import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../axiosInstance';
import { CircularProgress } from '@mui/material';
import { BsCheck } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { BiErrorAlt } from 'react-icons/bi';
import Link from 'next/link';

import { routes } from '@/routes';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/auth/slice';

import styles from './styles.module.css';

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayValidation, setDisplayValidation] = useState(false);

  const [validation, setValidation] = useState([
    {
      id: 1,
      name: 'min8Characters',
      isValid: false,
      validationMsg: 'Password should be at least 8 characters long',
    },
    {
      id: 2,
      name: 'lowerCase',
      isValid: false,
      validationMsg: 'Password should contain at least 1 lowercase letter',
    },
    {
      id: 3,
      name: 'upperCase',
      isValid: false,
      validationMsg: 'Password should contain at least 1 uppercase letter',
    },
    {
      id: 4,
      name: 'specialCharacter',
      isValid: false,
      validationMsg: 'Password should contain at least 1 special character',
    },
    {
      id: 5,
      name: 'passwordsMatching',
      isValid: false,
      validationMsg: 'Confirm Password should be the same as Password',
    },
  ]);

  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(992);

  const onSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/register', userData);
      const token = response.data.accessTokens;

      dispatch(setToken(token));

      setErrors([]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setErrors([]);
      setErrors((prevErrors) => {
        const newErrors = [];

        !handleEmailValidation() &&
          newErrors.push('Email must be an valid email');
        !handleUserDisplayNameValidation() &&
          newErrors.push('Display Name should be at least 3 characters long');

        return [...prevErrors, ...newErrors];
      });

      console.log('Login Error', error);
    }
  };

  const handleEmailValidation = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(userData.email);
  };

  const handleUserDisplayNameValidation = () => {
    const displayNamePattern = /^.{3,}$/;

    return displayNamePattern.test(userData.displayName);
  };

  const handlePasswordValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const userPassword = e.target.value;
    setUserData({ ...userData, password: userPassword });

    const updatedValidation = validation.map((rule) => {
      switch (rule.name) {
        case 'min8Characters':
          return {
            ...rule,
            isValid: userPassword.length >= 8,
          };
        case 'lowerCase':
          return {
            ...rule,
            isValid: /[a-z]/.test(userPassword),
          };
        case 'upperCase':
          return {
            ...rule,
            isValid: /[A-Z]/.test(userPassword),
          };
        case 'specialCharacter':
          return {
            ...rule,
            isValid: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(userPassword),
          };
        case 'passwordsMatching':
          return {
            ...rule,
            isValid:
              userPassword.length > 0 && userPassword === confirmPassword,
          };
        default:
          return rule;
      }
    });

    if (!displayValidation) {
      setDisplayValidation(true);
    }

    setValidation(updatedValidation);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const userConfirmPassword = e.target.value;
    setConfirmPassword(userConfirmPassword);

    const updateValidation = validation.map((rule) => {
      if (rule.name === 'passwordsMatching') {
        return {
          ...rule,
          isValid:
            userConfirmPassword.length > 0 &&
            userData.password === userConfirmPassword,
        };
      }
      return rule;
    });
    setValidation(updateValidation);
  };

  const areAllValidationsMet = () => {
    if (
      userData.displayName &&
      userData.email &&
      validation.every((rule) => rule.isValid)
    )
      return true;
  };

  const handleKeyPress = (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      areAllValidationsMet() && onSignup();
    }
  };

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
        <h1 className={styles.formTitle}>Create you WoR Account</h1>
        <p className={styles.formSubtitle}>to continue to The Hub</p>
        <div className={styles.inputContainer}>
          <Input
            label='Display Name'
            showLabel={false}
            placeholder='Display Name*'
            type='text'
            value={userData.displayName}
            onChange={(e) =>
              setUserData({
                ...userData,
                displayName: e.target.value,
                username: e.target.value,
              })
            }
          />
          <Input
            label='Email'
            showLabel={false}
            placeholder='E-mail*'
            type='email'
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <div className={styles.passwordFiledContainer}>
            <Input
              label='Password'
              showLabel={false}
              placeholder='Password*'
              type='password'
              value={userData.password}
              onChange={(e) => handlePasswordValidation(e)}
            />
            <Input
              label='ConfirmPassword'
              showLabel={false}
              placeholder='Confirm Password*'
              type='password'
              value={confirmPassword}
              onKeyDown={handleKeyPress}
              onChange={(e) => handleConfirmPassword(e)}
            />
          </div>
          <div className={styles.passwordValidationContainer}>
            <div className={styles.validationRules}>
              {validation.map((item) => (
                <p
                  key={item.id}
                  className={`${styles.validationText} ${
                    item.isValid ? styles.valid : styles.invalid
                  }`}
                >
                  {item.isValid ? <BsCheck /> : <BsDash />}
                  {item.validationMsg}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.errorsContainer}>
            {errors.map((error, index) => (
              <p key={index} className={styles.errorMsg}>
                <BiErrorAlt />
                {error}
              </p>
            ))}
          </div>
          <Button
            as='button'
            size={isMobile ? 'lg' : 'xl'}
            variant='primary'
            onClick={onSignup}
            disabled={!areAllValidationsMet()}
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
              'Sign Up'
            )}
          </Button>
          {/* <GoogleLogin
            onSuccess={googleResponseMessage}
            theme='filled_black'
            shape='pill'
            text='continue_with'
          /> */}
          <Link href={routes.login} className={styles.loginRouteBtn}>
            Want to Sign In Instead?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
