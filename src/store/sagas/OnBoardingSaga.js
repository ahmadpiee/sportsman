import {takeLatest, put, all, call, select} from 'redux-saga/effects';

import API, {endPoint} from '../Api';

import * as Selectors from './Selectors';
import jwt_decode from 'jwt-decode';

function* onBoardingSaga({payload}) {
  try {
    const token = yield select(Selectors.token);
    const response = yield API.put(
      endPoint.updateGenderLevel,
      {
        gender: payload.gender,
        level: payload.level,
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

    if (response.status == 200) {
      yield put({type: 'ONBOARDING_SUCCESS', gender: payload.gender});
      yield put({type: 'EDIT_TOKEN', payload: response.data.data[0]});
    }
  } catch (error) {
    console.log(error);
  }
}

export function* onBoardingWatcher() {
  yield all([takeLatest('ONBOARDING', onBoardingSaga)]);
}
