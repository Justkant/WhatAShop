import React, { Component, PropTypes } from 'react';
import { TabNav } from 'components';

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const styles = require('./Admin.styl');
    const indexTab = {
      name: 'Panel',
      icon: 'dashboard',
      route: '/admin'
    };
    const tabs = [
      {
        name: 'Users',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Products',
        icon: 'list',
        route: '/admin/products'
      }
    ];

    return (
      <div className={styles.container}>
        <TabNav indexTab={indexTab} tabs={tabs}/>
        <div className={styles.contentContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
