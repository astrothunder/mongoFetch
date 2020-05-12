import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import screenHome from './home';
import screenMenuItems from './menuItems';
import {reducer as network} from 'react-native-offline';

const appReducer = combineReducers({
  home: screenHome.reducer,
  menuItems: screenMenuItems.reducer,
  network,
});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['home', 'menuItems'],
};

const persistedReducer = persistReducer(rootPersistConfig, appReducer);

export default () => {
  let sagaMiddleware = createSagaMiddleware();
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  return {store, persistor, sagaMiddleware};
};
