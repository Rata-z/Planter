import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  Alert,
  Text
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import { globalStyles } from 'styles/GlobalStyles'
import Plant from 'components/Plant/Plant'
import { plantsStyles } from './PlantsStyles'
import NewPlant from 'components/Plant/NewPlant'
import React, { useState, useRef } from 'react'
import Animated from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { addPlant, deletePlant, editPlant } from 'store/userPlantsSlice'
import { usePlantsList } from 'components/Plant/PlantFunctions'
import { scale } from 'react-native-size-matters'

// Plant screen allows users to add plants whose watering cycle they want to track

export default function PlantsScreen () {
  const plantsList = usePlantsList()
  const dispatch = useDispatch()
  //Modal visibility toggler
  const [addVisibility, changeAddVisibility] = useState(false)
  const [editVisibility, changeEditVisibility] = useState(false)
  const isEmpty = plantsList.length > 0 ? false : true

  //Targeted plant
  const [activeIndex, changeActiveIndex] = useState(null)
  const [activePlant, changeActivePlant] = useState(null)
  const closeActionHandler = {
    handleDelete: (index, plantId) => {
      Alert.alert(
        'Delete Plant?',
        'Are you sure you want to permanently delete this plant?',
        [
          {
            text: 'Yes',
            onPress: () => {
              dispatch(deletePlant({ id: index, pId: plantId }))
              changeActiveIndex(null)
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              changeActiveIndex(null)
            }
          }
        ]
      )
    },

    handleEdit: plant => {
      changeActivePlant(plant)
      changeEditVisibility(true)
    },

    handleAcceptEdit: plant => {
      dispatch(editPlant({ id: activeIndex, plant: plant }))
      changeActivePlant(null)
      changeActiveIndex(null)
    }
  }
  const openedRow = useRef(null)

  const addNewPlant = newPlant => {
    dispatch(addPlant(newPlant))
  }

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      {/* Add Plant Modal */}
      <Modal
        transparent={true}
        animationType='fade'
        nRequestClose={() => changeAddVisibility(false)}
        visible={addVisibility}
      >
        <NewPlant
          changeModalVisible={changeAddVisibility}
          addNewPlant={addNewPlant}
        />
      </Modal>

      {/* Edit Plant Modal */}
      <Modal
        transparent={true}
        animationType='fade'
        nRequestClose={() => changeEditVisibility(false)}
        visible={editVisibility}
      >
        <NewPlant
          changeModalVisible={changeEditVisibility}
          closeActionHandler={closeActionHandler}
          isEdited={true}
          plant={activePlant}
        />
      </Modal>

      {/* Top */}
      <View style={plantsStyles.topBox}>
        {/* Adding Plant Button */}
        <TouchableWithoutFeedback onPress={() => changeAddVisibility(true)}>
          <View style={plantsStyles.addButton}>
            <Feather
              size={33}
              name={'plus-circle'}
              color={'rgba(27, 47, 40, 1)'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* User's Plant List */}
      {isEmpty ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: scale(16),
              fontWeight: '700',
              color: 'rgba(27, 47, 40, 0.7)',
              textAlign: 'center'
            }}
          >
            List of plants is empty. You can add your first plant by pressing
            button at the top
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          style={[plantsStyles.flatListContainer]}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          data={plantsList}
          renderItem={({ item, index }) => (
            <View>
              <Plant
                title={item.title}
                frequencyFrom={item.frequencyFrom}
                frequencyTo={item.frequencyTo}
                insolation={item.insolation}
                color={item.color}
                lastWateringDate={item.lastWateringDate}
                nextWateringDate={item.nextWateringDate}
                id={index}
                plantId={item.plantId}
                icon={item.icon}
                openedRow={openedRow}
                actionHandler={() =>
                  closeActionHandler['handleDelete'](index, item.plantId)
                }
                editHandler={() => {
                  changeActiveIndex(index)
                  closeActionHandler['handleEdit'](plantsList[index])
                }}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}
