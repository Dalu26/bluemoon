import { Dimensions, StatusBar, Platform, PixelRatio } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

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


const widthPercentageToDP = widthPercent => {
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

const heightPercentageToDP = (heightPercent) => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

export const hp = val => {
  // get scaled height equivalent of design height
  const num = val / 8.44;
  return heightPercentageToDP(num);
};

export const wp = val => {
  // get scaled width equivalent of design width
  const num = val / 3.88;
  return widthPercentageToDP(num);
};

export const fontSz = val => RFPercentage(val / 7.6);

export const listenOrientationChange = that => {
    Dimensions.addEventListener('change', newDimensions => {
      // Retrieve and save new dimensions
      SCREEN_WIDTH = newDimensions.window.width;
      SCREEN_HEIGHT = newDimensions.window.height;
  
      // Trigger screen's rerender with a state update of the orientation variable
      that.setState({
        orientation: SCREEN_WIDTH < SCREEN_HEIGHT ? 'portrait' : 'landscape'
      });
    });
  };
  
  /**
   * Wrapper function that removes orientation change listener and should be invoked in
   * componentWillUnmount lifecycle method of every class component (UI screen) that
   * listenOrientationChange function has been invoked. This should be done in order to
   * avoid adding new listeners every time the same component is re-mounted.
   */
  export const removeOrientationListener = () => {
    Dimensions.remove('change', () => {});
  };
