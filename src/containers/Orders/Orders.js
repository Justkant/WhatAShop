import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CartItem } from 'components';
import moment from 'moment';

@connect(state => ({user: state.auth.user}))
export default class Orders extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { user } = this.props;
    const styles = require('./Orders.styl');

    return (
      <div className={styles.ordersContainer}>
        {user && user.orders && user.orders.map((order, orderIndex) => {
          const fromNow = moment(order.createdAt).fromNow();
          const date = moment(order.createdAt).format('LLL');
          return (
            <div className={styles.orderContainer} key={order.id + orderIndex}>
              <div className={styles.orderTitle}>
                <span>Order n°{orderIndex + 1}</span>
                <span>{fromNow}</span>
                <span>Status : {order.status}</span>
              </div>
              <div className={styles.orderContent}>
                <div className={styles.orderDescription}>
                  <span className={styles.date}>Made on {date}</span>
                  <span>Total : {order.cartTotal}$</span>
                </div>
                <div className={styles.orderItems}>
                  {order.cart && order.cart.map((cartItem) => {
                    return (<CartItem cartItem={cartItem} key={cartItem.product.id}/>);
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
