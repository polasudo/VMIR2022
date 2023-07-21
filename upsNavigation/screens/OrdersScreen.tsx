import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import useOrders from '../hooks/useOrders';
import { Button, Image } from '@rneui/themed';
import OrderCard from '../components/OrderCard';

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6a7c" : color}}>
          Orders
        </Text>
      ),
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#efe2df" }}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-psd/online-delivery-with-computer-mockup-template-with-delivery-package_1150-38882.jpg?w=1060&t=st=1664236089~exp=1664236689~hmac=6241854945602e54091d98371dea159e354fc62c138eea683ddf101480103e78',
        }}
        containerStyle={{width:"100%", height: 200}}
        PlaceholderContent={<ActivityIndicator />}
      />

      <View>
        <Button
          color= "#625B1F"
          titleStyle={{ color: "white"}}
          style={{paddingHorizontal: 5, paddingVertical: 2}}
          onPress={() => setAscending((prev) => !prev)}
        >
          {ascending ? 'Oldest' : 'Recent'}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
