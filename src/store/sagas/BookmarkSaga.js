import {takeLatest, put, all, call, select} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import * as Selectors from './Selectors';
import {isLoading} from '../actions/GlobalAction';

function* getBookmarkSaga({payload}) {
  try {
    let temp = payload == false ? false : true;
    yield put(isLoading(temp));
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.bookmark,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      {
        validateStatus: (status) => status < 500,
      },
    );
    yield put({type: 'GET_BOOKMARK_SUCCESS', payload: response});
    const bookmark = yield select(Selectors.bookmark);
    const selectedTraining = yield select(Selectors.selectedTraining);
    let found = bookmark.find(function (element) {
      return element.content_id._id == selectedTraining._id;
    });
    if (found) {
      yield put({type: 'IS_BOOKMARKED', payload: true});
      yield put({type: 'SET_SELECTED_BOOKMARK', payload: found._id});
    } else {
      yield put({type: 'IS_BOOKMARKED', payload: false});
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

function* bookmarkSaga({payload}) {
  try {
    const token = yield select(Selectors.token);
    const response = yield API.post(
      endPoint.bookmark,
      {
        content_id: payload,
        tittle: '-',
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      {
        validateStatus: (status) => status < 500,
      },
    );
    yield call(getBookmarkSaga, {payload: false});
  } catch (error) {
    console.log(error);
  }
}

function* deleteBookmarkSaga({payload}) {
  try {
    const token = yield select(Selectors.token);
    const response = yield API.delete(
      endPoint.deleteBookmark + payload.id,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
      {
        validateStatus: (status) => status < 500,
      },
    );
    yield call(getBookmarkSaga, {payload: payload.loading});
  } catch (error) {
    console.log(error);
  }
}

export function* bookmarkWatcher() {
  yield all([
    takeLatest('GET_BOOKMARK', getBookmarkSaga),
    takeLatest('BOOKMARK', bookmarkSaga),
    takeLatest('DELETE_BOOKMARK', deleteBookmarkSaga),
  ]);
}
