// // JUDUL: Ambil data profile

// // ini action file 'kira-kira gini'
// import jwt_decode from 'jwt-decode';

// export const authLoginAction = (token) => {
//   const decoded = jwt_decode(token);
//   return {
//     type: 'AUTH_LOGIN',
//     payload: {token, decoded},
//   };
// };

// // ini reducer file-nya 'kira-kira gini
// const intialState = {
//   token: '',
//   isLogged: false,
//   dataStatus: true,
//   email: '',
//   name: '',
//   gender: '',
// };

// const authReducer = (state = intialState, action) => {
//   const {type, action} = action;

//   switch (type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         token: payload.token,
//         email: payload.email,
//         name: payload.decoded.name,
//         gender: payload.decoded.gender,
//         isLogged: true,
//       };
//     default:
//       return state;
//   }
// };

// // API file set proxy
// import axios from 'axios';

// export const URL = 'https://urlAnda.com/';

// export default axios.create({
//   baseURL: URL,
// });

// export const endPoint = {
//   endpointAnda = `enpoind?`
// };

// // selectors-saga file
// export const token = (state) => state.authReducer.token;

// // saga file-nya kira-kira gini
// import {takeLatest, put, all, call, select} from 'redux-saga/effects';

// import API, {endPoint} from '../Api';

// import {isLoading} from '../actions/GlobalAction';
// import * as Selectors from './Selectors';

// function* getSchedule() {
//   try {
//     yield put({type: 'ACTION_TYPE_ANDA', payload: true});
//     // token harus udah di-decode lihat action file diatas
//     const token = yield select(Selectors.token);
//     const response = yield API.get(
//       endPoint.endpointAnda,
//       {
//         headers: {
//           Authorization: token,
//           'Content-Type': 'application/json',
//         },
//       },
//       {
//         validateStatus: (status) => status < 500,
//       },
//     );
//     yield put({type: 'ACTION_KALO_SUCCESS', payload: response});
//   } catch (error) {
//     console.log(error);
//   } finally {
//     yield put({type: 'LOADING_GLOBAL', payload: false});
//   }
// }