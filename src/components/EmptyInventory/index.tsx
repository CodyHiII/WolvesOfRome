import React, { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.css';

type EmptyInventoryType = {
  margin?: string;
  message?: string | ReactNode;
};

const EmptyInventory = ({ message, margin }: EmptyInventoryType) => {
  const renderMessage = (message: string | ReactNode) => {
    if (typeof message === 'string') {
      return <p>{message}</p>;
    } else {
      return message;
    }
  };

  return (
    <div className={styles.container} style={{ margin }}>
      <h1>Your inventory is empty</h1>
      {message && renderMessage(message)}
    </div>
  );
};

export default EmptyInventory;
