import {Proxima, Button, TextInput, OverlayLoading} from 'components';
import Colors from 'config/Colors';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {loginAction} from 'store/actions/AuthAction';
import {resetLoginError} from 'store/actions/GlobalAction';

const LoginEmail = (props) => {
  const [Disabled, setDisabled] = useState(true);
  const [Email, setEmail] = useState(props.email ? props.email : '');
  const [Password, setPassword] = useState('');

  const checkInput = () => {
    if (Email != '' && Password != '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    checkInput();
  }, [Email, Password]);

  const handlerSignIn = () => {
    props.loginAction(Email.toLowerCase(), Password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <OverlayLoading visible={props.isLoading} />
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{flexDirection: 'row'}}>
            <Icon name="chevron-back" size={25} color={Colors.grey1} />
            <View style={{justifyContent: 'center'}}>
              <Proxima title="Back" color={Colors.grey1} size={16} />
            </View>
          </TouchableOpacity>
          <Proxima
            title="Login"
            color={Colors.grey1}
            style={{
              alignSelf: 'center',
              padding: ms(25),
              paddingBottom: ms(35),
            }}
            size={28}
            type="bold"
          />
          <View style={{minHeight: ms(15)}}>
            {props.loginError ? (
              <Proxima
                title="Incorrect Email and Password"
                style={{color: Colors.red, alignSelf: 'center'}}
                size={12}
              />
            ) : null}
          </View>
          <TextInput
            placeholder="Email"
            value={Email}
            onChangeText={(Email) => setEmail(Email)}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            onChangeText={(Password) => setPassword(Password)}
            passToggle={true}
          />
          <Button
            title="Sign In"
            onPress={() => {
              handlerSignIn();
              Keyboard.dismiss();
            }}
            disabled={Disabled}
            containerStyle={{paddingTop: ms(20)}}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('forgot pass');
            }}>
            <Proxima
              title="Forgot Password"
              style={{
                color: Colors.grey2,
                alignSelf: 'center',
                paddingVertical: ms(10),
              }}
              size={12}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Proxima
            title="Haven’t got an account?"
            style={{
              color: Colors.grey1,
              alignSelf: 'center',
              paddingVertical: ms(10),
            }}
            size={12}
          />
          <Button
            title="Sign Up"
            onPress={() => {
              props.navigation.navigate('RegisterEmail');
              props.resetLoginError();
            }}
            containerStyle={{paddingVertical: ms(20)}}
            buttonStyle={{backgroundColor: 'white'}}
            titleColor={Colors.orange2}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => ({
  email: state.authReducer.email,
  isLoading: state.globalReducer.isLoading,
  loginError: state.globalReducer.loginError,
});

const mapDispatchToProps = {
  loginAction,
  resetLoginError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginEmail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ms(35),
    paddingHorizontal: ms(16),
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
