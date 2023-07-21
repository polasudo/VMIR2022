import { ScrollView, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { TabStackParamList } from '../navigator/TabNavigator';
import { Image, Input } from '@rneui/themed';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMERS } from '../graphql/queries';
import CustomerCard from '../components/CustomerCard';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomersScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>('');
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  // useEffect(() => {
  //   console.log('CUSTOMER DATA', data);
  // }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView
      style={{ backgroundColor: '#EAFBFF' }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/delivery-service-with-masks-concept_23-2148498421.jpg?w=1380&t=st=1664029659~exp=1664030259~hmac=ca40c89e88457522d40404fd6fbf2e944f2d0097f6afd31ea0e33e594a30cb5e',
        }}
        containerStyle={{ width: "100%", height: 200 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder='Search by Customer'
        value={input}
        onChangeText={setInput}
        containerStyle={{ backgroundColor: "white", paddingTop: 15, paddingHorizontal: 35, marginHorizontal: 12, paddingBottom: 0, width: "90%", borderRadius: 10, alignSelf: "center" }}
      />

      {data && data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomersScreen;
