import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import screenHome from './home';

const appReducer = combineReducers({
  home: screenHome.reducer,
});

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['home'],
};

const persistedReducer = persistReducer(rootPersistConfig, appReducer);

export default () => {
  let sagaMiddleware = createSagaMiddleware();
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);
  return {store, persistor, sagaMiddleware};
};
