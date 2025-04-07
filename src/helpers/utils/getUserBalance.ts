import { get } from '@/helpers/utils/fetch';
import { envCurrency } from './getEnvCurrency';
import { store } from '@/store/createStore';

export const getUserBalance = () => {
  const token = store.getState().authSlice.user.token;

  if (token) {
    return new Promise((resolve, reject) => {
      get({ url: '/api/user/virtual/currency' })
        .then((response) => {
          const currency = response[envCurrency];
          resolve(currency);
        })
        .catch((error) => {
          console.log('Error currency', error);
          reject(error);
        });
    });
  } else {
    return '';
  }
};
