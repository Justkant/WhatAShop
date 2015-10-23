import React, { Component } from 'react';

export default class Products extends Component {
  render() {
    const styles = require('./Products.styl');
    const productsList = [];

    for (let index = 0; index < 50; index++) {
      productsList.push(
        <div className={styles.element} key={index}>
          <img src="/product.jpg"/>
          <span>Product Test</span>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        {productsList}
      </div>
    );
  }
}
