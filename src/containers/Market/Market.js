import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import './Market.styl';

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

    return (
      <div>
        <header className="blue">
          <a className="headerLogo">
            <b>WS</b>
          </a>
          <div className="flexSpace"></div>
          <div className="searchBar">
            <input type="text" name="search" placeholder="Search"/>
          </div>
          <div className="flexSpace"></div>
          <div className="linkDropdown">
            <a className="buttonLink">
              <img src="profile.jpg"/>
              <span>{user.name}</span>
            </a>
          </div>
        </header>

        {children}
      </div>
    );
  }
}
