import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
export const loginStyles = StyleSheet.create({
  loginBorder: {
    width: scale(316),
    height: verticalScale(344),

    marginBottom: verticalScale(91),
    borderRadius: 20,
    padding: 2.5
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginBottom: verticalScale(10)
  },
  buttonGoogleBorder: {
    width: scale(191),
    height: verticalScale(43),
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 22.5,
    borderTopLeftRadius: 22.5,
    borderTopRightRadius: 10,
    marginRight: scale(16),
    alignSelf: 'flex-start',
    padding: 2.4,
    ShadowColor: '#000',
    shadowOpacity: 1,
    ShadowOffset: { width: 10, height: 10 },
    elevation: 6
  },
  buttonLogInBorder: {
    width: scale(81),
    height: verticalScale(43),
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 22.5,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 22.5,
    alignSelf: 'flex-end',

    padding: 2.4,
    ShadowColor: '#000',
    shadowOpacity: 1,
    ShadowOffset: { width: 10, height: 10 },
    elevation: 6
  },
  buttonGoogleContainer: {
    flex: 1,
    borderBottomLeftRadius: 7.6,
    borderBottomRightRadius: 20.1,
    borderTopLeftRadius: 20.1,
    borderTopRightRadius: 7.6,

    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  googleIcon: { width: scale(23), height: scale(23) },
  buttonLogInContainer: {
    flex: 1,
    borderBottomLeftRadius: 20.1,
    borderBottomRightRadius: 7.6,
    borderTopLeftRadius: 7.6,
    borderTopRightRadius: 20.1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    flex: 1,
    minHeight: verticalScale(110),
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    paddingBottom: verticalScale(30)
  },
  loginPanel: { backgroundColor: '#fff', borderRadius: 18, flex: 1 },
  loginTopText: {
    color: 'black',
    fontFamily: 'Halant-Regular',
    fontSize: scale(48),
    marginLeft: scale(23),
    marginTop: verticalScale(14)
  },
  placeHolder: {
    flex: 1,
    marginHorizontal: scale(32),
    fontSize: scale(14),
    fontFamily: 'NunitoSans-Italic',
    fontWeight: '600'
  },
  loginInput: {
    width: scale(289),
    height: verticalScale(63),
    borderRadius: 27.7,

    overflow: 'hidden',
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  InputShadowBorder: {
    ShadowColor: '#000',
    shadowOpacity: 1,
    ShadowOffset: { width: 10, height: 10 },
    elevation: 6,
    borderRadius: 30,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: 2.5,
    marginBottom: verticalScale(17)
  }
})
