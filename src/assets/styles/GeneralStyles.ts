import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { fontSz } from '../../utils/constants';

const styles = StyleSheet.create({
  imgStyle: {
    width: '100%',
    height: '100%',
  },
  flexRow: {
    display: 'flex', 
    flexDirection: 'row',
  },
  centerContentStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  lowerCase: {
    textTransform: 'lowercase',
  },
  textWhite: {
      color: colors.white,
  },
  textBlack: {
    color: colors.black,
  },
  textDanger: {
    color: '#FF0000',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  textOffWhite: {
    color: colors.offwhite,
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  textDMSans: {
    fontFamily: 'DMSans-Regular',
  },
  textPoppins: {
    fontFamily: 'Poppins-Regular'
  },
  textDMSansItalic: {
    fontFamily: 'DMSans-Italic',
  },
  textDMSansMedium: {
    fontFamily: 'DMSans-Medium',
  },
  textPoppinsMedium: {
    fontFamily: 'Poppins-Medium'
  },
  textDMSansMediumItalic: {
    fontFamily: 'DMSans-MediumItalic',
  },
  textPoppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  textPoppinsBold: {
    fontFamily: 'Poppins-Bold'
  },
  textDMSansBold: {
    fontFamily: 'DMSans-Bold',
  },
  textDMSansBoldItalic: {
    fontFamily: 'DMSans-BoldItalic',
  },
  textF8: {
    fontSize: fontSz(8)
  },
  textF10: {
    fontSize: fontSz(10)
  },
  textF12: {
    fontSize: fontSz(12)
  },
  textF14: {
    fontSize: fontSz(14)
  },
  textF16: {
    fontSize: fontSz(16)
  },
  textF18: {
    fontSize: fontSz(18)
  },
  textF20: {
    fontSize: fontSz(20)
  },
  textF22: {
    fontSize: fontSz(22)
  },
  textF24: {
    fontSize: fontSz(24)
  },
  textF30: {
    fontSize: fontSz(30)
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
});

export default styles;