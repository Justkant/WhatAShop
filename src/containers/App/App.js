import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { Header } from 'components';

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

@connect(state => ({user: state.auth.user}), {pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, '/signup');
    }
  }

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  render() {
    require('./App.styl');
    return (
      <div>
        <DocumentMeta {...meta}/>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
