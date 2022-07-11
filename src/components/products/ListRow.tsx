import React, { ReactNode, FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { MyText } from '../../utils/common/index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../utils/colors';
import { fontSz, hp, wp } from '../../utils/constants';

interface ListRowProps {
    icon?: ReactNode,
    title?: string,
    subtitle?: string,
    onPress?: Function
}

const ListRow: FC<ListRowProps> = ({ icon, title, subtitle, onPress }) => {
    const { container, titleText, iconContainer, subtitleText, titleContainer } = styles;
    const { textPoppins, textPoppinsMedium, flexRow, centerContentStyle, textPoppinsSemiBold } = GStyles;

    return(
        <Pressable onPress={onPress} style={[container, flexRow]}>
            <View style={[iconContainer, centerContentStyle]}>
                {icon}
            </View>
            <View style={titleContainer}>
                <MyText style={[titleText, textPoppinsSemiBold]}>{title}</MyText>
                <MyText style={[subtitleText, textPoppins]}>{subtitle}</MyText>
            </View>
            <Icon name="chevron-right" size={fontSz(20)} color='#000' />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(50),
        width: '100%',
        backgroundColor: colors.white,
        marginVertical: hp(2),
        paddingHorizontal: wp(8),
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        marginLeft: wp(10),
        height: '100%',
        justifyContent: 'center',
    },
    titleText: {
        color: colors.darkPurple,
        fontSize: fontSz(18),
    },
    subtitleText: {
        fontSize: fontSz(10),
        color: colors.grey,
    },
    iconContainer: {
        height: hp(35),
        width: wp(35),
        borderRadius: hp(6),
        // backgroundColor: 'rgba(255, 81, 0, 0.1)',
        backgroundColor: '#e1d5f5'
    }
})

export default ListRow;