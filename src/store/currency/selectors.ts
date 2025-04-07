import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../createStore';

const currency = (state: RootState) => state.currencySlice;

export const getCurrency = createSelector(currency, (state) => state.currency);
