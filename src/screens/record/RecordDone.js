import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ms} from 'react-native-size-matters';
import { Proxima , Button} from "components";
import { connect } from 'react-redux'
import { isLoading } from "store/actions/GlobalAction";
import { getRecordAction } from "store/actions/RecordAction";

const RecordDone = (props) => {
    const {route,isLoading,loading} = props
    return (
    <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/recorddone.png')} style={styles.image}>
            <ImageBackground source={require('../../assets/images/gradient.png')} style={styles.image}>
                <View style={{flex:1,justifyContent:'space-between'}}>
                    <View style={{paddingVertical:hp(6)}}>
                        <FastImage 
                        style={{ width: ms(200), height: ms(50), alignSelf:'center',opacity:0.7 }}
                        source={require('../../assets/images/Logo.png')}
                        resizeMode='contain'/>
                    </View>
                    <View style={{padding:ms(20)}}>
                        <Proxima style={styles.text} title={"Awesome workout!"}/>
                        <Proxima style={{color:'white',opacity:0.8,paddingBottom:ms(15)}}
                            title='Congrats on your first workout. Your activity is uploading. '
                            size={16}
                        />
                        <Button 
                            title={loading ? 'Uploading..':'Done'}
                            disabled={loading}
                            onPress={() => {
                            props.navigation.navigate('Record');
                            props.getRecordAction()
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
    loading:state.globalReducer.isLoading,
});
const mapDispatchToProps = {
    isLoading,
    getRecordAction
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RecordDone)



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