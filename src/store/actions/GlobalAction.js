export const IS_LOADING = 'IS_LOADING';

export const isLoading = (payload) => {
  return {
    type: IS_LOADING,
    payload,
  };
};

export const resetRegisterError = () => {
  return {
    type: 'RESET_REGISTER_ERROR',
  };
};

export const resetLoginError = () => {
  return {
    type: 'RESET_LOGIN_ERROR',
  };
};
