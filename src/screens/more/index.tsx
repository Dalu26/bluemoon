import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import MedIcon from 'react-native-vector-icons/Ionicons';
import { MyText, CustomButton } from '../../utils/common/index'
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles'
import ListRow from '../../components/products/ListRow';
import { clearCachedData, clearData } from '../../utils/helpers';
import { fontSz, hp, wp } from '../../utils/constants';

interface MoreProps {
    navigation?: NavigationProp
}

const More: FC<MoreProps> = ({ navigation }) => {

    const toInventory = () => {
        navigation.navigate('Product', {screen: 'Inventory'})
    }

    const toCreateProduct = () => {
        navigation.navigate('Product', {screen: 'CreateProduct'})
    }

    const toBin = () => {
        navigation.navigate('Product', {screen: 'Trash'})
    }

    const handleSignOut = async () => {
        // dispatch(clearData())
       await clearData().then(
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
        })
       )
        // ToastAndroid.showWithGravity(
        //     'Data Cleared',
        //     ToastAndroid.LONG,
        //     ToastAndroid.TOP
        // )
    }

    const handleClearCache = () => {
        // dispatch(clearData())
        clearCachedData()
        ToastAndroid.showWithGravity(
            'Cache Cleared',
            ToastAndroid.LONG,
            ToastAndroid.TOP
        )
    }

    const { 
        container, 
        wrapper, 
        header,
        cdTextStyle,
        cdbuttonStyle 
    } = styles;
    const { textPoppinsBold } = GStyles;

    return(
        <SafeAreaView style={container}>
            <StatusBar 
                translucent={true} 
                barStyle='light-content' 
                backgroundColor="rgba(0,0,0,0)" 
            />
             <LinearGradient 
                colors={['rgba(98, 47, 181, 1)', 'rgba(27, 15, 54, 1)']}
                style={{flex: 1}}
                start={{x: 0.5, y: 0}}>
                    <MyText style={[header, textPoppinsBold]}>
                        More
                    </MyText>
                    <View style={wrapper}>
                        <View>
                            <ListRow 
                                title='Inventory'
                                icon={<Icon name="list" size={fontSz(20)} color={colors.black} />}
                                subtitle={'View, edit & delete products in the inventory'}
                                onPress={() => toInventory()}
                            />
                            <ListRow 
                                title ='Create a Product'
                                subtitle={'Add a new product to the inventory'}
                                icon={<MedIcon  name='md-medkit-outline' size={fontSz(20)} color={colors.black} />}
                                onPress={() => toCreateProduct()}
                            />
                            <ListRow 
                                title ='Bin'
                                subtitle={'View deleted products'}
                                icon={
                                    <Icon 
                                        name='trash' 
                                        size={fontSz(20)} 
                                        color={colors.black} 
                                    />
                                }
                                onPress={() => toBin()}
                            />
                        </View>
                        <View>
                            <CustomButton
                                buttonText='Clear Cache'
                                buttonStyle={{
                                    marginBottom: hp(8)
                                }}
                                onPress={() => handleClearCache()} 
                            />
                             <CustomButton
                                buttonText='Sign Out'
                                buttonStyle={[cdbuttonStyle]}
                                textStyle={[cdTextStyle]}
                                onPress={() => handleSignOut()}
                            />
                        </View>
                    </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    paddingTop: hp(35),
    backgroundColor: 'rgba(98, 47, 181, 1)'
   },
   wrapper: {
        paddingHorizontal: wp(14),
        marginTop: hp(15),
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: fontSz(22),
        color: colors.white,
        paddingLeft: wp(14)
    },
    cdTextStyle: {
        color: colors.darkPurple
    },
    cdbuttonStyle: {
        backgroundColor: 'rgba(255, 81, 0, 0.1)',
        marginBottom: hp(120),
        borderWidth: 1,
        borderColor: 'rgba(255, 81, 0, 1)'
    }
});
export default More;