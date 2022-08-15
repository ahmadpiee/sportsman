const intialState = {
  training: [],
  trainingByGender: [],
  selectedTraining: {},
  trainingGenderLoading: false,
  trainingLoading: false,
};

const trainingReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_TRAINING_SUCCESS':
      return {
        ...state,
        training: action.payload.data,
      };
    case 'GET_TRAINING_BY_GENDER_SUCCESS':
      return {
        ...state,
        trainingByGender: action.payload.data,
      };
    case 'GET_TRAINING_BY_ID_SUCCESS':
      return {
        ...state,
        selectedTraining: action.payload.data,
      };
    case 'TRAINING_GENDER_LOADING':
      return {
        ...state,
        trainingGenderLoading: action.payload,
      };
    case 'TRAINING_LOADING':
      return {
        ...state,
        trainingLoading: action.payload,
      };
    default:
      return state;
  }
};

export default trainingReducer;
