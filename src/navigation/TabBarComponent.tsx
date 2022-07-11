import React from 'react';
import { View, StyleSheet, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, NavigationState, NavigatorScreenParams } from '@react-navigation/native';

import { MyText } from '../utils/common/index';
import colors from '../utils/colors';
import GStyles from '../assets/styles/GeneralStyles';
import { fontSz, hp, wp } from '../utils/constants';

import Home from '../assets/svgs/tabs/Home.svg';
import Home_ from '../assets/svgs/tabs/Home_.svg';

import More from '../assets/svgs/tabs/More.svg';
import More_ from '../assets/svgs/tabs/More_.svg';

interface MyTabBarprops {
  state?: NavigationState
  navigation?: NavigationProp
  descriptors?: NavigatorScreenParams
}

const MyTabBar: React.FC<MyTabBarprops> = ({ state, descriptors, navigation }) => {

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const imagesObj = {
    home: {
        inActive: <Home_ height={hp(19)} width={wp(19)} />,
        isActive: <Home height={hp(19)} width={wp(19)} />
    },
    more: {
        inActive: <More_ height={hp(19)} width={wp(19)} />,
        isActive: <More height={RFValue(19)} width={RFValue(19)} />
    }

  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
            if (Platform.OS === 'android') {
                UIManager.setLayoutAnimationEnabledExperimental &&
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
            <SingleTab 
                label={label} 
                images={imagesObj[label.toLowerCase()]} 
                isFocused={isFocused} 
                onPress={onPress} 
                key={`TABS_${index}`} 
            />
        );
      })}
    </View>
  );
}
const SingleTab = (props: any) => {
    const { textPoppinsBold } = GStyles
    const { images, label, isFocused, onPress, onLongPress } = props
    const { labelTextStyle, singleTabContainer, singleTabContainerOne } = styles;
    return (
        <Pressable 
            onPress={onPress} 
            style={isFocused ? singleTabContainer : [singleTabContainerOne, 
            {justifyContent: label.toLowerCase() === 'more' ? 'flex-end': 'flex-start'}]} 
            onLongPress={onLongPress}
        >
            {isFocused ? images.isActive : images.inActive}
                <MyText 
                    style={[labelTextStyle, textPoppinsBold, 
                    {fontSize: fontSz(15), 
                    marginLeft: isFocused ? wp(10) : 0, 
                    color: colors.darkBlue}]}
                    >
                        {isFocused ? label: ''}
                </MyText>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: '#F5F5F5',
        height: hp(70),
        borderRadius: hp(60),
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'absolute',
        bottom: hp(10),
        paddingHorizontal: wp(20),
        opacity: 0.9
    },
    singleTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(46),
        backgroundColor: colors.white,
        borderRadius: hp(40),
        width: '67%',
        paddingHorizontal: wp(11),

    },
    singleTabContainerOne: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(46),
        borderRadius: hp(40),
        width: '33%',
    },
    labelTextStyle: {
    },
});
export default MyTabBar
