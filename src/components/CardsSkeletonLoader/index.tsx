import React from 'react';

import styles from './styles.module.css';
import { Col, Container, Row } from 'react-bootstrap';

type CardsSkeletonLoaderType = {
  cardNumber: number;
  cardWidth: string;
  cardHeight: string;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
};

const CardsSkeletonLoader = ({
  cardNumber,
  cardWidth,
  cardHeight,
  xs,
  sm,
  md,
  lg,
  xl,
  className,
}: CardsSkeletonLoaderType) => {
  const cardArray = Array.from({ length: cardNumber }, (_, index) => index);

  return (
    <Container className='custom-container'>
      <Row className='d-flex justify-content-center'>
        {cardArray?.map((card) => (
          <Col
            key={card}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={className}
          >
            <div
              className={styles.card}
              style={{ width: cardWidth, height: cardHeight }}
            ></div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsSkeletonLoader;
