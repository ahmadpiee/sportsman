import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {ms} from 'react-native-size-matters';

export default function Proxima({
  title,
  size = 14,
  type = 'Regular',
  color = 'black',
  style,
  numberOfLines,
}) {
  const styles = StyleSheet.create({
    textStyle: {
      fontFamily: `Proxima Nova ${type}`,
      fontSize: ms(size),
      color: color,
      ...style,
    },
  });

  return (
    <Text style={styles.textStyle} numberOfLines={numberOfLines}>
      {title}
    </Text>
  );
}
