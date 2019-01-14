/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import Notes from './src/screens/Notes';
import {name as appName} from './app.json';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './src/core/reducers/root';
import rootSaga from './src/core/sagas/root';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => (
  <Provider store={store}>
    <Notes />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
