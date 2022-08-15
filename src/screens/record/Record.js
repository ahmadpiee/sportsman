import {Proxima, Button} from 'components';
import Colors from 'config/Colors';
import React, {useRef, useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import {getRecordAction, deleteRecordAction} from 'store/actions/RecordAction';
import {FlatList} from 'react-native';
import {Overlay} from 'react-native-elements';

const sport = [
  {
    id: 0,
    icon: () => <Icon name="bicycle" size={30} color={Colors.orange2} />,
    title: 'Bicycle',
    active: true,
  },
  {
    id: 1,
    icon: () => <Icon name="walking" size={30} color={Colors.orange2} />,
    title: 'Walk',
    active: false,
  },
  {
    id: 2,
    icon: () => <Icon name="running" size={30} color={Colors.orange2} />,
    title: 'Run',
    active: false,
  },
  {
    id: 3,
    icon: () => <Icon name="hiking" size={30} color={Colors.orange2} />,
    title: 'Hike',
    active: false,
  },
];

const Record = (props) => {
  const {loading, getRecordAction, history, deleteRecordAction} = props;

  const refRBSheet = useRef();

  const [Sport, setSport] = useState(sport);
  const [Rendered, setRendered] = useState(false);
  const [selectedSport, setselectedSport] = useState(null);

  const [visible, setVisible] = useState(false);

  const [DeleteId, setDeleteId] = useState('');

  const chooseSport = (id, status) => {
    const activeTmp = Sport.find((value) => value.active);
    const isNotActive = {...activeTmp, active: false};
    const getClick = Sport.find((value) => value.id === id);
    const setActive = {...getClick, active: true};
    sport[isNotActive.id] = isNotActive;
    sport[id] = setActive;

    setSport(sport);
    setRendered(!Rendered);
    setselectedSport(setActive.id);

    refRBSheet.current.close();

    props.navigation.navigate('RecordMap', {
      title: setActive.title,
      id: setActive.id,
    });
  };
  useEffect(() => {
    getRecordAction();
  }, []);

  const getIcon = (id) => {
    switch (id) {
      case 0:
        return {icon: 'bicycle', title: 'Bicycle'};
        break;
      case 1:
        return {icon: 'walking', title: 'Walk'};
        break;
      case 2:
        return {icon: 'running', title: 'Run'};
        break;
      case 3:
        return {icon: 'hiking', title: 'Hike'};
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setVisible(true);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const renderHistory = ({item, index}) => (
    <View style={{paddingBottom: ms(5)}}>
      <View style={{borderWidth: 1, borderColor: Colors.grey4}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{padding: ms(14), flex: 1}}>
            <View
              style={{
                backgroundColor: Colors.gray5,
                height: ms(48),
                width: ms(48),
                borderRadius: ms(24),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={getIcon(item.category).icon}
                color={Colors.grey3}
                size={24}
              />
            </View>
          </View>
          <View style={{padding: ms(14), flex: 7}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Proxima
                title={getIcon(item.category).title}
                size={12}
                color={Colors.grey2}
                style={{width: wp(20)}}
              />
              <Proxima title={item.createdAt} size={12} color={Colors.grey2} />
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Icon name="trash" color={Colors.grey3} size={14} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: ms(6),
              }}>
              <Proxima title={item.time} size={14} color={Colors.grey1} />
              <Proxima
                title={item.distance + ' KM'}
                size={14}
                color={Colors.grey1}
              />
              <Proxima
                title={item.speed + ' KM/H'}
                size={14}
                color={Colors.grey1}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

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
          <Proxima title="Ready to train?" color="white" type="bold" />
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
            title="Ready for new workout?"
            color={Colors.grey1}
            size={21}
            type="bold"
            style={{paddingBottom: ms(10), alignSelf: 'center'}}
          />
          <Button
            title="Ready to sweat"
            onPress={() => refRBSheet.current.open()}
          />
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
            }}
            height={hp(50)}>
            <View style={{padding: ms(21)}}>
              <Proxima
                title="Choose a sport"
                color={Colors.grey1}
                size={16}
                type="bold"
              />
              <Proxima
                title="Please select one sport you’re going to track"
                color={Colors.grey2}
                size={12}
                type="bold"
                style={{paddingBottom: ms(20)}}
              />
              <View>
                {Sport.map((value) => {
                  return (
                    <TouchableOpacity
                      onPress={() => chooseSport(value.id, value.active)}
                      key={value.id.toString()}
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: ms(8),
                        paddingVertical: ms(8),
                        marginBottom: ms(10),
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{minWidth: ms(40)}}>{value.icon()}</View>
                        <Proxima
                          title={value.title}
                          color={Colors.grey1}
                          size={16}
                          style={{
                            alignSelf: 'center',
                            paddingHorizontal: ms(15),
                          }}
                        />
                      </View>
                      {value.active ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={30}
                          color={Colors.green}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </RBSheet>
        </View>
        <View
          style={{
            height: hp(50),
            backgroundColor: 'white',
            paddingHorizontal: ms(16),
          }}>
          <Proxima
            title="Recent Record"
            size={21}
            type="bold"
            color={Colors.grey1}
            style={{paddingBottom: ms(10)}}
          />
          <View style={{marginBottom: ms(70)}}>
            <FlatList
              ListHeaderComponent={
                loading ? (
                  <ActivityIndicator
                    size="large"
                    color={Colors.orange2}
                    style={{paddingBottom: ms(5)}}
                  />
                ) : null
              }
              showsVerticalScrollIndicator={false}
              data={history}
              renderItem={renderHistory}
              keyExtractor={(item) => item._id.toString()}
              scrollsToTop={true}
            />
          </View>
        </View>
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{alignItems: 'center'}}>
          <Proxima title="Delete Record?" style={{paddingBottom: ms(10)}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: ms(5),
            }}>
            <View style={{width: ms(70), alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Proxima title="Cancel" type="Bold" />
              </TouchableOpacity>
            </View>
            <View style={{width: ms(70), alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  deleteRecordAction(DeleteId);
                  setVisible(false);
                }}>
                <Proxima title="Delete" type="Bold" color={Colors.orange2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

const mapStateToProps = (state) => ({
  name: state.authReducer.name,
  loading: state.globalReducer.isLoading,
  history: state.recordReducer.history,
});
const mapDispatchToProps = {
  getRecordAction,
  deleteRecordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);

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
