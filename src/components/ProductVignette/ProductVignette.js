import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ProductVignette extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired
  };

  render() {
    const { product } = this.props;
    const styles = require('./ProductVignette.styl');

    return (
      <div className={styles.productContainer}>
        <Link to={'/product/' + product.id}>
          <img src={'/api/' + product.imageUrl}/>
        </Link>
        <div className={styles.productInfos}>
          <Link to={'/product/' + product.id} className={styles.title}>{product.title}</Link>
          <p className={styles.price}>{product.price} $</p>
        </div>
      </div>
    );
  }
}
