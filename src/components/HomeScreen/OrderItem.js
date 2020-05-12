import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import moment from 'moment';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Spinner} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderItem = props => {
  const {order, selectedId} = props;
  const isOrderActive = order.id === selectedId;

  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  let status;

  if (order.status === 'complete') {
    if (isOrderActive) {
      status = <AntDesignIcon size={35} color="#276FBF" name="checksquare" />;
    } else {
      status = <AntDesignIcon size={35} color="#0e2c4d" name="checksquare" />;
    }
  } else if (order.status === 'incomplete') {
    status = <Spinner color="#f9c784" />;
  } else if (order.status === 'refunded') {
    status = (
      <MaterialCommunityIcon
        name="credit-card-refund"
        color="#7A0000"
        size={40}
      />
    );
  }

  useEffect(() => {
    if (order.alert) {
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        {
          iterations: -1,
          useNativeDriver: true,
        },
      ).start();
    } else {
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        {
          iterations: -1,
          useNativeDriver: true,
        },
      ).stop();
    }
  }, [fadeAnim, order]);

  // const time = moment('6:30PM', 'h:mmA').utc();

  if (order.alert) {
    return (
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
          },
        ]}>
        <View style={styles.alertedOrder}>
          <Text style={styles.aleretedText}>NEW ORDER</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <View
      style={isOrderActive ? styles.activeRootContainer : styles.rootContainer}>
      <View style={styles.leftDetail}>
        <Text style={isOrderActive ? styles.activeIdText : styles.idText}>
          {order.cart.length} item(s) for {order.form.name}
        </Text>
        <Text style={isOrderActive ? styles.activeIdsSubText : styles.subText}>
          {order.id}
        </Text>
      </View>
      <View style={styles.rightDetail}>{status}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    height: 100,
    borderBottomWidth: 0.5,
    borderColor: '#505050',
    borderStyle: 'solid',
  },
  activeRootContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    height: 100,
    borderBottomWidth: 7,
    // borderTopWidth: 3,
    borderColor: 'white',
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 4.28,
    elevation: 11,
  },
  idText: {
    fontSize: 19,
    color: '#505050',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#505050',
  },
  leftDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 6,
  },
  rightDetail: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 19,
    color: '#505050',
  },
  activeIdText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  activeIdsSubText: {
    fontSize: 15,
    color: 'white',
  },
  activeTimerText: {
    fontSize: 18,
    color: 'white',
  },
  alertedOrder: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    height: 100,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: 'black',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#276FBF',
  },
  aleretedText: {
    color: 'black',
    fontSize: 35,
    fontWeight: '100',
  },
});

export default OrderItem;
