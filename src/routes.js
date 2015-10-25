import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';
import {
  App,
  Market,
  Signup,
  Login,
  ProfileContainer,
  Profile,
  Orders,
  Admin,
  Panel,
  Users,
  Product,
  Products,
  NotFound
} from './containers';

export default function(store) {
  const requireAuth = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        replaceState(null, '/signup');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const alreadyAuth = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireAdmin = (nextState, replaceState, cb) => {
    function checkAdmin() {
      const { auth: { user }} = store.getState();
      if (!user || !user.admin) {
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAdmin);
    } else {
      checkAdmin();
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={Market} onEnter={requireAuth}/>
      <Route path="profile" component={ProfileContainer} onEnter={requireAuth}>
        <IndexRoute component={Profile}/>
        <Route path="orders" component={Orders}/>
      </Route>
      <Route path="product" component={Product} onEnter={requireAuth}/>
      <Route path="admin" component={Admin} onEnter={requireAdmin}>
        <IndexRoute component={Panel}/>
        <Route path="users" component={Users}/>
        <Route path="products" component={Products}/>
      </Route>
      <Route path="signup" component={Signup} onEnter={alreadyAuth}/>
      <Route path="login" component={Login} onEnter={alreadyAuth}/>
      <Route path="*" component={NotFound} status={404} onEnter={requireAuth}/>
    </Route>
  );
}
