import React,{useState} from 'react';
import { View, TextInput as Input , TouchableOpacity} from 'react-native';
import { ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from 'config/Colors';

export default function TextInput({
    placeholder,
    icon,
    value,
    secured = false,
    onChangeText,
    numberOfLines=1,
    multiline=false,
    disabled,
    containerStyle,
    keyboardType,
    passToggle = false,
}) {
  const [ShowPass, setShowPass] = useState(passToggle?passToggle:secured)
  return (
    <View style={[{paddingVertical:ms(8)},containerStyle]}>
        <View style={{borderColor: '#E1E1E1', borderWidth: 1,flexDirection:'row',justifyContent:'space-between'}}>
            <Input
                placeholder={placeholder}
                secureTextEntry={ShowPass}
                value={value}
                onChangeText={onChangeText}
                numberOfLines={numberOfLines}
                multiline={multiline}
                disabled={disabled}
                style={{padding:ms(10)}}
                keyboardType={keyboardType}
            />
            <View style={{justifyContent:'center',paddingRight:ms(10)}}>
              {
                passToggle ?
                  ShowPass ?
                    <Icon 
                      size={20} 
                      name="eye"
                      onPress={()=>setShowPass(false)}
                      color={'#80848D'}
                    />
                    :
                    <Icon 
                      size={20} 
                      name="eye-off"
                      onPress={()=>setShowPass(true)}
                      color={'#80848D'}
                    />
                :
                  null
              }
            </View>
        </View>
    </View>
  );
}
