import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import GeneralStyles from '../../assets/styles/GeneralStyles';
import { Spinner } from './Spinner';
import { MyText } from './MyText';
import colors from '../colors';
import { hp } from '../constants';


interface CustomButtonProps {
  onPress?: any;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: any;
  onPressOut?: any;
  onPressIn?: any;
  onLongPress?: any;
  spinnerColor?: String;
  textStyle?: any;
  buttonText?: String
}

const CustomButton: React.FC<CustomButtonProps>= (props) => {
    const { 
      containerStyle, 
      touchableContainerStyle, 
      contentContainer, 
      disabledStyles, 
      buttonTextStyles 
    } = styles;
    const { centerContentStyle } = GeneralStyles;
    const { 
      onPress, 
      disabled, 
      buttonStyle, 
      onPressOut, 
      onPressIn, 
      onLongPress, 
      loading, 
      spinnerColor, 
      textStyle, 
      buttonText,
    } = props;
    const buttonDisabled = disabled || loading ? true : false;
    const buttonDisabledStyle = disabled || loading ? disabledStyles : '';
  
    const renderSpinnerOrText = () => {
        const color = spinnerColor ? spinnerColor : colors.white;
        if (loading) {
        return <Spinner color={color} size={20} />;
        }
            return(
                <MyText 
                  style={[
                    buttonTextStyles, 
                    textStyle,
                    disabled ? {color: '#AAAAB3'} : {color: colors.white}
                  ]}>
                    {buttonText}
                </MyText>
            );
    }

    return (
      <View style={containerStyle}>
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={onLongPress}
            disabled={buttonDisabled}
            style={[
                touchableContainerStyle,
                buttonDisabledStyle, 
                centerContentStyle, 
                buttonStyle
            ]}>
            <View style={contentContainer}>
                {renderSpinnerOrText()}
            </View>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
  touchableContainerStyle: {
    justifyContent:'center',
    borderRadius: hp(25),
    backgroundColor: colors.purple,
    height: hp(98)
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyles: {
    ...GeneralStyles.textPoppinsMedium,
    fontSize: hp(32),
    lineHeight: hp(48),
    fontWeight: '600',
  },
  disabledStyles: {
    // backgroundColor: '#E5E5E8',
  },
});

export { CustomButton };