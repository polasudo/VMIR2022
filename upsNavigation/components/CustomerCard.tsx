import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { Card, Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ userId, name, email }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Modal', { userId, name })}
    >
      <Card
        containerStyle={{ padding: 20, borderColor: "black", borderWidth: 10, borderRadius: 16 }}
      >
        <View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", lineHeight: 20 }}>{name}</Text>
              <Text style={[{ fontSize: 10, lineHeight: 10 }, { color: "#59c1cc" }]}>
                ID: {userId}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
              <Text style={{ color: '#59c1cc' }}>
                {loading ? 'loading...' : `${orders.length} x `}
              </Text>
              <Icon
                style={{ marginBottom: 20, marginLeft: "auto" }}
                name='box'
                type='entypo'
                color='#59C1cc'
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
