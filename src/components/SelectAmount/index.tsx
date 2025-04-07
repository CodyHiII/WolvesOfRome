'use client';
import { Dispatch, useState } from 'react';

import styles from './styles.module.css';

type SelectAmountProps = {
  onAmountChange: (amount: number) => void;
  color?: string;
};

const SelectAmount = ({ onAmountChange, color }: SelectAmountProps) => {
  const [amount, setAmount] = useState(1);

  const decrementAmount = () => {
    if (amount === 1) return;
    setAmount((prevAmount) => {
      const newAmount = prevAmount - 1;
      onAmountChange(newAmount);
      return newAmount;
    });
  };

  const incrementAmount = () => {
    setAmount((prevAmount) => {
      const newAmount = prevAmount + 1;
      onAmountChange(newAmount);
      return newAmount;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value, 10);

    setAmount(newAmount);
    onAmountChange(newAmount);
  };

  const handleEmptyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value, 10);

    const updatedAmount = isNaN(newAmount) || newAmount <= 0 ? 1 : newAmount;
    setAmount(updatedAmount);
    onAmountChange(updatedAmount);
    return updatedAmount;
  };

  return (
    <div
      className={styles.selectContainer}
      style={
        {
          '--_accent-color': color ? color : 'var(--primary)',
        } as React.CSSProperties
      }
    >
      <button className={styles.decrementButton} onClick={decrementAmount}>
        -
      </button>
      <input
        type='number'
        value={amount}
        onChange={handleInputChange}
        onBlur={handleEmptyInput}
      />
      <button className={styles.incrementButton} onClick={incrementAmount}>
        +
      </button>
    </div>
  );
};

export default SelectAmount;
