import {
  Calendar,
  CalendarProvider,
  WeekCalendar
} from 'react-native-calendars'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { TouchableOpacity, View, Text } from 'react-native'
import { homeStyles } from '../../navigation/screens/profile/Home/HomeStyles'

let dates = {}
export function CustomCalendar (props) {
  dates = {}
  const plantsList = useSelector(state => state.userPlants.plants)

  if (plantsList !== undefined) {
    plantsList.forEach(plant => {
      if (plant.wateringDate !== null) {
        for (var i = 1; i <= 30 / plant.frequency; i++) {
          let date = moment(plant.wateringDate)
            .add(plant.frequency * i, 'days')
            .format('YYYY-MM-DD')
          if (dates[date] === undefined) {
            dates[date] = {
              dots: [{ color: plant.color }]
            }
          } else {
            dates[date] = {
              dots: [...dates[date].dots, { color: plant.color }]
            }
          }
        }
      }
    })
  }

  return <Calendar markingType={'multi-dot'} markedDates={dates} />
}
export function HomeCalendar (props) {
  let visibleDaysMax = moment().add(5, 'days').format('YYYY-MM-DD')
  let visibleDaysMin = moment().format('YYYY-MM-DD')
  return (
    <View style={homeStyles.calendarStyleView}>
      <CalendarProvider style={{ flex: 1 }} date={visibleDaysMin}>
        <WeekCalendar
          style={{ flex: 1 }}
          firstDay={1}
          hideDayNames
          markingType={'multi-dot'}
          markedDates={dates}
          theme={{ calendarBackground: 'hsla(0, 0%, 100%,0.2)' }}
          scrollEnabled={false}
        />
      </CalendarProvider>
    </View>
  )
}
