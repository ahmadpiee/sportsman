import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ms} from 'react-native-size-matters';
import { Proxima , Button} from "components";
import { connect } from 'react-redux'
import { onBoardingAction } from "store/actions/OnBoardingAction";

const OnBoardingDone = (props) => {
 
    const {gender,level} = props.route.params

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/onboarding.png')} style={styles.image}>
            <ImageBackground source={require('../../assets/images/gradient.png')} style={styles.image}>
                <View style={{flex:1,justifyContent:'space-between'}}>
                    <View style={{paddingVertical:hp(6)}}>
                        <FastImage 
                        style={{ width: ms(200), height: ms(50), alignSelf:'center',opacity:0.7 }}
                        source={require('../../assets/images/Logo.png')}
                        resizeMode='contain'/>
                    </View>
                    <View style={{padding:ms(20)}}>
                        <Proxima style={styles.text} title={"Awesome "+ props.name +", ready to sweat?"}/>
                        <Proxima style={{color:'white',opacity:0.8,paddingBottom:ms(15)}}
                            title='You’re ready to go. Start uploading activities, compete with friends, build your community and most importantly, have fun!'
                            size={16}
                        />
                        <Button 
                            title='Done'
                            onPress={() => {
                            props.onBoardingAction(gender,level)
                            props.navigation.navigate('MainTab');
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </ImageBackground>
    </View>
    )
}
const mapStateToProps = (state) => ({
    name:state.authReducer.name,
  })
const mapDispatchToProps = {
    onBoardingAction
}
  export default connect(
    mapStateToProps,mapDispatchToProps
  )(OnBoardingDone);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        paddingBottom:ms(10)
    },
});