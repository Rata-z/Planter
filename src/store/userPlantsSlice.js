import {
  createAsyncThunk,
  createSlice,
  createListenerMiddleware
} from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import {
  updatePlantNotification,
  setAllNotifications,
  cancelAllScheduledNotifications,
  editNotificationsSchedule
} from 'components/Plant/PlantNotifications'

export const userPlantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: []
  },
  reducers: {
    addPlant: (state, action) => {
      const newList = [action.payload, ...state.plants]
      updatePlantNotification(action.payload.nextWateringDate, newList)
      return {
        ...state,
        plants: newList
      }
    },
    editPlant: (state, action) => {
      let oldWateringDate = ''
      let isWateringDateChanged = false
      const newList = state.plants.map(plant => {
        if (state.plants.indexOf(plant) == action.payload.id) {
          //checks if next watering date changed
          oldWateringDate = plant.nextWateringDate
          if (oldWateringDate !== action.payload.plant.nextWateringDate)
            isWateringDateChanged = true

          plant = action.payload.plant
        }
        return plant
      })

      //updates notification schedule if next watering date changed
      if (isWateringDateChanged) {
        let updatedWateringDate = action.payload.plant.nextWateringDate

        editNotificationsSchedule(oldWateringDate, updatedWateringDate, newList)
      }

      return { ...state, plants: [...newList] }
    },
    deletePlant: (state, action) => {
      let deletedPlantWateringDate = ''
      const newList = state.plants.filter(plant =>
        state.plants.indexOf(plant) !== action.payload.id
          ? plant
          : (deletedPlantWateringDate =
              state.plants.indexOf(plant).nextWateringDate)
      )
      updatePlantNotification(deletedPlantWateringDate, newList)
      return { ...state, plants: [...newList] }
    },
    clearPlants: (state, action) => {
      cancelAllScheduledNotifications()
      return { ...state, plants: [] }
    }
  },
  extraReducers: builder => {
    builder.addCase(getPlants.fulfilled, (state, action) => {
      state.plants = action.payload

      setAllNotifications(action.payload)
    })
  }
})
export const getPlants = createAsyncThunk('plants/getPlants', async userId => {
  const response = await await firestore()
    .collection('plants')
    .doc(userId)
    .collection('userPlants')
    .get()
    .then(snapshot => {
      return snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => a.title.localeCompare(b.title))
    })
  return response
})

export const { addPlant, editPlant, deletePlant, clearPlants } =
  userPlantsSlice.actions

export default userPlantsSlice.reducer
