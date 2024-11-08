import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../../components/Background'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import { theme } from '../../../core/theme'
import { emailValidator } from '../../../helpers/emailValidator'
import { passwordValidator } from '../../../helpers/passwordValidator'
import { UserLogin } from '../../../service'
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../store/user/action';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    var login = await UserLogin.UserLoginAPI({
      email: email.value,
      password: password.value
    })
    if (login) {
      dispatch(setUserInfo(login.user));
      var localstorage = await UserLogin.Authenticate(login)
      if (localstorage) {
        console.log("localstorage", localstorage)
        navigation.navigate('MyProfile')

      }
    }
  }
  useEffect(() => {
    GetStorageLocal()
  }, [])

  const GetStorageLocal = async () => {
    try {
      const storage = await UserLogin.GetStorage()
      if (storage) {
        dispatch(setUserInfo(JSON.parse(storage)?.user))
        setIsLoading(false)
        navigation.navigate('MyProfile')
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)

    }
  }

  return (
    <Background>
      <Header>LCS SOft SIM.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (<Button mode="contained" onPress={onLoginPressed}>
        Log in
      </Button>)}
      <View style={styles.row}>
        <Text>You do not have an account yet ?</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.link}>Create !</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.colors.primary,
  },
})