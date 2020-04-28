import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const orderItem = props => {
  const {order} = props;

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.idText}>{order.id}</Text>
      <Text style={styles.subText}>
        {order.cart.length} items for {order.form.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 25,
    height: 100,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  idText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: 'white',
  },
});

export default orderItem;
