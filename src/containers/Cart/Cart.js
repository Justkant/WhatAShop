import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Title } from 'components';
import { deleteCartItem } from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), { deleteCartItem })
export default class Cart extends Component {
  static propTypes = {
    user: PropTypes.object,
    deleteCartItem: PropTypes.func
  };

  deleteItem(productId) {
    this.props.deleteCartItem(this.props.user.id, productId);
  }

  render() {
    const styles = require('./Cart.styl');
    const {user} = this.props;

    return (
      <div className={styles.container}>
        <Title title="Cart"/>
        <div className={styles.productContainer}>
          {user && user.cart.map(({id, product, nbItem}) => {
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
                      <button><i className="material-icons">remove</i></button>
                      <input className={styles.number} defaultValue={nbItem}/>
                      <button><i className="material-icons">add</i></button>
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
