import {takeLatest, put, all, call, select} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import * as RootNavigation from '../../navigation/RootNavigation';
import {isLoading} from '../actions/GlobalAction';
import * as Selectors from './Selectors';
import {ToastAndroid} from 'react-native';

function* recordSaga({payload}) {
  try {
    yield put(isLoading(true));
    yield RootNavigation.navigate('RecordDone');
    const token = yield select(Selectors.token);
    const response = yield API.post(
      endPoint.tracking,
      {
        time: payload.duration,
        speed: payload.avgSpeed,
        distance: payload.distance,
        category: payload.id,
        startPoint: {
          type: 'point',
          coordinates: [
            payload.startCoord.latitude,
            payload.startCoord.longitude,
          ],
        },
        endPoint: {
          type: 'point',
          coordinates: [
            payload.endCoords.latitude,
            payload.endCoords.longitude,
          ],
        },
        createdAt: payload.dateStart,
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
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

function* getRecordSaga() {
  try {
    yield put(isLoading(true));
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.tracking,
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
    yield put({type: 'GET_RECORD_SUCCESS', payload: response});
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

function* deleteRecordSaga({payload}) {
  try {
    yield put(isLoading(true));
    const token = yield select(Selectors.token);
    const response = yield API.delete(
      endPoint.deleteTracking + payload,
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
    ToastAndroid.show('Deleted !', ToastAndroid.SHORT);
    yield call(getRecordSaga);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

export function* recordWatcher() {
  yield all([
    takeLatest('RECORD', recordSaga),
    takeLatest('GET_RECORD', getRecordSaga),
    takeLatest('DELETE_RECORD', deleteRecordSaga),
  ]);
}
