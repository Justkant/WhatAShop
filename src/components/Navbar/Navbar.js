import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { DropDownButton } from 'components';
import { logout } from 'redux/modules/auth';

@connect(state => ({router: state.router, user: state.auth.user}), { logout })
export default class Navbar extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./Navbar.styl');
    const {user} = this.props;
    const infos = {
      name: user ? user.username : '',
      image: 'default-user.png'
    };
    const menuLinks = [
      {to: '/profile', name: 'Profile'},
      {to: '/admin', name: 'Admin'},
      {func: this.props.logout, name: 'Logout'}
    ];

    return (
      <div className={styles.navbar}>
        <div className={styles.logoContainer}>
          <IndexLink to="/" className={styles.logo}>
            <i></i><span>WhatAShop</span>
          </IndexLink>
        </div>
        <div className={styles.menuContainer}>
          <DropDownButton infos={infos} links={menuLinks}/>
        </div>
      </div>
    );
  }
}
