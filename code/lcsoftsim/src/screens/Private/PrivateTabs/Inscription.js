import React, { useState } from 'react';
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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [cin, setCin] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });

  const onSignUpPressed = async () => {
    const phoneError = nameValidator(phone.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const cinError = nameValidator(cin.value);
    const nameError = nameValidator(name.value);

    if (emailError || passwordError || phoneError ||nameError ||cinError) {
      setPhone({ ...phone, error: phoneError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setName({ ...password, error: nameError });
      setCin({ ...password, error: cinError });
      return;
    }

    const register = await Register.RegisterCustomer({
      username: name.value,
      password: password.value,
      cin: cin.value,
      phone: phone.value,
      email: email.value,
    });

    console.log(register);

    if (register.data) {
      setEmail({ value: '', error: '' });
      setPassword({ value: '', error: '' });
      setCin({ value: '', error: '' });
      setName({ value: '', error: '' });
      setPhone({ value: '', error: '' });
      alert('Success');
    }
  };

  // const handleChange = (data) => {
  //   if (data.isValid) {
  //     setPhone({ ...phone, error: '' });
  //   } else {
  //     setPhone({ ...phone, error: ' is not a valid phone number' });
  //   }
  // };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <Header>Welcome to LCSSOFTSIM.</Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
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
        <Button mode="contained" onPress={onSignUpPressed} style={{ marginTop: 24 }}>
          Next
        </Button>
        <View style={styles.row}>
          <Text>I already have an account!</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Log in</Text>
          </TouchableOpacity>
        </View>
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
    color: theme.colors.primary,
  },
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.info,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
