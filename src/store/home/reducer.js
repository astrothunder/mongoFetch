import * as actionTypes from './actions';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  orders: [],
  selectedOrder: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_ORDER_FETCHED:
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    case actionTypes.SELECT_ORDER:
      return {
        ...state,
        selectedOrder: action.order,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  blacklist: ['orders', 'selectedOrder'],
};

export default persistReducer(persistConfig, reducer);
