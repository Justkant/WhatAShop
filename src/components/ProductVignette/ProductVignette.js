import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ProductVignette extends Component {
  render() {
    const styles = require('./ProductVignette.styl');
    return (
      <div className={styles.productContainer}>
        <Link to="/product">
          <img src="product.jpg"/>
        </Link>
        <div className={styles.productInfos}>
          <p>Title</p>
        </div>
      </div>
    );
  }
}
