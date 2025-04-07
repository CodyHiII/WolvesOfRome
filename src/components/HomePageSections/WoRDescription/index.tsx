import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Typography from '@/components/Typography';
import { IoClose } from 'react-icons/io5';

import useIsMobile from '@/helpers/hooks/useIsMobile';

import styles from './styles.module.css';

const WoRDescription = () => {
  const isMobile = useIsMobile();

  return (
    <Container className='mb-5'>
      <Row className='mb-3'>
        <Typography variant='h3' font='ternary' fontWeight='black'>
          About{' '}
          <Typography
            variant='h3'
            font='ternary'
            fontWeight='black'
            color='var(--primary)'
            span
          >
            WoR
          </Typography>
        </Typography>
      </Row>
      <Row className='mb-3'>
        <Col sm={12} className='mb-3'>
          <Typography
            variant='body-1'
            font='quaternary'
            fontWeight='regular'
            lineHeight={1.5}
          >
            Wolves of Rome (WoR) is a trading card game where you create your
            deck around legendary commanders and pit them against other players
            in epic competitive battles with immense strategic depth and high
            replay value.
          </Typography>
        </Col>
        <Col sm={12} className='mb-3'>
          <Typography
            variant='body-1'
            font='quaternary'
            fontWeight='regular'
            lineHeight={1.5}
          >
            The World of WoR immerses you in a rich fantasy realm where the
            pages of history intertwine with grim fantasy. Our story revolves
            around the eternal city of Rome, which is ruled by a
            divinely-blessed werewolves and their war against their mortal
            enemies—the Moloch worshiping vampires of Carthage, who have
            infiltrated most of the known Mediterranean world. Many warring
            empires exist across the realm, such as the Undead Pharaohs of
            Egypt, the Dragon People of the Qin Dynasty, the Lizardmen of the
            Yucatec, the Acolytes of the Dagon and many more horrors that lurk
            beyond the devil-infested borders outside of Rome's grasp, and even
            beyond the material plane itself.
          </Typography>
        </Col>
        <Col sm={12} className='mb-3'>
          <Typography
            variant='body-1'
            font='quaternary'
            fontWeight='regular'
            lineHeight={1.5}
          >
            The WoR universe was crafted for lovers of fantasy and weird
            fiction. We pay tribute to creative geniuses such as the great
            Robert E. Howard (Conan), J.R.R. Tolkien and H.P. Lovecraft; WOR
            draws inspiration from their fantastic worlds to ignite our sense
            for adventure and the thrill of the weird.
          </Typography>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col
          sm={12}
          md={6}
          className={`${
            isMobile && 'mb-3 d-flex align-items-center justify-content-center'
          }`}
        >
          <div className={styles.cardContainer}>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='bold'
              align='center'
            >
              <IoClose className={styles.icon} /> NOT written for modern
              audiences.
            </Typography>
          </div>
        </Col>
        <Col
          className={`${
            isMobile && 'd-flex align-items-center justify-content-center'
          }`}
        >
          <div className={styles.cardContainer}>
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='bold'
              align='center'
            >
              <IoClose className={styles.icon} /> NOT made to reflect the world
              we live in today.
            </Typography>
          </div>
        </Col>
      </Row>
      <Row>
        <Typography
          variant='body-1'
          font='quaternary'
          fontWeight='regular'
          lineHeight={1.5}
        >
          This fantasy universe serves as a medium of escapism. Out of respect
          for the player, we do not promote [current year] ideologies, allowing
          our world to serve as a pure, immersive experience that is free of
          [current thing] pushing—only the timeless glory of mighty kings and
          grinning skulls.
        </Typography>
      </Row>
    </Container>
  );
};

export default WoRDescription;
