import {takeLatest, put, all, call} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import * as RootNavigation from '../../navigation/RootNavigation';

import jwt_decode from 'jwt-decode';
import {isLoading} from '../actions/GlobalAction';

function* loginSaga({payload}) {
  try {
    yield put(isLoading(true));
    const response = yield API.post(endPoint.login, {
      email: payload.email,
      password: payload.password,
    });
    const decoded = jwt_decode(response.data.data.token);
    yield put({
      type: 'LOGIN_SUCCESS',
      payload: {response, decoded, email: payload.email},
    });
  } catch (error) {
    console.log(error);
    yield put({type: 'LOGIN_FAILED'});
  } finally {
    yield put(isLoading(false));
  }
}

function* registerSaga({payload}) {
  try {
    yield put(isLoading(true));
    const response = yield API.post(endPoint.registerUser, {
      email: payload.email,
      name: payload.name,
      password: payload.password,
    });
    yield put({type: 'REGISTER_SUCCESS', payload: {email: payload.email}});
    yield RootNavigation.navigate('LoginEmail', {});
  } catch (error) {
    console.log(error);
    yield put({type: 'REGISTER_FAILED'});
  } finally {
    yield put(isLoading(false));
  }
}

export function* authWatcher() {
  yield all([
    takeLatest('LOGIN', loginSaga),
    takeLatest('REGISTER', registerSaga),
  ]);
}
