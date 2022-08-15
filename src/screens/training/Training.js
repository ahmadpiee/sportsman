import {Proxima} from 'components';
import Colors from 'config/Colors';
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {
  getTrainingAction,
  getTrainingByIdAction,
  getTrainingByGenderAction,
} from 'store/actions/TrainingAction';

const Training = (props) => {
  const {
    loading,
    getTrainingAction,
    training,
    gender,
    getTrainingByIdAction,
    getTrainingByGenderAction,
    trainingByGender,
    trainingGenderLoading,
    trainingLoading,
  } = props;

  const getGender = (gender) => {
    return gender == 'female' ? 'Women' : 'Men';
  };

  useEffect(() => {
    getTrainingByGenderAction();
    getTrainingAction();
  }, [gender]);

  const renderTrainingGender = ({item, index}) => (
    <View>
      <RenderTraining item={item} />
    </View>
  );

  const RenderTraining = ({item, index}) => (
    <View style={{paddingLeft: ms(16)}}>
      <TouchableOpacity onPress={() => getTrainingByIdAction(item._id)}>
        {item.image.includes('https:') ? (
          <FastImage
            style={{
              width: ms(135),
              height: ms(135),
            }}
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
          />
        ) : (
          <FastImage
            style={{
              width: ms(135),
              height: ms(135),
            }}
            source={require('assets/images/training2.png')}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
      <Proxima
        title={item.title}
        color={Colors.grey1}
        size={14}
        numberOfLines={1}
        style={{paddingTop: ms(8), width: ms(135)}}
      />
      <View style={{flexDirection: 'row', paddingTop: ms(3)}}>
        <Proxima
          title={
            item.intensity === '1'
              ? 'Beginner'
              : item.intensity === '2'
              ? 'Intermediate'
              : 'Advanced'
          }
          color={Colors.grey2}
          size={12}
        />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: hp(3)}} />
      <View style={{height: hp(30), backgroundColor: 'black'}}>
        <FastImage
          source={require('../../assets/images/training.png')}
          style={styles.image}
        />
        <View style={{position: 'absolute', top: hp(2), left: hp(2)}}>
          <Proxima title={'Hi, ' + props.name} color="white" type="bold" />
          <Proxima title="Ready to train?" color="white" type="bold" />
        </View>
        <View style={{position: 'absolute', top: hp(3), right: hp(3)}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Bookmark');
            }}>
            <Ionicons name="bookmark" color={Colors.white} size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.oval}></View>
      </View>
      <View style={{flex: 1}}>
        <View>
          <Proxima
            title={'Top Picks For ' + getGender(gender)}
            color={Colors.grey1}
            size={18}
            type="Bold"
            style={{paddingBottom: ms(10), paddingHorizontal: ms(16)}}
          />
          <View style={{height: hp(25)}}>
            {trainingGenderLoading ? (
              <ActivityIndicator
                color={Colors.orange2}
                style={{paddingVertical: ms(5), paddingHorizontal: ms(16)}}
              />
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={trainingByGender}
                horizontal={true}
                renderItem={renderTrainingGender}
                keyExtractor={(item) => item._id.toString()}
                scrollsToTop={true}
              />
            )}
          </View>
        </View>
        <View style={{paddingTop: ms(10)}}>
          <Proxima
            title="Workouts"
            color={Colors.grey1}
            size={18}
            type="Bold"
            style={{paddingBottom: ms(10), paddingHorizontal: ms(16)}}
          />
          <View style={{height: hp(25)}}>
            {trainingLoading ? (
              <ActivityIndicator
                color={Colors.orange2}
                style={{paddingVertical: ms(5), paddingHorizontal: ms(16)}}
              />
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={training}
                horizontal={true}
                renderItem={RenderTraining}
                keyExtractor={(item) => item._id.toString()}
                scrollsToTop={true}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  name: state.authReducer.name,
  gender: state.authReducer.gender,
  loading: state.globalReducer.isLoading,
  training: state.trainingReducer.training,
  trainingByGender: state.trainingReducer.trainingByGender,
  trainingGenderLoading: state.trainingReducer.trainingGenderLoading,
  trainingLoading: state.trainingReducer.trainingLoading,
});
const mapDispatchToProps = {
  getTrainingAction,
  getTrainingByIdAction,
  getTrainingByGenderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Training);

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
