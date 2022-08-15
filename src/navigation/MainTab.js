import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Home, Profile} from '../screens';
import RecordStack from './RecordStack';
import ArticleStack from './ArticleStack';
import TrainingStack from './TrainingStack';
import Colors from '../config/Colors';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const MainTab = (props) => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
          activeTintColor: Colors.orange2,
          inactiveTintColor: Colors.grey2,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="RecordStack"
          component={RecordStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="radio-button-on" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="TrainingStack"
          component={TrainingStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="checkbox-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="ArticleStack"
          component={ArticleStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="newspaper-outline" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Me"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainTab;
