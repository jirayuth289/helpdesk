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

function* getDataProblemWorker() {
  yield takeEvery(actions.GET_PROBLEM, function* (props: any) {
    let hide;
    try {
      hide = message.loading("Loading");
      let { res, timeout } = yield race({
        res: call(services.getService, props.keyword),
        timeout: delay(15000),
      });

      hide();
      if (res.object === "problem" && !timeout) {
        yield put({
          type: actions.GET_PROBLEM_SUCCESS,
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

function* createProblemWorker() {
  yield takeEvery(actions.CREATE_PROBLEM, function* (props: any) {
    let hide;
    try {
      hide = message.loading("Loading");
      let { res, timeout } = yield race({
        res: call(services.createProblem, props.data),
        timeout: delay(15000),
      });

      hide();
      if (res.object === "problem" && !timeout) {
        yield put({
          type: actions.CREATE_PROBLEM_SUCCESS,
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
  yield all([fork(getDataProblemWorker), fork(createProblemWorker)]);
}
