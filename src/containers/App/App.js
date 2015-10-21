import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Navbar, Search } from 'components';
import config from 'config';

@connect(state => ({user: state.auth.user}), {pushState})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  componentDidMount() {
    if (this.props.user) {
      window.localStorage.token = this.props.user.token;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      window.localStorage.token = nextProps.user.token;
      this.props.pushState(null, '/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      window.localStorage.removeItem('token');
      this.props.pushState(null, '/signup');
    } else if (nextProps.user && nextProps.user.token !== window.localStorage.token) {
      window.localStorage.token = nextProps.user.token;
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
        <DocumentMeta {...config.app}/>
        {user && loginApp}
        {!user && children}
      </div>
    );
  }
}
