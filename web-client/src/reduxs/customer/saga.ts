import {
  takeEvery,
  all,
  delay,
  race,
  fork,
  call,
  put,
} from "redux-saga/effects";
import { message } from "antd";

import actions from "./action";
import services from "./service";
import { openNotificationWithIcon } from "../../helpers/error-handler";

function* searchCustomerWorker() {
  yield takeEvery(actions.SEARCH_CUSTOMER, function* (props: any) {
    let hide;
    try {
      hide = message.loading("Loading");
      let { res, timeout } = yield race({
        res: call(services.searchCustomerByname, props.name),
        timeout: delay(15000),
      });

      hide();
      if (res.object === "customer" && !timeout) {
        yield put({
          type: actions.SEARCH_CUSTOMER_SUCCESS,
          data: res.rows,
        });
      } else {
        openNotificationWithIcon({ type: "error", message: res.message });
      }
    } catch (error) {
      openNotificationWithIcon({ type: "error" });
    }
  });
}

function* getAllCustomerWorker() {
  yield takeEvery(actions.GET_CUSTOMER, function* (props: any) {
    let hide;
    try {
      hide = message.loading("Loading");
      let { res, timeout } = yield race({
        res: call(services.getAllCustomer, props.name),
        timeout: delay(15000),
      });

      hide();
      if (res.object === "customer" && !timeout) {
        yield put({
          type: actions.GET_CUSTOMER_SUCCESS,
          data: res.rows,
        });
      } else {
        openNotificationWithIcon({ type: "error", message: res.message });
      }
    } catch (error) {
      openNotificationWithIcon({ type: "error" });
    }
  });
}

function* createCustomerWorker() {
  yield takeEvery(actions.CREATE_CUSTOMER, function* (props: any) {
    let hide;
    try {
      hide = message.loading("Loading");
      let { res, timeout } = yield race({
        res: call(services.createCustomer, props.data),
        timeout: delay(15000),
      });

      hide();
      if (res.object === "customer" && !timeout) {
        yield put({
          type: actions.CREATE_CUSTOMER_SUCCESS,
        });
        props.redirect();

        openNotificationWithIcon({ type: "success", message: res.message });
      } else {
        openNotificationWithIcon({ type: "error", message: res.message });
      }
    } catch (error) {
      openNotificationWithIcon({ type: "error" });
    }
  });
}

export default function* () {
  yield all([
    fork(searchCustomerWorker),
    fork(getAllCustomerWorker),
    fork(createCustomerWorker),
  ]);
}
