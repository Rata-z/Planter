import { View } from 'react-native'
import { verticalScale, scale } from 'react-native-size-matters'
import PlantCalendarDay from './PlantCalendarDay'
import React from 'react'

import moment from 'moment'

//Creates short calendar of 5 days watering info (including today)

// Props:
// list- filtered list for 5 days
const PlantsShortCalendar = props => {
  const getDayList = (date, isCurrentDay) => {
    const dayList = props.list.filter(item => {
      return (
        (isCurrentDay &&
          (moment(item.lastWateringDate).isSame(date, 'day') ||
            moment(item.nextWateringDate).isSameOrBefore(date, 'day'))) ||
        moment(item.nextWateringDate).isSame(date, 'day')
      )
    })
    return dayList
  }

  return (
    <View
      style={{
        borderRadius: 39,
        backgroundColor: 'rgba(90, 132, 80, 1)',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(80),
        elevation: 10,
        flexDirection: 'row',
        gap: scale(13)
      }}
    >
      <PlantCalendarDay date={moment()} dayList={getDayList(moment(), true)} />
      <PlantCalendarDay
        date={moment().add(1, 'days')}
        dayList={getDayList(moment().add(1, 'days'), false)}
      />
      <PlantCalendarDay
        date={moment().add(2, 'days')}
        dayList={getDayList(moment().add(2, 'days'), false)}
      />
      <PlantCalendarDay
        date={moment().add(3, 'days')}
        dayList={getDayList(moment().add(3, 'days'), false)}
      />
      <PlantCalendarDay
        date={moment().add(4, 'days')}
        dayList={getDayList(moment().add(4, 'days'), false)}
      />
    </View>
  )
}

export default PlantsShortCalendar
