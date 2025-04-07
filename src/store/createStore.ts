import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authSlice from './auth/slice';
import modalSlice from './modal/slice';
import userSlice from './user/slice';
import currencySlice from './currency/slice';
import modalXSlice from './modalX/slice';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootReducer = combineReducers({
  authSlice,
  modalSlice,
  userSlice,
  currencySlice,
  modalXSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authSlice', 'userSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = ReturnType<typeof store.dispatch>;
