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
          <p>{product.title}</p>
        </div>
      </div>
    );
  }
}
