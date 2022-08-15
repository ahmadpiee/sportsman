import {createStackNavigator} from '@react-navigation/stack';

import React, {useLayoutEffect} from 'react';
import {Record, RecordTracking, RecordDone} from '../screens';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();

const RecordStack = (props) => {
  const {navigation, route} = props;

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'RecordMap' || routeName === 'RecordDone') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Record" headerMode="none">
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="RecordMap" component={RecordTracking} />
      <Stack.Screen name="RecordDone" component={RecordDone} />
    </Stack.Navigator>
  );
};

export default RecordStack;
