import {fork, put, select, takeEvery, delay, take} from 'redux-saga/effects';
import * as actionTypes from './actions';
import {eventChannel} from 'redux-saga';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as selectors from './selectors';
import axios from 'axios';
import {networkSaga} from 'react-native-offline';

function* startListener() {
  yield delay(500);
  const orders = yield select(selectors.ordersSelector);

  const channel = new eventChannel(emitter => {
    const listener = firestore()
      .collection('new_orders')
      .onSnapshot(
        data => {
          data.docChanges().forEach(change => {
            if (change.type === 'added') {
              const newOrder = change.doc.data();
              const found = orders.filter(order => order.id === change.doc.id);
              if (
                found.length === 0 ||
                (found.length === 0 && newOrder.status === 'incomplete')
              ) {
                emitter({data: newOrder, id: change.doc.id || {}});
              }
            }
          });
        },
        error => {
          emitter({hasError: true, error: error});
        },
      );
    return () => {
      listener();
    };
  });

  while (true) {
    const dataObj = yield take(channel);
    if (dataObj.hasError) {
      console.log(dataObj);
    } else {
      const order = dataObj.data;
      order.id = dataObj.id;
      order.alert = true;
      yield put({type: actionTypes.NEW_ORDER_FETCHED, order: order});
    }
  }
}

export function* completeOrder(action) {
  try {
    const orderId = action.id;

    firestore()
      .collection('new_orders')
      .doc(orderId)
      .update({
        status: 'complete',
      });

    let orders = yield select(selectors.ordersSelector);

    orders = orders.map(order => {
      if (order.id === action.id) {
        order.status = 'complete';
      }
      return order;
    });

    yield put({type: actionTypes.COMPLETE_ORDER_SUCCESS, orders});
  } catch (e) {
    yield put({
      type: actionTypes.COMPLETE_ORDER_FAILED,
      message: 'Could not complete order. Please try again.',
    });
  }
}

export function* refundOrder(action) {
  try {
    yield delay(500);

    const response = yield axios({
      method: 'POST',
      url:
        'https://us-central1-lumos-webapp-mongo.cloudfunctions.net/refundOrder',
      data: {
        chargeId: action.chargeId,
        orderId: action.orderId,
      },
    });

    if (response.data.hasError) {
      throw new Error(response.data.error);
    }

    let orders = yield select(selectors.ordersSelector);

    orders = orders.map(order => {
      if (order.id === action.orderId) {
        order.status = 'refunded';
      }
      return order;
    });

    yield put({type: actionTypes.REFUND_ORDER_SUCCESS, orders});
  } catch (e) {
    yield put({
      type: actionTypes.REFUND_ORDER_FAILED,
      message: 'Refund failed to process. Please try again.',
    });
  }
}

export function* signIn() {
  try {
    auth().signInWithEmailAndPassword('gusporvida@hotmail.com', '20045gustavo');
  } catch (e) {
    yield put({
      type: actionTypes.SIGN_IN_FAILED,
      message: 'Could not sign in. Please try restart the app.',
    });
  }
}

function* mySaga() {
  yield fork(startListener);
  yield fork(signIn);
  yield fork(networkSaga, {pingInterval: 20000});
  yield takeEvery(actionTypes.COMPLETE_ORDER, completeOrder);
  yield takeEvery(actionTypes.REFUND_ORDER, refundOrder);
}

export default mySaga;
