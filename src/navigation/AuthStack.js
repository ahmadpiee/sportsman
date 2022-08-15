import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {
  Login,
  Register,
  LaunchPage,
  LoginEmail,
  RegisterEmail,
  WebviewLogin,
} from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="LaunchPage">
      <Stack.Screen name="LaunchPage" component={LaunchPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmail} />
      <Stack.Screen name="WebviewLogin" component={WebviewLogin} />
    </Stack.Navigator>
  );
};

export default AuthStack;
