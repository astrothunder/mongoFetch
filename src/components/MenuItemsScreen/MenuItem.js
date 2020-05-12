import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spinner} from 'native-base';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const MenuItem = props => {
  const {item, onToggleDisable, id, loading} = props;

  let status;

  if (item.disabled) {
    status = (
      <MaterialCommunityIcon
        size={45}
        color="red"
        name="eye-off"
        onPress={() => onToggleDisable(id, item.disabled ? true : false)}
      />
    );
  } else {
    status = (
      <MaterialCommunityIcon
        size={45}
        color="black"
        name="eye"
        onPress={() => onToggleDisable(id, item.disabled ? true : false)}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.leftDetail}>
        <Text style={styles.idText}>{item.title}</Text>
        <Text style={styles.subText}>{item.price}</Text>
      </View>
      {loading ? (
        <View style={styles.rightDetail}>
          <Spinner color="black" />
        </View>
      ) : (
        <View style={styles.rightDetail}>{status}</View>
      )}
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
  idText: {
    fontSize: 24,
    color: '#505050',
    fontWeight: '500',
    marginBottom: 5,
  },
  subText: {
    fontSize: 18,
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
    alignItems: 'flex-end',
    paddingRight: 15,
  },
});

export default MenuItem;
