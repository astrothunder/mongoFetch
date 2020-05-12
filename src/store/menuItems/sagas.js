import {put, select, takeEvery, delay} from 'redux-saga/effects';
import * as actionTypes from './actions';
import firestore from '@react-native-firebase/firestore';
import * as selectors from './selectors';
import axios from 'axios';
import moment from 'moment';

const newDay = moment('12:01 AM', 'H:mmA').hour();
const lT = moment('3:00 PM', 'H:mmA').hour();
let cT = moment().hour();
const lunch = cT > newDay && cT < lT;

export function* getMenu() {
  try {
    const data = yield firestore()
      .collection('menu_items')
      .orderBy('price', 'asc')
      .get();

    const menu = [];

    yield data.forEach(doc => {
      if (doc.data().type === 'bowl') {
        const newData = {...doc.data()};
        lunch
          ? (newData.price = doc.data().price.lunch)
          : (newData.price = doc.data().price.dinner);
        menu.push({data: newData, id: doc.id});
      } else {
        menu.push({data: doc.data(), id: doc.id});
      }
    });

    yield put({type: actionTypes.GET_MENU_ITEMS_SUCCESS, menu});
  } catch (e) {
    yield put({type: actionTypes.GET_MENU_ITEMS_FAILED});
  }
}

export function* toggleDisable(action) {
  try {
    const itemId = action.id;
    const currentState = action.currentState;

    firestore()
      .collection('menu_items')
      .doc(itemId)
      .update({
        disabled: !currentState,
      });

    yield put({type: actionTypes.TOGGLE_DISABLE_SUCCESS});
  } catch (e) {
    yield put({type: actionTypes.TOGGLE_DISABLE_FAILED});
  }
}

function* mySaga() {
  yield takeEvery(actionTypes.GET_MENU_ITEMS, getMenu);
  yield takeEvery(actionTypes.TOGGLE_DISABLE, toggleDisable);
}

export default mySaga;
