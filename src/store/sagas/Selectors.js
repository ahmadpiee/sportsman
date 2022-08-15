export const token = (state) => state.authReducer.token;

export const user = (state) => state.userReducer;

export const bookmark = (state) => state.bookmarkReducer.bookmark;

export const selectedTraining = (state) =>
  state.trainingReducer.selectedTraining;
