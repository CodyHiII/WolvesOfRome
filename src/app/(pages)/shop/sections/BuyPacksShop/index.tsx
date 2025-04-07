'useClient';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Listbox } from '@headlessui/react';
import { TbArrowsMoveVertical } from 'react-icons/tb';

import { get } from '@/helpers/utils/fetch';
import PacksTab from '@/components/PacksTab';
import { getCurrency } from '@/store/currency/selectors';
import { envCurrency } from '@/helpers/utils/getEnvCurrency';
import ShopItem from '@/components/ShopItem';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';
import { openModal } from '@/store/modalX/slice';

import styles from './styles.module.css';
import Loading from '@/components/Loading';
import { Container } from 'react-bootstrap';
import CardPacksShopCard from '@/components/CardPacksShopCard';

type StoreType = {
  storeName: String;
  storeItems: PacksType;
  storeColor: string;
}[];

type PacksType = {
  itemId: string;
  imageUrl?: string;
  displayName: string;
  description: string;
  itemClass: string;
  tags?: string[];
  virtualCurrencyPrices: any;
  disabled?: boolean;
};

const BuyPacksShop = () => {
  const [shopExpansions, setShopExpansions] = useState<StoreType>();
  const [isLoading, setIsLoading] = useState(true);

  const getShopExpansions = () => {
    get({ url: '/api/store/items' })
      .then((response: StoreType) => {
        setShopExpansions(response);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getShopExpansions();
  }, []);

  return (
    <Container className='custom-container'>
      <div className={styles.buyPacksContainer}>
        <div className={styles.heading}>
          <h1>Buy Card Packs</h1>
          <p>
            Buy Card Packs, Collect Powerful Cards, and Unleash the Might of
            Empires with Rare Rewards in Every Pack!
          </p>
        </div>
        {isLoading ? (
          <Loading height='100%' />
        ) : (
          <>
            {shopExpansions?.map((expansion) => (
              <CardPacksShopCard data={expansion} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default BuyPacksShop;
