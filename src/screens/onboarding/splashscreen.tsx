import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { MyText, CustomButton } from '../../utils/common/index';
import { wp, hp, fontSz, FADE_IN } from '../../utils/constants';
import { getUser, getInventory } from '../../utils/helpers';
import { useUser } from '../../context/providers/UserContext';
import { useProduct } from '../../context/providers/ProductContext';
// import SvgIcon from '../../assets/svgs/splashscreen/bluemoon.svg';

interface SplashscreenProps {
    navigation?: NavigationProp
}

const SplashScreen: React.FC<SplashscreenProps> = ({ navigation }) => {
    const [auth, setAuth] = useState(false);
    const { dispatch } = useUser();
    const { productDispatch } = useProduct();

    useEffect(() => {
        checkUser()
    }, [])

    const toHome = () => {
        navigation.reset({
        index: 0,
        routes: [{name: 'Tabs'}],
        })
    }

    const toLogin = () => {
        navigation.navigate('Login')
    }

    const checkUser = async () => {
       const user = await getUser()
       const inventory = await getInventory()
       if(user){
            setAuth(true)
            dispatch({
                type: 'update_user',
                payload: user
            })
            setTimeout(() => {
                toHome()
            }, 2000)
       }
       if(inventory){
           productDispatch({
               type: 'set_inventory',
               payload: inventory
           })
       }
    }

    return(
        <SafeAreaView style={styles.wrapper}>
           <StatusBar 
                translucent={true} 
                barStyle='light-content' 
                backgroundColor="rgba(98, 47, 181, 1)" 
            />
            <LinearGradient 
                colors={['rgba(98, 47, 181, 1)', 'rgba(27, 15, 54, 1)']}
                style={styles.container}
                start={{x: 0.5, y: 0}}>
                <View style={styles.svgWrp}>
                    {/* <SvgIcon  /> */}
                </View>
                <View  
                    style={styles.btnWrp}>
                    <Animatable.View 
                        duration={800} 
                        delay={1000}
                        useNativeDriver={true} 
                        animation="slideInUp">
                            <MyText style={styles.header}>Bluemoon Solutions</MyText>
                            <MyText style={styles.description}>
                                Check and update your inventory with ease
                            </MyText>
                        </Animatable.View>
                    <Animatable.View 
                        duration={800} 
                        delay={1000}
                        useNativeDriver={true} 
                        animation={FADE_IN}>
                        <CustomButton 
                            onPress={() => {
                                auth ? () => {}
                                :
                                toLogin()
                            }}
                            buttonText={'Get started'}
                        />
                    </Animatable.View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(35),
        paddingHorizontal: wp(25),
        paddingBottom: hp(41),
    },
    wrapper: {
        flex: 1,
        paddingTop: hp(35),
        backgroundColor: 'rgba(98, 47, 181, 1)'
    },
    svgWrp: {
        flex: 1,
    },
    textWrp: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    header: {
        fontSize: fontSz(32),
        lineHeight: hp(48),
        fontWeight: '600',
        fontFamily: 'Poppins-Bold'
    },
    description: {
        fontSize: fontSz(16),
        marginTop: hp(9),
        marginBottom: hp(70)
    },
    btnWrp: {
        flex: 1.5,
        justifyContent: 'flex-end',
    }
})

export default SplashScreen