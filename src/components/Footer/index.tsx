import { Container } from 'react-bootstrap';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';

import { socials } from '@/data/socials';

import styles from './styles.module.css';
import { routesConfig } from '@/routes';

const Footer = () => {
  return (
    <footer className={styles.footer} id='footer'>
      <Container className='custom-container'>
        <div className={styles.footerContent}>
          <div className={styles.menuContainer}>
            {routesConfig.map(
              (item, index) =>
                item.showInFooter && (
                  <Link
                    href={item.url}
                    key={index}
                    className={styles.footerLinks}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
          <div className={styles.socialsContainer}>
            <div className={styles.socials}>
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
            <p className={styles.socialsText}>
              Follow us. Your daily dose of WoR!
            </p>
          </div>
          <Link
            className={styles.playBtn}
            href='https://platform.gameswift.io/games/96460bb3-b117-405c-a306-0488c6c6077d-wolves-of-rome'
            target='_blank'
          >
            Play Now
          </Link>
        </div>
        <p className={styles.copy}>
          &copy; Wolves of Rome – All Rights Reserved
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
