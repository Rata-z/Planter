import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export const tabBarStyles = StyleSheet.create({
  barStyle: {
    tabBarPosition: 'absolute',
    backgroundColor: 'transparent',
    display: 'flex',
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: scale(20),
    marginHorizontal: scale(35)
  },
  iconMiddle: {
    height: verticalScale(40),
    width: scale(40),
    alignSelf: 'center'
  },
  iconLeft: {
    height: verticalScale(40),
    width: scale(40),
    alignSelf: 'center',

    fontSize: 40
  },
  iconRight: {
    height: verticalScale(40),
    width: scale(40),
    alignSelf: 'center'
  }
})
