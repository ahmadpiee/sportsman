import {Proxima} from 'components';
import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

export default function LaunchPage(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgLaunchPage.png')}
        style={styles.image}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.7)']}
          style={styles.linearGradient}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <FastImage
                style={{
                  width: ms(200),
                  height: ms(100),
                  alignSelf: 'center',
                }}
                source={require('../../assets/images/Logo.png')}
                resizeMode="contain"
              />
            </View>
            <View>
              <Proxima
                title="Stronger together with us"
                color="white"
                style={{alignSelf: 'center', paddingBottom: ms(30)}}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  height: hp(7),
                }}>
                <TouchableOpacity
                  style={{flex: 1, justifyContent: 'center'}}
                  onPress={() => {
                    props.navigation.navigate('Register');
                  }}>
                  <Proxima
                    title="Join us"
                    style={{alignSelf: 'center'}}
                    size={16}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flex: 1, justifyContent: 'center'}}
                  onPress={() => {
                    props.navigation.navigate('Login');
                  }}>
                  <Proxima
                    title="Login"
                    style={{alignSelf: 'center'}}
                    size={16}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
