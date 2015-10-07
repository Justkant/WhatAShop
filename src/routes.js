import React from 'react';
import {Route} from 'react-router';
import {
  App,
  /* Profile,
  Product, */
  NotFound
} from './containers';

export default function(history) {
  return (
    <Route path="/" component={App} history={history}>
      {/* <Route path="profile" component={Profile}/>
      <Route path="product" component={Product}/> */}
      <Route path="*" component={NotFound}/>
    </Route>
  );
}
