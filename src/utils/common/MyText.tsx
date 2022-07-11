import React, { FC } from 'react';
import { Text, StyleSheetProperties, StyleSheet } from 'react-native';
import colors from '../colors';
import { fontSz } from '../constants';

interface TextProps {
    children?: React.ReactNode,
    style?: StyleSheetProperties,
    selectable?: boolean,
    onPress?: Function
}

export const MyText: FC<TextProps> = ({ 
    children, 
    style, 
    selectable,
}) => {
    const { textStyles } = styles;
    return( 
        <Text 
            selectable={selectable} 
            style={[textStyles, style]}>
          {children}
      </Text>
    );
}

const styles = StyleSheet.create({
    textStyles: {
      fontFamily: 'Poppins-Regular',
      fontSize: fontSz(15),
      color: colors.white,
    },
  });

export default MyText;