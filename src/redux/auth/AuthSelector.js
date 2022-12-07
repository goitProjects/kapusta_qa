export const getIsAuth = state => Boolean(state.auth.token);
export const isLogedIn = state => state.auth.token;
export const getMustCurUser = state =>
  state.auth.token && !state.auth.user.email;

export const getEmailUser = state => state.auth.user.email;
export const getAuthLoading = state => state.auth.isLoading;
export const getAuthError = state => state.auth.error;
