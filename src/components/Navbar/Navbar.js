import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
      image: '/default-user.png'
    };

    const menuLinks = [];
    menuLinks.push({to: '/profile', name: 'Profile'});
    if (user.admin) {
      menuLinks.push({to: '/admin', name: 'Admin'});
    }
    menuLinks.push({func: this.props.logout, name: 'Logout'});

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
        {user && user.cart && user.cart.length > 0 &&
          <div className={styles.cartContainer}>
            <Link to="/cart" className={styles.cartTitle}>
              <i className="material-icons md-18">shopping_cart</i>
              <span className={styles.cartTitleText}>Cart</span>
              <span>{user.cartTotal} $</span>
            </Link>
            <div className={styles.productList}>
              {user.cart.map(({product}) => {
                return (
                  <Link to={'/product/' + product.id} activeClassName="active" key={product.id}>
                    <p>{product.title}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}
