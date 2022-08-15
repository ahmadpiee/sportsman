import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {Training, TrainingContent, Bookmark} from '../screens';

const Stack = createStackNavigator();

const TrainingStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Training" headerMode="none">
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="TrainingContent" component={TrainingContent} />
      <Stack.Screen name="Bookmark" component={Bookmark} />
    </Stack.Navigator>
  );
};

export default TrainingStack;
