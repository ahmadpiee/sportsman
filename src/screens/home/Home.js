import {Proxima} from 'components';
import Colors from 'config/Colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const Home = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: hp(3)}} />
      <View style={{height: hp(30), backgroundColor: 'black'}}>
        <FastImage
          source={require('../../assets/images/record1.png')}
          style={styles.image}
        />
        <View style={{position: 'absolute', top: hp(2), left: hp(2)}}>
          <Proxima title={'Hi, ' + props.name} color="white" type="bold" />
          <Proxima title="Ready to workout?" color="white" type="bold" />
        </View>
        <View style={styles.oval}></View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            height: hp(15),
            paddingHorizontal: ms(16),
            backgroundColor: 'white',
          }}>
          <Proxima
            title="Getting started"
            color={Colors.grey1}
            size={25}
            type="bold"
            style={{paddingBottom: ms(16)}}
          />
          <Proxima
            title="To get you started, we’ve detailed a few steps on how to get the most of 10X10."
            color={Colors.grey1}
            size={16}
            style={{paddingBottom: ms(16)}}
          />
          <View style={{flexDirection: 'row', paddingBottom: ms(20)}}>
            <View
              style={{
                backgroundColor: Colors.secondary.orange,
                borderRadius: 50,
              }}>
              <Icon
                name="location-arrow"
                size={12}
                color={Colors.orange2}
                style={{padding: ms(10)}}
              />
            </View>
            <View style={{justifyContent: 'center', paddingLeft: ms(10)}}>
              <Proxima
                title="Activate your GPS on your phone."
                color={Colors.grey1}
                size={16}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: ms(20)}}>
            <View
              style={{
                backgroundColor: Colors.secondary.orange,
                borderRadius: 50,
              }}>
              <Icon
                name="dot-circle"
                size={12}
                color={Colors.orange2}
                style={{padding: ms(10)}}
              />
            </View>
            <View style={{justifyContent: 'center', paddingLeft: ms(10)}}>
              <Proxima
                title="Record or train using this app"
                color={Colors.grey1}
                size={16}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: Colors.secondary.orange,
                borderRadius: 50,
              }}>
              <Icon
                name="check"
                size={12}
                color={Colors.orange2}
                style={{padding: ms(10)}}
              />
            </View>
            <View style={{justifyContent: 'center', paddingLeft: ms(10)}}>
              <Proxima
                title="You’re workout done"
                color={Colors.grey1}
                size={16}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  name: state.authReducer.name,
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.5,
    zIndex: -2,
  },
  oval: {
    position: 'absolute',
    bottom: -wp(90),
    width: wp(100),
    height: wp(100),
    backgroundColor: 'white',
    borderRadius: wp(100 / 2),
    transform: [{scaleX: 2}],
    alignSelf: 'center',
    zIndex: -1,
  },
});
