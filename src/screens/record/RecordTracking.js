import { Proxima, Button } from 'components';
import Colors from 'config/Colors';
import React, { useRef , useState, useEffect} from 'react'
import { View, StyleSheet,TouchableOpacity,PermissionsAndroid} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from "react-native-raw-bottom-sheet";
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import haversine from "haversine";
import { connect } from 'react-redux'
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import { isLoading } from "store/actions/GlobalAction";
import { recordAction } from "store/actions/RecordAction";
import moment from "moment";

const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = 0.003;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

function RecordTracking(props) {

    const {route,isLoading,loading,recordAction} = props

    const refRBSheet = useRef();
    const map = useRef();
    const [UserLocation, setUserLocation] = useState({latitude:LATITUDE,longitude:LONGITUDE})
    const [Coordinates, setCoordinates] = useState([])

    const [UserState, setUserState] = useState('')
    const [WatchId, setWatchId] = useState('')
    const [Distance, setDistance] = useState(0)
    const [DoneResume, setDoneResume] = useState(false)

    const [CurrentSpeed, setCurrentSpeed] = useState(0)
    const [SumSpeed, setSumSpeed] = useState(0)
    const [AvgSpeed, setAvgSpeed] = useState(0)

    const [Duration, setDuration] = useState(0)
    const [isStopwatchStart, setIsStopwatchStart] = useState(false);
    const [StartTime, setStartTime] = useState(0)

    const [DateStart, setDateStart] = useState('')

    const getUserLocation = async() => {
        try {
            const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

            if (granted) {
                console.log( "You can use the ACCESS_FINE_LOCATION" )
                const watch = Geolocation.watchPosition(
                    (position) => {
                        setUserLocation({
                            latitude:position.coords.latitude,
                            longitude:position.coords.longitude
                        })
                        setCurrentSpeed(position.coords.speed < 0 ? 0 : Math.round(position.coords.speed))

                    },
                    (error) => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, distanceFilter:1, fastestInterval:1000, }
                );
                setWatchId(watch)
            } 
            else {
                console.log( "ACCESS_FINE_LOCATION permission denied" )
                refRBSheet.current.open()
            }
            
        } catch (error) {
            console.log(error)
        } 
    }

    useEffect(() => {
        getUserLocation()
        
        return () => {
            Geolocation.clearWatch(WatchId)
        }
    }, [])

    useEffect(() => {
        if(UserState === 'start' || UserState === 'resume'){
            setIsStopwatchStart(true)
            setCoordinates(Coordinates => Coordinates.concat({latitude:UserLocation.latitude,longitude:UserLocation.longitude}))
            if(UserState === 'resume' && DoneResume==false){
                setCoordinates(Coordinates => Coordinates.concat({latitude:UserLocation.latitude,longitude:UserLocation.longitude}))
                setDoneResume(true)
            }
            setSumSpeed(CurrentSpeed+SumSpeed)
            setAvgSpeed(SumSpeed/Coordinates.length)
        }else if(UserState === 'paused'){
            setIsStopwatchStart(false) 
        }
    }, [UserLocation,UserState])

    useEffect(() => {
        if(UserState === 'start' || UserState === 'resume'){
            setStartTime(new Date().getTime())
        }else if(UserState === 'paused'){
            let endTime = new Date().getTime()
            setDuration((endTime-StartTime)+Duration)
        }
    }, [UserState])
    
    useEffect(() => {
        if(Coordinates.length>1){
            let tempDst = Number((haversine(Coordinates[Coordinates.length-2], Coordinates[Coordinates.length-1])).toFixed(3))
            let newDst = Number(Distance)+tempDst
            setDistance(newDst)
        }
    }, [Coordinates])

    const requestPermission = async () =>{
        try {          
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
                refRBSheet.current.close()
                getUserLocation()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleStart = async () =>{
        const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
        if (granted){
            setUserState('start')
            setDateStart(moment().format('LLL'))
        }else{
            refRBSheet.current.open()
        }
    }

    const handleStop = () =>{
        try {
            setIsStopwatchStart(false)
            let endTime = new Date().getTime()
            let duration = (endTime-StartTime)+Duration
            Geolocation.clearWatch(WatchId)
            let avgSpeed = AvgSpeed.toFixed(2)
            isNaN(avgSpeed) ? avgSpeed = 0 : null

            let distance = Distance.toFixed(2)

            const hours = Math.floor(duration / 3600000)
            duration -= hours * 3600000
            const minutes = Math.floor(duration / 60000);
            duration -= minutes * 60000;
            const seconds = Math.floor(duration / 1000);
            const timeDuration = `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

            recordAction(
                timeDuration,
                avgSpeed,
                distance,
                route.params.id,
                {
                    latitude:Coordinates[0].latitude,
                    longitude:Coordinates[0].longitude
                },
                {
                    latitude:Coordinates[Coordinates.length-1].latitude,
                    longitude:Coordinates[Coordinates.length-1].longitude
                },
                DateStart
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <View style={styles.container}>
            <MapView
                ref={map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                style={UserState === 'start' || UserState == "paused" || UserState == "resume"? styles.mapStart : styles.map}
                region={{
                    latitude: UserLocation.latitude,
                    longitude: UserLocation.longitude,
                    latitudeDelta:LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                {
                    Coordinates.length > 0 ? 
                        <Polyline
                        coordinates={Coordinates}
                        strokeColor={Colors.orange2} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={6}
                        />
                    :null
                }
            </MapView>
            {
                UserState === 'start' || UserState == "paused" || UserState == "resume"?
                <View style={styles.startContainer}>
                    <View style={{height:hp(20)}}>
                        <Proxima title={route.params.title.toUpperCase()} size={25} style={{paddingVertical:ms(10),alignSelf:'center'}}/> 
                        
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                            <View style={{alignItems:'center',paddingTop:ms(5)}}>
                                <Proxima title='AVG. PACE' size={14}/> 
                                <Proxima title={isNaN(AvgSpeed)? '0.00' : AvgSpeed.toFixed(2)} size={20} style={{paddingTop:ms(5)}}/>
                                <Proxima title='km/h' size={15} style={{paddingTop:ms(0)}}/>
                            </View>
                            <View style={{alignItems:'center',paddingTop:ms(5)}}>
                                <Proxima title='TIME' size={14}/> 
                                <Stopwatch
                                    laps
                                    start={isStopwatchStart}
                                    options={options}
                                />
                            </View>
                            <View style={{alignItems:'center',paddingTop:ms(5)}}>
                                <Proxima title='DISTANCE' size={14}/> 
                                <Proxima title={Distance.toFixed(2)} size={20} style={{paddingTop:ms(5)}}/>
                                <Proxima title='km' size={15} style={{paddingTop:ms(0)}}/>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{alignItems:'center',justifyContent:'space-evenly',flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={{backgroundColor:Colors.orange2,width:ms(80),height:ms(80),borderRadius:ms(40),justifyContent:'center'}}
                                onPress = {()=>{

                                    if(UserState === 'paused'){
                                        setUserState('resume')
                                        setDoneResume(false)
                                    }else setUserState('paused')
                                }
                                }
                            >
                                <Proxima title={UserState === 'paused' ? 'resume' : 'pause'} color='white' style={{alignSelf:'center'}}/> 
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={{backgroundColor:Colors.grey2,width:ms(60),height:ms(60),borderRadius:ms(30),justifyContent:'center'}}
                                onPress = {()=>{
                                    handleStop()
                                }}
                            >
                                <Proxima title={"Stop"} color='white' style={{alignSelf:'center'}}/> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                :     
                <View style={{alignItems:'center',justifyContent:'center',marginBottom:ms(20)}}>
                    <TouchableOpacity 
                        style={{backgroundColor:Colors.orange2,width:ms(80),height:ms(80),borderRadius:ms(40),justifyContent:'center'}}
                        onPress = {()=>{
                            handleStart()
                        }}
                    >
                        <Proxima title={"Start"} color='white' style={{alignSelf:'center'}}/> 
                    </TouchableOpacity>
                </View>
            }
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container:{
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20
                    }
                }}
                height={hp(45)}
            >
                <View style={{padding:ms(16)}}>
                    <View style={{alignItems:'center',paddingBottom:ms(15)}}>
                        <View style={{backgroundColor:Colors.secondary.purple1,borderRadius:50}}>
                            <Icon name="location-arrow" size={30} color={Colors.purple1} style={{padding:ms(20)}}/>
                        </View>
                        <Proxima title='Allow device location access' color={Colors.grey1} type='bold' size={16} style={{paddingVertical:ms(16)}}/> 
                        <Proxima title='Sportsman requires access to your motion to show your pace and distance.' color={Colors.grey1} style={{textAlign:'center'}}/>
                    </View>
                    <Button 
                        title='Yes'
                        onPress={() => requestPermission()} 
                    />
                    <TouchableOpacity 
                        onPress={() =>{ 
                            refRBSheet.current.close()
                        }}
                    >
                        <Proxima title='Dissmiss' color={Colors.orange2} type='bold' size={14} style={{alignSelf:'center',paddingTop:ms(5)}}/> 
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    )
}

const mapStateToProps = (state) => ({
    loading:state.globalReducer.isLoading,
});
const mapDispatchToProps = {
    isLoading,recordAction
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RecordTracking)

const options = {
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop:ms(5)
    },
    text: {
        fontSize: ms(20),
        fontFamily: `Proxima Nova Regular`
        },
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    mapStart:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: hp(35),
    },
    startContainer: {
        backgroundColor: '#ffffff',
        width: wp(100),
        height: hp(35),
        paddingVertical: ms(10)
    },
})
