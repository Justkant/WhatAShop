import React from 'react';
import { Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Market,
  Signup,
  Login,
  /* Profile,
  Product, */
  NotFound
} from './containers';

function requireAuth(store) {
  return (nextState, replaceState, callback) => {
    const redirect = () => {
      if (!isAuthLoaded(store.getState())) {
        replaceState({ nextPathname: nextState.location.pathname }, '/signup');
      }
      callback();
    };

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => {
        redirect();
      });
    } else {
      redirect();
    }
  };
}

export default function(history, store) {
  return (
    <Route component={App} history={history}>
      <Route path="/" component={Market} onEnter={requireAuth(store)}/>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      {/* <Route path="profile" component={Profile} />
      <Route path="product" component={Product} /> */}
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
