import {Proxima, Loading} from 'components';
import Colors from 'config/Colors';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  bookmarkAction,
  getBookmarkAction,
  deleteBookmarkAction,
  isBookmarkedAction,
} from 'store/actions/BookmarkAction';

const TrainingContent = (props) => {
  const {
    title,
    image,
    video,
    equipment,
    intensity,
    description,
    level,
    _id,
  } = props.training;

  const {bookmarked, selectedBookmark, isBookmarkedAction} = props;

  const [Image, setImage] = useState(
    require('../../assets/images/training2.png'),
  );

  useEffect(() => {
    if (image != undefined) {
      if (image.includes('https:')) {
        setImage({uri: image});
      } else {
        setImage(require('../../assets/images/training2.png'));
      }
    }
  }, [image]);

  const RenderVideo = ({item, index}) => (
    <View style={{height: ms(250)}}>
      <Proxima
        title={'Exercise ' + (index + 1)}
        color={Colors.grey3}
        style={{paddingBottom: ms(5)}}
      />
      <View>
        <YoutubePlayer height={ms(210)} videoId={item.videoUrl} />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {props.loading ? (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Loading />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{height: hp(30)}}>
            <ImageBackground source={Image} style={styles.image}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.30)', 'rgba(0, 0, 0, 0.90)']}
                style={styles.linearGradient}></LinearGradient>
              <View style={{justifyContent: 'space-between', flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(5),
                    paddingTop: hp(5),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.goBack();
                      isBookmarkedAction(false);
                    }}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                  </TouchableOpacity>
                  {bookmarked ? (
                    <TouchableOpacity
                      onPress={() => {
                        props.deleteBookmarkAction(selectedBookmark, false);
                      }}>
                      <Ionicons name="bookmark" size={24} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        props.bookmarkAction(_id);
                      }}>
                      <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Proxima
                  title={title}
                  color="white"
                  type="Bold"
                  size={22}
                  style={{
                    alignSelf: 'center',
                    maxWidth: wp(90),
                    textAlign: 'center',
                  }}
                />
                <View style={{paddingBottom: ms(20), alignItems: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', width: ms(105)}}>
                      <Proxima
                        title="30"
                        color="white"
                        style={{alignSelf: 'center', paddingBottom: ms(5)}}
                      />
                      <Proxima
                        title="AVG. MINUTES"
                        color={Colors.grey2}
                        size={10}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View
                      style={{
                        height: ms(35),
                        backgroundColor: Colors.grey2,
                        width: ms(1),
                      }}
                    />
                    <View style={{justifyContent: 'center', width: ms(105)}}>
                      <Proxima
                        title="Moderate"
                        color="white"
                        style={{alignSelf: 'center', paddingBottom: ms(5)}}
                      />
                      <Proxima
                        title="INTENSITY"
                        color={Colors.grey2}
                        size={10}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                    <View
                      style={{
                        height: ms(35),
                        backgroundColor: Colors.grey2,
                        width: ms(1),
                      }}
                    />
                    <View style={{justifyContent: 'center', width: ms(105)}}>
                      <Proxima
                        title={
                          intensity === '1'
                            ? 'Beginner'
                            : intensity === '2'
                            ? 'Intermediate'
                            : 'Advanced'
                        }
                        color="white"
                        style={{alignSelf: 'center', paddingBottom: ms(5)}}
                      />
                      <Proxima
                        title="LEVEL"
                        color={Colors.grey2}
                        size={10}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{padding: ms(10), flex: 1}}>
            <FlatList
              ListHeaderComponent={
                <View
                  style={{backgroundColor: 'white', paddingHorizontal: ms(15)}}>
                  <View
                    style={{
                      minHeight: hp(15),
                      justifyContent: 'center',
                      borderColor: Colors.gray5,
                      borderBottomWidth: ms(1),
                      paddingVertical: ms(15),
                    }}>
                    <Proxima
                      title="Description"
                      type="Bold"
                      style={{alignSelf: 'center', paddingBottom: ms(10)}}
                    />
                    <Proxima
                      title={description}
                      color={Colors.grey1}
                      style={{alignSelf: 'center', textAlign: 'center'}}
                    />
                  </View>
                  <View style={{height: hp(12), justifyContent: 'center'}}>
                    <Proxima
                      title="Equipment"
                      type="Bold"
                      style={{alignSelf: 'center', paddingBottom: ms(10)}}
                    />
                    <Proxima
                      title={equipment}
                      color={Colors.grey1}
                      style={{alignSelf: 'center', textAlign: 'center'}}
                    />
                  </View>
                </View>
              }
              showsVerticalScrollIndicator={false}
              data={video}
              renderItem={RenderVideo}
              keyExtractor={(item) => item._id.toString()}
              scrollsToTop={true}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  training: state.trainingReducer.selectedTraining,
  loading: state.globalReducer.isLoading,
  bookmark: state.bookmarkReducer.bookmark,
  bookmarked: state.bookmarkReducer.bookmarked,
  selectedBookmark: state.bookmarkReducer.selectedBookmark,
});

const mapDispatchToProps = {
  bookmarkAction,
  getBookmarkAction,
  deleteBookmarkAction,
  isBookmarkedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainingContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    zIndex: -2,
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
