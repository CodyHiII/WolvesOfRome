import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { initialState } from './initialsState';
import axiosInstance from '@/app/axiosInstance';
import { logOut } from '@/store/auth/slice';
import { userTokenSelector } from '../auth/selectors';

export const getUserData = createAsyncThunk(
  'user/userData',
  async (_, thunkApi: any) => {
    try {
      const userToken = userTokenSelector(thunkApi.getState());

      if (userToken) {

        const headers = { ...{ Authorization: `Bearer ${userToken}` } };

        return await new Promise((resolve, reject) => {
          axiosInstance
            .get('/api/user', { headers })
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              console.log(error);
              if (error?.response?.status === 403) {
                clearUserData();
                logOut();
              };
      
              reject(error);
            });
          });
      }
    } catch (error) {
      console.log('thunk user data error: ', error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      });
  },
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
