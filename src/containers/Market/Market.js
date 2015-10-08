import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Search } from 'components';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}))
export default class Market extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  render() {
    const {user, children} = this.props;
    const styles = require('./Market.styl');

    return (
      <div>
        <header className={styles.blue}>
          <a className="headerLogo">
            <b>WS</b>
          </a>
          <div className="flexSpace"></div>
          <Search/>
          <div className="flexSpace"></div>
          <div className={styles.linkDropdown}>
            <a className={styles.buttonLink}>
              <img src="default-user.png"/>
              <span>{user.name}</span>
            </a>
          </div>
        </header>

        {children}
      </div>
    );
  }
}
