import { View, StatusBar, UIManager, Platform } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Svg, Circle } from 'react-native-svg'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect, useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import Animated, {
  useSharedValue,
  cancelAnimation,
  withTiming,
  withSpring
} from 'react-native-reanimated'

import useFonts from 'components/Fonts/useFonts'

// Container of all screens including their default settings

// Screens
import HomeScreen from 'screens/profile/Home/HomeScreen'
import CalendarScreen from 'screens/profile/Calendar/CalendarScreen'
import PlantsScreen from 'screens/profile/Plants/PlantsScreen'
import LoginScreen from 'screens/auth/Login/LoginScreen'

//StyleSheets
import { globalStyles } from 'styles/GlobalStyles'
import { tabBarStyles } from 'styles/TabBarStyles'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import auth from '@react-native-firebase/auth'
import { FIREBASE_AUTH } from 'auth/FirebaseConfig'

// Screen names
const homeName = 'Home'
const calendarName = 'Calendar'
const plantsName = 'Plants'
const loginName = 'Login'

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

{
  /* Bottom-Tab Container Settings */
}
const TabNavigator = () => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const AnimatedSvg = Animated.createAnimatedComponent(Svg)
  const [isTabPressed, setIsTabPressed] = useState(false)
  const cx = useSharedValue('84%')
  const changeScreenAnimation = (value, type) => {
    switch (type) {
      case 'swipeStart':
        cx.value = withTiming(value, {
          duration: 75
        })
      case 'swipeEnd':
        cancelAnimation(cx)
        cx.value = withTiming(value, {
          duration: 75
        })

      default:
        cx.value = withSpring(value, {
          damping: 40,
          stiffness: 200,
          overshootClamping: false
        })
    }
  }
  return (
    <View style={globalStyles.tabContainer}>
      <AnimatedSvg
        height='100%'
        width='100%'
        viewBox='0 0 375 667'
        preserveAspectRatio='xMinYMin slice'
        style={{ position: 'absolute' }}
      >
        {/* top circle */}
        <AnimatedCircle cx={cx} cy='19%' r={374.5} fill='#C2D982' />
      </AnimatedSvg>
      <Tab.Navigator
        tabBarPosition='bottom'
        backBehavior='initialRoute'
        initialRouteName={homeName}
        navigationOptions
        sceneContainerStyle={{
          backgroundColor: 'transparent'
        }}
        // Bar Settings
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { backgroundColor: 'transparent', height: 0 },
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 0,
          tabBarHideOnKeyboard: true,
          tabBarContentContainerStyle: {
            backgroundColor: 'transparent'
          },

          // bar style
          tabBarStyle: tabBarStyles.barStyle,

          // Icon Logic
          tabBarIcon: ({ focused, color }) => {
            let iconName
            let iconStyle
            let rn = route.name
            if (rn == plantsName) {
              iconName = focused ? 'list' : 'list-outline'
              iconStyle = tabBarStyles.iconLeft
            } else if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline'
              iconStyle = tabBarStyles.iconMiddle
            } else if (rn == calendarName) {
              iconName = focused ? 'calendar' : 'calendar-outline'
              iconStyle = tabBarStyles.iconRight
            }
            return (
              <Ionicons
                size={36}
                name={iconName}
                style={iconStyle}
                color={color}
              />
            )
          }
        })}
      >
        {/* Tab Screen Order*/}
        <Tab.Screen
          name={plantsName}
          component={PlantsScreen}
          options={{ tabBarHideOnKeyboard: true }}
          listeners={{
            tabPress: e => {
              setIsTabPressed(true)
              changeScreenAnimation('8%')
            },
            swipeEnd: e => {
              isTabPressed
                ? setIsTabPressed(false)
                : changeScreenAnimation('8%', 'swipeEnd')
            },
            swipeStart: e => {
              changeScreenAnimation('42%', 'swipeStart')
            }
          }}
        />
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{ tabBarHideOnKeyboard: true }}
          listeners={{
            tabPress: e => {
              setIsTabPressed(true)
              changeScreenAnimation('84%')
            },
            swipeEnd: e => {
              isTabPressed
                ? setIsTabPressed(false)
                : changeScreenAnimation('84%', 'swipeEnd')
            },
            swipeStart: e => {
              changeScreenAnimation('42%', 'swipeStart')
            }
          }}
        />
        <Tab.Screen
          name={calendarName}
          component={CalendarScreen}
          options={{ tabBarHideOnKeyboard: true }}
          listeners={{
            tabPress: e => {
              setIsTabPressed(true)
              changeScreenAnimation('8%')
            },
            swipeEnd: e => {
              isTabPressed
                ? setIsTabPressed(false)
                : changeScreenAnimation('8%', 'swipeEnd', true)
            },
            swipeStart: e => {
              changeScreenAnimation('42%', 'swipeStart')
            }
          }}
        />
      </Tab.Navigator>
    </View>
  )
}
SplashScreen.preventAutoHideAsync()

export default function MainContainer () {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent'
    }
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user !== null) {
        if (user.emailVerified) {
          setUser(user)
        } else {
          setUser(null)
          auth().signOut()
        }
      } else {
        setUser(null)
      }
    })
  }, [])
  const [appIsReady, setAppIsReady] = useState(false)
  const LoadFonts = async () => {
    await useFonts()
  }

  useEffect(() => {
    async function prepare () {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts()
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }
  return (
    <>
      <View
        style={globalStyles.mainContainerBackground}
        onLayout={onLayoutRootView}
      >
        {/* Background Settings */}

        <Svg
          height='100%'
          width='100%'
          viewBox='0 0 375 667'
          preserveAspectRatio='xMinYMin slice'
          style={{ position: 'absolute' }}
        >
          {/* top circle */}
          {/* <AnimatedCircle cx='84%' cy='19%' r={374.5} fill='#C2D982' /> */}
          {/* bottom circle */}
          <Circle cx='50%' cy='117.7%' r={174} fill='#C2D982' />
        </Svg>

        <StatusBar
          barStyle='dark-content'
          translucent
          backgroundColor='transparent'
        />

        <NavigationContainer theme={navTheme}>
          {/* Stack Container Settings*/}
          <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
              headerShown: false,
              animationEnabled: false,

              cardStyle: {}
            }}
          >
            {/* Stack Screens */}
            {user ? (
              <Stack.Screen
                name='User'
                testID='UserStack'
                component={TabNavigator}
              />
            ) : (
              <Stack.Screen
                name='Login'
                testID='LoginStack'
                component={LoginScreen}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  )
}
