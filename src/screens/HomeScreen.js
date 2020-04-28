import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'native-base';
import OrderItem from '../components/HomeScreen/OrderItem';
import Order404 from '../components/UI/Order404';
import SelectedOrder from '../components/HomeScreen/SelectedOrder';
import screenHome from '../store/home';
import Orders404 from '../components/UI/Order404';

const HomeScreen = props => {
  const {selectedOrder, orders} = props;
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.leftPanel}>
        {orders.map(order => {
          return (
            <TouchableOpacity
              key={order.id}
              onPress={() => props.onSelectOrder(order)}>
              <OrderItem order={order} />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.rightPanel}>
        {selectedOrder ? (
          <SelectedOrder order={selectedOrder} />
        ) : (
          <Orders404 />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  leftPanel: {
    flex: 2,
    backgroundColor: '#131313',
    height: '100%',
  },
  rightPanel: {
    flex: 4,
    backgroundColor: '#f3f3f4',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    orders: state.home.orders,
    selectedOrder: state.home.selectedOrder,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectOrder: order =>
      dispatch({type: screenHome.actions.SELECT_ORDER, order}),
    // onAuthStart: () => dispatch(authStart()),
    // onAuthLogout: () => dispatch(authLogout())
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
