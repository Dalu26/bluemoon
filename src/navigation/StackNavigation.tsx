import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/index';
// import Details from '../screens/home/details';

import More from '../screens/more';
import CreateProduct from '../screens/more/createProduct';
import Inventory from '../screens/more/inventory';
import Edit from '../screens/more/edit';
import Trash from '../screens/more/trash';


const Stack = createStackNavigator();

export function HomeStack(){
    return(
        <Stack.Navigator 
            initialRouteName="Home" 
            options={{ gestureEnabled: true }}>
            <Stack.Screen 
                name="Homescreen" 
                component={Home} 
                options={{ headerShown: false, 
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} 
            />
            {/* <Stack.Screen 
                name="details" 
                component={Details} 
                options={() => ({ headerShown: false,
                    gestureEnabled: false, 
                    transitionSpec: transitionSpec, 
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                })}
            /> */}
        </Stack.Navigator>
    );
}


export function MoreStack(){
    return(
        <Stack.Navigator 
            initialRouteName="More"
            screenOptions={{headerShown: false}} 
            options={{gestureEnabled: true}}>
            <Stack.Screen 
                name="Morescreen" 
                component={More} 
            />
        </Stack.Navigator>
    );
}

export function OtherStack () {
    return(
        <Stack.Navigator 
            initialRouteName="CreateProduct"
            screenOptions={{headerShown: false, gestureEnabled: true}}>
                <Stack.Screen 
                    name="CreateProduct" 
                    component={CreateProduct} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
                <Stack.Screen 
                    name="Inventory" 
                    component={Inventory} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
                 <Stack.Screen 
                    name="Trash" 
                    component={Trash} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
                <Stack.Screen 
                    name="Edit" 
                    component={Edit} 
                    options={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} 
                />
        </Stack.Navigator>
    )
}