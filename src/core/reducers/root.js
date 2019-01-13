import { combineReducers } from 'redux';
import modalReducers from '../../screens/reducers';

const reducers = combineReducers({
  modal: modalReducers,
});

export default reducers;