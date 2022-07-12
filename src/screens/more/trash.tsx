import React, { useEffect, useCallback, useState, FC, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Pressable, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { MyText } from '../../utils/common/index';
import CustomToast from '../../components/general/CustomToast';
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles';
import EditRow from '../../components/general/EditRow';
import ListEmpty from '../../components/general/ListEmpty';
import AlertModal from '../../components/general/AlertModal';
import { cacheInventory } from '../../utils/helpers';
import { hp, wp, fontSz, FADE_IN } from '../../utils/constants';
import { ProductStateContext } from '../../context/providers/ProductContext';

interface TrashProps {
    navigation?: NavigationProp
}

const Trash: FC<TrashProps> = ({ navigation }) => {
    const context = useContext(ProductStateContext);
    const products = context?.state?.inventory;
    const dispatch = context?.productDispatch;
    const [deletedProducts, setDeletedProducts] = useState([]);
    const [itemToRestore, setItemToRestore] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [showModal,setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDeletedProducts()
    }, [showModal])

    const openModal = (item) => {
        setItemToRestore(item)
        setShowModal(showModal => !showModal)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getDeletedProducts = async () => {
       const binProducts = await products?.filter(item => item?.deleted === true)
       setDeletedProducts(binProducts)
    }

    const restoreProduct = (data) => {
        setLoading(true)
        const {id, name, price, deleted, totalStock, description } = data
        const inventory = products
        const prodIndex = inventory.findIndex(item => item?.id === id)
        
        const productObject = {
            id, 
            name, 
            price, 
            totalStock,
            description,
            deleted: !deleted
        }
        inventory.splice(prodIndex, 1, productObject)
        dispatch({
            type: 'set_inventory',
            payload: inventory
        })
        cacheInventory(inventory)
        setTimeout(() => {
            closeModal()
            setLoading(false)
            setToasts([...toasts, 'Product restored successfully'])
        }, 2500)
    }
    
    const renderItem = useCallback(({item, index}) => {
        const { name, id, price, deleted } = item
        return(
            <React.Fragment>
                <Animatable.View
                    key={index + id}
                    animation={FADE_IN}
                    duration={700}
                    useNativeDriver={true}
                    delay={400 + index * 100}
                    style={[{width: '100%'}]}>
                    <EditRow
                        name={name}
                        price={price}
                        item={item}
                        disabled={deleted}
                        restore={() => openModal(item)}
                    />
                </Animatable.View>
            </React.Fragment>
        )
    }, [])

    const { container, wrapper, header, backArrow, headerText } = styles;
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
                            <Icon 
                                name="chevron-left" 
                                size={fontSz(20)} 
                                color='#000' 
                            />
                    </Pressable>
                    <MyText style={[headerText, textPoppinsBold]}>Bin</MyText>
                </View>
                <FlatList
                    data={deletedProducts}
                    keyExtractor={item => item?.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flex: deletedProducts.length === 0 ? 1 : 0,
                        justifyContent: deletedProducts.length === 0 ? 
                        'center': 'flex-start',
                        alignItems: deletedProducts.length === 0 ? 
                        'center': 'flex-start',
                        paddingBottom: hp(75),
                    }}
                    ListEmptyComponent={<ListEmpty />}
                />
            </LinearGradient>
            <AlertModal 
                item={itemToRestore} 
                visible={showModal} 
                close={() => closeModal()}
                deleteItem={(data: any) => restoreProduct(data)}
                title={'Restore'}
                loading={loading}
                textDeleteOrRestore={'Restoring...'} 
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
        paddingTop: hp(35),
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
    toast: {
        position: 'absolute',
        top: hp(35),
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
export default Trash;