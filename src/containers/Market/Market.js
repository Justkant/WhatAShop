import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './Market.styl';

@connect(state => ({user: state.auth.user}))
export default class Market extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    /* const styles = require('./Market.styl');
     const logoImage = require('./logo.png'); */
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
