const intialState = {
  name: '',
  gender: '',
  image: '',
  level: 0,
  email: '',
  editUserLoading: false,
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        name: action.payload.data.name,
        gender: action.payload.data.gender,
        image: action.payload.data.images,
        level: action.payload.data.level,
        email: action.payload.data.email,
      };
    case 'EDIT_USER_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        gender: action.payload.gender,
        level: action.payload.level,
      };
    case 'EDIT_USER_LOADING':
      return {
        ...state,
        editUserLoading: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
