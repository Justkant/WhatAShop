/* eslint no-unused-expressions: 0*/
import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { Search } from 'components';
import { Provider } from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Search', () => {
  const mockStore = {
    search: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        text: 'Yeah'
      }
    }
  };

  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Search/>
    </Provider>
  );

  it('should render correctly', () => {
    expect(renderer).to.be.ok;
  });

});
