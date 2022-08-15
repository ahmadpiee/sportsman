import React from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ms} from 'react-native-size-matters';
import Colors from 'config/Colors';
import { Proxima, Button } from "components";
import Icon from 'react-native-vector-icons/Ionicons';

export default function OnBoardingForm(props) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=>{
                props.navigation.navigate('OnBoarding')
            }}
            >
                <Icon name="chevron-back" size={25} color="black"/>
            </TouchableOpacity>
            <Proxima 
                style={{alignSelf:'center',position:'absolute',top:hp(5),color:Colors.orange2,fontWeight:'bold'}}
                title='1 of 2'
                />
            <View style={{flexDirection:'row',paddingVertical:ms(20)}}>
                <View style={{flex:1,backgroundColor:Colors.orange2,height: ms(5),marginRight:ms(10)}}/>
                <View style={{flex:1,backgroundColor:Colors.secondary.orange,height: ms(5),marginLeft:ms(10)}}/>
            </View>
            <Proxima title='Help us tailor the experience to you' size={28} type='bold' style={{paddingBottom:ms(25)}}/>
            <Button 
                title='Female'
                onPress={() => {
                    props.navigation.navigate('OnBoardingForm2',{gender:'female'})
                }}
                buttonStyle={{backgroundColor:'white'}}
                titleColor={'black'}
                borderColor={Colors.grey4}
            />
            <Button 
                title='Male'
                onPress={() => {
                    props.navigation.navigate('OnBoardingForm2',{gender:'male'})
                }}
                buttonStyle={{backgroundColor:'white'}}
                titleColor={'black'}
                borderColor={Colors.grey4}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        paddingVertical:hp(5),
        paddingHorizontal:wp(5)
    },
})
