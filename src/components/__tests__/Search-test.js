import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { Search } from 'components';
import { Provider } from 'react-redux';
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

  const store = createStore(client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Search/>
    </Provider>
  );

  it('should render correctly', () => {
    expect(renderer).to.be.ok;
  });

});
