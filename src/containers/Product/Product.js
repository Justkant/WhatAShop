import React, { Component, PropTypes } from 'react';
import { Title } from 'components';
import { connect } from 'react-redux';
import { isProductLoaded, getById } from 'redux/modules/product';

@connect(state => ({product: state.product.product}))
export default class Product extends Component {
  static propTypes = {
    product: PropTypes.object,
    params: PropTypes.object.isRequired
  };

  static fetchDataDeferred(getState, dispatch, location, params) {
    if (!isProductLoaded(getState())) {
      return dispatch(getById(params.id));
    }
  }

  render() {
    const {product} = this.props;
    const styles = require('./Product.styl');

    const finalRender = product ? (
      <div className={styles.container}>
        <Title title={product.title}/>

        <div className={styles.productContainer}>

          <img src={'/api/' + product.imageUrl}/>

          <div className={styles.mainInformations}>

            <div className={styles.mainInformationsLeft}>
              <h3>Brand</h3>
              <h3>Price</h3>
            </div>

            <div className={styles.mainInformationsRight}>
              <p>{product.title}</p>
              <p>{product.price + ' $'}</p>
            </div>

          </div>

          <div className={styles.additionalInformations}>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.container}>
        <Title title="Loading"/>
      </div>
    );

    return finalRender;
  }
}
