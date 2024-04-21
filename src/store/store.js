import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import userPlantsSlice, {
  addPlant,
  editPlant,
  deletePlant
} from './userPlantsSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'

import auth from '@react-native-firebase/auth'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage
}
const userPlantsListenerMiddleware = createListenerMiddleware()
const persistedReducer = persistReducer(persistConfig, userPlantsSlice)
userPlantsListenerMiddleware.startListening({
  actionCreator: addPlant,
  effect: async action => {
    firestore().collection('plants').doc(auth().currentUser.uid).set({
      email: auth().currentUser.email
    })

    firestore()
      .collection('plants')
      .doc(auth().currentUser.uid)
      .collection('userPlants')
      .add(action.payload)
  }
})
userPlantsListenerMiddleware.startListening({
  actionCreator: deletePlant,
  effect: async action => {
    firestore()
      .collection('plants')
      .doc(auth().currentUser.uid)
      .collection('userPlants')
      .where('plantId', '==', action.payload.pId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => doc.ref.delete())
      })
  }
})
userPlantsListenerMiddleware.startListening({
  actionCreator: editPlant,
  effect: async action => {
    firestore()
      .collection('plants')
      .doc(auth().currentUser.uid)
      .collection('userPlants')
      .where('plantId', '==', action.payload.plant.plantId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => doc.ref.update(action.payload.plant))
      })
  }
})

const store = configureStore({
  reducer: {
    userPlants: persistedReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).prepend(userPlantsListenerMiddleware.middleware)
})

export default store
export const persistor = persistStore(store)
