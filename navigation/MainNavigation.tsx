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
import Animation_6 from '../screens/Animation_6';
import Animation_7 from '../screens/Animation_7';
import Animation_8 from '../screens/Animation_8';
import Animation_9 from '../screens/Animation_9';
import Animation_10 from '../screens/Animation_10';
import Animation_11 from '../screens/Animation_11';
import Animation_12 from '../screens/Animation_12';
import Animation_13 from '../screens/Animation_13';
import Animation_14 from '../screens/Animation_14';
import Animation_15 from '../screens/Animation_15';
import Animation_16 from '../screens/Animation_16';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator initialRouteName='Animation 16' screenOptions={{
        headerShown: false
      }}>
        <Drawer.Screen name='Animation 1' component={Animation_1} />
        <Drawer.Screen name='Animation 2' component={Animation_2} />
        <Drawer.Screen name='Animation 3' component={Animation_3} />
        <Drawer.Screen name='Animation 4' component={Animation_4} />
        <Drawer.Screen name='Animation 5' component={Animation_5} />
        <Drawer.Screen name='Animation 6' component={Animation_6} />
        <Drawer.Screen name='Animation 7' component={Animation_7} />
        <Drawer.Screen name='Animation 8' component={Animation_8} />
        <Drawer.Screen name='Animation 9' component={Animation_9} />
        <Drawer.Screen name='Animation 10' component={Animation_10} />
        <Drawer.Screen name='Animation 11' component={Animation_11} />
        <Drawer.Screen name='Animation 12' component={Animation_12} />
        <Drawer.Screen name='Animation 13' component={Animation_13} />
        <Drawer.Screen name='Animation 14' component={Animation_14} />
        <Drawer.Screen name='Animation 15' component={Animation_15} />
        <Drawer.Screen name='Animation 16' component={Animation_16} />
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