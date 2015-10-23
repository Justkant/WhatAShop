import React, { Component, PropTypes } from 'react';
import { TabNav } from 'components';

export default class ProfileContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const styles = require('./ProfileContainer.styl');
    const indexTab = {
      name: 'Profile',
      icon: 'person',
      route: '/profile'
    };
    const tabs = [
      {
        name: 'Orders',
        icon: 'list',
        route: '/profile/orders'
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
