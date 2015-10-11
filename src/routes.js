import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Market,
  Signup,
  Login,
  Profile,
  NotFound
} from './containers';

export default function(store) {
  const requireAuth = (nextState, replaceState) => {
    const { auth: { user }} = store.getState();
    if (!user) {
      replaceState(null, '/signup');
    }
  };

  const alreadyAuth = (nextState, replaceState) => {
    const { auth: { user }} = store.getState();
    if (user) {
      replaceState(null, '/');
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Market} onEnter={requireAuth}/>
      <Route path="profile" component={Profile} onEnter={requireAuth}/>
      <Route path="signup" component={Signup} onEnter={alreadyAuth}/>
      <Route path="login" component={Login} onEnter={alreadyAuth}/>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
}
