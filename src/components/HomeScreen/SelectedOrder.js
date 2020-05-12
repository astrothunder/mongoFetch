import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Button, Spinner} from 'native-base';
import CartItem from '../HomeScreen/CartItem';

const SelectedOrder = props => {
  const {order, onCompleteOrder, onRefundOrder, isConnected, loading} = props;
  return (
    <View style={styles.rootContainer}>
      <View style={styles.header}>
        <View style={styles.headerDetails}>
          <Text style={{fontSize: 22, fontWeight: '200'}}>
            {order.form.name} - {order.form.phoneNumber}
          </Text>
          <Text style={{fontSize: 30, fontWeight: '300'}}>
            Pickup at {order.form.pickUpTime}
          </Text>
        </View>
        <View style={styles.headerOptions} />
      </View>
      <View style={styles.main}>
        <ScrollView>
          {order.cart.map(obj => {
            return <CartItem item={obj} key={obj.id} />;
          })}
        </ScrollView>
        {/* <View style={styles.cartDetails} /> */}
      </View>
      <View style={styles.actions}>
        <View style={styles.totalHeaders}>
          {order.form.code && (
            <Text style={styles.codeText}>
              Discount ({order.form.code.toUpperCase()})
            </Text>
          )}
          <Text style={styles.subtotalText}>Subtotal</Text>
          <Text style={styles.taxText}>Tax</Text>
          <Text style={styles.paidText}>Paid</Text>
        </View>
        <View style={styles.totalValues}>
          {order.form.code && (
            <Text style={styles.codeText}>
              {order.form.code.toUpperCase() === 'OVER30'
                ? '-$5.00'
                : '-$15.00'}
            </Text>
          )}
          <Text style={styles.subtotalText}>${order.subtotal}</Text>
          <Text style={styles.taxText}>${order.tax}</Text>
          <Text style={styles.paidText}>${order.total}</Text>
        </View>
        <View />
        <View style={styles.totalActions}>
          {loading ? (
            <Spinner color="black" />
          ) : (
            <React.Fragment>
              <Button
                block
                dark
                disabled={!isConnected || order.status !== 'incomplete'}
                style={styles.orderButton}
                onPress={() => onCompleteOrder(order.id)}>
                <Text style={styles.buttonText}>COMPLETE ORDER</Text>
              </Button>
              <Button
                block
                style={
                  !isConnected || order.status === 'refunded'
                    ? styles.offlineButton
                    : styles.refundButton
                }
                disabled={!isConnected || order.status === 'refunded'}
                onPress={() => onRefundOrder(order.charge, order.id)}>
                <Text style={styles.buttonText}>REFUND ORDER</Text>
              </Button>
            </React.Fragment>
          )}
        </View>
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
    padding: 15,
    paddingLeft: 25,
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 10,
  },
  headerOptions: {
    flex: 12,
  },
  main: {
    flex: 5,
  },
  actions: {
    flex: 2,
    borderStyle: 'solid',
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  refundButton: {
    backgroundColor: '#7A0000',
  },
  totalHeaders: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 25,
  },
  totalValues: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 25,
  },
  totalActions: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 25,
  },
  subtotalText: {
    fontSize: 20,
    fontWeight: '300',
  },
  taxText: {
    fontSize: 20,
    fontWeight: '300',
  },
  paidText: {
    fontSize: 45,
    fontWeight: '300',
  },
  codeText: {
    fontSize: 18,
    fontWeight: '200',
    color: '#319A4F',
  },
  offlineButton: {
    color: 'grey',
  },
});
