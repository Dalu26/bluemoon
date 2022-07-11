import React, { useRef, useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, KeyboardType,  StyleSheetProperties } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../colors';
import { fontSz, hp, wp } from '../constants';
import MyText from './MyText';

interface CustomInputProps {
    placeholder?: string ;
    onChangeText?: Function; 
    value?: string | number; 
    onFocus?: Function; 
    onBlur?: Function; 
    autoCapitalize?: boolean | undefined;
    textInputStyle?: StyleSheetProperties; 
    onChange?: Function ;
    placeholderColor?: string; 
    textAlignVertical?: string; 
    multiline?: boolean | undefined;
    error?: any; 
    autoFocus?: any;
    maxLength?: number;
    icon?: any;
    iconPress?: Function;
    containerStyle?: any;
    keyboard?: KeyboardType
    label?: string;
    errorMsg?: string;
    password?: boolean;
    secureTextEntry?: boolean;
    editable?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    let inputRef = useRef(null);
    const [secure, setSecure] = useState(true)
    const [borderColor, setBorderColor] = useState('transparent');

    const handleOnblur = () => {
        setBorderColor('transparent');
    };
    const hitslopConfig = {right: wp(10), left: wp(10), top: hp(10), bottom: hp(10)}

    const { inputStyle } = styles;
    const { textPoppins, flexRow } = GStyles

    const { 
            placeholder, 
            onChangeText, 
            value, 
            onFocus, 
            onBlur, 
            autoCapitalize,
            textInputStyle, 
            onChange, 
            placeholderColor, 
            textAlignVertical, 
            multiline, 
            keyboard, 
            error, 
            autoFocus,
            maxLength,
            icon,
            iconPress,
            containerStyle,
            password,
            secureTextEntry,
            editable,
            errorMsg,
    } = props;
    
    return(
        <View 
            style={[styles.container, containerStyle]}>
            <View style={[flexRow, styles.inputContainer]}>
            <TextInput
                style={[
                    inputStyle, 
                    textInputStyle, 
                    textPoppins,
                    {borderColor: error ? '#DC143C' : borderColor},
                ]}
                onChangeText={onChangeText}
                autoCorrect={false}
                value={value}
                onBlur={error ? onBlur : handleOnblur}
                onFocus={() => setBorderColor(colors.white)}
                autoCapitalize={autoCapitalize || 'none'}
                placeholder={placeholder || ' '}
                onChange={onChange}
                keyboardType={keyboard} 
                maxLength={maxLength}
                multiline={multiline}
                secureTextEntry={secureTextEntry && secure}
                placeholderTextColor={placeholderColor || colors.white} 
                textAlignVertical={textAlignVertical || "center"}
                ref={ref => inputRef = ref}
                autoFocus={autoFocus}
                editable={editable}
            />
            {password && 
                <TouchableOpacity
                    hitSlop={hitslopConfig}
                    style={{marginLeft: wp(-45)}} 
                    onPress={() => setSecure(secure => !secure)}>
                    {secure ? <Icon name='ios-eye' color={'#CCD2E3B2'} size={fontSz(30)} />
                    : <Icon name='ios-eye-off' color={'#CCD2E3B2'} size={fontSz(30)} />}
                </TouchableOpacity>}
            </View>
            {errorMsg ?
            <MyText style={styles.errorStyle}>{errorMsg}</MyText> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    inputContainer: {
        alignItems: 'center'
    },
    inputStyle: {
        fontSize: fontSz(16),
        color: colors.white,
        paddingHorizontal: wp(18),
        borderWidth: wp(1),
        borderRadius: hp(18),
        backgroundColor: colors.darkBlue,
        width: '100%',
        minHeight: hp(65),
    },
    iconStyle: {
        flex: 1.5,
        alignItems: 'center'
    },
    errorStyle: {
        fontSize: fontSz(11),
        marginLeft: wp(5),
        color: '#DC143C'
    }
});

export { CustomInput };