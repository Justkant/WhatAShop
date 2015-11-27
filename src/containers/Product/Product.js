import React, { Component, PropTypes } from 'react';
import { Title } from 'components';
import { connect } from 'react-redux';
import { isProductLoaded, getById } from 'redux/modules/product';
import { addToCart } from 'redux/modules/auth';
import connectData from 'helpers/connectData';

function fetchDataDeferred(getState, dispatch, location, params) {
  if (!isProductLoaded(getState())) {
    return dispatch(getById(params.id));
  }
}

@connectData(null, fetchDataDeferred)
@connect(state => ({user: state.auth.user, product: state.product.product}), {addToCart})
export default class Product extends Component {
  static propTypes = {
    user: PropTypes.object,
    product: PropTypes.object,
    params: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct() {
    this.props.addToCart(this.props.user.id, this.props.product.id);
  }

  render() {
    const {product} = this.props;
    const styles = require('./Product.styl');

    const finalRender = product ? (
      <div className={styles.container}>
        <Title title={product.title}/>

        <div className={styles.productContainer}>

          <div className={styles.imgContainer}>
            <img src={'/api/' + product.imageUrl}/>
          </div>

          <div className={styles.mainInformations}>
              <p className={styles.price}><b>Price:</b> {product.price + ' $'}</p>
              <p className={styles.desc}>{product.description}</p>
          </div>

          <div className={styles.addContainer}>
            <button className={styles.addButton} onClick={this.addProduct}>
              <i className="material-icons md-18">add_shopping_cart</i>
              <span>Add</span>
            </button>
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
