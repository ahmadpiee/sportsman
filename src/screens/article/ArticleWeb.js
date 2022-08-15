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
import {WebView} from 'react-native-webview';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Loading} from 'components';
import Colors from 'config/Colors';

const ArticleWeb = (props) => {
  const [Visible, setVisible] = useState(true);

  const hideSpinner = () => {
    setVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => hideSpinner()}
        style={{width: wp(100), marginTop: ms(20)}}
        source={{uri: props.route.params.link}}
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

export default ArticleWeb;
