import { useCardano } from '@cardano-foundation/cardano-connect-with-wallet';
import { post } from '@/helpers/utils/fetch';

import styles from './styles.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

type RegisterEternlWalletButton = {
  wallet: 'nami' | 'eternl' | 'flint' | 'begin' | 'gero' | 'lace' | 'nufi';
  onSuccess?: () => void;
};

const RegisterCardanoWalletButton = ({
  wallet,
  onSuccess,
}: RegisterEternlWalletButton) => {
  const {
    isConnected,
    signMessage,
    usedAddresses,
    connect,
    unusedAddresses,
    disconnect,
  } = useCardano();

  const [connectError, setConnectError] = useState('');

  const getWalletLogo = () => {
    switch (wallet) {
      case 'eternl':
        return './eternlLogo.svg';
      case 'nami':
        return './namiLogo.svg';
      case 'begin':
        return './beginLogo.webp';
      case 'flint':
        return './flintLogo.jpeg';
      case 'lace':
        return './laceLogo.jpeg';
      case 'gero':
        return './geroLogo.png';
      case 'nufi':
        return './nufiLogo.png';
      default:
        return '';
    }
  };

  const getNonce = async (publicAddress: string) => {
    return post({
      url: '/api/user/wallet/issue/nonce',
      body: {
        NetworkId: 0,
        ChainId: 0,
        BlockchainName: 'Cardano',
        PublicAddress: publicAddress,
      },
    })
      .then((message) => {
        signMessage(
          message,
          (signature: string, key: string | undefined) => {
            validateSignature(publicAddress, signature, key);
          },
          errorHandling
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateSignature = async (
    publicAddress: string,
    signature: string,
    key: string | undefined
  ) => {
    console.log(`${signature}?key=${key}`);
    post({
      url: `/api/user/wallet/validate/${publicAddress}/${signature}?key=${key}`,
    })
      .then(() => {
        if (onSuccess) {
          onSuccess();
          disconnect();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registerCardanoWallet = async () => {
    disconnect();
    await connect(wallet, onConnected, errorHandling);
  };

  const onConnected = () => {
    const address = usedAddresses[0] ?? unusedAddresses[0];
    if (isConnected && address) {
      getNonce(address);
    }
  };

  const errorHandling = (error: Error) => {
    console.log(`error = ${error.message}`);
    setConnectError(error.message);
    toast.error(error.message, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={registerCardanoWallet}>
        <img src={getWalletLogo()} alt={`${wallet} logo`} />
        <p className={styles.buttonText}>
          Register with{' '}
          <span className={styles.walletName}>{wallet} Wallet</span>
        </p>
      </button>
      {connectError && <p className={styles.error}>{connectError}</p>}
    </div>
  );
};

export default RegisterCardanoWalletButton;
