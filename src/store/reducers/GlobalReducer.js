import {IS_LOADING} from '../actions/GlobalAction';

const intialState = {
  isLoading: false,
  loginError: false,
  registerError: false,
};

const globalReducer = (state = intialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        loginError: true,
      };
    case 'REGISTER_FAILED':
      return {
        ...state,
        registerError: true,
      };
    case 'RESET_REGISTER_ERROR':
      return {
        ...state,
        registerError: false,
      };
    case 'RESET_LOGIN_ERROR':
      return {
        ...state,
        loginError: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        loginError: false,
        registerError: false,
      };
    default:
      return state;
  }
};

export default globalReducer;
