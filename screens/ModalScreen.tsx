import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { TabStackParamList } from '../navigator/TabNavigator';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import useCustomerOrders from '../hooks/useCustomerOrders';
import DeliveryCard from '../components/DeliveryCard';

export type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'Modal'>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'Modal'>;
const ModalScreen = () => {
  const navigation = useNavigation();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        style={{ position: "absolute", right: 15, top: 15, zIndex: 10 }}
      >
        <Icon name='closecircle' type='antdesign' />
      </TouchableOpacity>

      <View style={{ marginTop: 8 }}>
        <View style={{ paddingVertical: 20, borderBottomWidth: 8 ,borderColor: "#59C1cc" }}>
          <Text style={{textAlign:"center", fontSize: 12, lineHeight:15, fontWeight:"bold"}}>{name}</Text>
          <Text style={{textAlign:"center", fontStyle: "italic", fontSize: 6, lineHeight:10,}}>Deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{paddingBottom:20}}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;
