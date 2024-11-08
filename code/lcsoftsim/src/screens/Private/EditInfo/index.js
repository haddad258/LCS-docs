import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../../../components/Background';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { theme } from '../../../core/theme';
import { emailValidator } from '../../../helpers/emailValidator';
import { passwordValidator } from '../../../helpers/passwordValidator';
import { nameValidator } from '../../../helpers/nameValidator';
import { Colors } from '../../../core/theme';
import { Register } from '../../../service';
import { useSelector,useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/user/action';

export default function RegisterScreen({ navigation }) {
  const UserInfoReducer = useSelector((state) => state.UserInfoReducer?.userInfo);

  const dispatch = useDispatch();

  const [name, setName] = useState({ value: UserInfoReducer.username, error: '' });
  const [first_name, setfirst_name] = useState({ value: UserInfoReducer.first_name, error: '' });
  const [last_name, setlast_name] = useState({ value: UserInfoReducer.last_name, error: '' });
  const [email, setEmail] = useState({ value: UserInfoReducer.email, error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [cin, setCin] = useState({ value: UserInfoReducer.cin, error: '' });
  const [phone, setPhone] = useState({ value: UserInfoReducer.phone , error: '' });

  const onSignUpPressed = async () => {
    const phoneError = nameValidator(phone.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const cinError = nameValidator(cin.value);
    const nameError = nameValidator(name.value);

    if (emailError || passwordError || phoneError || nameError || cinError) {
      setPhone({ ...phone, error: phoneError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...password, error: nameError });
      setCin({ ...password, error: cinError });
      return;
    }

    const register = await Register.updateCustomer({
      username: name.value,
      password: password.value,
      cin: cin.value,
      phone: phone.value,
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value
    });

    console.log(register.user);

    if (register.user) {
      dispatch(setUserInfo(register.user));
      setEmail({ value: '', error: '' });
      setPassword({ value: '', error: '' });
      setCin({ value: '', error: '' });
      setName({ value: '', error: '' });
      setPhone({ value: '', error: '' });
      alert('Success');
    }
  };

 
  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.link}>Update Profile.</Text>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value }
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="first_name"
          returnKeyType="next"
          value={first_name.value}
          onChangeText={(text) => setfirst_name({ value: text, error: '' })}
          error={!!first_name.error}
          errorText={first_name.error}
        />
        <TextInput
          label="last_name"
          returnKeyType="next"
          value={last_name.value}
          onChangeText={(text) => setlast_name({ value: text, error: '' })}
          error={!!last_name.error}
          errorText={last_name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Identity"
          returnKeyType="next"
          value={cin.value}
          onChangeText={(text) => setCin({ value: text, error: '' })}
          error={!!cin.error}
          errorText={cin.error}
        />
        <TextInput
          label="Phone Number"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          autoCapitalize="none"
          autoCompleteType="tel"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPressed} >
          <Text style={styles.link} >
            Save
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center'
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: Colors.info,
    padding: 15,
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 20
  },
});
