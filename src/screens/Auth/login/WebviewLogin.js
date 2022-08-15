import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  BackHandler,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {
  WebView,
  WebViewNavigation,
  navigationState,
} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Colors from 'config/Colors';
import {endPoint, URL as base} from 'store/Api';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {AuthLoginAction} from 'store/actions/AuthAction';
import {connect} from 'react-redux';

const WebviewLogin = (props) => {
  const [Visible, setVisible] = useState(true);
  const uriFB = base + endPoint.facebookSignIn;

  const hideSpinner = () => {
    setVisible(false);
  };

  const onNavigationStateChange = (navigationState) => {
    const data = navigationState.url;
    if (data.includes('?token=')) {
      const url = new URL(data);
      console.log(data, 'data');
      const urlParams = new URLSearchParams(url.search);
      const token = urlParams.get('token');
      const status = urlParams.get('status');
      props.AuthLoginAction(token, status);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => hideSpinner()}
        style={{width: wp(100), marginTop: ms(20)}}
        source={{uri: uriFB}}
        onNavigationStateChange={onNavigationStateChange}
      />
      {Visible && (
        <ActivityIndicator
          style={{position: 'absolute', alignSelf: 'center', top: hp(100 / 2)}}
          size="large"
          color={Colors.orange2}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.globalReducer.isLoading,
});

const mapDispatchToProps = {
  AuthLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WebviewLogin);
