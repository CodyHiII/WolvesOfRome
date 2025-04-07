'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSyncAlt } from 'react-icons/fa';

import { get, post } from '@/helpers/utils/fetch';
import useBurnNft from '@/helpers/utils/burnNft';
import { Container, Row, Col } from 'react-bootstrap';
import InventoryItem from '@/components/InventoryItem';
import { openModal } from '@/store/modalX/slice';
import FullHeightSection from '@/components/FullHeightSection';
import Typography from '@/components/Typography';
import InventoryCard from '@/components/InventoryCard';
import CardsSkeletonLoader from '@/components/CardsSkeletonLoader';

import styles from './styles.module.css';
import Filters from '@/components/Filters';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

const InventoryPage = () => {
  const [areItemsLoading, setAreItemsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');
  const [isInventorySyncing, setIsInventorySyncing] = useState(false);

  const [filtersData, setFiltersData] = useState([]);
  const [userInventoryCards, setUserInventoryCards] = useState<any>([]);
  const [userInventoryNFTs, setUserInventoryNFTs] = useState<any>([]);

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
  });

  const dispatch = useDispatch();

  const getInventoryCards = async () => {
    let url = `/api/user/inventory/cards/filtered?page=${page}&size=${size}`;

    if (filters.rarity) {
      url += `&rarity=${filters.rarity}`;
    }
    if (filters.empire) {
      url += `&empire=${filters.empire}`;
    }
    if (filters.collection) {
      url += `&collection=${filters.collection}`;
    }
    if (filters.commander) {
      url += `&commander=${filters.commander}`;
    }
    if (filters.cardType) {
      url += `&cardType=${filters.cardType}`;
    }

    get({ url })
      .then((response) => {
        setUserInventoryCards([...userInventoryCards, ...response.content]);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setAreItemsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInventoryNFTs = async () => {
    get({ url: '/api/user/inventory/nft' })
      .then((response) => {
        setUserInventoryNFTs(response);
        setAreItemsLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const getFilters = () => {
    get({
      url: 'api/catalogue/filters?inventory=true',
    })
      .then((response) => {
        setFiltersData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadMore = () => {
    setAreItemsLoading(true);
    if (page <= totalPages) {
      setPage(page + 1);
    } else {
      return;
    }
  };

  const handleFilterChange = (filterKey: any, filterValue: any) => {
    setAreItemsLoading(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));

    setUserInventoryCards([]);
    setPage(0);
  };

  useEffect(() => {
    getFilters();
  }, [filters]);

  useEffect(() => {
    getInventoryCards();
  }, [filters, page]);

  useEffect(() => {
    getInventoryNFTs();
  }, [activeTab]);

  const handleBurn = (thx: string, address: string) => {
    post({
      url: '/api/user/validate/nft/burn',
      body: {
        thx: thx,
        playerAddress: address,
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const { burnNft, address, burnError, connectionError, thxHash } =
    useBurnNft();

  useEffect(() => {
    if (thxHash && address) {
      handleBurn(thxHash, address);
    }
  }, [thxHash]);

  useEffect(() => {
    if (burnError) {
      console.log(`Show Burn Error on Frontend: ${burnError}`);
    }

    if (connectionError) {
      console.log(`Show Connection Error on Frontend: ${connectionError}`);
    }
  }, [burnError, connectionError]);

  const openMoreInfo = (items: any, index: number) => {
    dispatch(
      openModal({
        type: 'itemMoreDetails',
        props: {
          items,
          index,
          totalItems: totalElements,
          pageSize: items.length,
          currentPage: 0,
        },
      })
    );
  };

  const syncInventory = async () => {
    get({ url: '/api/user/inventory/sync' })
      .then((response) => {
        setIsInventorySyncing(false);
        toast.success('Inventory successfully synced', {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSyncInventoryButtonClick = () => {
    setIsInventorySyncing(true);
    syncInventory();
  };

  const renderNFTS = () => {
    return userInventoryNFTs.length !== 0 ? (
      <Row className='d-flex justify-content-center'>
        {userInventoryNFTs.map((item: any, index: number) => (
          <Col
            key={item.NftId}
            xs={8}
            md={5}
            lg={4}
            className='custom-xxl-20 col-margin'
          >
            <InventoryItem
              image={item.ItemImageUrl}
              title={item.DisplayName}
              description={item.Description}
              tag={item.Tags?.[0] ?? ''}
              showButton={true}
              buttonText={address ? 'Burn' : 'Connect Wallet'}
              onButtonClick={() => burnNft(item)}
            />
          </Col>
        ))}
      </Row>
    ) : (
      <div className={styles.emptyInventory}>
        <Typography
          variant='body-1'
          font='quaternary'
          fontWeight='medium'
          align='center'
          color='var(--primary)'
        >
          Sorry, there are no NFTs to be displayed.
        </Typography>
      </div>
    );
  };

  const renderInventoryItems = () => {
    return userInventoryCards.length !== 0 ? (
      <>
        <Row className='d-flex justify-content-center'>
          {userInventoryCards?.map((item: any, index: number) => (
            <Col
              key={item.Fingerprint}
              xs={8}
              md={4}
              lg={3}
              className='custom-xxl-20-1200 col-margin'
            >
              <InventoryCard
                image={item.ItemImageUrl}
                title={item.DisplayName}
                tag={item.Rarity}
                quantity={item.Quantity}
                showButton={false}
                onImgClick={() => openMoreInfo(userInventoryCards, index)}
              />
            </Col>
          ))}
        </Row>
        <Row className='d-flex justify-content-center'>
          {totalPages > 1 && page < totalPages - 1 && (
            <Button
              className={styles.loadMoreBtn}
              as='button'
              variant='primary'
              size='lg'
              onClick={loadMore}
              margin='40px 0'
            >
              Load More
            </Button>
          )}
        </Row>
      </>
    ) : (
      <div className={styles.emptyInventory}>
        <Typography
          variant='body-1'
          font='quaternary'
          fontWeight='medium'
          align='center'
          color='var(--primary)'
        >
          Sorry, there are no cards to be displayed.
        </Typography>
        <button
          className={styles.syncInventoryButton}
          onClick={handleSyncInventoryButtonClick}
        >
          <FaSyncAlt className={isInventorySyncing ? styles.isRotating : ''} />{' '}
          Sync Inventory
        </button>
      </div>
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
          align='center'
        >
          Inventory
        </Typography>
      </div>
      <Container className='custom-container'>
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.headerButtons} ${
              activeTab === 'items' && styles.activeButton
            }`}
            onClick={() => setActiveTab('items')}
          >
            Cards
          </button>
          <button
            className={`${styles.headerButtons} ${
              activeTab === 'nfts' && styles.activeButton
            }`}
            onClick={() => setActiveTab('nfts')}
          >
            NFTs
          </button>
        </div>
        <Filters
          data={filtersData}
          filtersState={filters}
          setFilters={handleFilterChange}
        />
        {areItemsLoading ? (
          <CardsSkeletonLoader
            cardNumber={15}
            cardWidth='100%'
            cardHeight='350px'
            xs={8}
            md={4}
            lg={3}
            className='custom-xxl-20-1200 col-margin'
          />
        ) : (
          <>
            {activeTab === 'nfts' && renderNFTS()}
            {activeTab === 'items' && renderInventoryItems()}
          </>
        )}
      </Container>
    </FullHeightSection>
  );
};

export default InventoryPage;
