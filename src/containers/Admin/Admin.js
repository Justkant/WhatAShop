import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'components';

@connect(state => ({user: state.auth.user}))
export default class Admin extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    /* const {user} = this.props; */
    const styles = require('./Admin.styl');

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
      <Tabs containerClass={styles.main}>
        <Tab label="Users" icon="people">
          <div className={styles.container}>
            {userList}
          </div>
        </Tab>
        <Tab label="Products" icon="list">
          <div className={styles.container}>
            {productList}
          </div>
        </Tab>
      </Tabs>
    );
  }
}
