import * as Notifications from 'expo-notifications'
import * as Localization from 'expo-localization'

export default async function schedulePlantPushNotification (
  date,
  plantsNumber
) {
  const { timeZone } = Localization.getCalendars()[0]
  // cancel notification if already exists
  await Notifications.getAllScheduledNotificationsAsync().then(
    async snapshot => {
      snapshot.forEach(async notification => {
        if (notification.trigger.value == new Date(date).getTime()) {
          await Notifications.cancelScheduledNotificationAsync(
            notification.identifier
          )
        }
      })
    }
  )
  //creates notification on set day
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    })
  })
  if (plantsNumber > 0) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "It's watering day!",
        body:
          'Today you have ' + plantsNumber + " plants to water. Don't forget!",
        priority: Notifications.AndroidNotificationPriority.MAX,
        sound: true,
        vibrate: true
      },
      trigger: {
        timezone: timeZone,
        date: new Date(date),
        hour: 8,
        minute: 0,
        repeats: false
      }
    }).then(console.log('plant scheduled'))
  }
}
function getNotificationPlantsNumber (date, plantsList) {
  let notificationPlantsNumber = 0
  plantsList.forEach(plant => {
    if (plant.nextWateringDate === date) notificationPlantsNumber++
  })

  return notificationPlantsNumber
}
export async function updatePlantNotification (date, newList) {
  const plantsCount = getNotificationPlantsNumber(date, newList)
  schedulePlantPushNotification(date, plantsCount)
}

export async function editNotificationsSchedule (oldDate, newDate, newList) {
  updatePlantNotification(oldDate, newList)
  updatePlantNotification(newDate, newList)
}

export async function cancelAllScheduledNotifications () {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

export async function setAllNotifications (plantList) {
  const uniqueDates = {}
  plantList.forEach(plant => {
    const date = plant.nextWateringDate
    uniqueDates[date] ? uniqueDates[date]++ : (uniqueDates[date] = 1)
  })

  Object.entries(uniqueDates).forEach(([date, count]) => {
    schedulePlantPushNotification(date, count)
  })
}
