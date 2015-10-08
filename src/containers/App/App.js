import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import './App.styl';

const title = 'WhatAShop';
const description = 'WhatAShop, an online shopping website.';
const image = require('./logo.png');

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description
    }
  }
};

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators({loadAuth}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    history: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.history.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.history.pushState(null, '/signup');
    }
  }

  static fetchData(store) {
    const promises = [];
    if (!isAuthLoaded(store.getState())) {
      promises.push(store.dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  render() {
    return (
      <div>
        <DocumentMeta {...meta}/>
        {this.props.children}
      </div>
    );
  }
}
