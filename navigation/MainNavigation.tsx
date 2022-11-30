import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import animation_1 from '../screens/animation_1';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import animation_2 from '../screens/animation_2';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName='Animation 2'>
        <Drawer.Screen name='Animation 1' component={animation_1} />
        <Drawer.Screen name='Animation 2' component={animation_2} />
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