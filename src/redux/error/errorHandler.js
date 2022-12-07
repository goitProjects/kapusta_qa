import { refreshToken } from 'redux/auth/authOperations';

export const errorHandler =
  ({ error, cb }) =>
  dispatch => {
    if (error.request.status === 401 || error.request.status === 400) {
      dispatch(refreshToken(cb));
    }
  };
