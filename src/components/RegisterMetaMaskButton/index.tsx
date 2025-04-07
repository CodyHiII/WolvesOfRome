'use client';
import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useNetwork } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { disconnect } from '@wagmi/core';
import { useSignMessage } from 'wagmi'

import { DefaultButtonProps, ButtonProps } from '@/types';
import { post } from '@/helpers/utils/fetch';
import MetaMaskLogo from '../../../public/metaMaskLogo.svg';
import Loading from '../Loading';

import styles from './styles.module.css';

type MetaMaskConnectType = {
  buttonText: string;
  onSuccess?: () => void;
};

type Types = MetaMaskConnectType & ButtonProps & DefaultButtonProps;

const RegisterMetaMaskButton = ({ buttonText, onSuccess }: Types) => {
  const [connectError, setConnectError] = useState('');
  const { data: signMessageData, isLoading, signMessage } = useSignMessage();
  const MetaMask = new MetaMaskConnector({
    options: {
      shimDisconnect: true,
      UNSTABLE_shimOnConnectSelectAccount: true,
    },
  });

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { connect, isSuccess } = useConnect({
    connector: MetaMask,
    onError(error: any) {
      if (error?.cause?.code === -32002) {
        setConnectError('Request already pending!');
      } else if (error?.message === 'Connector not found') {
        setConnectError(
          'Connector not found! Please install MetaMask extension.'
        );
      } else {
        setConnectError(`${error.message}`);
      }
    },
  });

  const handleConnectWallet = () => {
    disconnect();
    connect();
  };

  useEffect(() => {
    isSuccess &&
      post({
        url: '/api/user/wallet/issue/nonce',
        body: {
          NetworkId: chain?.network,
          ChainId: chain?.id,
          BlockchainName: chain?.name,
          PublicAddress: address,
        },
      })
        .then((response) => {
          signMessage({ message: response })
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            console.log(error)
            setConnectError('Failed to get message for sign.');
          }
        });
  }, [isSuccess]);

  useEffect(() => {
    let timer: any;

    timer = setTimeout(() => {
      setConnectError('');
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [connectError]);

  useEffect(() => {
    ;(async () => {
      if (signMessageData) {
        post({
          url: `/api/user/wallet/validate/${address}/${signMessageData}`
        })
          .then(() => {
            if (onSuccess) {
              onSuccess();
            }
          })
          .catch((error) => {
            if (error?.response?.status === 404) {
              setConnectError('Already connected!');
            }
            if (error?.response?.status === 410) {
              setConnectError('Failed validation. Token expired or invalid signature');
            }
          });
      }
    })()
  }, [signMessageData])

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleConnectWallet}>
        {' '}
        <MetaMaskLogo />
        { isLoading ? <Loading height='100px' /> : "" }
        {buttonText}
      </button>
      { isLoading ? <p className={styles.button} > Check Wallet to complete transaction </p> : "" }
      {connectError && <p className={styles.error}>{connectError}</p>}
    </div>
  );
};

export default RegisterMetaMaskButton;
