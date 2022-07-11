import React, { FC } from 'react';
import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import RestoreIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyText } from '../../utils/common/index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../utils/colors';
import { shortenXterLength, formatPrice } from '../../utils/helpers';
import { hp, wp, fontSz } from '../../utils/constants';

interface EditRowProps {
    name?: string,
    deleteItem?: Function,
    price?: string | number ,
    restore?: Function
    disabled?: boolean,
    item?: any
}
const EditRow: FC<EditRowProps> = ({
    name, 
    price, 
    deleteItem, 
    item, 
    disabled, 
    restore
}) => {
    const navigation = useNavigation()
    const toEdit = () => {
        navigation.navigate('Product', {screen: 'Edit', params: item})
    }

    const { container, textPrice, prodName, deleteStyle } = styles
    const { textPoppinsSemiBold, textPoppinsBold, flexRow } = GStyles
    return(
        <View style={[container, flexRow]}>
            <Pressable 
                disabled={disabled}
                onPress={() => toEdit()}
                hitSlop={10} 
                style={{
                    flex: 1, opacity: disabled ? 0.5 : 1
                }}>
                    <MyText 
                        style={[
                            textPoppinsSemiBold, prodName
                    ]}>
                        {shortenXterLength(name, 35)}
                    </MyText>
                    <MyText 
                        style={[
                            textPrice, textPoppinsBold
                        ]}>
                        {formatPrice("en-US", 'USD', price?.toString())}
                    </MyText>
            </Pressable>
            <TouchableOpacity
                onPress={
                    disabled ? restore : deleteItem
                }
                style={[deleteStyle, {
                    backgroundColor: !disabled ? 
                    'rgba(255, 81, 0, 0.1)' : 'rgba(0, 161, 27, 0.3)'
                }]}>
                {!disabled ? 
                    <Icon 
                        name='delete' 
                        size={fontSz(18)} 
                        style={{color: 'red'}} 
                    />
                  :  <RestoreIcon 
                        name='backup-restore' 
                        size={fontSz(18)} 
                        style={{color: 'green'}} 
                    />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(50),
        width: '100%',
        backgroundColor: colors.white,
        marginVertical: hp(2),
        padding: hp(8),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    prodName: {
        fontSize: fontSz(14),
        color: colors.darkPurple
    },
    textPrice: {
        color: colors.darkBlue,
        fontSize: fontSz(10)
    },
    deleteStyle: {
        paddingHorizontal: wp(5),
        borderRadius: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(35),
        width: wp(35),
    }
})

export default EditRow;