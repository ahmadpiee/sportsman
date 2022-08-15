import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import globalReducer from './GlobalReducer';
import recordReducer from './RecordReducer';
import userReducer from './UserReducer';
import trainingReducer from './TrainingReducer';
import bookmarkReducer from './BookmarkReducer';

export const rootReducer = combineReducers({
  authReducer,
  globalReducer,
  recordReducer,
  userReducer,
  trainingReducer,
  bookmarkReducer,
});
