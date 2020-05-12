import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderList = props => {
  const {categories, selectedCategory, onSelectCategory} = props;

  if (categories.length === 0) {
    return (
      <View style={styles.nullOrdersContainer}>
        <MaterialCommunityIcons name="emoticon-sad" size={65} color="white" />
        <Text style={styles.nullText}>No categories...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {categories.map((category, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCategory(category)}>
            <View
              style={
                category === selectedCategory
                  ? styles.activeCategoryContainer
                  : styles.categoryContainer
              }>
              <View style={styles.leftDetail}>
                <Text
                  style={
                    category === selectedCategory
                      ? styles.activeCategoryText
                      : styles.categoryText
                  }>
                  {category}
                </Text>
              </View>
            </View>
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
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    height: 80,
    borderBottomWidth: 0.5,
    borderColor: '#505050',
    borderStyle: 'solid',
  },
  activeCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    height: 80,
    borderBottomWidth: 7,
    // borderTopWidth: 3,
    borderColor: 'white',
    borderStyle: 'solid',
  },
  categoryText: {
    fontSize: 19,
    color: '#505050',
    marginBottom: 5,
  },
  leftDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  activeCategoryText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
});

export default OrderList;
