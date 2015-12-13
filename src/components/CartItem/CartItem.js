import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class CartItem extends Component {
  static propTypes = {
    cartItem: PropTypes.object.isRequired
  };

  render() {
    const { cartItem } = this.props;
    const styles = require('./CartItem.styl');

    return (
      <div className={styles.cartItemContainer}>
        <Link to={'/product/' + cartItem.product.id} className={styles.imgContainer}>
          <img src={'/api/' + cartItem.product.imageUrl}/>
        </Link>
        <div className={styles.productInfos}>
          <Link to={'/product/' + cartItem.product.id} className={styles.title}>{cartItem.product.title} x {cartItem.nbItem}</Link>
          <p className={styles.price}>{cartItem.product.price * cartItem.nbItem} $</p>
        </div>
      </div>
    );
  }
}
