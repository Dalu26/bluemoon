import React, { FC } from 'react';
import LottieView from 'lottie-react-native';
import { hp, wp } from '../../utils/constants';

const ListEmpty: FC<{}> = () => {
    return(
        <LottieView
            style={{
                height: hp(200), 
                width: wp(200),
                alignSelf: 'center',
            }}
            source={require("../../assets/lottie/home/empty.json")}
            autoPlay
            loop
        />
    )
}

export default ListEmpty;