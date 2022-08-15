import React from 'react'
import { View, Text ,ActivityIndicator} from 'react-native'
import Colors from '../config/Colors';

export default function OverlayLoading({

}) {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator
              size="large" color={Colors.orange2}
            />
        </View>
    )
}
