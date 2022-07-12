import { Dimensions, PixelRatio } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;


export const FADE_IN = {
    from: {
        opacity: 0,
        scale: 1
    },
    to: {
        opacity: 1,
        scale: 1
    }
}


const widthPercentageToDP = (widthPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

const heightPercentageToDP = (heightPercent: number | string) => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

export const hp = (val: number) => {
  // get scaled height equivalent of design height
  const num = val / 8.44;
  return heightPercentageToDP(num);
};

export const wp = (val: number) => {
  // get scaled width equivalent of design width
  const num = val / 3.88;
  return widthPercentageToDP(num);
};

export const fontSz = (val: number) => RFPercentage(val / 7.6);

