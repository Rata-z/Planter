import { View, Image, Text, TouchableOpacity } from 'react-native'
import { plantStyles } from 'styles/PlantStyles'
import { Svg, Circle, Ellipse } from 'react-native-svg'
import { scale, verticalScale } from 'react-native-size-matters'
import { GradientBorder } from 'components/Gradient/GradientTemplate'
import { calculateNextWateringDate } from './PlantFunctions'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { globalStyles } from 'styles/GlobalStyles'

//Component for marking plant as watered

// Props:
// icon
// title
// frequencyFrom
// frequencyTo
// id
// nextWateringDate
// lastWateringDate
const PlantChecker = props => {
  const currentDate = new Date().toISOString().split('T')[0]
  const watered = props.lastWateringDate == currentDate
  const color =
    props.lastWateringDate == currentDate
      ? ['text', null]
      : ['dotToWater', 'input']

  const [iconSource, setIcon] = useState(
    props.icon !== null || props.icon !== 'null'
      ? props.icon
      : require('assets/default-plant.png')
  )

  const wateringMessage =
    props.lastWateringDate == currentDate
      ? 'Watering completed.'
      : moment(props.nextWateringDate).calendar({
          sameDay: '[Watering today!]',
          nextDay: '[Watering tomorrow!]',
          nextWeek: 'dddd',
          lastDay: '[Missed watering yesterday]',
          lastWeek: '[Missed watering last] dddd[!]',
          sameElse: '[Missed watering on] MMM Do[!]'
        })

  // //Loading Image
  useEffect(() => {
    if (props.icon) {
      setIcon(props.icon)
    }
  }, [props.icon])

  //Watering update
  const confirmWatering = () => {
    const updatedPlant = { ...props.plant }
    updatedPlant.lastWateringDate = currentDate
    updatedPlant.nextWateringDate = calculateNextWateringDate(
      props.frequencyFrom,
      props.frequencyTo,
      currentDate
    )
      .toISOString()
      .split('T')[0]
    props.updateWatering(props.id, updatedPlant)
  }
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        height: verticalScale(94),
        marginBottom: verticalScale(24)
      }}
    >
      {/* Plant Data */}
      <View
        style={[
          plantStyles.plantContainer,
          {
            borderBottomRightRadius: 87,
            ShadowColor: 'rgba(0, 0, 0, 0.4)',
            ShadowOffset: { width: 0, height: 4 },
            ShadowRadius: 9,
            elevation: 8
          },
          globalStyles.textShadow
        ]}
      >
        <Svg
          height={verticalScale(188)}
          width='100%'
          viewBox='0 0 306 166'
          preserveAspectRatio='xMinYMin slice'
          style={{ position: 'absolute' }}
        >
          <Ellipse
            cx={scale(200)}
            cy={verticalScale(-65)}
            rx={scale(152.5)}
            ry={verticalScale(152.5)}
            fill='#57844D'
          />
        </Svg>

        {/* Plant Header */}
        <TouchableOpacity
          style={plantStyles.header}
          disabled={watered}
          onPress={confirmWatering}
          activeOpacity={1}
        >
          <View style={plantStyles.homePlant}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[plantStyles.titleText, {}]}
            >
              {props.title}
            </Text>

            <Text
              style={{
                fontFamily: 'NunitoSans-Regular',
                fontSize: scale(18),
                color: '#FFFFFF',
                width: scale(150),

                lineHeight: verticalScale(22)
              }}
            >
              {wateringMessage}
            </Text>
          </View>
          <GradientBorder
            borderStyle={{
              width: scale(25),
              height: scale(25),
              position: 'absolute',
              alignSelf: 'flex-end',
              right: '7.5%',
              top: '19%',
              borderRadius: scale(12.5)
            }}
            colorSet={color[0]}
            cords={color[1]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          marginLeft: scale(10),
          zIndex: 1,

          position: 'absolute'
        }}
        disabled={watered}
        onPress={confirmWatering}
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
    </View>
  )
}

export default PlantChecker
