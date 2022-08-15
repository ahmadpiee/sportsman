import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Proxima,Button} from 'components';
import { connect } from 'react-redux'

const OnBoarding = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/onboarding.png')}
        style={styles.image}>
        <ImageBackground
          source={require('../../assets/images/gradient.png')}
          style={styles.image}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{paddingVertical:hp(6)}}>
              <FastImage
                style={{
                  width: ms(200),
                  height: ms(50),
                  alignSelf: 'center',
                  opacity: 0.7,
                }}
                source={require('../../assets/images/Logo.png')}
                resizeMode="contain"
              />
            </View>
            <View style={{padding: ms(20)}}>
              <Proxima style={styles.text} title={"Welcome "+ props.name +", you’re in!"} />
              <Proxima
                style={{color: 'white', opacity: 0.8, paddingBottom: ms(10)}}
                title="To make sure your experience with 10x10 is the best it can be, we need to get to know you a little better"
                size={16}
              />
              <Button 
                title='Get Started'
                onPress={() => {
                  props.navigation.navigate('OnBoardingForm');
                }}
              />
            </View>
          </View>
        </ImageBackground>
        {/* </LinearGradient> */}
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = (state) => ({
  name:state.authReducer.name,
})

export default connect(
  mapStateToProps
)(OnBoarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: ms(10),
  },
  // linearGradient: {
  //     flex: 1,
  //     opacity:0.5
  // },
});
