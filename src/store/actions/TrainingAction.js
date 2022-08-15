import * as RootNavigation from 'navigation/RootNavigation';

export const getTrainingAction = () => {
  return {
    type: 'GET_TRAINING',
  };
};
export const getTrainingByGenderAction = () => {
  return {
    type: 'GET_TRAINING_BY_GENDER',
  };
};

export const getTrainingByIdAction = (id) => {
  RootNavigation.navigate('TrainingContent');
  return {
    type: 'GET_TRAINING_BY_ID',
    payload: id,
  };
};
