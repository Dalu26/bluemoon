import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import SplashScreen from '../screens/onboarding/splashscreen';
import Login from '../screens/onboarding/login';
import Tabs from './TabNavigation';
import { OtherStack } from './StackNavigation';
import { navigationRef } from './RootNavigation';

enableScreens()

const RootStack = createStackNavigator()

function AppNavigator() {
    return (
        <RootStack.Navigator 
            intialRouteName={"Splash"}
            screenOptions={{headerShown: false}} 
            options={{gestureEnabled: true}}>
                <RootStack.Screen 
                    name="Splash" 
                    component={SplashScreen} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
                <RootStack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
                <RootStack.Screen 
                    name="Tabs" 
                    component={Tabs} 
                    options={{ 
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }} 
                />
                <RootStack.Screen 
                    name="Product" 
                    component={OtherStack} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
        </RootStack.Navigator>
    )
}

export default function App() {
    return (
      <NavigationContainer ref={navigationRef} theme={DarkTheme}>
        <AppNavigator />
      </NavigationContainer>
    );
}