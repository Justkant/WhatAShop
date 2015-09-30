import { combineReducers } from 'redux';
// import multireducer from 'multireducer';

import auth from './auth';
import search from './search';

export default combineReducers({
  auth,
  search
});
