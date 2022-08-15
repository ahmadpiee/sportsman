import jwt_decode from 'jwt-decode';

export const loginAction = (email, password) => {
  return {
    type: 'LOGIN',
    payload: {email, password},
  };
};

export const registerAction = (name, email, password) => {
  return {
    type: 'REGISTER',
    payload: {name, email, password},
  };
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
  };
};

export const AuthLoginAction = (token, status) => {
  const decoded = jwt_decode(token);
  status == 'true' ? (status = true) : (status = false);
  return {
    type: 'AUTH_LOGIN_SUCCESS',
    payload: {token, decoded, status},
  };
};
