import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
// import multireducer from 'multireducer';

import auth from './auth';
import search from './search';

export default combineReducers({
  router: routerStateReducer,
  auth,
  search
});
