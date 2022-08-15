import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../config/Colors';
import {ms} from 'react-native-size-matters';
import Proxima from './Proxima';

export default function Button({
  title,
  onPress,
  disabled = false,
  backgroundColor = Colors.orange2,
  buttonStyle,
  containerStyle,
  borderColor = Colors.orange2,
  titleColor = 'white',
  smallTitle = '',
}) {
  return (
    <View
      style={[
        {justifyContent: 'center', paddingVertical: ms(10)},
        containerStyle,
      ]}>
      <TouchableOpacity
        style={
          disabled
            ? [
                styles.button,
                {backgroundColor: Colors.grey4, borderColor: Colors.grey4},
              ]
            : [
                styles.button,
                {backgroundColor: backgroundColor, borderColor: borderColor},
                buttonStyle,
              ]
        }
        onPress={onPress}
        disabled={disabled}>
        <Proxima
          title={title}
          style={{fontWeight: 'bold'}}
          color={titleColor}
        />
        {smallTitle != '' ? (
          <Proxima title={smallTitle} color={Colors.grey2} size={12} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: ms(12),
    borderWidth: 1,
    alignItems: 'center',
  },
});
