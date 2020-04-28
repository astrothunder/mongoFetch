/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import {View, TouchableOpacity} from 'react-native';
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {all} from 'redux-saga/effects';
import {Root} from 'native-base';
import screenHome from './src/store/home';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const {store, persistor, sagaMiddleware} = configureStore();

function* rootSaga() {
  yield all([screenHome.sagas()]);
}

sagaMiddleware.run(rootSaga);

const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <Provider store={store}>
      <Root>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeStackScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Root>
    </Provider>
  );
};

export default App;
