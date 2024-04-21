import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
export function GradientText (props) {
  return (
    <MaskedView
      maskElement={
        <Text style={[props.style, { backgroundColor: 'transparent' }]}>
          {props.text}
        </Text>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        locations={[0, 0.9]}
        colors={['rgba(250, 154, 174, 1)', 'rgba(255, 219, 132, 1)']}
      >
        <Text style={[props.style, { opacity: 0 }]}>{props.text}</Text>
      </LinearGradient>
    </MaskedView>
  )
}

// Creates gradient Border around object.
// Border width is set by using padding
// Object container needs to have set border radius to [default_border-border_width(padding)]
// * colorSet
// * cords=Gradient color coordinates
// * borderStyle
// * ContainerStyle
export function GradientBorder (props) {
  function typeSwitch (set) {
    switch (set) {
      case 'textBorder':
        return ['rgba(248, 150, 177, 1)', 'rgba(251, 197, 148, 1)']
      case 'text':
        return ['rgba(250, 154, 174, 1)', 'rgba(255, 219, 132, 1)']
      case 'loginScreen':
        return ['rgba(248, 148, 178, 1)', 'rgba(251, 198, 147, 1)']
      case 'gradient':
        return ['rgba(27, 47, 40, 1)', 'rgba(140, 150, 146, 1)']
      case 'dotToWater':
        return ['rgba(27, 47, 40, 1)', 'rgba(27, 47, 40, 0.31)']
      default:
        return ['white', 'black']
    }
  }
  function xySwitch (cords) {
    switch (cords) {
      case 'input':
        return [
          { x: 0.5, y: 0 },
          { x: 0.5, y: 1 }
        ]
      case 'plantData':
        return [
          { x: 0, y: 0 },
          { x: 0.2, y: 2 }
        ]
      default:
        return [
          { x: 0, y: 0 },
          { x: 1, y: 1 }
        ]
    }
  }
  return (
    //Border view
    <LinearGradient
      style={props.borderStyle}
      start={xySwitch(props.cords)[0]}
      end={xySwitch(props.cords)[1]}
      locations={[0, 1]}
      colors={typeSwitch(props.colorSet)}
    >
      {/*Object container view */}
      <View style={props.containerStyle}>{props.children}</View>
    </LinearGradient>
  )
}

// Creates gradient background for touchable objects
// * colorSet
// * pressEvent
// * borderStyle
// * buttonStyle
export function GradientButton (props) {
  function colorSwitch (set) {
    switch (set) {
      case 'mono':
        return [
          ['rgba(27, 47, 40, 1)', 'rgba(140, 150, 146, 1)'],
          ['#FFF', '#FFF']
        ]

      case 'login':
        return [
          ['rgba(27, 47, 40, 1)', 'rgba(138,117,95,1)'],
          ['rgba(248, 154, 177, 1)', 'rgba(251, 197, 148, 1)']
        ]
      default:
        return [
          ['rgba(27, 47, 40, 1)', 'rgba(27, 47, 40, 0.5)'],
          ['rgba(248, 154, 177, 1)', 'rgba(251, 197, 148, 1)']
        ]
    }
  }
  function xyButtonSwitch (cords) {
    switch (cords) {
      case 'input':
        return [
          { x: 0.5, y: 0 },
          { x: 0.5, y: 1 }
        ]
      default:
        return [
          { x: 0.1, y: -0.1 },
          { x: 0.8, y: 2.2 }
        ]
    }
  }

  return (
    <TouchableOpacity onPress={props.pressEvent} style={{}}>
      {/* Border */}
      <LinearGradient
        style={props.borderStyle}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 1]}
        colors={colorSwitch(props.colorSet)[0]}
      >
        {/*Button */}
        <LinearGradient
          style={props.buttonStyle}
          start={xyButtonSwitch(props.cords)[0]}
          end={xyButtonSwitch(props.cords)[1]}
          locations={[0, 0.7]}
          colors={colorSwitch(props.colorSet)[1]}
        >
          {props.children}
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  )
}
