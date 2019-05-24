import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//import { createBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements'

import HomeScreen from '../screens/HomeScreen';
import MapsScreen from '../screens/MapsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import VetementScreen from '../screens/VetementScreen';


export default createBottomTabNavigator({
  Home:{
    screen: HomeScreen,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          color={tintColor}
          type='ionicon'
          name={
            Platform.OS === 'ios'
              ? 'ios-home' : 'md-home'}
        />
      ),
    }
  },
  Maps:{
    screen: MapsScreen,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Maps',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          color={tintColor}
          type='ionicon'
          name={
            Platform.OS === 'ios'
              ? 'ios-map' : 'md-map'}
        />
      ),
    }
  },
  Settings:{
    screen: SettingsScreen,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Profil',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          color={tintColor}
          type='ionicon'
          name={
            Platform.OS === 'ios'
              ? 'ios-options' : 'md-options'}
        />
      ),
    }
  },
  Vetement:{
    screen: VetementScreen,
    navigationOptions: {
      headerMode: 'none',
      tabBarLabel: 'Vêtement',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          color={tintColor}
          type='ionicon'
          name={
            Platform.OS === 'ios'
              ? 'ios-shirt' : 'md-shirt'}
        />
      ),
    }
  }
},
{
  tabBarOptions: {
    activeTintColor: '#2F6389',
    inactiveTintColor: '#658D92',
    style: {
      backgroundColor: '#FFED46',
      borderTopWidth: 0,
      shadowOffset: {width:5,height:3},
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5
    },
  },
});
