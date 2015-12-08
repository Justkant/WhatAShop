import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Title } from 'components';
import { deleteCartItem, updateCartItem, validateCart } from 'redux/modules/auth';
import { pushState } from 'redux-router';

@connect(state => ({user: state.auth.user}), { deleteCartItem, updateCartItem, validateCart, pushState })
export default class Cart extends Component {
  static propTypes = {
    user: PropTypes.object,
    deleteCartItem: PropTypes.func,
    updateCartItem: PropTypes.func,
    validateCart: PropTypes.func,
    pushState: PropTypes.func
  };

  handleFocus(ev) {
    ev.target.select();
  }

  inputHandler(productId, currentNbItem) {
    const nb = parseInt(this.refs.inputNbItem.value, 10);

    if (nb && nb !== currentNbItem) {
      this.updateItem.bind(this, productId, nb)();
    }
  }

  updateItem(productId, nbItem) {
    if (nbItem > 0) {
      this.props.updateCartItem(this.props.user.id, productId, nbItem);
    }
  }

  deleteItem(productId) {
    this.props.deleteCartItem(this.props.user.id, productId);
  }

  validateCart() {
    this.props.validateCart(this.props.user.id);
    this.props.pushState(null, '/profile/orders');
  }

  render() {
    const styles = require('./Cart.styl');
    const {user} = this.props;

    return (
      <div className={styles.container}>
        <Title title="Cart" showButton button="done" func={this.validateCart.bind(this)}/>
        <div className={styles.productContainer}>
          {user && user.cart && user.cart.map(({id, product, nbItem}) => {
            return (
              <div className={styles.element} key={product.id}>
                <div className={styles.imageContainer}>
                  <img src={'/api/' + product.imageUrl} className={styles.image}/>
                </div>
                <div className={styles.infoContainer}>
                  <p>{product.title}</p>
                  <p>{product.price} $</p>
                  <div className={styles.buttonContainer}>
                    <div className={styles.inputNumber}>
                      <button onClick={this.updateItem.bind(this, id, nbItem - 1)}><i className="material-icons">remove</i></button>
                      <input className={styles.number} ref="inputNbItem" value={nbItem} onChange={this.inputHandler.bind(this, id, nbItem)} onFocus={this.handleFocus}/>
                      <button onClick={this.updateItem.bind(this, id, nbItem + 1)}><i className="material-icons">add</i></button>
                    </div>
                    <button className={styles.deleteButton} onClick={this.deleteItem.bind(this, id)}>
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
