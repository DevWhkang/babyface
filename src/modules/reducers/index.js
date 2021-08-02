import { combineReducers } from 'redux';
import user from './user';
import order from './order';

const rootReducer = combineReducers({
  user,
  order,
});

export default rootReducer;
