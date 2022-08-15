import axios from 'axios';

export const URL = 'https://sportsmanapp.herokuapp.com';

export default axios.create({
  baseURL: URL,
});

export const endPoint = {
  registerUser: '/register',
  login: '/login',
  updateGenderLevel: '/login/update',
  updateProfile: '/update',
  getUser: '/get',
  uploadImage: '/upload',

  tracking: '/tracking',
  deleteTracking: '/tracking/',

  googleSignIn: '/google',
  facebookSignIn: '/auth/facebook',

  getAllContent: '/content/all',
  getContentByGender: '/content/gender',
  getContent: '/content/',

  bookmark: '/favourite',
  deleteBookmark: '/favourite/',
};
