import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import SelectedOrder from '../components/HomeScreen/SelectedOrder';
import screenHome from '../store/home';
import Orders404 from '../components/UI/Order404';
import OrderList from '../components/HomeScreen/OrderList';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart';
import moment from 'moment';
const Sound = require('react-native-sound');

var soundAlert = new Sound('soundAlert.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    return;
  }
  soundAlert.setNumberOfLoops(-1);
});

const HomeScreen = props => {
  const {
    selectedOrder,
    orders,
    navigation,
    onCompleteOrder,
    onSelectOrder,
    onRefundOrder,
    isConnected,
    loading,
    message,
    onResetMessage,
  } = props;

  const [showAll, setShowAll] = useState(false);

  let sortedOrders = [];

  const dayOfTheYear = moment().dayOfYear();

  if (orders.length > 0) {
    if (!showAll) {
      orders.forEach(order => {
        let orderDay = moment(new Date(order.date._seconds * 1000));
        if (orderDay.dayOfYear() === dayOfTheYear) {
          sortedOrders.push(order);
        }
      });
    } else {
      sortedOrders = [...orders];
    }
  }

  sortedOrders = sortedOrders.sort((a, b) => b.date._seconds - a.date._seconds);

  useEffect(() => {
    const newOrdersFound = orders.filter(order => order.alert === true);
    if (newOrdersFound.length !== 0) {
      // Play alert sound
      soundAlert.play();
    } else {
      soundAlert.pause();
    }
  }, [orders]);

  useEffect(() => {
    if (message) {
      Alert.alert(
        'Something went wrong...',
        message,
        [
          {
            text: 'OK',
            onPress: () => onResetMessage(),
          },
        ],
        {cancelable: true},
      );
    }
  }, [message, onResetMessage]);

  const createTwoButtonAlert = (charge, orderId) =>
    Alert.alert(
      'REFUND ORDER',
      'Are you sure you want to refund this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Refund',
          onPress: () => onRefundOrder(charge, orderId),
        },
      ],
      {cancelable: false},
    );

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialIcons
          name="refresh"
          size={60}
          color="black"
          style={styles.refreshButton}
          onPress={() => RNRestart.Restart()}
        />
        <View style={styles.leftPanel}>
          <View style={styles.sideBarHeader}>
            <SimpleLineIcons
              name="menu"
              size={30}
              color="white"
              onPress={() => navigation.openDrawer()}
            />
            {isConnected ? (
              <React.Fragment>
                <Image
                  style={styles.logo}
                  source={require('../assets/mongologo.png')}
                />
                <Text style={styles.sideBarHeaderText}>Mongo Orders</Text>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MaterialIcons name="error" size={60} color="red" />
                <Text style={styles.offlineText}>Offline</Text>
              </React.Fragment>
            )}
          </View>
          <View style={styles.sideBarList}>
            <OrderList
              orders={sortedOrders}
              selectedId={selectedOrder.id}
              onSelectOrder={onSelectOrder}
            />
          </View>
          <TouchableOpacity
            style={styles.sideBarFooter}
            onPress={() => setShowAll(!showAll)}>
            <FeatherIcons
              name={showAll ? 'check-square' : 'square'}
              color="white"
              size={35}
            />
            <Text style={styles.showAllText}>SHOW ALL ORDERS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightPanel}>
          {selectedOrder ? (
            <SelectedOrder
              order={selectedOrder}
              onCompleteOrder={onCompleteOrder}
              onRefundOrder={(charge, orderId) =>
                createTwoButtonAlert(charge, orderId)
              }
              loading={loading}
              isConnected={isConnected}
            />
          ) : (
            <Orders404 />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  leftPanel: {
    flex: 2,
    // backgroundColor: '#131313',
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  rightPanel: {
    flex: 4,
    backgroundColor: '#f3f3f4',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: 'black',
  },
  sideBarHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomColor: '#1c1c1c',
    borderBottomWidth: 3,
  },
  sideBarList: {
    flex: 19,
  },
  sideBarFooter: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderTopColor: '#1c1c1c',
    borderTopWidth: 3,
  },
  logo: {
    height: 75,
    width: 75,
  },
  sideBarHeaderText: {
    fontWeight: '200',
    fontSize: 27,
    color: 'white',
    position: 'relative',
    left: -35,
  },
  offlineText: {
    fontWeight: '200',
    fontSize: 27,
    color: 'white',
    position: 'relative',
    left: -75,
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 99,
  },
  showAllText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 22,
    marginLeft: 15,
  },
});

const mapStateToProps = state => {
  return {
    orders: state.home.orders,
    selectedOrder: state.home.selectedOrder,
    isConnected: state.network.isConnected,
    loading: state.home.loading,
    message: state.home.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectOrder: order =>
      dispatch({type: screenHome.actions.SELECT_ORDER, order}),
    onCompleteOrder: id =>
      dispatch({type: screenHome.actions.COMPLETE_ORDER, id}),
    onRefundOrder: (chargeId, orderId) =>
      dispatch({type: screenHome.actions.REFUND_ORDER, chargeId, orderId}),
    onResetMessage: () => dispatch({type: screenHome.actions.RESET_MESSAGE}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
