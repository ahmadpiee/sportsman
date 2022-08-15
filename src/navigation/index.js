import React from 'react';
import AuthStack from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingStack from './OnBoardingStack';
import {navigationRef} from './RootNavigation';
import {useSelector} from 'react-redux';
import MainTab from './MainTab';

const Navigation = (props) => {
  const isLogged = useSelector((state) => state.authReducer.isLogged);
  const dataStatus = useSelector((state) => state.authReducer.dataStatus);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLogged ? (
        dataStatus ? (
          <MainTab />
        ) : (
          <OnBoardingStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
