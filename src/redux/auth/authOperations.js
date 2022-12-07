import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurUserApi,
  getLoginApi,
  getRegisterApi,
  logoutUserApi,
  refreshTokenApi,
} from '../../services/authApi';
import { errorHandler } from 'redux/error/errorHandler';
import { logoutUserAction } from 'redux/auth/authSlise';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      await getRegisterApi(userData);
      const loginUserData = await getLoginApi(userData);
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const loginUserData = await getLoginApi(userData);
      return loginUserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await logoutUserApi();
      return;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: logoutUser }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const getCurUser = createAsyncThunk(
  'auth/getCurUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { token, sid } = getState().auth;
      const curUserData = await getCurUserApi(token, sid);
      return curUserData;
    } catch (error) {
      setTimeout(() => {
        dispatch(errorHandler({ error, cb: getCurUser }));
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (cb, { getState, rejectWithValue, dispatch }) => {
    const { refreshToken, sid } = getState().auth;
    try {
      const data = await refreshTokenApi({ refreshToken, sid });
      setTimeout(() => {
        dispatch(cb());
      }, 0);
      return data;
    } catch (error) {
      setTimeout(() => {
        dispatch(logoutUserAction());
      }, 0);
      return rejectWithValue(error.message);
    }
  }
);
