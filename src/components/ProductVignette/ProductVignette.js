import React, { Component } from 'react';

export default class ProductVignette extends Component {
  render() {
    const styles = require('./ProductVignette.styl');
    return (
      <div className={styles.productContainer}>
        <img src="product.jpg"/>
        <div className={styles.productInfos}>
          <p>Title</p>
        </div>
      </div>
    );
  }
}
