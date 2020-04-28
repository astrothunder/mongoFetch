import {fork, put, call, take} from 'redux-saga/effects';
import * as actionTypes from './actions';
import {eventChannel} from 'redux-saga';
import firestore from '@react-native-firebase/firestore';
// import * as api from '../../api';

function* startListener() {
  const channel = new eventChannel(emitter => {
    const listener = firestore()
      .collection('new_orders')
      .onSnapshot(
        data => {
          data.docChanges().forEach(change => {
            if (change.type === 'added') {
              emitter({data: change.doc.data(), id: change.doc.id || {}});
            }
          });
        },
        error => {
          emitter({hasError: true, error: error});
        },
      );
    return () => {
      listener.off();
    };
  });

  while (true) {
    const dataObj = yield take(channel);
    if (dataObj.hasError) {
      console.log(dataObj);
    } else {
      const order = dataObj.data;
      order['id'] = dataObj.id;
      yield put({type: actionTypes.NEW_ORDER_FETCHED, order: order});
    }
  }
}

function* mySaga() {
  yield fork(startListener);
}

export default mySaga;
