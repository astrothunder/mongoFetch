import * as actionTypes from './actions';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  orders: [],
  selectedOrder: '',
  loading: false,
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_ORDER_FETCHED:
      let updatedOrders = [...state.orders, action.order];
      return {
        ...state,
        orders: updatedOrders,
      };
    case actionTypes.SELECT_ORDER:
      let ordersUpdated = [...state.orders];
      if (state.orders.length !== 0) {
        ordersUpdated = ordersUpdated.map(order => {
          if (!order.alert) {
            return order;
          }
          if (order.id === action.order.id) {
            order.alert = false;
          }
          return order;
        });
      }
      return {
        ...state,
        selectedOrder: action.order,
        orders: ordersUpdated,
      };
    case actionTypes.COMPLETE_ORDER:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.COMPLETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.COMPLETE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case actionTypes.REFUND_ORDER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.REFUND_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.REFUND_ORDER_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case actionTypes.SIGN_IN_FAILED:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  blacklist: ['selectedOrder', 'loading', 'message'],
};

export default persistReducer(persistConfig, reducer);
