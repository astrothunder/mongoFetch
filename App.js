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
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import MenuItemsScreen from './src/screens/MenuItemsScreen';
import {StyleSheet} from 'react-native';
import configureStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {all} from 'redux-saga/effects';
import screenHome from './src/store/home';
import screenMenuItems from './src/store/menuItems';
import SplashScreen from 'react-native-splash-screen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const {store, persistor, sagaMiddleware} = configureStore();

function* rootSaga() {
  yield all([screenHome.sagas(), screenMenuItems.sagas()]);
}
sagaMiddleware.run(rootSaga);
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerStyle={styles.drawer}
            drawerContentOptions={{
              activeTintColor: '#e7ecef',
              inactiveTintColor: '#e7ecef',
            }}>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Menu Items" component={MenuItemsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#1c1c1c',
  },
});

export default App;
