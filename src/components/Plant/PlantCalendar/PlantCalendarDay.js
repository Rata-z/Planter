import { View, Text } from 'react-native'

import { verticalScale, scale } from 'react-native-size-matters'
import React from 'react'
import moment from 'moment'
import { GradientBorder } from 'components/Gradient/GradientTemplate'

// Creates day on Short Calendar

// Props:
// date (moment()) - displayed date
// dayList(List) - plants list for set date
const PlantCalendarDay = props => {
  const isCurrentDay = props.date.isSame(moment(), 'day') ? true : false

  //Renders watering dots (max 3)
  const renderDots = () => {
    const dots = []
    const emptyView = <View style={{ height: scale(10) }} />

    //checks if last dot on current should be colored
    const allWatered = isCurrentDay
      ? props.dayList.filter(item => {
          return moment(item.nextWateringDate).isSameOrBefore(moment(), 'day')
        }).length == 0
      : true

    const number = props.dayList.length > 3 ? 3 : props.dayList.length
    for (let i = 0; i < number; i++) {
      let watered = isCurrentDay
        ? props.date.isSame(moment(props.dayList[i].lastWateringDate), 'day')
        : false

      dots.push(
        <View key={i} style={{ marginHorizontal: scale(2) }}>
          <GradientBorder
            borderStyle={{
              width: scale(10),
              height: scale(10),
              borderRadius: scale(5),
              top: verticalScale(5)
            }}
            colorSet={
              watered && (i == 2 ? allWatered : true) ? 'text' : 'dotToWater'
            }
            cords={watered && (i == 2 ? allWatered : true) ? null : 'input'}
          />
        </View>
      )
    }
    return dots.length > 0 ? dots : emptyView
  }
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: scale(38),
          width: scale(38),
          backgroundColor: 'rgba(112,157,111,1)',
          borderRadius: scale(19),
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6
          // marginBottom: verticalScale(5)
        }}
      >
        <Text
          style={{
            fontFamily: 'NunitoSans-Regular',
            color: '#fff',
            fontSize: scale(18)
          }}
        >
          {props.date.date()}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>{renderDots()}</View>
    </View>
  )
}

export default PlantCalendarDay
