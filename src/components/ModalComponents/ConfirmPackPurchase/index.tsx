import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@/components/Button';
import { ConfirmPackPurchaseType } from '@/types';
import { closeModal } from '@/store/modalX/slice';
import { toast } from 'react-toastify';
import { envCurrency } from '@/helpers/utils/getEnvCurrency';
import { post } from '@/helpers/utils/fetch';
import { routes } from '@/routes';
import { useBalanceUpdate } from '@/helpers/hooks/useBalanceUpdate';
import { formatNumberWithCommas } from '@/helpers/utils/formatNumberWithCommas';

import styles from './styles.module.css';

const ToastSuccessMsg = () => {
  return (
    <div>
      <p
        style={{
          color: 'var(--success)',
          fontWeight: '600',
          marginBottom: '5px',
        }}
      >
        Purchase successful!
      </p>
      <p>
        You can open your packs on <a href={routes.openPacks}>Open Packs</a>{' '}
        page!
      </p>
    </div>
  );
};

function ConfirmPackPurchase({
  currency,
  packsAmount,
  selectedPack,
}: ConfirmPackPurchaseType) {
  const dispatch = useDispatch();
  const { updateBalance } = useBalanceUpdate();

  const totalPrice =
    Number(selectedPack?.virtualCurrencyPrices?.[envCurrency]) *
    Number(packsAmount);

  const handleCancelation = () => {
    dispatch(closeModal());
  };

  const handleConfirm = async () => {
    dispatch(closeModal());

    const purchaseToast = toast.loading('Purchase is pending...', {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    post({
      url: '/api/store/purchase/item',
      body: {
        ItemId: selectedPack.itemId,
        VirtualCurrency: envCurrency,
        Amount: packsAmount,
      },
    })
      .then(() => {
        toast.update(purchaseToast, {
          render: () => <ToastSuccessMsg />,
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        updateBalance();
      })
      .catch((error) => {
        toast.update(purchaseToast, {
          render: error.response.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className={styles.container}>
      <p className={styles.confirmMessage}>Confirm Purchase?</p>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <img
            src={selectedPack?.imageUrl}
            alt={`${selectedPack?.displayName} image`}
          />
        </div>
        <div className={styles.packInfo}>
          <h1>
            <span>{selectedPack?.displayName}</span>{' '}
            <span className={styles.amount}>X{packsAmount}</span>
          </h1>
          <p className={styles.priceContainer}>
            <span>Price:</span>
            <span className={styles.price}>
              {formatNumberWithCommas(totalPrice)}{' '}
              <span className={styles.currency}>{currency}</span>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.buttons}>
          <Button
            as='button'
            variant='success'
            size='md'
            fullWidth
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            as='button'
            variant='danger'
            size='md'
            fullWidth
            onClick={handleCancelation}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPackPurchase;
