import React from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {Button, Spinner} from 'native-base';
import MenuItem from './MenuItem';

const SelectedOrder = props => {
  const {category, onToggleDisable, isConnected, loading, menu} = props;

  const updatedMenu = menu.filter(obj => obj.data.type === category);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.header}>
        <View style={styles.headerDetails}>
          <Text style={{fontSize: 30, fontWeight: '300'}}>{category}</Text>
        </View>
        <View style={styles.headerOptions} />
      </View>
      <View style={styles.main}>
        <ScrollView>
          {updatedMenu.map(obj => {
            return (
              <MenuItem
                item={obj.data}
                id={obj.id}
                key={obj.id}
                onToggleDisable={onToggleDisable}
                loading={loading}
              />
            );
          })}
        </ScrollView>
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
    borderBottomWidth: 2,
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
    flex: 7,
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
