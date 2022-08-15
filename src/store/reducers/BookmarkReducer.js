const intialState = {
  bookmark: [],
  bookmarked: false,
  selectedBookmark: '',
};

const bookmarkReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_BOOKMARK_SUCCESS':
      return {
        ...state,
        bookmark: action.payload.data.data,
      };
    case 'IS_BOOKMARKED':
      return {
        ...state,
        bookmarked: action.payload,
      };
    case 'SET_SELECTED_BOOKMARK':
      return {
        ...state,
        selectedBookmark: action.payload,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
