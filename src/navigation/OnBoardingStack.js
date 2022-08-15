import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {
  OnBoarding,
  OnBoardingForm,
  OnBoardingDone,
  OnBoardingForm2,
} from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const OnBoardingStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="OnBoarding">
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="OnBoardingForm" component={OnBoardingForm} />
      <Stack.Screen name="OnBoardingForm2" component={OnBoardingForm2} />
      <Stack.Screen name="OnBoardingDone" component={OnBoardingDone} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default OnBoardingStack;
