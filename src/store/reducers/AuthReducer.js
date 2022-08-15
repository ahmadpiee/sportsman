const intialState = {
  token: '',
  isLogged: false,
  dataStatus: true,
  email: '',
  name: '',
  gender: '',
  googleFb: false,
};

const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.response.data.data.token,
        dataStatus: action.payload.response.data.data.status,
        email: action.payload.email,
        name: action.payload.decoded.name,
        gender: action.payload.decoded.gender,
        isLogged: true,
        googleFb: false,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        dataStatus: action.payload.status,
        name: action.payload.decoded.name,
        gender: action.payload.decoded.gender,
        isLogged: true,
        googleFb: true,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        email: action.payload.email,
      };
    case 'EDIT_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'ONBOARDING_SUCCESS':
      return {
        ...state,
        dataStatus: true,
        gender: action.gender,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: '',
        name: '',
        isLogged: false,
        gender: '',
        googleFb: false,
      };
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        gender: action.payload.gender,
      };
    default:
      return state;
  }
};

export default authReducer;
