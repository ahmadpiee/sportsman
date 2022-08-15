const intialState = {
  history: [],
};

const recordReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_RECORD_SUCCESS':
      return {
        ...state,
        history: action.payload.data.data,
      };
    default:
      return state;
  }
};

export default recordReducer;
