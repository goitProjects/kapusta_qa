import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  getExpenseTransaction,
  addExpenseTransaction,
  removeTransaction,
  getIncomeTransaction,
  addIncomeTransaction,
} from './transaction-operations';
import { logoutUser } from 'redux/auth/authOperations';
// import itemsReducer from '../redux/transaction/items-reducer';

const expenses = createReducer([], {
  [getExpenseTransaction.fulfilled]: (_, { payload }) => payload.expenses,

  [addExpenseTransaction.fulfilled]: (state, { payload }) => [
    ...state,
    payload.transaction,
  ],

  [removeTransaction.fulfilled]: (state, { payload }) =>
    state.filter(el => el._id !== payload.id),

  [logoutUser.fulfilled]: () => [],
});

const incomes = createReducer([], {
  [getIncomeTransaction.fulfilled]: (_, { payload }) => payload.incomes,

  [addIncomeTransaction.fulfilled]: (state, { payload }) => [
    ...state,
    payload.transaction,
  ],

  [removeTransaction.fulfilled]: (state, { payload }) =>
    state.filter(el => el._id !== payload.id),

  [logoutUser.fulfilled]: () => [],
});

const loading = createReducer(false, {
  [getExpenseTransaction.pending]: () => true,
  [getExpenseTransaction.fulfilled]: () => false,
  [getExpenseTransaction.rejected]: () => false,

  [addExpenseTransaction.pending]: () => true,
  [addExpenseTransaction.fulfilled]: () => false,
  [addExpenseTransaction.rejected]: () => false,

  [getIncomeTransaction.pending]: () => true,
  [getIncomeTransaction.fulfilled]: () => false,
  [getIncomeTransaction.rejected]: () => false,

  [addIncomeTransaction.pending]: () => true,
  [addIncomeTransaction.fulfilled]: () => false,
  [addIncomeTransaction.rejected]: () => false,

  [removeTransaction.pending]: () => true,
  [removeTransaction.fulfilled]: () => false,
  [removeTransaction.rejected]: () => false,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [getExpenseTransaction.rejected]: setError,
  [getExpenseTransaction.pending]: () => null,

  [addExpenseTransaction.rejected]: setError,
  [addExpenseTransaction.pending]: () => null,

  [getIncomeTransaction.rejected]: setError,
  [getIncomeTransaction.pending]: () => null,

  [addIncomeTransaction.rejected]: setError,
  [addIncomeTransaction.pending]: () => null,
  [removeTransaction.rejected]: setError,
  [removeTransaction.pending]: () => null,
});

export default combineReducers({
  expenses,
  incomes,
  loading,
  error,
});
