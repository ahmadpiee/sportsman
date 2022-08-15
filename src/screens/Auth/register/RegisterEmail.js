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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {registerAction} from 'store/actions/AuthAction';
import {resetRegisterError} from 'store/actions/GlobalAction';

const RegisterEmail = (props) => {
  const [Disabled, setDisabled] = useState(true);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [CheckPass, setCheckPass] = useState(false);
  const [CheckEmail, setCheckEmail] = useState(false);

  const checkInput = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if (Password.length >= 1 && Password.length < 5) {
      setCheckPass(true);
    } else {
      setCheckPass(false);
    }

    if (Email.length >= 1 && expression.test(Email.toLowerCase()) == false) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }

    if (
      CheckEmail == false &&
      Email != '' &&
      Password.length >= 5 &&
      Name != '' &&
      toggleCheckBox != false
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  useEffect(() => {
    checkInput();
  }, [CheckEmail, Email, Password, Name, toggleCheckBox]);

  const handleRegister = () => {
    props.registerAction(Name, Email.toLowerCase(), Password);
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
            title="Sign Up"
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
            {props.registerError ? (
              <Proxima
                title="Email already exist"
                style={{color: Colors.red, alignSelf: 'center'}}
                size={12}
              />
            ) : null}
          </View>
          <TextInput
            placeholder="Name"
            onChangeText={(Name) => setName(Name)}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(Email) => setEmail(Email)}
            keyboardType="email-address"
            containerStyle={{
              paddingVertical: ms(0),
              paddingTop: ms(8),
              paddingBottom: ms(3),
            }}
          />
          <View style={{minHeight: ms(5)}}>
            {CheckEmail ? (
              <Proxima
                title="Enter valid Email!"
                style={{color: Colors.red}}
                size={10}
              />
            ) : null}
          </View>
          <TextInput
            placeholder="Password 5+ characters"
            onChangeText={(Password) => setPassword(Password)}
            passToggle={true}
            containerStyle={{
              paddingVertical: ms(0),
              paddingTop: ms(8),
              paddingBottom: ms(3),
            }}
          />
          <View style={{minHeight: ms(5)}}>
            {CheckPass ? (
              <Proxima
                title="password must have 5 characters"
                style={{color: Colors.red}}
                size={10}
              />
            ) : null}
          </View>
          <View style={{flexDirection: 'row', paddingTop: ms(5)}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              style={{color: Colors.grey1}}
              tintColors={{true: Colors.orange2}}
            />
            <View style={{justifyContent: 'center'}}>
              <Proxima
                title="I agree with Whiteboard’s terms and conditions"
                style={{color: Colors.grey1}}
              />
            </View>
          </View>
          <Button
            title="Sign Up"
            onPress={() => {
              handleRegister();
              Keyboard.dismiss();
            }}
            disabled={Disabled}
          />
        </View>
        <View>
          <Proxima
            title="Already Member?"
            style={{
              color: Colors.grey1,
              alignSelf: 'center',
              paddingVertical: ms(10),
            }}
            size={12}
          />
          <Button
            title="Login"
            onPress={() => {
              props.navigation.navigate('LoginEmail');
              props.resetRegisterError();
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
  isLoading: state.globalReducer.isLoading,
  registerError: state.globalReducer.registerError,
});

const mapDispatchToProps = {
  registerAction,
  resetRegisterError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEmail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ms(35),
    paddingHorizontal: ms(16),
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
});
