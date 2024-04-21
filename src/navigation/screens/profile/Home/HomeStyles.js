import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export const homeStyles = StyleSheet.create({
  homeText: {
    color: '#1B2F28',
    fontFamily: 'Halant-Regular',
    fontSize: scale(48)
  },
  homeDateView: {
    alignItems: 'center',
    rowGap: verticalScale(-50)
  },
  buttonLogOut: {
    width: scale(45),
    height: verticalScale(42),
    marginTop: verticalScale(15),
    backgroundColor: 'rgba(153, 187, 122, 1)',
    borderBottomLeftRadius: scale(19),
    borderBottomRightRadius: scale(6),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(19),
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginRight: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  homeClock: {
    color: '#1B2F28',
    fontSize: scale(72),
    fontFamily: 'Halant-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 9,

    marginBottom: 9
  },

  homeClockView: {
    alignItems: 'center'
  },
  calendarStyleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
