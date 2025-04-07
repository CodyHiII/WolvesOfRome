'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseCircle } from 'react-icons/io5';
import { FaCirclePlay } from 'react-icons/fa6';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

import { routesConfig, routes } from '@/routes';
import { post } from '@/helpers/utils/fetch';
import { logOut } from '@/store/auth/slice';
import { clearUserData } from '@/store/user/slice';
import { setCurrency } from '@/store/currency/slice';
import { getCurrency } from '@/store/currency/selectors';
import { useClickOutside } from '@/helpers/hooks/useClickOutside';
import { getUserBalance } from '@/helpers/utils/getUserBalance';
import { openModal } from '@/store/modalX/slice';
import { socials } from '@/data/socials';
import { useAuthStatus } from '@/helpers/hooks/useAuthStatus';
import useIsMobile from '@/helpers/hooks/useIsMobile';
import Button from '../Button';
import UserPanel from '../UserPanel';
import BallancePanel from '../BallancePanel';
import Typography from '../Typography';

import styles from './styles.module.css';

const Navigation = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const isMobile = useIsMobile();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { push, refresh } = useRouter();
  const userBallance = useSelector(getCurrency);
  const isAuthenticated = useAuthStatus();

  const navRef = useRef();

  const openMenu = () => {
    setOpenSideMenu(true);
  };

  const closeMenu = () => {
    setOpenSideMenu(false);
  };

  useClickOutside(navRef, closeMenu);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const initializeBalance = () => {
      try {
        const initialBalance = getUserBalance();
        initialBalance.then((response) => {
          dispatch(setCurrency(response));
        });
      } catch (error) {
        console.log('Error initializing balance:', error);
      }
    };

    if (isAuthenticated) {
      initializeBalance();
    }
  }, [isAuthenticated, dispatch]);

  const onLogOut = () => {
    post({ url: '/api/auth/logout' });
    dispatch(logOut());
    dispatch(clearUserData());
    closeMenu();
    pathname != routes.home ? push('/') : refresh();
  };

  const playFullScreenTrailer = () => {
    dispatch(
      openModal({
        type: 'fullScreenTrailer',
        props: {
          src: '/TrailerCompress.mp4',
        },
      })
    );
    closeMenu();
  };

  return (
    <>
      <nav className={styles.nav} id='navBar'>
        <div className={styles.logoContainer}>
          <Link href='/'>
            <img src='/LogoWhite.png' />
          </Link>
        </div>
        <div className={styles.navContent}>
          {isAuthenticated && (
            <div className={styles.navItems}>
              {!isMobile && (
                <>
                  <BallancePanel ballance={userBallance} />
                  <UserPanel />
                </>
              )}
            </div>
          )}
          <button onClick={openMenu} className={styles.navButton}>
            <GiHamburgerMenu />
          </button>
        </div>
      </nav>
      <div
        ref={navRef}
        className={`${styles.sideMenuContainer} ${
          openSideMenu && styles.sideMenuContainerOpen
        }`}
      >
        <div className={styles.menuHeader}>
          <Typography variant='h5' font='ternary' fontWeight='extrabold'>
            WoR
          </Typography>
          <button className={styles.closeMenuButton} onClick={closeMenu}>
            <Typography variant='body-3' font='ternary' fontWeight='bold'>
              CLOSE MENU
            </Typography>
            <IoCloseCircle className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.menuContainerContent}>
          {isAuthenticated && (
            <div className={styles.avatarContainer}>
              <UserPanel
                avatarWidth='90px'
                userNameTextVariant='h4'
                buttonTextVariant='body-2'
              />
              <button
                className={styles.trailerButton}
                onClick={() => playFullScreenTrailer()}
              >
                <Typography
                  variant='body-3'
                  font='quaternary'
                  fontWeight='extrabold'
                >
                  PLAY TRAILER
                </Typography>
                <FaCirclePlay className={styles.trailerButtonIcon} />
              </button>
            </div>
          )}
          <div className={styles.linksContainer}>
            {isMobile && <BallancePanel ballance={userBallance} />}
            <button
              className={styles.shopButton}
              onClick={() => push(routes.shop)}
            >
              <Typography
                variant='h5'
                font='quaternary'
                fontWeight='bold'
                lineHeight='100%'
              >
                Shop
              </Typography>
            </button>
            <ul className={styles.links}>
              {routesConfig.map(
                (route) =>
                  route.showInMenu && (
                    <li key={route.title}>
                      <Link
                        href={route.url}
                        className={`${styles.navLinks} ${
                          route.url === pathname && styles.active
                        } ${route.isComingSoon && styles.comingSoon}`}
                      >
                        {route.title}
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <div className={styles.navFooter}>
          <div className={styles.socialsContainer}>
            {socials.map((social) => (
              <Tooltip
                title={!social.comingSoon ? social.title : 'Coming Soon'}
                placement='top'
                arrow
              >
                <Link
                  className={`${styles.social} ${
                    social.comingSoon ? styles.comingSoon : ''
                  }`}
                  href={social.url}
                  target={social.comingSoon ? '' : '_blank'}
                >
                  <social.icon />
                </Link>
              </Tooltip>
            ))}
          </div>
          {isAuthenticated ? (
            <Button
              variant='quinary'
              size='md'
              as='button'
              onClick={onLogOut}
              fullWidth
            >
              SIGN OUT
            </Button>
          ) : (
            <>
              <Button
                variant='quinary-secondary'
                size='md'
                as='Link'
                href={routes.login}
                fullWidth
                margin='0 0 10px 0'
              >
                LOG IN
              </Button>
              <Button
                variant='quinary'
                size='md'
                as='Link'
                href={routes.signup}
                fullWidth
              >
                SIGN IN
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
