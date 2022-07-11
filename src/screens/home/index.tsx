import React, { useState, useEffect, FC } from 'react';
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    StatusBar, 
    FlatList, 
    TouchableOpacity, 
    TextInput, 
    UIManager, 
    Platform, 
    LayoutAnimation, 
    Pressable 
} from 'react-native';
import { useIsFocused, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
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
    const [showSearch, setShowSearch] = useState(false);
    const products = state.inventory;
    const isFocused = useIsFocused();
    const [options, setOptions] = useState(false);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [searchAvailableProds, setSearchAvailapleProds] = useState([]);

    useEffect(() => {
        getAvailableProducts(products);
        return () => {}
    }, [isFocused])

    const toggleOptions = () => {
        setOptions(options => !options);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
    }

    const handleCreate = () => {
        toggleOptions()
        setTimeout(() => {
            toCreateProduct()
        }, 200)
    }

    const toggleSearch = () => {
        setShowSearch(showSearch => !showSearch);
        if(!showSearch){
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true)
            }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        } else {
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true)
            }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
        }
    }

    const search = (text: string) => {    
        const newData = searchAvailableProds.filter(item => {      
            const itemData = `${item?.name?.toLowerCase()}`;
            
            const textData = text.toLowerCase();
            
            return itemData.indexOf(textData) > -1;    
        })
        setAvailableProducts(newData);
    }

    const getAvailableProducts = (products: []) => {
        const availableProd = products.filter(item => item.deleted !== true)
        setAvailableProducts(availableProd);
        setSearchAvailapleProds(availableProd);
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
                    <View style={[flexRow, showSearch ? styles.searchWrp : {}]}>
                        <Pressable
                            onPress={() => toggleSearch()}
                            hitSlop={hp(20)} 
                            style={showSearch ? styles.searchIcon : {}}>
                            <AntIcon
                                size={showSearch ? hp(16) : hp(24)}
                                name='search1'
                                color={showSearch ? colors.darkPurple : colors.offwhite}  
                            />
                        </Pressable>
                        {showSearch && 
                        <TextInput 
                            style={styles.searchInput} 
                            placeholder='Search'
                            placeholderTextColor={colors.darkPurple}
                            autoCapitalize='none'
                            autoFocus
                            returnKeyType='search'
                            onFocus={() => {}}
                            onBlur={() => toggleSearch()}
                            onChangeText={(value) => search(value)}
                        />}
                    </View>
                </View>
                <FlatList
                    data={availableProducts}
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
            <TouchableOpacity 
                activeOpacity={1}
                onPress={() => toggleOptions()}
                style={[styles.buttonWrp, {width: options? 130: 60}]}>
                    {options? 
                    <Pressable
                        onPress={() => {
                            toggleOptions();
                            setTimeout(() => {
                                navigation.navigate('More')
                            }, 200)
                        }}
                        style={styles.buttonStyle}>
                        <AntIcon name='logout' size={fontSz(32)}color={colors.darkPurple} />
                    </Pressable> : null}
                    <Pressable
                        onPress={() => 
                            options ?
                            handleCreate()
                            :
                            toggleOptions()}
                        style={styles.buttonStyle}>
                            <Icon name='plus' size={fontSz(32)}color={colors.darkPurple} />
                    </Pressable>
            </TouchableOpacity>
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
        justifyContent: 'space-between'
   },
   searchWrp: {
        borderColor: colors.darkPurple,
        borderWidth: 2,
        borderRadius: hp(8),
        backgroundColor: '#e1d5f5',
        height: hp(40),
        width: wp(160),
        alignItems: 'center',
        alignSelf: 'center'
    },
   searchIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(5)
    },
    searchInput: {
        height: '100%',
        paddingVertical: 0,
        width: '100%',
        fontSize: fontSz(14),
        color: colors.darkPurple,
        fontFamily: 'Poppins-Medium',
        paddingRight: wp(10),
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
       justifyContent: 'space-between',
       alignItems: 'center',
       position: 'absolute',
       bottom: hp(90),
       right: wp(20),
       flexDirection: 'row',
       backgroundColor: '#e1d5f5',
       padding: 0
   },
   buttonStyle: {
    backgroundColor: colors.offwhite,
    height: hp(60),
    width: wp(60),
    borderRadius: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
   },
   overlay: {
       position: 'absolute',
       top: 0,
       bottom: 0,
       left: 0,
       right: 0,
       backgroundColor: 'transparent',
   },
   optionsWrp: {
    height: hp(60),
    width: wp(140),
    borderRadius: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp(90),
    right: wp(20),
    backgroundColor: colors.offwhite,
   }
});
export default Home;