import { View, Image, Text, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS
} from 'react-native-reanimated'
import { plantStyles } from 'styles/PlantStyles'
import React, { useEffect, useRef, useState } from 'react'
import { Svg, Circle, Ellipse } from 'react-native-svg'
import { scale, verticalScale } from 'react-native-size-matters'
import {
  GradientText,
  GradientBorder
} from 'components/Gradient/GradientTemplate'
import moment from 'moment'
import { Feather, Entypo } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

//Plant Object
const Plant = props => {
  moment.suppressDeprecationWarnings = true
  const height = useSharedValue(verticalScale(94))
  const borderBottomRightRadius = useSharedValue(87)
  const opacity = useSharedValue(0)
  const cy = useSharedValue(verticalScale(-140))
  const swipeRef = useRef()
  const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse)
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)

  //toggling visibility of additional informations (Body) of the plant
  const [focused, changeFocus] = useState(false)
  const [disabled, toggleButton] = useState(false)
  const [iconSource, setIcon] = useState(props.icon)

  useEffect(() => {
    if (props.icon) {
      setIcon(props.icon)
    }
  }, [props.icon])

  // Animations
  const buttonShowing = () => {
    props.openedRow.current?.close()
    if (!focused && borderBottomRightRadius.value == 87) {
      borderBottomRightRadius.value = withTiming(16, {
        duration: 250,
        easing: Easing.inOut(Easing.quad)
      })
    }
  }
  const buttonClosing = () => {
    if (!focused) {
      borderBottomRightRadius.value = withTiming(87, {
        duration: 250,
        easing: Easing.inOut(Easing.quad)
      })
    }
  }
  const toggleFocus = () => {
    toggleButton(true)
    height.value = withTiming(
      focused ? verticalScale(94) : verticalScale(188),
      {
        duration: 300,
        easing: Easing.inOut(Easing.quad)
      }
    )

    opacity.value = withDelay(
      50,
      withTiming(focused ? 0 : 1, {
        duration: focused ? 100 : 250,
        easing: Easing.inOut(Easing.quad)
      })
    )
    cy.value = withTiming(focused ? verticalScale(-140) : verticalScale(-35), {
      duration: 300,
      easing: Easing.inOut(Easing.linear)
    })
    borderBottomRightRadius.value = withTiming(
      focused ? 87 : 16,
      {
        duration: 300,
        easing: Easing.inOut(Easing.quad)
      },
      finished => {
        if (finished) {
          runOnJS(changeFocus)(!focused)
          runOnJS(toggleButton)(false)
        }
      }
    )
  }

  // Delete swipe
  const handleDelete = () => {
    props.actionHandler()
  }

  const rightSwipe = (progress, dragX, swipeable) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    return (
      <AnimatedTouchableOpacity
        onPress={() => {
          swipeable.close()
          handleDelete()
        }}
        style={[plantStyles.deleteButton, { transform: [{ scale }] }]}
      >
        <Feather size={33} name={'x-circle'} color={'rgba(27, 47, 40, 1)'} />
      </AnimatedTouchableOpacity>
    )
  }

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={rightSwipe}
      onSwipeableWillOpen={buttonShowing}
      onSwipeableWillClose={buttonClosing}
      onSwipeableOpen={(_, swipeable) => {
        props.openedRow.current = swipeable
      }}
      onSwipeableClose={() => {
        props.openedRow.current = null
      }}
    >
      <Animated.View
        style={{
          width: '89%',
          alignSelf: 'center',
          marginBottom: verticalScale(17)
        }}
      >
        {/* Plant Data */}
        <Animated.View
          style={[
            plantStyles.plantContainer,
            {
              height,
              borderBottomRightRadius,
              elevation: 10
            }
          ]}
        >
          <Svg
            height={verticalScale(188)}
            width='100%'
            viewBox='0 0 306 166'
            preserveAspectRatio='xMinYMin slice'
            style={{ position: 'absolute' }}
          >
            <AnimatedEllipse
              cx={scale(200)}
              cy={verticalScale(-65)}
              rx={scale(152.5)}
              ry={verticalScale(152.5)}
              fill='#57844D'
            />
            <AnimatedEllipse
              cx={scale(204)}
              cy={cy}
              rx={scale(152.5)}
              ry={verticalScale(230)}
              fill='#57844D'
            />
          </Svg>

          {/* Plant Header */}
          <TouchableOpacity
            style={plantStyles.header}
            disabled={disabled}
            onPress={toggleFocus}
            activeOpacity={1}
          >
            <View style={plantStyles.headerData}>
              <Text numberOfLines={1} style={plantStyles.titleText}>
                {props.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text numberOfLines={1} style={plantStyles.defaultText}>
                  Last watered:{' '}
                </Text>
                <Text numberOfLines={1} style={plantStyles.regularText}>
                  {props.lastWateringDate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text style={plantStyles.defaultText}>Next watering: </Text>
                <Text style={plantStyles.regularText}>
                  {props.nextWateringDate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Plant additional information*/}
          <Animated.View style={[plantStyles.list, { opacity }]}>
            <GradientText style={plantStyles.defaultText} text='WATERING' />

            <View
              style={[plantStyles.infoView, { justifyContent: 'flex-end' }]}
            >
              <Text
                style={[
                  plantStyles.defaultText,
                  {
                    flex: 1,
                    alignSelf: 'center',
                    textAlign: 'left'
                  }
                ]}
              >
                Between:
              </Text>
              <GradientBorder
                borderStyle={plantStyles.textBorder}
                containerStyle={plantStyles.textContainer}
                colorSet='textBorder'
                cords='plantData'
              >
                <Text style={plantStyles.infoText}>
                  every {props.frequencyFrom} days
                </Text>
              </GradientBorder>
            </View>

            <View
              style={[plantStyles.infoView, { justifyContent: 'flex-end' }]}
            >
              <Text
                style={[
                  plantStyles.defaultText,
                  {
                    flex: 1,
                    alignSelf: 'center',
                    textAlign: 'center'
                  }
                ]}
              >
                To:
              </Text>
              <GradientBorder
                borderStyle={plantStyles.textBorder}
                containerStyle={plantStyles.textContainer}
                colorSet='textBorder'
                cords='plantData'
              >
                <Text style={plantStyles.infoText}>
                  every {props.frequencyTo} days
                </Text>
              </GradientBorder>
            </View>

            <View style={plantStyles.infoView}>
              <GradientText
                style={plantStyles.defaultText}
                text='INSOLATION:'
              />
              <GradientBorder
                borderStyle={plantStyles.textBorder}
                containerStyle={plantStyles.textContainer}
                colorSet='textBorder'
                cords='plantData'
              >
                <Text style={plantStyles.infoText}>{props.insolation}</Text>
              </GradientBorder>
            </View>
          </Animated.View>
        </Animated.View>
        {/* Plant image */}
        <TouchableOpacity
          style={{
            marginLeft: scale(10),

            position: 'absolute'
          }}
          disabled={disabled}
          onPress={toggleFocus}
          activeOpacity={1}
        >
          <Image
            style={plantStyles.icon}
            source={
              iconSource !== null
                ? iconSource
                : require('assets/default-plant.png')
            }
          />
        </TouchableOpacity>
        {/* Plant Edit Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: scale(10),
            top: verticalScale(10)
          }}
          onPress={props.editHandler}
        >
          <Entypo
            name='dots-three-vertical'
            size={scale(20)}
            color={'rgba(27, 47, 40, 1)'}
          />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  )
}

export default Plant
