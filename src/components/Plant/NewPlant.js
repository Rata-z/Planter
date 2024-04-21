import React, { useState, useRef, useEffect } from 'react'
import NumericInput from 'react-native-numeric-input'
import { SelectList } from 'react-native-dropdown-select-list'
import { launchImageLibrary } from 'react-native-image-picker'
import { calculateNextWateringDate } from './PlantFunctions'
import { v4 as uuidv4 } from 'uuid'
import 'react-native-get-random-values'

import DatePicker from 'react-native-date-picker'
import { scale, verticalScale } from 'react-native-size-matters'
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native'
import { modalStyles } from 'styles/ModalStyles'
import { Feather, FontAwesome } from '@expo/vector-icons'

import {
  GradientBorder,
  GradientButton
} from 'components/Gradient/GradientTemplate'
import samplePlants from 'assets/SamplePlants.json'

//Modal for adding new (or editing existing) plant to your plant list

const NewPlant = props => {
  const [plantData, setPlantData] = useState([])
  const [closing, setClosing] = useState(false)
  //Setting Plant information
  const [newTitle, changeTitle] = useState(() =>
    props.isEdited ? props.plant.title : 'PLANT NAME'
  )
  const [newIcon, changeIcon] = useState(() =>
    props.isEdited ? props.plant.icon : null
  )
  const [newFrequencyFrom, changeFrequencyFrom] = useState(
    props.isEdited ? props.plant.frequencyFrom : 1
  )
  const [newFrequencyTo, changeFrequencyTo] = useState(
    props.isEdited ? props.plant.frequencyTo : 1
  )
  const [newInsolation, changeInsolation] = useState(
    props.isEdited ? props.plant.insolation : 'BRIGHT'
  )
  const [plantId, changeplantId] = useState(
    props.isEdited ? props.plant.plantId : uuidv4()
  )

  const [newLastWateringDate, changeLastWateringDate] = useState(
    props.isEdited ? new Date(props.plant.lastWateringDate) : new Date()
  )
  const [newNextWateringDate, changeNextWateringDate] = useState(
    props.isEdited ? new Date(props.plant.nextWateringDate) : new Date()
  )

  const [dateModalOpened, setDateModalOpened] = useState(false)

  const changeFrequency = (number, period) => {
    if (period == 'from') {
      changeFrequencyFrom(number)
      if (number > newFrequencyTo) {
        changeFrequencyTo(number)
      }
    } else if (period == 'to') {
      changeFrequencyTo(number)
      if (number < newFrequencyFrom) {
        changeFrequencyFrom(number)
      }
    }
  }

  const insolationLevels = [
    { key: '0', value: 'DIRECT' },
    { key: '1', value: 'BRIGHT' },
    { key: '2', value: 'MEDIUM' },
    { key: '3', value: 'LOW' }
  ]

  //Plant Object
  const newPlantData = {
    icon: newIcon,
    title: newTitle,
    frequencyFrom: newFrequencyFrom,
    frequencyTo: newFrequencyTo,
    insolation: newInsolation,
    lastWateringDate: newLastWateringDate.toISOString().split('T')[0],
    nextWateringDate: newNextWateringDate.toISOString().split('T')[0],
    plantId: plantId
  }

  useEffect(() => {
    if (closing) {
      handleOk(false, newPlantData)
    }
  }, [newNextWateringDate])

  const confirmNewWateringDate = () => {
    setClosing(true)
    if (props.isEdited) {
      if (
        props.plant.frequencyFrom !== newFrequencyFrom ||
        props.plant.frequencyTo !== newFrequencyTo ||
        props.plant.lastWateringDate !==
          newLastWateringDate.toISOString().split('T')[0]
      ) {
        changeNextWateringDate(
          calculateNextWateringDate(
            newFrequencyFrom,
            newFrequencyTo,
            newLastWateringDate
          )
        )
      } else {
        handleOk(false, newPlantData)
      }
    } else {
      changeNextWateringDate(
        calculateNextWateringDate(
          newFrequencyFrom,
          newFrequencyTo,
          newLastWateringDate
        )
      )
    }
  }
  useEffect(() => {
    setPlantData(samplePlants)
  }, [])
  const dataSamplePlantList = plantData.map((item, index) => {
    return { key: index, value: item.name }
  })

  const handleChoosingSamplePlant = index => {
    const item = plantData[index]
    changeTitle(item.name)
    changeFrequencyFrom(item.frequencyFrom)
    changeFrequencyTo(item.frequencyTo)
    changeInsolation(item.insolation)
  }

  //Ok button handler
  const handleOk = (bool, plant) => {
    props.changeModalVisible(bool)
    if (props.isEdited) {
      //Accepting changes
      props.closeActionHandler['handleAcceptEdit'](plant)
    } else {
      //Creating plant

      props.addNewPlant(plant)
    }
  }

  //Cancel button handler
  const handleCancel = bool => {
    props.changeModalVisible(bool)
  }

  //Image Picker for plant icon
  const choosePlantIcon = () => {
    const sttings = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000
    }

    launchImageLibrary(sttings, response => {
      if (response.didCancel) {
      } else if (response.error) {
        alert('Image error: ', response.error)
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri
        changeIcon(imageUri)
      }
    })
  }

  return (
    <View style={modalStyles.mainContainer}>
      <StatusBar backgroundColor={'rgba(27, 47, 40, 0.4)'} />
      <GradientBorder
        borderStyle={modalStyles.boxBorder}
        containerStyle={modalStyles.box}
        colorSet='loginScreen'
      >
        <View style={modalStyles.container}>
          {/* Plant settings container */}
          <View>
            <View style={modalStyles.baseData}>
              {/* Plant Picture */}
              <TouchableOpacity onPress={choosePlantIcon}>
                <GradientBorder
                  borderStyle={modalStyles.pictureBorder}
                  colorSet='gradient'
                  cords='input'
                >
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 15.7,
                      backgroundColor: '#fff',
                      resizeMode: 'contain'
                    }}
                    source={
                      newIcon !== null
                        ? newIcon
                        : require('assets/default-plant.png')
                    }
                  />
                </GradientBorder>
              </TouchableOpacity>
              {/* Plant Title */}
              <View style={modalStyles.nameData}>
                <GradientBorder
                  borderStyle={modalStyles.inputBorder}
                  containerStyle={modalStyles.input}
                  colorSet='gradient'
                  cords='input'
                >
                  <TextInput
                    style={[modalStyles.text, { fontWeight: '600' }]}
                    onChangeText={text => changeTitle(text)}
                    value={newTitle}
                  />
                </GradientBorder>

                {/*Sample Plant List button */}
                <GradientBorder
                  borderStyle={{
                    borderRadius: 12
                  }}
                  colorSet='textBorder'
                  cords='input'
                >
                  <SelectList
                    data={dataSamplePlantList}
                    placeholder='LIST'
                    save='key'
                    setSelected={key => handleChoosingSamplePlant(key)}
                    boxStyles={modalStyles.listButton}
                    dropdownStyles={{
                      position: 'absolute',
                      width: scale(134),
                      marginTop: verticalScale(31),
                      borderWidth: 1.5,
                      zIndex: 1,
                      backgroundColor: 'rgba(206, 229, 203, 1)'
                    }}
                    dropdownItemStyles={{
                      height: verticalScale(31)
                    }}
                    inputStyles={[modalStyles.text, modalStyles.listButtonText]}
                    search={true}
                    maxHeight={verticalScale(170)}
                    notFoundText='No plant found'
                    arrowicon={
                      <View
                        style={{
                          alignSelf: 'center',
                          height: verticalScale(21)
                        }}
                      >
                        <FontAwesome
                          size={scale(20)}
                          name={'angle-double-down'}
                          color={'rgba(27, 47, 40, 1)'}
                        />
                      </View>
                    }
                  />
                </GradientBorder>
              </View>
            </View>
            {/* Insolation List */}
            <View style={[modalStyles.baseData, { alignItems: 'center' }]}>
              <Text style={modalStyles.text}>INSOLATION</Text>

              <GradientBorder
                borderStyle={{
                  borderRadius: 12
                }}
                colorSet='textBorder'
                cords='input'
              >
                <SelectList
                  data={insolationLevels}
                  save='value'
                  setSelected={val => changeInsolation(val)}
                  boxStyles={modalStyles.listButton}
                  dropdownStyles={{
                    position: 'absolute',
                    width: scale(134),
                    marginTop: verticalScale(31),
                    borderWidth: 1.5,
                    zIndex: 1,
                    backgroundColor: 'rgba(206, 229, 203, 1)'
                  }}
                  dropdownItemStyles={{
                    height: verticalScale(31)
                  }}
                  inputStyles={[modalStyles.text, modalStyles.listButtonText]}
                  search={false}
                  defaultOption={{ key: 'BRIGHT', value: 'BRIGHT' }}
                  maxHeight={verticalScale(80)}
                  arrowicon={
                    <View
                      style={{
                        alignSelf: 'center',
                        height: verticalScale(21)
                      }}
                    >
                      <FontAwesome
                        size={scale(20)}
                        name={'angle-double-down'}
                        color={'rgba(27, 47, 40, 1)'}
                      />
                    </View>
                  }
                />
              </GradientBorder>
            </View>

            {/* Plant Watering Settings */}
            <View>
              <Text
                style={[
                  modalStyles.text,
                  { flex: 0, marginTop: verticalScale(10) }
                ]}
              >
                WATERING FREQUENCY (IN DAYS):
              </Text>
              <View
                style={{
                  rowGap: verticalScale(13),
                  marginTop: verticalScale(10)
                }}
              >
                <View style={modalStyles.wateringData}>
                  <Text style={[modalStyles.text, { textAlign: 'center' }]}>
                    BETWEEN
                  </Text>

                  <GradientBorder
                    borderStyle={{
                      borderRadius: 10
                    }}
                    colorSet='textBorder'
                    cords='input'
                  >
                    <NumericInput
                      totalWidth={scale(134)}
                      inputStyle={{
                        backgroundColor: 'rgba(206, 229, 203, 1)',
                        borderWidth: 2
                      }}
                      leftButtonBackgroundColor={'transparent'}
                      rightButtonBackgroundColor={'transparent'}
                      totalHeight={verticalScale(31)}
                      borderColor={'rgba(27, 47, 40, 1)'}
                      containerStyle={{ borderWidth: 2 }}
                      minValue={1}
                      separatorWidth={1}
                      maxValue={31}
                      initValue={newFrequencyFrom}
                      rounded
                      editable={false}
                      value={newFrequencyFrom}
                      onChange={value => changeFrequency(value, 'from')}
                    />
                  </GradientBorder>
                </View>
                <View style={modalStyles.wateringData}>
                  <Text style={[modalStyles.text, { textAlign: 'center' }]}>
                    TO
                  </Text>
                  <GradientBorder
                    borderStyle={{
                      borderRadius: 10
                    }}
                    colorSet='textBorder'
                    cords='input'
                  >
                    <NumericInput
                      totalWidth={scale(134)}
                      inputStyle={{
                        backgroundColor: 'rgba(206, 229, 203, 1)',
                        borderWidth: 2
                      }}
                      leftButtonBackgroundColor={'transparent'}
                      rightButtonBackgroundColor={'transparent'}
                      totalHeight={verticalScale(31)}
                      borderColor={'rgba(27, 47, 40, 1)'}
                      containerStyle={{ borderWidth: 2 }}
                      minValue={1}
                      separatorWidth={1}
                      maxValue={31}
                      initValue={newFrequencyTo}
                      rounded
                      editable={false}
                      value={newFrequencyTo}
                      onChange={value => changeFrequency(value, 'to')}
                    />
                  </GradientBorder>
                </View>
                <View
                  style={[
                    modalStyles.wateringData,
                    { marginTop: verticalScale(-5) }
                  ]}
                >
                  {/* Watering Date Picker*/}
                  <Text style={modalStyles.text}>LAST WATERED</Text>
                  <TouchableOpacity onPress={() => setDateModalOpened(true)}>
                    <GradientBorder
                      borderStyle={{
                        width: scale(134),
                        height: verticalScale(31),
                        borderRadius: 10,
                        padding: 2.2
                      }}
                      containerStyle={{
                        backgroundColor: 'rgba(206, 229, 203, 1)',
                        borderRadius: 8,
                        flex: 1,
                        flexDirection: 'row'
                      }}
                      colorSet='gradient'
                      cords='input'
                    >
                      <View
                        style={{
                          flex: 2.5,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Text
                          style={[
                            modalStyles.text,
                            { fontSize: scale(14), flex: 0 }
                          ]}
                        >
                          {newLastWateringDate.toISOString().split('T')[0]}
                        </Text>
                      </View>
                      <GradientBorder
                        borderStyle={{
                          width: 3
                        }}
                        colorSet='gradient'
                        cords='input'
                      />
                      <GradientBorder
                        borderStyle={{
                          flex: 1,
                          borderTopRightRadius: 7.8,
                          borderBottomRightRadius: 7.8,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        colorSet='text'
                        cords='input'
                      >
                        <Feather
                          name='calendar'
                          size={scale(24)}
                          color={'rgba(27, 47, 40, 1)'}
                        />
                      </GradientBorder>
                    </GradientBorder>
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    mode='date'
                    open={dateModalOpened}
                    date={newLastWateringDate}
                    onConfirm={date => {
                      setDateModalOpened(false)
                      changeLastWateringDate(date)
                    }}
                    onCancel={() => {
                      setDateModalOpened(false)
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Buttons container */}
          <View style={modalStyles.buttonsView}>
            {/* Cancel button */}
            <GradientButton
              colorSet={'mono'}
              pressEvent={() => handleCancel(false)}
              borderStyle={modalStyles.cancelButtonBorder}
              buttonStyle={modalStyles.cancelButtonContainer}
            >
              <Text
                style={[
                  modalStyles.text,
                  {
                    flex: 0
                  }
                ]}
              >
                CANCEL
              </Text>
            </GradientButton>
            <GradientButton
              colorSet={'login'}
              pressEvent={confirmNewWateringDate}
              borderStyle={modalStyles.acceptButtonBorder}
              buttonStyle={modalStyles.acceptButtonContainer}
            >
              <Text
                style={[
                  modalStyles.text,
                  {
                    flex: 0
                  }
                ]}
              >
                SAVE
              </Text>
            </GradientButton>

            {/* OK button */}
          </View>
        </View>
      </GradientBorder>
    </View>
  )
}
export default NewPlant
