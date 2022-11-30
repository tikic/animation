import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';

import Animation_1 from '../screens/Animation_1';
import Animation_2 from '../screens/Animation_2';
import Animation_3 from '../screens/Animation_3';
import Animation_4 from '../screens/Animation_4';
import Animation_5 from '../screens/Animation_5';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName='Animation 5' screenOptions={{
        headerShown: false
      }}>
        <Drawer.Screen name='Animation 1' component={Animation_1} />
        <Drawer.Screen name='Animation 2' component={Animation_2} />
        <Drawer.Screen name='Animation 3' component={Animation_3} />
        <Drawer.Screen name='Animation 4' component={Animation_4} />
        <Drawer.Screen name='Animation 5' component={Animation_5} />
    </Drawer.Navigator>

);

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
)

const MainNavigation = () => {
  return (
    <DrawerNavigator />
  )
}

export default MainNavigation

const styles = StyleSheet.create({})