import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeBalanceApi } from '../../services/balanceApi';
import { errorHandler } from 'redux/error/errorHandler';

export const changeBalance = createAsyncThunk(
  'balance/change',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const balance = await changeBalanceApi(data);
      return balance;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: () => changeBalance(data) }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);
