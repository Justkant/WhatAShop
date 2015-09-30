import React from 'react';
import {Route} from 'react-router';
import {
  App,
  Market,
  Profile,
  Product,
  Login,
  RequireLogin,
  NotFound
} from './containers';

export default function(history) {
  return (
    <Route component={App} history={history}>
      <Route path="/login" component={Login}/>
      <Route component={RequireLogin}>
        <Route path="/" component={Market}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/product" component={Product}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
