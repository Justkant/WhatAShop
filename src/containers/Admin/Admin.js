/**
 * Created by julienzhang1 on 18/10/15.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Admin extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      users: true,
      products: false
    };
  }

  changeTab(state) {
    switch (state) {
      case 'users':
        this.setState({users: true, products: false});
        break;
      case 'products':
        this.setState({users: false, products: true});
        break;
      default:
        this.setState({users: true, products: false});
    }
  }

  render() {
    /* const {user} = this.props; */
    const styles = require('./Admin.styl');
    const {users, products} = this.state;

    const product = (
      <div className={styles.element}>
        <img src="product.jpg"/>
        <span>Product Test</span>
      </div>
    );

    const user = (
      <div className={styles.element}>
        <img src="default-user.png"/>
        <span>User Test</span>
      </div>
    );

    const productList = [];
    const userList = [];
    for (let index = 0; index < 50; index++) {
      productList.push(product);
    }
    for (let index = 0; index < 50; index++) {
      userList.push(user);
    }

    return (
      <div className={styles.main}>
        <div className={styles.tabContainer}>
          <div onClick={this.changeTab.bind(this, 'users')}
               className={styles.tab + (users ? (' ' + styles.active) : '')}>
            <i className="material-icons md-38">person</i>
            <span>Users</span>
          </div>
          <div onClick={this.changeTab.bind(this, 'products')}
               className={styles.tab + (products ? (' ' + styles.active) : '')}>
            <i className="material-icons md-38">assignment</i>
            <span>Products</span>
          </div>
        </div>
        {users && (
          <div className={styles.container}>
            {userList}
          </div>
        )}
        {products && (
          <div className={styles.container}>
            {productList}
          </div>
        )}
      </div>
    );
  }
}
