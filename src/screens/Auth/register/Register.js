import {Button, Proxima} from 'components';
import Colors from 'config/Colors';
import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {AuthLoginAction} from 'store/actions/AuthAction';
import {connect} from 'react-redux';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {endPoint, URL as base} from 'store/Api';

const Register = (props) => {
  const uri = base + endPoint.googleSignIn;

  const [data, setData] = useState('');

  const handleOpenURL = ({url}) => {
    if (url.indexOf('?token') !== -1) {
      if (url) setData(url);
    }
  };

  useEffect(() => {
    // Your code here
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  useEffect(() => {
    if (data != null && data != '') {
      const url = new URL(data);
      const urlParams = new URLSearchParams(url.search);
      const token = urlParams.get('token');
      const status = urlParams.get('status');

      props.AuthLoginAction(token, status);
    }
  }, [data]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{height: hp(3)}} />
        <View style={{height: hp(30)}}>
          <ImageBackground
            source={require('assets/images/LoginHeader.png')}
            style={styles.image}
            resizeMode="stretch">
            <FastImage
              style={{
                width: ms(200),
                height: ms(50),
                alignSelf: 'center',
                marginBottom: ms(50),
              }}
              source={require('assets/images/Logo.png')}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>
        <View
          style={{
            paddingHorizontal: ms(15),
            justifyContent: 'space-between',
            height: hp(65),
          }}>
          <View>
            <Proxima
              title="Sign Up"
              color={Colors.grey2}
              style={{alignSelf: 'center', padding: ms(25)}}
              size={28}
              type="bold"
            />
            <Button
              title="Continue with Facebook"
              buttonStyle={{backgroundColor: Colors.blue2}}
              borderColor={Colors.blue2}
              onPress={() => {
                props.navigation.navigate('WebviewLogin');
              }}
            />
            <Button
              title="Continue with Google"
              buttonStyle={{backgroundColor: '#E35E54'}}
              borderColor={'#E35E54'}
              containerStyle={{paddingVertical: ms(0)}}
              onPress={() => {
                Linking.openURL(uri);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('RegisterEmail');
              }}>
              <Proxima
                title="Register with Email"
                style={{
                  color: Colors.orange2,
                  alignSelf: 'center',
                  paddingVertical: ms(20),
                }}
                size={16}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Proxima
              title="Already Member?"
              style={{
                color: Colors.grey1,
                alignSelf: 'center',
                paddingVertical: ms(15),
              }}
              size={16}
            />
            <Button
              title="Login"
              buttonStyle={{backgroundColor: 'white'}}
              titleColor={Colors.orange2}
              onPress={() => {
                props.navigation.navigate('Login');
              }}
              containerStyle={{paddingVertical: ms(15)}}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.globalReducer.isLoading,
});

const mapDispatchToProps = {
  AuthLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
