import React, { FC } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { MyText } from '../../utils/common/index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../utils/colors';
import { hp, wp, fontSz } from '../../utils/constants';

interface AlertModalProps {
    close?: Function,
    visible?: boolean,
    deleteItem?: Function,
    item?: Object,
    loading?: boolean,
    textDeleteOrRestore?: string,
    title?: string
}

const AlertModal: FC<AlertModalProps> = ({ 
    close, 
    visible, 
    deleteItem, 
    item, 
    loading, 
    textDeleteOrRestore, 
    title 
}) => {

    const erase = (data: any) => {
        deleteItem(data)
    }
    const { 
        textPoppinsBold,
        textPoppinsMedium, 
        textCenter, 
        flexRow, 
        centerContentStyle, 
        textWhite, 
        textBlack 
    } = GStyles;

    const { 
        container, 
        wrapper,  
        cancelStyle, 
        confirmStyle, 
        confirmTextStyle,
        contentStyle,
        iconContainer,
        deleteText, 
    } = styles;

    return(
        <Modal 
            testID='delete'
            visible={visible} 
            statusBarTranslucent 
            transparent 
            onRequestClose={() => {}} 
            animationType='fade'>
            <View style={[wrapper, centerContentStyle]}>
                <View style={container}>
                {loading ? 
                    <View style={[contentStyle]}>
                        <LottieView
                            style={{
                                height: hp(45), 
                                width: wp(45),
                                alignSelf: 'center',
                            }}
                            source={require("../../assets/lottie/home/loader.json")}
                            autoPlay
                            loop
                        />
                        <MyText 
                            style={[
                                textBlack, 
                                deleteText, 
                                textPoppinsMedium
                            ]}>
                                {textDeleteOrRestore}
                        </MyText>
                    </View> 
                    : 
                    <>
                    <View style={[contentStyle]}>
                        <MyText 
                            style={
                                [textPoppinsBold, textCenter, textBlack, confirmTextStyle]
                            }>
                                {title}{` ${item?.name}`}?
                        </MyText>
                        <View style={[iconContainer, centerContentStyle]}>
                            <Icon 
                                name='warning' 
                                size={fontSz(25)} 
                                style={{color: 'red'}} 
                            />
                        </View>
                    </View>
                    <View style={[flexRow]}>
                        <TouchableOpacity 
                            onPress={close}
                            style={[confirmStyle, centerContentStyle]}>
                            <MyText style={[textPoppinsMedium, textBlack]}>
                                No
                            </MyText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => erase(item)} 
                            style={[
                                cancelStyle, 
                                centerContentStyle
                            ]}>
                            <MyText style={[textPoppinsMedium, textWhite]}>
                                Yes
                            </MyText>
                        </TouchableOpacity>
                    </View>
                    </>}
                </View>
            </View>
        </Modal>
    );
}



const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
    },
    container: {
        width: '80%',
        height: hp(200),
    },
    contentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    cancelStyle: {
        height: hp(50),
        width: '100%',
        backgroundColor: 'rgba(230, 11, 11, 1)',
        borderBottomRightRadius: wp(8),
        flex: 1
    },
    cancelTextStyle: {
        color: colors.darkBlue
    },
    confirmStyle: {
        height: hp(50),
        width: '100%',
        flex: 1,
        backgroundColor: '#e1d5f5',
        borderBottomLeftRadius: wp(8),
    },
    confirmTextStyle: {
        fontSize: fontSz(18),
        marginBottom: hp(10)
    },
    iconContainer: {
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
        backgroundColor: '#e1d5f5',
    },
    deleteText: {
        fontSize: fontSz(18)
    },
})

export default AlertModal;