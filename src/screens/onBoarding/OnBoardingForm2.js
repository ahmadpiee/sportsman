import React from 'react'
import { View, StyleSheet , TouchableOpacity, ScrollView} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ms} from 'react-native-size-matters';
import Colors from 'config/Colors';
import { Proxima, Button } from "components";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
import { onBoardingAction } from "store/actions/OnBoardingAction";

const OnBoardingForm2 = (props) => {

    const onBoardingSubmit =(level)=>{
        props.navigation.navigate('OnBoardingDone',{gender:props.route.params.gender,level})
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={()=>{
                props.navigation.navigate('OnBoardingForm')
            }}
            >
                <Icon name="chevron-back" size={25} color="black"/>
            </TouchableOpacity>
            <Proxima 
                style={{alignSelf:'center',position:'absolute',top:hp(5),color:Colors.orange2,fontWeight:'bold'}}
                title='2 of 2'
                />
            <View style={{flexDirection:'row',paddingVertical:ms(20)}}>
                <View style={{flex:1,backgroundColor:Colors.orange2,height: ms(5),marginRight:ms(10)}}/>
                <View style={{flex:1,backgroundColor:Colors.orange2,height: ms(5),marginLeft:ms(10)}}/>
            </View>
            <ScrollView>
                <View>
                    <Proxima title='How many time do you workout per week?' size={28} type='bold' style={{paddingBottom:ms(25)}}/>
                    <Proxima title='We’ll use this to recommend workouts for you to try' size={16} style={{paddingBottom:ms(25)}}/>
                    <Button 
                        title='0 - 1 Workouts'
                        smallTitle="I’m a little rusty" 
                        onPress={() => {
                            onBoardingSubmit(1)
                        }}
                        buttonStyle={{backgroundColor:'white'}}
                        titleColor={'black'}
                        borderColor={Colors.grey4}
                    />
                    <Button 
                        title='2 - 4 Workouts'
                        smallTitle="I’m a regular" 
                        onPress={() => {
                            onBoardingSubmit(2)
                        }}
                        buttonStyle={{backgroundColor:'white'}}
                        titleColor={'black'}
                        borderColor={Colors.grey4}
                    />
                    <Button 
                        title='5+ Workouts'
                        smallTitle="I’m ready for anything" 
                        onPress={() => {
                            onBoardingSubmit(3)
                        }}
                        buttonStyle={{backgroundColor:'white'}}
                        titleColor={'black'}
                        borderColor={Colors.grey4}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    onBoardingAction
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OnBoardingForm2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        paddingVertical:hp(5),
        paddingHorizontal:wp(5)
    },
})