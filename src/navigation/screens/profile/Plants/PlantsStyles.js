import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export const plantsStyles = StyleSheet.create({
  flatListContainer: {
    width: '95%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: verticalScale(10)
  },
  topBox: {
    height: scale(50),
    flexDirection: 'row',
    marginTop: verticalScale(15),
    justifyContent: 'flex-end'
  },
  addButton: {
    ShadowColor: '#000',
    shadowOpacity: 5,
    ShadowOffset: { width: 10, height: 10 },
    elevation: 8,

    marginRight: scale(15),
    width: scale(43),
    height: verticalScale(40),
    backgroundColor: 'rgba(153, 187, 122, 1)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
