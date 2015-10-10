import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { Search, DropDownButton } from 'components';
import { logout } from 'redux/modules/auth';

@connect(state => ({router: state.router, user: state.auth.user}), { logout })
export default class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired
  };

  getOfflineHeader(Signup) {
    let path;
    let linkName;
    if (Signup) {
      path = '/login';
      linkName = 'Log in';
    } else {
      path = '/signup';
      linkName = 'Sign up';
    }
    return (
      <header className={this.styles.header}>
        <IndexLink to="/" className={this.styles.logo}>
          <b>WS</b>
        </IndexLink>
        <div className="flexSpace"></div>
        <Link to={path} className={this.styles.outlineButton}>{linkName}</Link>
      </header>
    );
  }

  getOnlineHeader() {
    const {user} = this.props;
    const profileLink = {
      to: '/profile',
      name: user ? user.username : ''
    };
    const menuLinks = [
      {to: '/admin', name: 'Admin'},
      {func: this.props.logout, name: 'Logout'}
    ];
    return (
      <header className={this.styles.header + ' ' + this.styles.blue}>
        <IndexLink to="/" className={this.styles.logo}>
          <b>WS</b>
        </IndexLink>
        <div className="flexSpace"></div>
        <Search/>
        <div className="flexSpace"></div>
        <DropDownButton link={profileLink} menuLinks={menuLinks}/>
      </header>
    );
  }

  render() {
    this.styles = require('./Header.styl');

    switch (this.props.router.location.pathname) {
      case '/signup':
        return this.getOfflineHeader(true);
      case '/login':
        return this.getOfflineHeader(false);
      case '/':
      case '/profile':
        return this.getOnlineHeader();
      default:
        return (<div></div>);
    }
  }
}
