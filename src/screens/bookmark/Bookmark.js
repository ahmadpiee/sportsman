import {Proxima} from 'components';
import Colors from 'config/Colors';
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getBookmarkAction,
  deleteBookmarkAction,
} from 'store/actions/BookmarkAction';
import {getTrainingByIdAction} from 'store/actions/TrainingAction';

const {width, height} = Dimensions.get('window');

const Bookmark = (props) => {
  const {
    getBookmarkAction,
    deleteBookmarkAction,
    bookmark,
    getTrainingByIdAction,
    loading,
  } = props;

  useEffect(() => {
    getBookmarkAction();
  }, []);

  const renderBookmark = ({item, index}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => getTrainingByIdAction(item.content_id._id)}
        style={[
          {
            backgroundColor: 'white',
            flex: 1,
          },
          index % 2 == 0
            ? {
                marginLeft: ms(21),
                marginRight: ms(12),
              }
            : {
                marginRight: ms(21),
                marginLeft: ms(12),
              },
        ]}>
        <View style={{flex: 1, height: ms(150)}}>
          {item.content_id.image.includes('https:') ? (
            <FastImage
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
              source={{
                uri: item.content_id.image,
              }}
              resizeMode="cover"
            />
          ) : (
            <FastImage
              style={{
                ...StyleSheet.absoluteFillObject,
              }}
              source={require('assets/images/training2.png')}
              resizeMode="cover"
            />
          )}
        </View>
        <Proxima
          title={item.content_id.title}
          color={Colors.grey1}
          size={14}
          numberOfLines={1}
          style={{paddingTop: ms(8), width: ms(135)}}
        />
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
          style={{paddingTop: ms(3)}}
        />
        <TouchableOpacity
          onPress={() => {
            props.deleteBookmarkAction(item._id, true);
          }}
          style={{
            position: 'absolute',
            top: ms(5),
            right: ms(5),
            borderColor: Colors.grey2,
          }}>
          <Ionicons name="bookmark" size={24} color={Colors.orange2} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          height: hp(10),
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: ms(25),
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: hp(5),
            left: ms(15),
          }}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={24} color={Colors.grey1} />
        </TouchableOpacity>
        <Proxima title="Your Trainings" size={16} />
      </View>
      <View
        style={{
          height: 1,
          width: wp(100),
          backgroundColor: Colors.grey4,
          alignSelf: 'center',
        }}
      />
      <FlatList
        ListHeaderComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.orange2}
              style={{paddingTop: ms(21)}}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        data={bookmark}
        renderItem={renderBookmark}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        scrollsToTop={true}
        style={{flex: 1, backgroundColor: 'white'}}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  loading: state.globalReducer.isLoading,
  bookmark: state.bookmarkReducer.bookmark,
});

const mapDispatchToProps = {
  getBookmarkAction,
  deleteBookmarkAction,
  getTrainingByIdAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    width: width * 0.5,
    paddingTop: ms(21),
  },
});
