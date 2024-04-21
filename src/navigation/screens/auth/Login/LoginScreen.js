import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  Modal
} from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import React, { useState, useEffect } from 'react'
import { globalStyles } from 'styles/GlobalStyles'
import Logo from 'assets/icons/logo.svg'
import { loginStyles } from './LoginStyles'
import {
  FIREBASE_AUTH,
  FIREBASE_APP,
  ANDROID_CLIENT_ID,
  googleProvider
} from 'auth/FirebaseConfig'
import { LinearGradient } from 'expo-linear-gradient'
import {
  GradientButton,
  GradientBorder
} from 'components/Gradient/GradientTemplate'
import { useDispatch } from 'react-redux'
import { getPlants } from 'store/userPlantsSlice'
import Animated, {
  Easing,
  useSharedValue,
  cancelAnimation,
  withTiming,
  withSpring,
  withRepeat
} from 'react-native-reanimated'

import { sendEmailVerification, signOut } from 'firebase/auth'

import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

// Main login screen

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [signUpVisibility, setSignUpVisibility] = useState(false)
  const [userInfo, setUserInfo] = useState()
  const dispatch = useDispatch()

  // const firebase_auth = FIREBASE_AUTH
  // const app = FIREBASE_APP
  // const provider = googleProvider
  const signUpError = () => {
    alert('Registration failed: Passwords do not match.')
    setConfirmNewPassword('')
  }

  const signIn = async () => {
    setLoading(true)
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password)

      if (!user.emailVerified) {
        alert('Email not verified.')
      } else {
        dispatch(getPlants(user.uid))
      }
    } catch (error) {
      alert('Sign in failed: ' + error.code)
    } finally {
      setEmail('')
      setPassword('')
      setLoading(false)
    }
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: ANDROID_CLIENT_ID
    })
  }, [])

  const googleSignIn = async () => {
    setLoading(true)
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      const googleUser = await GoogleSignin.signIn()
      setUserInfo(user)
      setError()

      const googleCredential = auth.GoogleAuthProvider.credential(
        googleUser.idToken
      )
      const { user } = await auth().signInWithCredential(googleCredential)

      dispatch(getPlants(user.uid))
    } catch (error) {
      console.log(error)
      alert('Sign in failed: ' + error.message)
      setError(error)
    } finally {
      setLoading(false)
      setUserInfo()
    }
  }

  const signUp = async () => {
    setLoading(true)
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        newEmail,
        newPassword
      )
      await user.sendEmailVerification()

      alert('Verify your email!')
      setSignUpVisibility(false)
    } catch (error) {
      console.log(error)
      alert('Registration failed: ' + error.code)
    } finally {
      setNewEmail('')
      setNewPassword('')
      setConfirmNewPassword('')
      setLoading(false)
    }
  }
  //original 0.65

  return (
    <LinearGradient
      colors={['rgba(251, 169, 203, 1)', 'rgba(194, 217, 130, 1)']}
      locations={[0, 0.65]}
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(27, 47, 40, 0.2)' }}>
        <SafeAreaView
          style={[globalStyles.screenContainer, { alignItems: 'center' }]}
        >
          {/* Logo */}
          <View style={loginStyles.logoContainer}>
            <Logo />
          </View>
          {/* Login Panel */}
          <GradientBorder
            testID='loginForum'
            borderStyle={[
              globalStyles.shadow,
              loginStyles.loginBorder,
              { opacity: signUpVisibility ? 0 : 1 }
            ]}
            containerStyle={loginStyles.loginPanel}
            colorSet='loginScreen'
          >
            {/* <View style={[globalStyles.shadow, loginStyles.loginPanel]}> */}
            <Text style={[globalStyles.textShadow, loginStyles.loginTopText]}>
              Log in.
            </Text>
            <KeyboardAvoidingView style={{}} behavior='padding'>
              <GradientBorder
                borderStyle={loginStyles.InputShadowBorder}
                containerStyle={loginStyles.loginInput}
                colorSet='gradient'
                cords='input'
              >
                <TextInput
                  style={loginStyles.placeHolder}
                  value={email}
                  placeholder='LOGIN'
                  autoCapitalize='none'
                  onChangeText={text => setEmail(text)}
                />
              </GradientBorder>
              <GradientBorder
                borderStyle={loginStyles.InputShadowBorder}
                containerStyle={loginStyles.loginInput}
                colorSet='gradient'
                cords='input'
              >
                <TextInput
                  style={loginStyles.placeHolder}
                  value={password}
                  placeholder='PASSWORD'
                  autoCapitalize='none'
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                />
              </GradientBorder>

              {loading ? (
                <ActivityIndicator size='large' />
              ) : (
                <View>
                  <View style={loginStyles.buttonsView}>
                    <GradientButton
                      pressEvent={() => googleSignIn()}
                      borderStyle={loginStyles.buttonGoogleBorder}
                      buttonStyle={loginStyles.buttonGoogleContainer}
                      colorSet='mono'
                    >
                      <Image
                        source={require('assets/icons/googleIcon.png')}
                        style={loginStyles.googleIcon}
                      />
                      <Text
                        style={{
                          fontFamily: 'NunitoSans-Regular',
                          fontWeight: 'bold',
                          color: '#1B2F28',
                          fontSize: 16
                        }}
                      >
                        Continue with Google
                      </Text>
                    </GradientButton>
                    <GradientButton
                      pressEvent={() => signIn()}
                      borderStyle={loginStyles.buttonLogInBorder}
                      buttonStyle={loginStyles.buttonLogInContainer}
                      colorSet='login'
                    >
                      <Text
                        style={{
                          fontFamily: 'NunitoSans-Regular',
                          fontWeight: 'bold',
                          color: '#1B2F28',
                          fontSize: 16
                        }}
                      >
                        LOG IN
                      </Text>
                    </GradientButton>
                  </View>
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text
                      style={{
                        fontFamily: 'NunitoSans-Regular',
                        fontWeight: 'bold',
                        color: '#1B2F28',
                        fontSize: 16
                      }}
                    >
                      Don't have an account?{' '}
                      <Text
                        onPress={() => setSignUpVisibility(true)}
                        style={{ color: 'rgba(248, 170, 160, 1)' }}
                      >
                        Sign up
                      </Text>
                    </Text>
                  </View>
                </View>
              )}
            </KeyboardAvoidingView>
          </GradientBorder>
          <Modal
            transparent={true}
            animationType='fade'
            nRequestClose={() => setSignUpVisibility(false)}
            visible={signUpVisibility}
          >
            <View
              testID='signupForum'
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: verticalScale(265)
              }}
            >
              <GradientBorder
                borderStyle={[
                  globalStyles.shadow,
                  loginStyles.loginBorder,
                  { height: verticalScale(404) }
                ]}
                containerStyle={loginStyles.loginPanel}
                colorSet='loginScreen'
              >
                <Text
                  style={[globalStyles.textShadow, loginStyles.loginTopText]}
                >
                  Sign Up.
                </Text>
                <KeyboardAvoidingView style={{}} behavior='padding'>
                  <GradientBorder
                    borderStyle={loginStyles.InputShadowBorder}
                    containerStyle={loginStyles.loginInput}
                    colorSet='gradient'
                    cords='input'
                  >
                    <TextInput
                      style={loginStyles.placeHolder}
                      value={newEmail}
                      placeholder='EMAIL'
                      autoCapitalize='none'
                      onChangeText={text => setNewEmail(text)}
                    />
                  </GradientBorder>
                  <GradientBorder
                    borderStyle={loginStyles.InputShadowBorder}
                    containerStyle={loginStyles.loginInput}
                    colorSet='gradient'
                    cords='input'
                  >
                    <TextInput
                      style={loginStyles.placeHolder}
                      value={newPassword}
                      placeholder='PASSWORD'
                      autoCapitalize='none'
                      secureTextEntry={true}
                      onChangeText={text => setNewPassword(text)}
                    />
                  </GradientBorder>
                  <GradientBorder
                    borderStyle={loginStyles.InputShadowBorder}
                    containerStyle={loginStyles.loginInput}
                    colorSet='gradient'
                    cords='input'
                  >
                    <TextInput
                      style={loginStyles.placeHolder}
                      value={confirmNewPassword}
                      placeholder='CONFIRM PASSWORD'
                      autoCapitalize='none'
                      secureTextEntry={true}
                      onChangeText={text => setConfirmNewPassword(text)}
                    />
                  </GradientBorder>
                  {loading ? (
                    <ActivityIndicator size='large' color='#0000ff' />
                  ) : (
                    <View>
                      <View style={loginStyles.buttonsView}>
                        <GradientButton
                          pressEvent={() => {
                            setNewEmail('')
                            setNewPassword('')
                            setConfirmNewPassword('')
                            setSignUpVisibility(false)
                          }}
                          borderStyle={loginStyles.buttonGoogleBorder}
                          buttonStyle={loginStyles.buttonGoogleContainer}
                          colorSet='mono'
                        >
                          <Text
                            style={{
                              fontFamily: 'NunitoSans-Regular',
                              fontWeight: 'bold',
                              color: '#1B2F28',
                              fontSize: 16
                            }}
                          >
                            Cancel
                          </Text>
                        </GradientButton>
                        <GradientButton
                          pressEvent={() => {
                            newPassword === confirmNewPassword
                              ? signUp()
                              : signUpError()
                          }}
                          borderStyle={loginStyles.buttonLogInBorder}
                          buttonStyle={loginStyles.buttonLogInContainer}
                          colorSet='login'
                        >
                          <Text
                            style={{
                              fontFamily: 'NunitoSans-Regular',
                              fontWeight: 'bold',
                              color: '#1B2F28',
                              fontSize: 16
                            }}
                          >
                            SIGN UP
                          </Text>
                        </GradientButton>
                      </View>
                    </View>
                  )}
                </KeyboardAvoidingView>
              </GradientBorder>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    </LinearGradient>
  )
}
