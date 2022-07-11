import React, { useEffect, useRef, FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../utils/colors';
import { MyText } from '../../utils/common';
import { hp, wp, fontSz } from '../../utils/constants';
import { shortenXterLength } from '../../utils/helpers';

interface CustomToastProp {
  toast?: string,
  onHide?: Function
}
  
const CustomToast: FC<CustomToastProp> = ({ toast, onHide }) => {
    const opacity = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(2500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide();
      });
    }, []);
  
    return (
      <Animated.View
        style={[{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        }, styles.container]}>
            <Icon name='checkcircleo' size={hp(20)} color={colors.darkPurple} />
            <MyText style={styles.text}>{shortenXterLength(toast, 50)}</MyText>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
      container: {
          height: hp(56),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: wp(24),
          backgroundColor: '#e1d5f5',
          borderRadius: hp(8),
          marginVertical: hp(4),
      },
      text: {
          fontSize: fontSz(12),
          lineHeight: fontSz(16),
          color: colors.darkPurple,
          marginLeft: wp(16)
      }
  })

  export default CustomToast;