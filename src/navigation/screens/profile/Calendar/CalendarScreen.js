import { View, Text, SafeAreaView, Button } from 'react-native'
import { globalStyles } from 'styles/GlobalStyles'
import React, { useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars'
import * as Notifications from 'expo-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { CustomCalendar } from 'components/calendar/Calendar'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import schedulePlantPushNotification from 'components/Plant/PlantNotifications'

import { getAuth } from 'firebase/auth'

// Calendar Screen containing calendar tracking watering cycle for added plants

export default function CalendarScreen () {
  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <CustomCalendar />
    </SafeAreaView>
  )
}
