import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import transitionMiddleware from './middleware/transitionMiddleware';

export default function createStore(reduxReactRouter, getRoutes, createHistory, client, data) {
  const middleware = [createMiddleware(client)];

  if (__CLIENT__) {
    middleware.push(transitionMiddleware);
  }
  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);
  finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);
  store.client = client;

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
