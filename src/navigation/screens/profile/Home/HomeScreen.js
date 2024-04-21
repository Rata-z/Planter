import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native'
import { scale } from 'react-native-size-matters'

import { globalStyles } from 'styles/GlobalStyles'
import { homeStyles } from './HomeStyles'
import Clock from 'react-live-clock'
import moment from 'moment'

import { Feather, FontAwesome } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import PlantChecker from 'components/Plant/PlantChecker'
import PlantsShortCalendar from 'components/Plant/PlantCalendar/PlantsShortCalendar'
import Animated, { useSharedValue } from 'react-native-reanimated'

import { useDispatch } from 'react-redux'
import { editPlant, clearPlants } from 'store/userPlantsSlice'
import { ANDROID_CLIENT_ID } from 'auth/FirebaseConfig'
import { usePlantsList } from 'components/Plant/PlantFunctions'
import { useEffect, useRef, useState, useCallback } from 'react'
import auth from '@react-native-firebase/auth'
import { verticalScale } from 'react-native-size-matters'

// Home screen containing today's date, tasks, upcoming tasks and main settings
const logOut = () => {
  const user = auth().currentUser
  const provider = user.providerData[0]

  if (provider.providerId == 'google.com') {
    GoogleSignin.configure({
      webClientId: ANDROID_CLIENT_ID
    })
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }

  auth().signOut()
}

export default function HomeScreen ({ navigation }) {
  const dispatch = useDispatch()
  const [currentPlantsList, setCurrentPlantsList] = useState([])

  let currentDateCalendar = moment().format('MMM Do')

  //Filtering List
  const plantsList = usePlantsList()
  const date = moment()

  const futurePlantsList = plantsList.filter(item => {
    const maxDate = moment(date).add(5, 'days')
    return (
      moment(item.lastWateringDate).isSame(date, 'day') ||
      moment(item.nextWateringDate).isSameOrBefore(maxDate, 'day')
    )
  })

  const arrowOpacity = useSharedValue(0)
  const currentPlantsListRef = useRef(currentPlantsList)

  useEffect(() => {
    const filteredList = plantsList.filter(item => {
      return (
        moment(item.nextWateringDate).isSameOrBefore(date, 'day') ||
        moment(item.lastWateringDate).isSame(date, 'day')
      )
    })
    setCurrentPlantsList(filteredList)
  }, [plantsList])

  const onViewableItemsChanged = ({ viewableItems }) => {
    arrowOpacity.value =
      viewableItems[viewableItems.length - 1]['index'] ==
      currentPlantsListRef.current.length - 1
        ? 0
        : 1
  }

  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }])

  //Updating List
  const updatePlantWateringDate = (index, plant) => {
    dispatch(editPlant({ id: index, plant: plant }))
  }
  useEffect(() => {
    currentPlantsListRef.current = currentPlantsList
  }, [currentPlantsList])

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearPlants())
          logOut()
        }}
        style={homeStyles.buttonLogOut}
      >
        <Feather name='user' color={'#1B2F28'} size={30} />
      </TouchableOpacity>
      {/* Clock */}
      <View style={homeStyles.homeDateView}>
        <Clock
          format={'HH:mm'}
          ticking={true}
          style={homeStyles.homeClock}
          element={Text}
        />
        <Text style={[homeStyles.homeText, globalStyles.textShadow]}>
          {currentDateCalendar}
        </Text>
      </View>
      <FlatList
        extraData={currentPlantsList}
        data={currentPlantsList}
        ref={ref => {
          this.plantsFlatListRef = ref
        }}
        style={{
          marginTop: verticalScale(24),
          maxHeight: verticalScale(230)
        }}
        ListFooterComponent={<View style={{ height: 10 }} />}
        ListFooterComponentStyle={{ marginBottom: -16 }}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item, index }) => (
          <PlantChecker
            plant={item}
            title={item.title}
            frequencyFrom={item.frequencyFrom}
            frequencyTo={item.frequencyTo}
            lastWateringDate={item.lastWateringDate}
            nextWateringDate={item.nextWateringDate}
            id={plantsList.findIndex(plant => plant === item)}
            icon={item.icon}
            updateWatering={updatePlantWateringDate}
          />
        )}
      />
      {/* Arrow Indicator */}

      {currentPlantsList.length > 2 ? (
        <View style={{ height: verticalScale(25) }}>
          <Animated.View style={{ opacity: arrowOpacity }}>
            <FontAwesome
              size={scale(25)}
              style={{ alignSelf: 'center' }}
              name={'angle-double-down'}
              color={'rgba(27, 47, 40, 1)'}
              onPress={() => this.plantsFlatListRef.scrollToEnd()}
            />
          </Animated.View>
        </View>
      ) : (
        <></>
      )}

      {/* Bottom Calendar */}
      <View
        style={{
          width: '100%',
          marginTop: verticalScale(30)
        }}
      >
        <PlantsShortCalendar list={futurePlantsList} />
      </View>
    </SafeAreaView>
  )
}
