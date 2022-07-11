import React, { useState, FC } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { MyText, CustomInput, CustomButton } from '../../utils/common/index';
import CustomToast from '../../components/general/CustomToast';
import { cacheInventory, titleCase , formatPrice } from '../../utils/helpers';
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles';
import { hp, wp, fontSz } from '../../utils/constants';
import { useProduct } from '../../context/providers/ProductContext';

interface EditProps {
    navigation?: NavigationProp,
    route?: NavigationProp
}

const Edit: FC<EditProps> = ({ navigation, route }) => {
    const item = route.params;
    const ID = item.id;
    const { state, productDispatch } = useProduct();
    const products = state.inventory;
    const dispatch = productDispatch;
    const [toasts, setToasts] = useState([]);
    const [name, setName] = useState(item?.name);
    const [price, setPrice] = useState(item.price.toString());
    const [totalStock, setTotalStock] = useState(item?.totalStock.toString());
    const [description, setDescription] = useState(item?.description);
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [stockError, setStockError] = useState('');
    const [descError, setDescError] = useState('');
    const [loading, setLoading] = useState(false)

    const disabled = () => {
        if(name === '' || price === '' || totalStock === '' || description === ''){
            return true
        }
        if(nameError !== '' || priceError !== '' || stockError !== '' || descError !== ''){
            return true
        }
        return false
    }

    const validateDescription = (value: string) => {
        function trim (s: string) {   
            return s.replace(/^\s*|\s*$/g,"")   
        } 
        var regex = /\s+/gi;
        var wordCount = value?.trim()?.replace(regex, ' ').split(' ').length;

        return wordCount
    }

    const handleDescription = (value: string) => {
        setDescription(value)
        const wordCount = validateDescription(value)
        if(wordCount < 3){
            setDescError('Description must have at least three words')
        }else {
            setDescError('')   
        }
    }

    const save = () => {
        setLoading(true)
        const inventory = products
        const prodIndex = inventory.findIndex(item => item.id === ID)

        const productObject = {
            id: ID, 
            name: titleCase(name), 
            price: Number(price),
            totalStock: Number(totalStock),
            description: description,
            deleted: item.deleted
        }
        inventory.splice(prodIndex, 1, productObject)
        dispatch({
            type: 'set_inventory',
            payload: inventory
        })
        cacheInventory(inventory)
        setTimeout(() => {
            setLoading(false)
           setToasts([...toasts, 'Product edited successfully'])
        }, 2500)
    }

    const { 
        container, 
        wrapper, 
        header, 
        buttonStyle,  
        backArrow, 
        headerText, 
        introText, 
        inputStyle 
    } = styles;
    const { flexRow, textPoppinsBold, centerContentStyle } = GStyles;

    return(
        <SafeAreaView style={container}>
             <StatusBar 
                translucent={true} 
                barStyle={'light-content'}
                backgroundColor="rgba(98, 47, 181, 1)" 
            />
             <LinearGradient 
                colors={['rgba(98, 47, 181, 1)', 'rgba(27, 15, 54, 1)']}
                style={wrapper}
                start={{x: 0.5, y: 0}}>
                <View style={[header, flexRow]}>
                    <Pressable 
                        onPress={() => navigation.goBack()} 
                        style={[backArrow, centerContentStyle]}>
                            <Icon name="chevron-left" size={fontSz(20)} color='#000' />
                    </Pressable>
                    <MyText style={[headerText, textPoppinsBold]}>
                        {item?.name}
                    </MyText>
                </View>
                <ScrollView 
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}>
                    <MyText style={[textPoppinsBold, introText]}>
                        Edit & Save an item.
                    </MyText>
                    <CustomInput 
                        placeholder={item?.name ? item.name : 'Name'}
                        value={name}
                        onChangeText={
                            (value: string) => {
                                setName(value)
                            }}
                        textInputStyle={inputStyle}
                        autoFocus 
                        maxLength={50}
                        error={nameError !== ''}
                        errorMsg={nameError} 
                    />
                    <CustomInput 
                        placeholder={
                            formatPrice("en-US", 'USD', item.price.toString())
                        }
                        value={price}
                        onChangeText={(value: string) => {
                            setPrice(value)
                        }}
                        textInputStyle={inputStyle}
                        keyboard='numeric' 
                        maxLength={8} 
                        error={priceError !== ''}
                        errorMsg={priceError}
                    />
                    <CustomInput 
                        placeholder={item?.totalStock ? item?.totalStock.toString() : 'Total Stock'}
                        value={totalStock}
                        onChangeText={(value: string) => setTotalStock(value)}
                        textInputStyle={inputStyle}
                        keyboard='numeric' 
                        maxLength={8} 
                        error={stockError !== ''}
                        errorMsg={stockError}
                    />
                    <CustomInput 
                        placeholder={item?.description ? item.description : 'Description'}
                        value={description}
                        multiline={true}
                        onChangeText={(value: string) => handleDescription(value)}
                        textAlignVertical='top'
                        textInputStyle={[inputStyle, {height: hp(120)}]}
                        error={descError !== ''}
                        errorMsg={descError} 
                    />
                    <CustomButton 
                        buttonText='Save'
                        buttonStyle={buttonStyle}
                        disabled={disabled()}
                        onPress={() => save()}
                        loading={loading}
                    />
                </ScrollView>
                <View style={styles.toast}>
                {toasts.map((toast, index) => (
                    <CustomToast
                        key={index.toString()}
                        toast={toast}
                        onHide={() => {
                            setToasts((toasts) =>
                            toasts.filter(
                                (currentToast) =>
                                currentToast !== toast
                            ))
                        }}
                    />
                ))}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(98, 47, 181, 1)',
        flex: 1
   },
   wrapper: {
        paddingHorizontal: wp(14),
        marginTop: hp(15),
        paddingTop: hp(34),
        flex: 1,
    },
    header: {
        width: '100%',
        height: hp(50),
        alignItems: 'center',
    },
    backArrow: {
        height: hp(35),
        width: wp(35),
        borderRadius: hp(6),
        backgroundColor: '#e1d5f5',
    },
    headerText: {
        color: colors.white,
        fontSize: fontSz(20),
        marginLeft: wp(10)
    },
    introText: {
        color: colors.white, 
        fontSize: fontSz(25), 
        marginVertical: hp(20)
    },
    buttonStyle: {
        marginTop: hp(40),
    },
    inputStyle: {
        marginVertical: hp(5)
    },
    toast: {
        position: 'absolute',
        top: hp(35),
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
export default Edit;