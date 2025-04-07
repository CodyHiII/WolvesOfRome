import { AxiosError, AxiosResponse } from 'axios';

import { FetchTypes } from '@/types';
import axiosInstance from '@/app/axiosInstance';
import { store } from '@/store/createStore';
import { logOut } from '@/store/auth/slice';
import { clearUserData } from '@/store/user/slice';

const handleNoToken = () => {
  store.dispatch(logOut());
  store.dispatch(clearUserData());
};

export const post = ({
  url,
  body,
  customHeaders,
}: FetchTypes): Promise<any> => {
  const token = store.getState().authSlice.user.token;

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, body, { headers })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        if (error?.response?.status === 403) {
          handleNoToken();
        }
        reject(error);
      });
  });
};

export const get = ({ url, customHeaders }: FetchTypes): Promise<any> => {
  const token = store.getState().authSlice.user.token;

  const authHeaders = {
    Authorization: token ? `Bearer ${token}` : '',
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 403) {
          handleNoToken();
        }

        reject(error);
      });
  });
};

export const deleteRequest = ({
  url,
  body,
  customHeaders,
}: FetchTypes): Promise<any> => {
  const token = store.getState().authSlice.user.token;

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const headers = {
    ...customHeaders,
    ...authHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(url, { headers: headers, data: body })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        if (error?.response?.status === 403) {
          handleNoToken();
        }
        reject(error);
      });
  });
};
