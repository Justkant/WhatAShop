import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Navbar, Search } from 'components';

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
      window.localStorage.token = nextProps.user.token;
      this.props.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      window.localStorage.removeItem('token');
      this.props.pushState(null, '/signup');
    }
  }

  render() {
    const { user, children } = this.props;
    const styles = require('./App.styl');
    const loginApp = (
      <div className={styles.container}>
        <Navbar/>
        <div className={styles.main}>
          <Search/>
          {children}
        </div>
      </div>
    );

    return (
      <div className="fullFlex">
        <DocumentMeta {...meta}/>
        {user && loginApp}
        {!user && children}
      </div>
    );
  }
}
