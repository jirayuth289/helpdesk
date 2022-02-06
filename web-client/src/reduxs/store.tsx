import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducers from './root-reducers';
import rootSaga from './root-sagas';

const createHistory = require("history").createBrowserHistory
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [routeMiddleware, sagaMiddleware];

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  ...rootReducers
})

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
export { store, history };
