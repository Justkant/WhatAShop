import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Market,
  Signup,
  Login,
  Profile,
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

export default function(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Market} onEnter={requireAuth(store)}/>
      <Route path="profile" component={Profile} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
}
