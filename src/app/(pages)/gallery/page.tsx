'use client';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Tilt from 'react-parallax-tilt';

import { get } from '@/helpers/utils/fetch';
import { openModal } from '@/store/modalX/slice';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { getRarityColor } from '@/helpers/utils/getRarityColor';
import CardsSkeletonLoader from '@/components/CardsSkeletonLoader';
import Filters from '@/components/Filters';
import FullHeightSection from '@/components/FullHeightSection';

import styles from './styles.module.css';
import { useAuthStatus } from '@/helpers/hooks/useAuthStatus';
import axiosInstance from '@/app/axiosInstance';
import { TbFilters } from 'react-icons/tb';

const GalleryPage = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [filtersData, setFiltersData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [filters, setFilters] = useState({
    rarity: null,
    empire: null,
    collection: null,
    cardType: null,
    commander: false,
    hideOwnedItems: false,
  });

  const dispatch = useDispatch();
  const isAuthenticated = useAuthStatus();

  const maxTiltAngle = 20;

  const getCards = async () => {
    let url = `/api/catalogue/all/filtered?page=${page}&size=${size}`;

    if (filters.rarity) {
      url += `&${filters.rarity}`;
    }
    if (filters.empire) {
      url += `&${filters.empire}`;
    }
    if (filters.collection) {
      url += `&${filters.collection}`;
    }
    if (filters.commander) {
      url += `&${filters.commander}`;
    }
    if (filters.cardType) {
      url += `&${filters.cardType}`;
    }
    if (filters.hideOwnedItems) {
      url += `&${filters.hideOwnedItems}`;
    }

    if (isAuthenticated) {
      get({ url })
        .then((response) => {
          setCards([...cards, ...response.content]);
          setTotalPages(response.totalPages);
          setTotalElements(response.totalElements);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      try {
        const response = await axiosInstance.get(url);
        const data = response.data;

        setCards([...cards, ...data.content]);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const getFilters = () => {
    get({
      url: 'api/catalogue/filters',
    })
      .then((response) => {
        setFiltersData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadMore = () => {
    setLoading(true);
    if (page <= totalPages) {
      setPage(page + 1);
    } else {
      return;
    }
  };

  const handleFilterChange = (filterId: any, optionId: any) => {
    setLoading(true);
    const modifiedFilterValue =
      optionId === null ? null : `${filterId}=${optionId}`;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: modifiedFilterValue,
    }));

    setCards([]);
    setPage(0);
  };

  useEffect(() => {
    getFilters();
  }, [filters]);

  useEffect(() => {
    getCards();
  }, [filters, page]);

  const openMoreInfo = (index: number) => {
    dispatch(
      openModal({
        type: 'itemMoreDetails',
        props: {
          items: cards,
          index,
          totalItems: totalElements,
          pageSize: size,
          currentPage: page,
        },
      })
    );
  };

  return (
    <FullHeightSection fullMinHeight>
      <div className={styles.header}>
        <Typography
          variant='h1'
          font='ternary'
          fontWeight='bold'
          color='var(--primary)'
        >
          Gallery
        </Typography>
        <Typography
          variant='body-1'
          font='quaternary'
          fontWeight='regular'
          align='center'
        >
          Discover over 300 cards and dive into epic adventures
        </Typography>
      </div>
      <Container className='custom-container'>
        <Row className='mb-4'>
          <Filters
            data={filtersData}
            filtersState={filters}
            setFilters={handleFilterChange}
          />
        </Row>
        <Row className='d-flex justify-content-center'>
          {loading ? (
            <CardsSkeletonLoader
              cardNumber={15}
              cardWidth='100%'
              cardHeight='350px'
              xs={8}
              md={4}
              lg={3}
              className='custom-xxl-20-1200 col-margin'
            />
          ) : cards.length === 0 ? (
            <Typography
              variant='body-1'
              font='quaternary'
              fontWeight='medium'
              align='center'
              color='var(--primary)'
            >
              Sorry, there are no cards to be displayed.
            </Typography>
          ) : (
            cards.map((item, index) => (
              <Col
                key={item.Fingerprint}
                xs={8}
                md={4}
                lg={3}
                className='custom-xxl-20-1200'
              >
                <div
                  className={styles.cardImageContainer}
                  onClick={() => openMoreInfo(index)}
                >
                  <div
                    className={styles.glow}
                    style={{
                      backgroundColor: getRarityColor(item.Rarity),
                    }}
                  />
                  <Tilt
                    tiltReverse={true}
                    tiltMaxAngleX={maxTiltAngle}
                    tiltMaxAngleY={maxTiltAngle}
                    transitionEasing={'cubic-bezier(0.175, 0.885, 0.32, 1.275)'}
                  >
                    <img
                      className={styles.cardImage}
                      src={item.ItemImageUrl}
                      alt={item.DisplayName}
                    />
                  </Tilt>
                </div>
              </Col>
            ))
          )}
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
    </FullHeightSection>
  );
};

export default GalleryPage;
