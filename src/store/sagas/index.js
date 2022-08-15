import {all} from 'redux-saga/effects';
import {authWatcher} from './AuthSaga';
import {onBoardingWatcher} from './OnBoardingSaga';
import {recordWatcher} from './RecordSaga';
import {userWatcher} from './UserSaga';
import {trainingWatcher} from './TrainingSaga';
import {bookmarkWatcher} from './BookmarkSaga';

export default function* rootSaga() {
  yield all([
    authWatcher(),
    onBoardingWatcher(),
    recordWatcher(),
    userWatcher(),
    trainingWatcher(),
    bookmarkWatcher(),
  ]);
}
