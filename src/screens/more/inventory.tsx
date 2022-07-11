import React, { useEffect, useCallback, useState, FC } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Pressable, FlatList } from 'react-native';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { MyText } from '../../utils/common/index';
import CustomToast from '../../components/general/CustomToast';
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles';
import EditRow from '../../components/general/EditRow';
import AlertModal from '../../components/general/AlertModal';
import ListEmpty from '../../components/general/ListEmpty';
import { cacheInventory } from '../../utils/helpers';
import { useProduct } from '../../context/providers/ProductContext';
import { hp, wp, fontSz, FADE_IN } from '../../utils/constants';

interface InventoryProps {
    navigation?: NavigationProp
}

const Inventory: FC<InventoryProps> = ({ navigation }) => {
    const { state, productDispatch } = useProduct();
    const products = state.inventory;
    const dispatch = productDispatch;
    const isFocused = useIsFocused();
    const [showModal,setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);

    useEffect(() => {
        getAvailableProducts()
    },[isFocused, showModal])

    const openModal = (item) => {
        setItemToDelete(item)
        setShowModal(showModal => !showModal)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getAvailableProducts = () => {
        const availableProd = products.filter(item => item.deleted !== true)
        setAvailableProducts(availableProd)
    }

    const deleteProduct = (data) => {
        setLoading(true)
        const {id, name, prices, deleted } = data
        const inventory = products
        const prodIndex = inventory.findIndex(item => item.id === id)
        
        const productObject = {
            id, 
            name, 
            prices, 
            deleted: true
        }
        inventory.splice(prodIndex, 1, productObject)
        dispatch({
            type: 'set_inventory',
            payload: inventory
        })
        cacheInventory(inventory);
        setTimeout(() => {
            closeModal();
            setLoading(false);
          setToasts([...toasts, 'Product deleted successfully'])
        }, 2500)
    }

    const renderItem = useCallback(({item, index}) => {
        const { name, id, prices, deleted } = item
        return(
            <React.Fragment>
                <Animatable.View
                    key={index + id}
                    animation={FADE_IN}
                    duration={700}
                    useNativeDriver={true}
                    delay={400 + index * 100}
                    style={[{width: '100%'}]}
                >
                    <EditRow
                        name={name}
                        prices={prices}
                        item={item}
                        deleteItem={() => openModal(item)}
                        disabled={deleted}
                    />
                </Animatable.View>
            </React.Fragment>
        )
    }, [isFocused, showModal])

    const { container, wrapper, header, backArrow, headerText, introText } = styles;
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
                        <MyText style={[headerText, textPoppinsBold]}>Inventory</MyText>
                    </View>
                    <FlatList
                        data={availableProducts}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flex: availableProducts.length === 0 ? 1 : 0,
                            justifyContent: availableProducts.length === 0 ? 
                            'center': 'flex-start',
                            alignItems: availableProducts.length === 0 ? 
                            'center': 'flex-start',
                            paddingBottom: hp(75),
                        }}
                        ListHeaderComponent={
                        availableProducts.length > 0 && 
                        <MyText style={[
                                textPoppinsBold, 
                                introText
                            ]}>
                                *Tap on a product to edit
                            </MyText>
                        }
                        ListEmptyComponent={<ListEmpty />}
                    />
            </LinearGradient>
            <AlertModal 
                item={itemToDelete} 
                visible={showModal} 
                close={() => closeModal()}
                deleteItem={(data: any) => deleteProduct(data)}
                title={'Delete'}
                loading={loading}
                textDeleteOrRestore={'Deleting...'} 
            />
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
    headerText: {
        color: colors.white,
        fontSize: fontSz(20),
        marginLeft: wp(10)
    },
    introText: {
        color: colors.white, 
        fontSize: fontSz(12), 
        marginBottom: hp(10)
    },
    toast: {
        position: 'absolute',
        top: hp(35),
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
export default Inventory;