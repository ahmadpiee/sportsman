import { Proxima , Button, TextInput, Loading} from 'components';
import Colors from 'config/Colors';
import React, { useState,useEffect} from 'react'
import { View, StyleSheet,TouchableOpacity,Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import { logoutAction } from "store/actions/AuthAction";
import { editUserAction, getProfileAction, editImageAction , editPasswordAction} from "store/actions/UserAction";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Overlay } from 'react-native-elements';


const Profile = (props) => {

    const { editUserAction, getProfileAction,name,gender,image,level,email,loading ,editImageAction,editPasswordAction,googleFb, editUserLoading} = props


    const [ImageSource, setImageSource] = useState({});
    const [Gender, setGender] = useState('');
    const [Name, setName] = useState(null)
    const [Intensity, setIntensity] = useState('');
    const [Disabled, setDisabled] = useState(true);
    const [Image, setImage] = useState(0);
    const [NewPassword, setNewPassword] = useState('');
    const [CheckPass, setCheckPass] = useState('');
    const [PassDisabled, setPassDisabled] = useState(true);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getProfileAction()
    }, [])


    useEffect(() => {
        if(NewPassword.length>=1 && NewPassword.length<5){
            setCheckPass(true)
        }else{setCheckPass(false)}

        if(NewPassword.length>=5 && NewPassword!=''){
            setPassDisabled(false)
        }else setPassDisabled(true)

    }, [NewPassword])

    useEffect(() => {
        setName(name)
        setGender(gender)
        setIntensity(level)
        setImage(image)
    }, [name,level,gender,image])

    useEffect(() => {
        checkSubmit()
    }, [Name,name,Gender,level,Intensity,gender])

    const toggleOverlay = () => {
        setVisible(!visible);
      };

    const chooseImage = () => {
        let options = {
            mediaType:'photo',
            noData: true,
            storageOptions: {
                skipBackup: true
            }
        };
    
        launchImageLibrary(options, response => {
          console.log({ response });
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            const {uri,fileName,type} = response
            setImageSource((prevState)=>({...prevState,uri,fileName,type}))
          }
        });
      }

    const checkSubmit = () =>{
        const checkName = Name==''||Name==name||Name==null ? false : true
        const checkGender = Gender==gender ? false : true
        const checkLevel = Intensity==level ? false : true

        if(checkName || checkGender || checkLevel){
            setDisabled(false)
        }else{
            setDisabled(true)
        }

    }
      useEffect(() => {
          if(ImageSource.hasOwnProperty('uri')){
              setImage(0)
              editImageAction(ImageSource)
          }
      }, [ImageSource])

    const handleSave = () =>{
        Keyboard.dismiss()
        const lvl = Number(Intensity)
        editUserAction(Name,Gender,lvl)
    }
      
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View  style={{flex:1, paddingHorizontal:ms(16), paddingTop:hp(5), backgroundColor:Colors.white}}>
            {
                loading ?
                <Loading/>
                :
                <View>
                <View style={{height:hp(20),flexDirection:'row'}}>
                        <View style={{paddingRight:ms(20),justifyContent:'center'}}>
                            <TouchableOpacity onPress={chooseImage}>
                                {
                                    Image == 0 ?
                                    <View style={styles.image}>
                                    </View> 
                                    :
                                    <View>
                                        <FastImage
                                            source={{ uri: Image}}
                                            style={styles.image}
                                        />
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:'center'}}> 
                            <Proxima title={name} color={Colors.grey1} type='bold' size={24} /> 
                        </View>
                </View>
                <View style={{height:hp(55)}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:ms(12),paddingTop:ms(5)}}>
                        <Proxima
                            title="PERSONAL INFO"
                            color={Colors.gray2}
                            size={12}
                        />
                        
                            {
                                Disabled ?
                                null:
                                editUserLoading ?
                                <View style={{height:ms(16)}}>
                                    <ActivityIndicator color={Colors.orange2}/>
                                </View>
                                :
                                <TouchableOpacity 
                                    onPress={()=>handleSave()}
                                >
                                    <Icon name='check' size={16} color={Colors.orange2}/>
                                </TouchableOpacity>
                            }
                
                    </View>
                    <View style={{height:1,backgroundColor:'#E1E1E1'}}/>
                    <Proxima
                        title="Name"
                        color={Colors.gray1}
                        size={12}
                        style={{paddingTop:ms(15),paddingBottom:ms(8)}}
                    />
                    <TextInput onChangeText={(Name) => setName(Name)} containerStyle={{paddingVertical:0}} value={Name}/>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:ms(15)}}>
                        <View style={{minWidth:wp(45)}}>
                            <Proxima
                                title="Gender"
                                color={Colors.gray1}
                                size={12}
                                style={{paddingBottom:ms(8)}}
                            />
                            <View style={{borderColor: '#E1E1E1', borderWidth: 1}}>
                                <Picker
                                    selectedValue={Gender}
                                    style={{height: ms(45)}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setGender(itemValue)
                                    }>
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Male" value="male" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{minWidth:wp(45)}}>
                            <Proxima
                                title="Intensity"
                                color={Colors.gray1}
                                size={12}
                                style={{paddingBottom:ms(8)}}
                            />
                            <View style={{borderColor: '#E1E1E1', borderWidth: 1}}>
                                <Picker
                                    selectedValue={Intensity}
                                    style={{height: ms(45)}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setIntensity(itemValue)
                                    }>
                                    <Picker.Item label="0 - 1 Workouts" value={"1"} />
                                    <Picker.Item label="2 - 4 Workouts" value={"2"} />
                                    <Picker.Item label="+5 Workouts" value={"3"} />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    
                            <View style={{height:1,backgroundColor:'#E1E1E1'}}/>
                            <View style={{flexDirection:'row',paddingVertical:ms(18)}}>
                                <View style={{flex:1}}>
                                    <Proxima
                                        title="Email Address"
                                        color={Colors.gray1}
                                        size={16}
                                        style={{paddingBottom:ms(5)}}
                                    />
                                    <Proxima
                                        title={email}
                                        color={Colors.gray1}
                                        size={14}
                                    /> 
                                </View>
                                {/* <Button 
                                    title="Change"
                                    buttonStyle={{backgroundColor:Colors.secondary.orange,minWidth:ms(90)}}
                                    titleColor={Colors.orange2}
                                    borderColor={Colors.secondary.orange}
                                    onPress={()=>console.log("kepencet")}
                                    containerStyle={{paddingVertical:ms(0)}}
                                /> */}
                            </View>
                            <View style={{height:1,backgroundColor:'#E1E1E1'}}/>
                    {
                        googleFb == true ?
                        null:
                        <>
                            <View style={{flexDirection:'row',paddingVertical:ms(18)}}>
                                <View style={{justifyContent:'center',flex:1}}>
                                    <Proxima
                                        title="Password"
                                        color={Colors.gray1}
                                        size={16}
                                    />
                                </View>
                                <Button 
                                    title="Change"
                                    buttonStyle={{backgroundColor:Colors.secondary.orange,minWidth:ms(90)}}
                                    titleColor={Colors.orange2}
                                    borderColor={Colors.secondary.orange}
                                    onPress={toggleOverlay}
                                    containerStyle={{paddingVertical:ms(0)}}
                                />
                            </View>
                        </>
                    }
                    
                </View>
                <View style={{height:hp(15)}}>
                    <Button 
                        title="LogOut"
                        buttonStyle={{backgroundColor:Colors.secondary.orange}}
                        titleColor={Colors.orange2}
                        borderColor={Colors.secondary.orange}
                        containerStyle={{paddingTop:ms(35)}}
                        onPress={()=>{
                            props.logoutAction();
                            Keyboard.dismiss()
                        }}
                    />
                </View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{width:wp(50)}}>
                        <Proxima title='New Password' style={{paddingBottom:ms(5)}} size={12}/>
                        <TextInput onChangeText={(NewPassword) => setNewPassword(NewPassword)} passToggle={true} containerStyle={{paddingVertical:0,paddingBottom:ms(3)}} value={NewPassword}/>
                        <View>
                            {
                                CheckPass ?
                                <Proxima
                                title="password must have 5 characters"
                                style={{color:Colors.red}}
                                size={10}
                                />:null
                            }
                        </View>
                        <View style={{flexDirection:'row',paddingTop:ms(7),justifyContent:'space-between'}}>
                            <TouchableOpacity
                                onPress={toggleOverlay}
                            >
                                <Proxima title='Cancel'/>
                            </TouchableOpacity>
                            <View>
                                {
                                    PassDisabled ?
                                    null
                                    :
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            Keyboard.dismiss()
                                            toggleOverlay()
                                            editPasswordAction(NewPassword)
                                        }}
                                    >
                                        <Proxima title='Done' color={Colors.orange2}/>
                                    </TouchableOpacity>
                                    
                                }
                            </View>
                        </View>
                    </View>
                </Overlay>
            </View>
            }
        </View>
        </TouchableWithoutFeedback>
    )
}

const mapStateToProps = (state) => ({
    name:state.userReducer.name,
    email:state.userReducer.email,
    image:state.userReducer.image,
    level:state.userReducer.level,
    gender:state.userReducer.gender,
    loading:state.globalReducer.isLoading,
    googleFb:state.authReducer.googleFb,
    editUserLoading:state.userReducer.editUserLoading
})

const mapDispatchToProps = {
    logoutAction,
    editUserAction,
    getProfileAction,
    editImageAction,
    editPasswordAction
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
    containerPicker: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    image:{
        height:ms(100),
        width:ms(100),
        borderRadius:ms(50),
        backgroundColor:Colors.grey3
    }
})
