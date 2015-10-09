import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { Search } from 'components';

@connect(state => ({router: state.router, user: state.auth.user}))
export default class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    router: PropTypes.object
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
    return (
      <header className={this.styles.header + ' ' + this.styles.blue}>
        <IndexLink to="/" className={this.styles.logo}>
          <b>WS</b>
        </IndexLink>
        <div className="flexSpace"></div>
        <Search/>
        <div className="flexSpace"></div>
        <div className={this.styles.linkDropdown}>
          <Link to="/profile" className={this.styles.buttonLink}>
            <img src="default-user.png"/>
            <span>{user && user.name}</span>
          </Link>
        </div>
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
      default:
        return this.getOnlineHeader();
    }
  }
}
