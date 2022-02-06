import { all } from 'redux-saga/effects';
import customerSagas from './customer/saga'
import dashboardSagas from './problem/saga'

export default function* rootSaga() {
  yield all([
    customerSagas(),
    dashboardSagas(),
  ]);
} 