/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import Notes from './src/screens/Notes';
import {name as appName} from './app.json';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/core/reducers/root';

// const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <Notes />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
