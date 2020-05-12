import * as actionTypes from './actions';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  menu: [],
  loading: false,
  selectedCategory: '',
  categories: [
    'appetizer',
    'special_combo',
    'soup_salad',
    'bowl',
    'hibachi',
    'traditional',
    'sushi_appetizer',
    'sashimi',
    'sushi',
    'rolls',
    'smoothie',
    'milk_tea',
  ],
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.category,
      };
    case actionTypes.GET_MENU_ITEMS_SUCCESS:
      return {
        ...state,
        menu: action.menu,
      };
    case actionTypes.GET_MENU_ITEMS_FAILED:
      return {
        ...state,
        message:
          'Failed to get menu items. Please try again or restart the app.',
      };

    case actionTypes.TOGGLE_DISABLE:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.TOGGLE_DISABLE_SUCCESS:
      return {
        ...state,
        menu: [],
        loading: false,
      };

    case actionTypes.TOGGLE_DISABLE_FAILED:
      return {
        ...state,
        loading: false,
        message: 'Trying to disable item failed. Please try again.',
      };

    case actionTypes.RESET_MENU_MESSAGE:
      return {
        ...state,
        message: '',
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: 'home',
  storage: AsyncStorage,
  blacklist: ['loading', 'menu', 'selectedCategory', 'message'],
};

export default persistReducer(persistConfig, reducer);
