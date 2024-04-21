import * as Font from 'expo-font'

const useFonts = async () =>
  await Font.loadAsync({
    'Halant-Regular': require('fonts/Halant-Regular.ttf'),
    'NunitoSans-Italic': require('fonts/NunitoSans-Italic.ttf'),
    'NunitoSans-Bold': require('fonts/NunitoSans-Bold.ttf'),
    'NunitoSans-Regular': require('fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Light': require('fonts/NunitoSans-Light.ttf')
  })
export default useFonts
