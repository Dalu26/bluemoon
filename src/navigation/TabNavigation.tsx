import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationState } from '@react-navigation/native';
import { HomeStack, MoreStack } from './StackNavigation';

import TabBar from './TabBarComponent';

const Tab = createMaterialTopTabNavigator();

interface MyTabProps {
 navigation?: NavigationState
}

const MyTab: FC<MyTabProps> = ({ navigation }) => {
    return(
      <Tab.Navigator 
        screenOptions={{swipeEnabled: false, lazy: false, headerShown: false}} 
        tabBar={props => <TabBar { ...props } />} 
        tabBarPosition="bottom"
        >
          <Tab.Screen 
            name="Home" 
            component={ HomeStack } 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
          />
          <Tab.Screen 
            name="More" 
            component={ MoreStack } 
            options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} 
          />
      </Tab.Navigator>
    );
}  
export default MyTab;