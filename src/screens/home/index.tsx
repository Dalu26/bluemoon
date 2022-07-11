import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { MyText } from '../../utils/common/index';
import colors from '../../utils/colors';
import GStyles from '../../assets/styles/GeneralStyles';
import { fontSz, wp, hp, FADE_IN } from '../../utils/constants';
import { useProduct } from '../../context/providers/ProductContext';
import Card from '../../components/general/Card';
import ListEmpty from '../../components/general/ListEmpty';

interface HomeProps {
    navigation?: NavigationProp,
}

const Home: FC<HomeProps> = ({ navigation }) => {
    const { state } = useProduct();
    const products = state.inventory;
    const isFocused = useIsFocused();
    const [availableProducts, setAvailableProducts] = useState([]);

    useEffect(() => {
        getAvailableProducts(products)
        return () => {}
    }, [isFocused])

    const getAvailableProducts = (products: []) => {
        const availableProd = products.filter(item => item.deleted !== true)
        setAvailableProducts(availableProd)
    }

    const toCreateProduct = () => {
        navigation.navigate('Product', {screen: 'CreateProduct'})
    }

    const renderItems = ({item, index}) => {
        const { id, name, price, totalStock, description } = item;
        return(
            <Animatable.View
                key={index}
                animation={FADE_IN}
                duration={700}
                useNativeDriver={true}
                delay={400 + index * 100}>
                <Card 
                    key={index}
                    name={name}
                    price={price}
                    id={id} 
                    description={description}
                    totalStock={totalStock}
                    item={item}
                />
            </Animatable.View>
        )
    }

    const { container, header, headerText, wrapper } = styles;
    const { textPoppinsBold, flexRow } = GStyles;

    return(
        <SafeAreaView style={wrapper}>
            <StatusBar 
                translucent={true} 
                barStyle={'light-content'}
                backgroundColor="rgba(98, 47, 181, 1)" 
            />
            <LinearGradient 
                colors={['rgba(98, 47, 181, 1)', 'rgba(27, 15, 54, 1)']}
                style={container}
                start={{x: 0.5, y: 0}}>
                <View style={[flexRow, header]}>
                    
                    <MyText style={[textPoppinsBold, headerText]}>
                        Inventory
                    </MyText>
                </View>
                <FlatList
                    data={availableProducts}
                    // numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItems}
                    contentContainerStyle={{
                        flex: availableProducts.length === 0 ? 1 : 0,
                        justifyContent: availableProducts.length === 0 ? 
                        'center': 'flex-start',
                        paddingBottom: hp(75),
                    }}
                    keyExtractor={item => item?.id}
                    ListEmptyComponent={<ListEmpty />}
                />
            </LinearGradient>
            <Animatable.View  
                animation={'swing'}
                easing="ease-in" 
                iterationCount="infinite" 
                direction='normal'
                iterationDelay={2500}
                style={styles.buttonWrp}
                useNativeDriver={true}>
                <TouchableOpacity 
                    activeOpacity={0.6}
                    onPress={() => toCreateProduct()}
                    style={styles.buttonStyle}>
                    <Icon name='plus' size={fontSz(32)}color={colors.darkPurple} />
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       paddingHorizontal: wp(14),
   },
   wrapper: {
        flex: 1,
        paddingTop: hp(35),
        backgroundColor: 'rgba(98, 47, 181, 1)'
    },
   header: {
        height: hp(50),
        borderBottomColor: '#e1d5f5',
        borderBottomWidth: 2,
        width: '100%',
        alignItems: 'center',
   },
   headerText: {
        fontSize: fontSz(22),
        color: colors.white,
        borderBottomColor: 'rgba(255, 81, 0, 0.4)',
        marginLeft: wp(8)
   },
   buttonWrp: {
       height: hp(60),
       width: wp(60),
       borderRadius: hp(60),
       justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute',
       bottom: hp(90),
       right: wp(20)
   },
   buttonStyle: {
    backgroundColor: colors.offwhite,
    height: hp(60),
    width: wp(60),
    borderRadius: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
   }
});
export default Home;