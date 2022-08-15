export const getBookmarkAction = () => {
  return {
    type: 'GET_BOOKMARK',
  };
};

export const bookmarkAction = (id) => {
  return {
    type: 'BOOKMARK',
    payload: id,
  };
};

export const deleteBookmarkAction = (id, loading) => {
  return {
    type: 'DELETE_BOOKMARK',
    payload: {id, loading},
  };
};

export const isBookmarkedAction = (isBookmarked) => {
  return {
    type: 'IS_BOOKMARKED',
    payload: isBookmarked,
  };
};
