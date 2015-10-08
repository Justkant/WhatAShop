/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';

const history = createHistory();
const client = new ApiClient();

const dest = document.getElementById('content');
const store = createStore(client, window.__data);

const location = history.createLocation(document.location.pathname, document.location.search);

const render = (loc, hist, str, preload) => {
  return universalRouter(loc, hist, str, preload)
    .then(({component}) => {
      ReactDOM.render(component, dest);
      /* if (__DEVTOOLS__) {
        const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
        ReactDOM.render(<div>
          {component}
          <DebugPanel top right bottom key="debugPanel">
            <DevTools store={store} monitor={LogMonitor}/>
          </DebugPanel>
        </div>, dest);
      }*/
    }, (error) => {
      console.error(error);
    });
};

history.listenBefore((loc, callback) => {
  render(loc, history, store, true)
    .then((callback));
});

render(location, history, store, !dest.firstChild);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
