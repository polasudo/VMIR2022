import { View, Text } from 'react-native';
import React from 'react';
import { Card, Icon, Divider } from '@rneui/themed';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={[{ borderRadius: 10, margin: 6 },
      {
        backgroundColor: fullWidth ? '#625B1F' : '#59c1cc',
        padding: 0,
        paddingTop: 16,
      },
      ]}
    >
      <View style={fullWidth && { height: '100%' }}>
        <Icon name='box' type='entypo' size={50} color='white' />

        <View style={{ alignItems: "center", padding: 20, marginTop: -12 }}>
          <View style={{ marginHorizontal: "auto" }}>
            <Text
              style={{ textAlign: "center", textTransform: "uppercase", color: "white", fontWeight: "bold", fontSize: 8, lineHeight: 8 }}
            >
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 10, lineHeight: 10, marginTop:6 }}>
              Expected Delivery {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color='white' />
          </View>

          <View style={{ marginHorizontal: "auto", paddingBottom: 20, }}>
            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", marginTop: 10, fontSize: 10, lineHeight: 12 }}>
              Address
            </Text>

            <Text style={{ fontSize: 10, lineHeight: 10, textAlign: "center", fontStyle: "italic", color: "white" }}>
              {order.Address}, {order.City}
            </Text>

            <Text style={{ fontSize: 10, lineHeight: 10, textAlign: "center", fontStyle: "italic", color: "white" }}>
              Shipping Cost: {order.shippingCost} €
            </Text>
          </View>
        </View>

        <Divider color='white' />

        <View style={{ padding: 20 }}>
          {order.trackingItems.items.map((item, index) => (
            <View
              key={item.item_id}
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
            >
              <Text style={{ fontSize: 10, lineHeight: 10, fontStyle: "italic", color: "white" }}>{item.name}</Text>
              <Text style={{ color: "white", fontSize: 10, lineHeight: 10, }}>x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{ width: "100%", flexGrow: 1, minHeight:300}}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{ latitude: order.Lat, longitude: order.Lng }}
              title='Delivery Location'
              description={order.Address}
              identifier='destination'
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
