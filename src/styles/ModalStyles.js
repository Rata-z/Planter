import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export const modalStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(27, 47, 40, 0.4)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    height: scale(100),
    width: scale(100),
    flex: 1
  },
  boxBorder: {
    borderRadius: 16,
    padding: 2.5
  },
  text: {
    fontSize: scale(16),
    fontWeight: '700',
    color: 'rgba(27, 47, 40, 0.9)',
    flex: 1
  },

  baseData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(13)
  },
  wateringData: {
    flexDirection: 'row',
    marginLeft: scale(15),
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: scale(29)
  },
  acceptButtonBorder: {
    borderBottomLeftRadius: 22.5,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 22.5,
    padding: 2.5
  },
  acceptButtonContainer: {
    borderBottomLeftRadius: 20.1,
    borderBottomRightRadius: 7.6,
    borderTopLeftRadius: 7.6,
    borderTopRightRadius: 20.1,
    width: scale(54),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButtonBorder: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 22.5,
    borderTopLeftRadius: 22.5,
    borderTopRightRadius: 10,
    padding: 2.5
  },
  cancelButtonContainer: {
    borderBottomLeftRadius: 7.6,
    borderBottomRightRadius: 20.1,
    borderTopLeftRadius: 20.1,
    borderTopRightRadius: 7.6,
    width: scale(80),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  pictureBorder: {
    height: scale(95),
    width: scale(95),
    borderRadius: 18,
    padding: 2.3
  },
  inputBorder: {
    width: scale(134),
    height: verticalScale(31),
    borderRadius: 10,
    padding: 2.3
  },
  datePickerBorder: {
    padding: 2.2,
    borderRadius: 14.2
  },
  datePickerContainer: {
    width: scale(128),
    height: verticalScale(30),
    borderRadius: 12
  },
  listButton: {
    borderWidth: 0,
    width: scale(134),
    height: verticalScale(31)
  },
  listButtonText: {
    height: verticalScale(21),
    alignSelf: 'center',
    marginBottom: 3
  },
  input: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  picture: { flex: 1, borderRadius: 15.7, backgroundColor: '#fff' },
  box: {
    backgroundColor: '#fff',
    borderRadius: 14,
    width: scale(320),
    minHeight: verticalScale(385)
  },
  nameData: {
    alignItems: 'center',
    marginVertical: verticalScale(8),
    justifyContent: 'space-between'
  },

  normalText: {
    fontSize: 20
  },
  buttonsView: {
    flexDirection: 'row',
    marginTop: verticalScale(8),
    justifyContent: 'space-between',
    paddingBottom: verticalScale(10)
  }
})
