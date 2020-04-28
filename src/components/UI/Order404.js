import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Button, Icon} from 'native-base';
// import Icon from "react-native-vector-icons/AntDesign";

const Orders404 = props => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/mongologo.png')}
      />
      <Text style={{fontSize: 20}}>Select an order to view it's details.</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Orders404;
