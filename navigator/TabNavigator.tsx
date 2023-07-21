import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomersScreen from '../screens/CustomerScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import NotesScreen from '../screens/NotesScreen';
import GoogleSignInScreen from '../screens/GoogleSignInScreen';

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
  Note: undefined
  Google: undefined
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#59c1cc',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Customers') {
            return (
              <Icon
                name='users'
                type='entypo'
                color={focused ? '#59C1CC' : 'gray'}
              />
            );
          } else if (route.name === 'Orders') {
            return (
              <Icon
                name='box'
                type='entypo'
                color={focused ? '#EB6a7c' : 'gray'}
              />
            );
          } else if (route.name === 'Note') {
            return (
              <Icon
                name='edit'
                type='entypo'
                color={focused ? '#EB6a7c' : 'gray'}
              />
            );
          } else if (route.name === 'Google') {
            return (
              <Icon
                name='google'
                type='antdesign'
                color={focused ? '#EB6a7c' : 'gray'}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name='Customers' component={CustomersScreen} />
      <Tab.Screen name='Orders' component={OrdersScreen} />
      <Tab.Screen name='Note' component={NotesScreen} />
      <Tab.Screen name='Google' component={GoogleSignInScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;
