import React from 'react';
import {View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function OverlayLoading({
  visible = false,
  color = 'white',
  overlayColor = 'rgba(0, 0, 0, 0.60)',
}) {
  return (
    <Spinner color={color} visible={visible} overlayColor={overlayColor} />
  );
}
