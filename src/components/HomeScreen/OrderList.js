import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import OrderItem from './OrderItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderList = props => {
  const {orders, selectedId, onSelectOrder} = props;

  if (orders.length === 0) {
    return (
      <View style={styles.nullOrdersContainer}>
        <MaterialCommunityIcons name="emoticon-sad" size={65} color="white" />
        <Text style={styles.nullText}>No orders yet..</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {orders.map(order => {
        return (
          <TouchableOpacity key={order.id} onPress={() => onSelectOrder(order)}>
            <OrderItem order={order} selectedId={selectedId} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  nullOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nullText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 30,
  },
});

export default OrderList;
