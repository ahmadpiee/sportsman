import {takeLatest, put, all, call, select} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import {isLoading} from '../actions/GlobalAction';
import * as Selectors from './Selectors';

function* getTrainingSaga() {
  try {
    yield put({type: 'TRAINING_LOADING', payload: true});
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.getAllContent,
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
    yield put({type: 'GET_TRAINING_SUCCESS', payload: response});
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: 'TRAINING_LOADING', payload: false});
  }
}

function* getTrainingByGenderSaga() {
  try {
    yield put({type: 'TRAINING_GENDER_LOADING', payload: true});
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.getContentByGender,
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
    yield put({type: 'GET_TRAINING_BY_GENDER_SUCCESS', payload: response});
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: 'TRAINING_GENDER_LOADING', payload: false});
  }
}

function* getTrainingByIDSaga({payload}) {
  try {
    yield put(isLoading(true));
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.getContent + payload,
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
    yield put({type: 'GET_TRAINING_BY_ID_SUCCESS', payload: response});
    yield put(isLoading(false));
    yield put({type: 'GET_BOOKMARK', payload: false});
  } catch (error) {
    console.log(error);
    yield put(isLoading(false));
  }
}

export function* trainingWatcher() {
  yield all([
    takeLatest('GET_TRAINING', getTrainingSaga),
    takeLatest('GET_TRAINING_BY_ID', getTrainingByIDSaga),
    takeLatest('GET_TRAINING_BY_GENDER', getTrainingByGenderSaga),
  ]);
}
