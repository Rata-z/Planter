import { StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

// Style sheets that are used globally

const { width } = Dimensions.get('window')
const height =
  Platform.OS === 'android' && Platform.Version >= 29
    ? Dimensions.get('window').height + StatusBar.currentHeight
    : Dimensions.get('window').height

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  tabContainer: {
    height,
    width
  },
  mainContainerBackground: {
    flex: 1,
    backgroundColor: '#ffff',
    resizeMode: 'cover'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#777'
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 9
  },

  backgroundImage: {
    width: '400%',
    height: '400%',
    resizeMode: 'repeat'
  },
  box: {
    backgroundColor: 'hsla(0, 0%, 100%, 0.5)',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 70,
    borderRadius: 10,
    height: '70%',
    width: '85%'
  }
})
