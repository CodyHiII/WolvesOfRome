'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ItemCard from '../ItemCard';
import { getRarityColor } from '@/helpers/utils/getRarityColor';
import { get } from '@/helpers/utils/fetch';
import Button from '../Button';

import styles from './styles.module.css';

const NftsGrid = () => {
  const [userNfts, setUserNfts] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  const getItems = () => {
    get({ url: `/api/user/nft/paged?page=${page}&size=${size}` })
      .then((response) => {
        setUserNfts([...userNfts, ...response.content]);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    getItems();
  }, [page]);

  return (
    <Container className='custom-container'>
      <Row className='d-flex justify-content-center'>
        {userNfts?.map((item) => (
          <Col
            key={item.Fingerprint}
            xs={8}
            md={5}
            lg={4}
            className='custom-xxl-20 col-margin'
          >
            <ItemCard
              image={item.Image}
              imageHeight='310px'
              title={item.Name}
              category={item.Rarity}
              categoryColor={getRarityColor(item.Rarity)}
              description={item.Description}
              glorium={item.GMPerDay}
              gloriumText='glorium / day'
            />
          </Col>
        ))}
      </Row>
      {totalPages > 1 && page < totalPages - 1 && (
        <Button
          className={styles.loadMoreBtn}
          as='button'
          variant='primary'
          size='lg'
          onClick={loadMore}
        >
          Load More
        </Button>
      )}
    </Container>
  );
};

export default NftsGrid;
