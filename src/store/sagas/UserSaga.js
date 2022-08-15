import {takeLatest, put, all, call, select} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import {isLoading} from '../actions/GlobalAction';
import * as Selectors from './Selectors';
import jwt_decode from 'jwt-decode';
import {ToastAndroid} from 'react-native';
// import { isLoading } from "../actions/UserAction";

function* getUserSaga(afterEditImage) {
  try {
    const temp = afterEditImage == true ? false : true;
    yield put(isLoading(temp));
    const token = yield select(Selectors.token);
    const response = yield API.get(
      endPoint.getUser,
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
    yield put({type: 'GET_USER_SUCCESS', payload: response});
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

function* editImageSaga({payload}) {
  try {
    const token = yield select(Selectors.token);
    const {type, uri, fileName} = payload;
    const data = new FormData();
    data.append('images', {type, uri, name: fileName});
    const response = yield API.post(
      endPoint.uploadImage,
      data,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      },
      {
        validateStatus: (status) => status < 600,
      },
    );

    yield call(getUserSaga, true);
  } catch (error) {
    console.log(error);
  }
}

function* editUserSaga({payload}) {
  try {
    yield put({type: 'EDIT_USER_LOADING', payload: true});
    const token = yield select(Selectors.token);
    const response = yield API.put(
      endPoint.updateProfile,
      {
        name: payload.name,
        gender: payload.gender,
        level: payload.level,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    const decoded = jwt_decode(response.data.data[0]);
    yield put({type: 'EDIT_USER_SUCCESS', payload: decoded});
    yield put({type: 'EDIT_TOKEN', payload: response.data.data[0]});
    ToastAndroid.show('Profile Updated !', ToastAndroid.SHORT);
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: 'EDIT_USER_LOADING', payload: false});
  }
}

function* editPasswordSaga({payload}) {
  try {
    yield put(isLoading(true));
    const token = yield select(Selectors.token);
    const user = yield select(Selectors.user);
    const response = yield API.put(
      endPoint.updateProfile,
      {
        name: user.name,
        gender: user.gender,
        level: user.level,
        password: payload,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    ToastAndroid.show('Success !', ToastAndroid.SHORT);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(isLoading(false));
  }
}

export function* userWatcher() {
  yield all([
    takeLatest('GET_USER', getUserSaga),
    takeLatest('EDIT_IMAGE', editImageSaga),
    takeLatest('EDIT_USER', editUserSaga),
    takeLatest('EDIT_PASSWORD', editPasswordSaga),
  ]);
}
