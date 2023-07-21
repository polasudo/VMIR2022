import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card, Icon } from '@rneui/themed';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';

type Props = {
  item: Order;
};

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', { order: item })}
    >
      <Card
        containerStyle={{paddingHorizontal: 20, borderRadius: 12, borderWidth: 12, borderColor:"black"}}
      >
        <View style={{flexDirection: "row", justifyContent:"space-between", alignItems:"center"}}>
          <View>
            <Icon
              name='truck-delivery'
              color='#625B1F'
              type='material-community'
            />
            <Text>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text style={{fontSize: 8}}>
              {item.carrier} - {item.trackingId}
            </Text>
            <Text style={{fontSize: 15, lineHeight: 15}}>
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View style={{flexDirection: "row", alignItems:"center"}}>
            <Text style={{fontSize: 3, lineHeight: 4, color: "#625b1f" }}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon
              name='box'
              style={{marginLeft: 8}}
              color='#625B1F'
              type='feather'
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
