import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      settings: true,
      orders: false
    };
  }

  changeTab(state) {
    switch (state) {
      case 'settings':
        this.setState({settings: true, orders: false});
        break;
      case 'orders':
        this.setState({settings: false, orders: true});
        break;
      default:
        this.setState({settings: true, orders: false});
    }
  }

  render() {
    const {user} = this.props;
    const {settings, orders} = this.state;
    const styles = require('./Profile.styl');
    const array = [];
    for (let index = 0; index < 50; index++) {
      array.push(user.username);
    }
    return (
      <div className={styles.main}>
        <div className={styles.tabContainer}>
          <div onClick={this.changeTab.bind(this, 'settings')}
               className={styles.tab + (settings ? (' ' + styles.active) : '')}>
            <i className="material-icons md-38">settings</i>
            <span>Settings</span>
          </div>
          <div onClick={this.changeTab.bind(this, 'orders')}
               className={styles.tab + (orders ? (' ' + styles.active) : '')}>
            <i className="material-icons md-38">list</i>
            <span>Orders</span>
          </div>
        </div>
        {settings && (
          <div className={styles.container}>
            {array.map((name) => {
              return (<div className={styles.element}><h1>{name}</h1></div>);
            })}
          </div>
        )}
        {orders && (
          <div className={styles.container}>
            {array.map((name) => {
              return (<div className={styles.element}><h1>{'Orders of ' + name}</h1></div>);
            })}
          </div>
        )}
      </div>
    );
  }
}
