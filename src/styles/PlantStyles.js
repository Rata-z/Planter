import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export const plantStyles = StyleSheet.create({
  detailsStyle: {
    flex: 1,
    backgroundColor: 'red'
  },
  deleteButton: {
    backgroundColor: 'rgba(153, 187, 122, 1)',
    borderRadius: 20,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    ShadowColor: '#000',
    shadowOpacity: 5,
    shadowRadius: 10,
    ShadowOffset: { width: 10, height: 10 },
    elevation: 5
  },
  textBorder: {
    padding: 2.1,
    borderRadius: 10,
    marginRight: scale(16)
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 7.9
  },
  titleText: {
    fontFamily: 'Halant-Regular',
    fontSize: scale(18),
    color: '#FFFFFF',
    width: scale(150)
  },
  defaultText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: scale(14),
    color: '#FFFFFF'
  },
  regularText: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: scale(12),
    color: '#FFFFFF',

    // fontWeight: 'bold',

    marginRight: scale(5)
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: verticalScale(5)
  },
  infoText: {
    marginHorizontal: scale(15),
    fontFamily: 'NunitoSans-Bold',
    fontSize: 14,
    color: 'rgba(27, 47, 40, 1)',
    fontWeight: 'bold'
  },
  header: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 87,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 87,
    backgroundColor: 'transparent',
    height: verticalScale(94),
    flexDirection: 'row'
  },
  headerData: {
    marginLeft: scale(103),
    marginTop: verticalScale(8)
  },
  homePlant: {
    marginLeft: '35%',

    marginTop: verticalScale(14)
  },

  plantContainer: {
    backgroundColor: '#6D9D6D',
    overflow: 'hidden',
    marginTop: verticalScale(3),
    borderTopRightRadius: 16,
    borderTopLeftRadius: 87,
    borderBottomLeftRadius: 16,
    height: verticalScale(94),
    borderBottomRightRadius: 87
  },
  icon: {
    width: scale(90),
    height: scale(90),
    borderRadius: 15.7,
    resizeMode: 'contain',
    zIndex: 2
  },

  list: {
    opacity: 0,
    flex: 1,
    top: -10,
    marginLeft: scale(103),
    backgroundColor: 'transparent'
  }
})
