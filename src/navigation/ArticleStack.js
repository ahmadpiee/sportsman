import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {Article, ArticleWeb} from '../screens';

const Stack = createStackNavigator();

const ArticleStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Article" headerMode="none">
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="ArticleWeb" component={ArticleWeb} />
    </Stack.Navigator>
  );
};

export default ArticleStack;
