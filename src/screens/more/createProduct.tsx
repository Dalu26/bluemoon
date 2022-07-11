import React, { useState, FC } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Pressable, ScrollView, Keyboard, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { MyText, CustomInput, CustomButton } from '../../utils/common/index';
import CustomToast from '../../components/general/CustomToast';
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles';
import { cacheInventory, titleCase } from '../../utils/helpers';
import { hp, wp, fontSz } from '../../utils/constants';

interface CreateProductProps {
    navigation?: NavigationProp
}

const CreateProduct: FC<CreateProductProps> = ({ navigation }) => {
    // const products = useSelector(state => state.products.products)
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [stockError, setStockError] = useState('');
    const [descError, setDescError] = useState('');
    const [toasts, setToasts] = useState([]);
    const [loading, setLoading] = useState(false);

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
      

    const create = () => {
        Keyboard.dismiss()
        setLoading(true)
        // const inventory = 'products'
        // const date = new Date()
        // const priceId = 1
        // const productObject = {
        //     id: `BLM_${inventory.length + 1}`, 
        //     name: titleCase(name), 
        //     prices: [{id: priceId, price: Number(price), date: date.toISOString()}], 
        //     totalStock: Number(totalStock),
        //     description: description,
        //     deleted: false
        // }
        // const newProduct = [...inventory, productObject]
        // dispatch(updateInventory(newProduct))
        // cacheInventory(newProduct)
        setTimeout(() => {
            setLoading(false)
            setToasts([...toasts, 'Product created successfully'])
            // setName('')
            // setPrice('')
            // setTotalStock('')
            // setDescription('')
        }, 2500)
    };

    const { 
        container, 
        wrapper, 
        header, 
        buttonStyle, 
        inputStyle, 
        introText, 
        backArrow
    } = styles;
    const { textPoppinsBold, centerContentStyle, flexRow } = GStyles;

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
                        <Icon name="chevron-left" size={20} color='#000' />
                    </Pressable>
                </View>
                <ScrollView 
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}>
                    <MyText style={[textPoppinsBold, introText]}>
                        Add a new product to the inventory
                    </MyText>
                    <CustomInput 
                        placeholder='Name'
                        value={name}
                        onChangeText={(value: string) => setName(value)}
                        textInputStyle={inputStyle}
                        autoFocus
                        maxLength={50} 
                        error={nameError !== ''}
                        errorMsg={nameError}
                    />
                    <CustomInput 
                        placeholder='Price'
                        value={price}
                        onChangeText={(value: string) => setPrice(value)}
                        textInputStyle={inputStyle}
                        keyboard='numeric' 
                        maxLength={8} 
                        error={priceError !== ''}
                        errorMsg={priceError}
                    />
                    <CustomInput 
                        placeholder='Total Stock'
                        value={totalStock}
                        onChangeText={(value: string) => setTotalStock(value)}
                        textInputStyle={inputStyle}
                        keyboard='numeric' 
                        maxLength={8} 
                        error={stockError !== ''}
                        errorMsg={stockError}
                    />
                    <CustomInput 
                        placeholder='Description'
                        value={description}
                        multiline={true}
                        onChangeText={(value: string) => handleDescription(value)}
                        textAlignVertical='top'
                        textInputStyle={[inputStyle, {height: hp(120)}]}
                        error={descError !== ''}
                        errorMsg={descError} 
                    />
                    <CustomButton 
                        buttonText='Add'
                        buttonStyle={buttonStyle}
                        disabled={disabled()}
                        onPress={() => create()}
                        loading={loading}
                    />
                </ScrollView>
            </LinearGradient>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
        backgroundColor: 'rgba(98, 47, 181, 1)',
        paddingTop: hp(34),
        flex: 1
   },
   wrapper: {
        paddingHorizontal: wp(14),
        marginTop: hp(15),
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
    buttonStyle: {
        marginTop: hp(40),
    },
    inputStyle: {
        marginVertical: hp(5)
    },
    introText: {
        color: colors.white, 
        fontSize: fontSz(25), 
        marginVertical: hp(20)
    },
    toast: {
        position: 'absolute',
        top: hp(35),
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
export default CreateProduct;