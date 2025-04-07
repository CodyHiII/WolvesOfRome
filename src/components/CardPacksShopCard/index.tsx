'useClient';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import PacksTab from '@/components/PacksTab';
import { getCurrency } from '@/store/currency/selectors';
import { envCurrency } from '@/helpers/utils/getEnvCurrency';
import ShopItem from '@/components/ShopItem';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';
import { openModal } from '@/store/modalX/slice';
import { routes } from '@/routes';
import { useAuthStatus } from '@/helpers/hooks/useAuthStatus';

import styles from './styles.module.css';

type CardPacksShopCardType = {
  data: any;
};

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

const CardPacksShopCard = ({ data }: CardPacksShopCardType) => {
  const [selectedPack, setSelectedPack] = useState<PacksType>();
  const [amountOfPacks, setAmountOfPacks] = useState<number>(1);

  const handlePackSelect = (pack: any) => {
    setSelectedPack(pack);
  };

  const dispatch = useDispatch();
  const { push } = useRouter();
  const isAuthenticated = useAuthStatus();
  const gloriumBalance = useSelector(getCurrency);

  const openPurchaseConfirmation = () => {
    if (!isAuthenticated) {
      push(routes.login);
    } else {
      dispatch(
        openModal({
          type: 'confirmPackPurchase',
          props: {
            packsAmount: amountOfPacks,
            selectedPack: selectedPack,
            currency: 'Glorium',
          },
        })
      );
    }
  };

  useEffect(() => {
    setSelectedPack(data.storeItems[0]);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.cardTitle}>{data.storeName}</h1>
      <div className={styles.content}>
        <div className={styles.tabs}>
          {data.storeItems?.map((pack: PacksType) => (
            <PacksTab
              image={pack.imageUrl ? pack.imageUrl : '/cardPlaceholder.svg'}
              title={pack.displayName}
              subTitle={`${
                formatNumberWithCommas(
                  pack.virtualCurrencyPrices[envCurrency]
                ) ?? '0'
              } Glorium`}
              isSelected={selectedPack === pack}
              onClick={() => handlePackSelect(pack)}
              color={data?.storeColor ?? ''}
            />
          ))}
        </div>

        {selectedPack && (
          <ShopItem
            tag='Wolve of Rome'
            itemImage={
              selectedPack?.imageUrl
                ? selectedPack?.imageUrl
                : '/cardPlaceholder.svg'
            }
            title={selectedPack?.displayName}
            description={selectedPack?.description}
            price={selectedPack?.virtualCurrencyPrices?.[envCurrency]}
            currency='Glorium'
            setItemAmount={setAmountOfPacks}
            buttonText='BUY'
            onClick={() => openPurchaseConfirmation()}
            userBalance={gloriumBalance!}
            color={data?.storeColor ?? ''}
          />
        )}
      </div>
    </div>
  );
};

export default CardPacksShopCard;
