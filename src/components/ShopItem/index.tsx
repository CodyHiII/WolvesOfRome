'use client';
import { useEffect, useState } from 'react';

import Button from '../Button';
import SelectAmount from '../SelectAmount';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';
import { routes } from '@/routes';

import styles from './styles.module.css';

type ShopItemType = {
  tag?: string;
  itemImage: string;
  title: string;
  description: string;
  price: string | number;
  currency: string;
  setItemAmount: (amount: number) => void;
  buttonText: string;
  onClick: () => void;
  userBalance: string | number;
  color?: string;
};

const ShopItem = ({
  tag,
  itemImage,
  title,
  description,
  price,
  currency,
  setItemAmount,
  buttonText,
  onClick,
  userBalance,
  color,
}: ShopItemType) => {
  const [notEnoughFounds, setNotEnoughFounds] = useState(false);
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(Number(price));

  const displayTotalPrice =
    isNaN(totalPrice) || totalPrice <= 0 ? price : totalPrice;

  const handleAmountChange = (newAmount: number) => {
    if (Number(price) * newAmount > Number(userBalance)) {
      setNotEnoughFounds(true);
    } else {
      setNotEnoughFounds(false);
    }

    setAmount(newAmount);
    setTotalPrice(Number(price) * newAmount);
  };

  useEffect(() => {
    setTotalPrice(Number(price) * amount);
  }, [price]);

  useEffect(() => {
    setItemAmount(amount);
  }, [amount]);

  return (
    <div
      className={styles.itemContainer}
      style={
        {
          '--_accent-color': color ? color : 'var(--primary)',
        } as React.CSSProperties
      }
    >
      <div className={styles.itemImageContainer}>
        <img src={itemImage} alt={`${title} image`} />
      </div>

      <div className={styles.itemContent}>
        <div className={styles.heading}>
          {tag && <p className={styles.tag}>{tag}</p>}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.pricesContainer}>
          <div className={styles.priceContainer}>
            <p className={styles.itemPrice}>
              {formatNumberWithCommas(price)}{' '}
              <span className={styles.currency}>{currency}</span>
            </p>
            <div className={styles.amountSelector}>
              <SelectAmount onAmountChange={handleAmountChange} color={color} />
            </div>
          </div>
          <p className={styles.totalPriceContainer}>
            Total Price:{' '}
            <span className={styles.totalPrice}>
              {formatNumberWithCommas(displayTotalPrice) ?? ''}
            </span>
            <span className={styles.currency}>{currency}</span>
          </p>
        </div>

        <Button
          as='button'
          variant='secondary'
          size='secondary-md'
          fullWidth
          onClick={onClick}
        >
          {buttonText}
        </Button>
        {notEnoughFounds && (
          <p className={styles.error}>
            {`Insufficient founds. Add more ${currency}`}{' '}
            <a href={routes.gloriumShop}>here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopItem;
