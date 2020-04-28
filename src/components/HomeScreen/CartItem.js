import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartItem = props => {
  if (
    props.item.form &&
    props.item.form.extra &&
    !props.item.form.extra.option
  ) {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.quantity}>{props.item.form.quantity}</Text>
          <View style={styles.titleOptionsContainer}>
            <Text style={styles.title}>{props.item.item.title}</Text>
            {(props.item.item.type === 'sashimi' ||
              props.item.item.type === 'sushi') && (
              <Text style={styles.subOption}>{props.item.type}</Text>
            )}
            {props.item.form.main && (
              <Text style={styles.subOption}>{props.item.form.main}</Text>
            )}
            {props.item.form.side && (
              <Text style={styles.subOption}>{props.item.form.side}</Text>
            )}
            {props.item.form.steak && (
              <Text style={styles.subOption}>{props.item.form.steak}</Text>
            )}
            {props.item.form.choice && (
              <Text style={styles.subOption}>{props.item.form.choice}</Text>
            )}
            {props.item.form.extra && props.item.form.bowlInput && (
              <Text style={styles.subOption}>
                {props.item.form.extra}(+$ 1.50)
              </Text>
            )}
            {props.item.form.extra && props.item.form.side && (
              <Text style={styles.subOption}>
                {props.item.form.extra}(+$ 1.50)
              </Text>
            )}
            {props.item.form.extra &&
              (props.item.item.tapioca === false ||
                props.item.item.tapioca === true) && (
                <Text style={styles.subOption}>
                  {props.item.form.extra}(+$ 0.50)
                </Text>
              )}
            {props.item.form.special_instructions && (
              <Text style={styles.subOption}>
                {props.item.form.special_instructions}
              </Text>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${props.item.item.price}</Text>
          </View>
        </View>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={styles.quantity}>{props.item.form.quantity}</Text>
          <View style={styles.titleOptionsContainer}>
            <Text style={styles.title}>{props.item.item.title}</Text>
            {(props.item.item.type === 'sashimi' ||
              props.item.item.type === 'sushi') && (
              <Text style={styles.subOption}>{props.item.type}</Text>
            )}
            {props.item.form.main && (
              <Text style={styles.subOption}>{props.item.form.main}</Text>
            )}
            {props.item.form.side && (
              <Text style={styles.subOption}>{props.item.form.side}</Text>
            )}
            {props.item.form.steak && (
              <Text style={styles.subOption}>{props.item.form.steak}</Text>
            )}
            {props.item.form.choice && (
              <Text style={styles.subOption}>{props.item.form.choice}</Text>
            )}
            {props.item.form.extra && (
              <Text style={styles.subOption}>
                {props.item.form.extra.option}(+$
                {props.item.form.extra.price.toFixed(2)})
              </Text>
            )}
            {props.item.form.special_instructions && (
              <Text style={styles.subOption}>
                {props.item.form.special_instructions}
              </Text>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${props.item.item.price}</Text>
          </View>
        </View>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0FF',
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#424242',
  },
  titleOptionsContainer: {flex: 8, flexDirection: 'column'},
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subOption: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 19,
    textAlign: 'center',
    color: '#424242',
  },
  priceContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartItem;
