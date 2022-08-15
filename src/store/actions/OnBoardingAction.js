export const onBoardingAction = (gender, level) => {
  return {
    type: 'ONBOARDING',
    payload: {gender, level},
  };
};
