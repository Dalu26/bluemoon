import React, { FC, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { MyText } from '../../utils/common/index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../utils/colors';
import { shortenXterLength, formatPrice } from '../../utils/helpers';
import { hp, wp, fontSz } from '../../utils/constants';

interface CardProps {
    name?: string,
    price?: string | number,
    id?: string,
    description?: string,
    totalStock?: number,
    item?: any,
}

const Card: FC<CardProps> = ({ name, price, item, description, totalStock }) => {
    const navigation = useNavigation();
    const [showDetails, setShowDetails] = useState(false);

    const toEdit = () => {
        navigation.navigate('Product', {screen: 'Edit', params: item})
    }

    const toggleDescription = () => {
        setShowDetails(showDetails => !showDetails);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    }

    const { container, textPrice, prodName, bottomSection } = styles
    const { textPoppinsSemiBold, textPoppinsBold } = GStyles
    return(
        <View 
            testID='card'
            style={[container]}>
                <TouchableOpacity 
                    onPress={() => toEdit()}
                    style={[bottomSection]}>
                    <MyText style={[textPoppinsSemiBold, prodName]}>
                        {shortenXterLength(name, 20)}
                    </MyText>
                    <MyText style={[textPrice, textPoppinsBold]}>
                        {formatPrice("en-US", 'USD', price?.toString())}
                    </MyText>
                    <MyText style={[textPoppinsSemiBold, prodName]}>
                       Total Stock: {totalStock}
                    </MyText>
                    {!showDetails ? 
                        <MyText style={styles.descText}>
                         {shortenXterLength(`Description: ${description}`, 50)}
                        </MyText>
                    :   <MyText style={styles.descText}>
                           Description: {description}
                        </MyText>}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => toggleDescription()} 
                    style={styles.arrowWrp}>
                    {!showDetails ?
                    <Icon name="chevron-right" size={fontSz(20)} color={colors.darkPurple} />
                    :
                    <Icon name="chevron-up" size={fontSz(20)} color={colors.darkPurple} />
                }
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.white,
        marginVertical: hp(5),
        borderRadius: hp(10),
        padding: hp(8),
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(253, 195, 0, 0.06)',
        flexDirection: 'row'
    },
    prodName: {
        fontSize: fontSz(12),
        color: colors.darkPurple,
        marginTop: hp(5)
    },
    textPrice: {
        color: colors.darkBlue,
        fontSize: fontSz(14),
        lineHeight: fontSz(18),
    },
    bottomSection: {
        height: '100%',
        flex: 1
    },
    descText: {
        color: colors.darkBlue,
        fontSize: fontSz(11)
    },
    arrowWrp: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        alignSelf: 'center',
        marginHorizontal: wp(5),
        backgroundColor: '#e1d5f5'
    }
})

export default Card;