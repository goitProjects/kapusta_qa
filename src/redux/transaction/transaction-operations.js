import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorHandler } from 'redux/error/errorHandler';

import {
  getExpenseTransactionApi,
  addExpenseTransactionApi,
  deleteTransactionApi,
  getIncomeTransactionApi,
  addIncomeTransactionApi,
} from '../../services/transactionAPI';

export const getExpenseTransaction = createAsyncThunk(
  'getExpenseTransaction',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const transaction = await getExpenseTransactionApi();
      return transaction;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: getExpenseTransaction }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const addExpenseTransaction = createAsyncThunk(
  'addExpenseTransaction',
  async (transaction, { rejectWithValue, dispatch }) => {
    try {
      const newTransaction = await addExpenseTransactionApi(transaction);
      return newTransaction;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: addExpenseTransaction }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const removeTransaction = createAsyncThunk(
  'deleteTransaction',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await deleteTransactionApi(id);
      const balance = response.data.newBalance;
      const expensesAmount = getState().transactions.expenses.find(
        el => el._id === id
      );
      const incomesAmount = getState().transactions.incomes.find(
        el => el._id === id
      );
      return { balance, id, expensesAmount, incomesAmount };
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: removeTransaction }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const getIncomeTransaction = createAsyncThunk(
  'getIncomeTransaction',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const transaction = await getIncomeTransactionApi();
      return transaction;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: getIncomeTransaction }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeTransaction = createAsyncThunk(
  'addIncomeTransaction',
  async (transaction, { rejectWithValue, dispatch }) => {
    try {
      const newTransaction = await addIncomeTransactionApi(transaction);

      return newTransaction;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: addIncomeTransaction }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);
