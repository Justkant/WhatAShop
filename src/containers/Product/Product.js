import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    const styles = require('./Product.styl');
    return (
      <div className={styles.productContainer}>

        <img src="product.jpg"/>

        <div className={styles.mainInformations}>

          <div className={styles.mainInformationsLeft}>
            <h3>Brand</h3>
            <h3>Price</h3>
          </div>

          <div className={styles.mainInformationsRight}>
            <p>Nike</p>
            <p>120$</p>
          </div>

        </div>

        <div className={styles.additionalInformations}>
          <p>Tempore quo primis auspiciis in mundanum fulgorem surgeret victura dum erunt homines Roma, ut augeretur sublimibus incrementis, foedere pacis aeternae Virtus convenit atque Fortuna plerumque dissidentes, quarum si altera defuisset, ad perfectam non venerat summitatem.</p>
        </div>

      </div>
    );
  }
}

/* OLD TEST
<div className={styles.productContainer}>
  <img src="product.jpg"/>
  <div className={styles.productInfos}>
    <h1>Title</h1>
    <h2>Price</h2>
    <div className={styles.productDescription}>
      <p>Description : Tempore quo primis auspiciis in mundanum fulgorem surgeret victura dum erunt homines Roma, ut augeretur sublimibus incrementis, foedere pacis aeternae Virtus convenit atque Fortuna plerumque dissidentes, quarum si altera defuisset, ad perfectam non venerat summitatem.</p>
    </div>
  </div>
</div>
*/
