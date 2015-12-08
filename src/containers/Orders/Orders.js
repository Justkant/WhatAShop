import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Orders extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { user } = this.props;
    const styles = require('./Orders.styl');

    return (
      <div className={styles.container}>
        {user && user.orders && user.orders.map((value, index) => {
          return (<div className={styles.element} key={value.id + index}><h4>{value.cartTotal}</h4></div>);
        })}
      </div>
    );
  }
}
