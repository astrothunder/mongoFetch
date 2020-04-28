import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Button} from 'native-base';
import CartItem from '../HomeScreen/CartItem';

const SelectedOrder = props => {
  const {order} = props;

  console.log(order);
  return (
    <View style={styles.rootContainer}>
      <View style={styles.header}>
        <View style={styles.headerDetails}>
          <Text style={{fontSize: 18}}>Order {order.id}</Text>
          <Text style={{fontSize: 24}}>Pickup at {order.form.pickUpTime}</Text>
        </View>
        <View style={styles.headerOptions} />
      </View>
      <View style={styles.main}>
        <View style={styles.cart}>
          {order.cart.map(obj => {
            return <CartItem item={obj} key={obj.id} />;
          })}
        </View>
        {/* <View style={styles.cartDetails} /> */}
      </View>
      <View style={styles.actions}>
        <Button block dark style={styles.button}>
          <Text style={styles.buttonText}>Order complete</Text>
        </Button>
      </View>
    </View>
  );
};

export default SelectedOrder;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    borderStyle: 'solid',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },
  headerDetails: {
    padding: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 10,
  },
  headerOptions: {
    flex: 3,
  },
  main: {
    flex: 5,
  },
  actions: {
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50,
  },
});
