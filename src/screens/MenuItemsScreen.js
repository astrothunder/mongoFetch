import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import screenMenuItems from '../store/menuItems';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import CategoryList from '../components/MenuItemsScreen/CategoryList';
import SelectedCategory from '../components/MenuItemsScreen/SelectedCategory';
import {Spinner} from 'native-base';

const MenuItemsScreen = props => {
  const {
    onToggleDisable,
    navigation,
    onSelectCategory,
    isConnected,
    loading,
    categories,
    selectedCategory,
    menu,
    onGetMenu,
    message,
    onResetMessage,
  } = props;

  useEffect(() => {
    if (menu.length === 0) {
      onGetMenu();
    }
  }, [menu, onGetMenu]);

  useEffect(() => {
    if (message) {
      Alert.alert(
        'Something went wrong...',
        message,
        [
          {
            text: 'OK',
            onPress: () => onResetMessage(),
          },
        ],
        {cancelable: true},
      );
    }
  }, [message, onResetMessage]);

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.rootContainer}>
        <StatusBar barStyle="light-content" />
        <MaterialIcons
          name="refresh"
          size={60}
          color="black"
          style={styles.refreshButton}
          onPress={() => RNRestart.Restart()}
        />
        <View style={styles.leftPanel}>
          <View style={styles.sideBarHeader}>
            <SimpleLineIcons
              name="menu"
              size={30}
              color="white"
              onPress={() => navigation.openDrawer()}
            />
            {isConnected ? (
              <React.Fragment>
                <Image
                  style={styles.logo}
                  source={require('../assets/mongologo.png')}
                />
                <Text style={styles.sideBarHeaderText}>Menu</Text>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MaterialIcons name="error" size={60} color="red" />
                <Text style={styles.offlineText}>Offline</Text>
              </React.Fragment>
            )}
          </View>
          <View style={styles.sideBarList}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
          </View>
        </View>
        <View style={styles.rightPanel}>
          {menu.length === 0 ? (
            <Spinner color="black" />
          ) : (
            <SelectedCategory
              category={selectedCategory}
              onToggleDisable={onToggleDisable}
              isConnected={isConnected}
              loading={loading}
              menu={menu}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  leftPanel: {
    flex: 1,
    // backgroundColor: '#131313',
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  rightPanel: {
    flex: 3,
    backgroundColor: '#f3f3f4',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: 'black',
  },
  sideBarHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },
  sideBarList: {
    flex: 7,
  },
  logo: {
    height: 75,
    width: 75,
  },
  sideBarHeaderText: {
    fontWeight: '200',
    fontSize: 27,
    color: 'white',
    position: 'relative',
    left: -35,
  },
  offlineText: {
    fontWeight: '200',
    fontSize: 27,
    color: 'white',
    position: 'relative',
    left: -35,
  },
  refreshButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 99,
  },
});

const mapStateToProps = state => {
  return {
    categories: state.menuItems.categories,
    menu: state.menuItems.menu,
    selectedCategory: state.menuItems.selectedCategory,
    isConnected: state.network.isConnected,
    loading: state.menuItems.loading,
    message: state.menuItems.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectCategory: category =>
      dispatch({type: screenMenuItems.actions.SELECT_CATEGORY, category}),
    onToggleDisable: (id, currentState) =>
      dispatch({
        type: screenMenuItems.actions.TOGGLE_DISABLE,
        id,
        currentState,
      }),
    onGetMenu: () => dispatch({type: screenMenuItems.actions.GET_MENU_ITEMS}),
    onResetMessage: () =>
      dispatch({type: screenMenuItems.actions.RESET_MENU_MESSAGE}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MenuItemsScreen);
