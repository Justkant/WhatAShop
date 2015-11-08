import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Title } from 'components';

@connect(state => ({user: state.auth.user}))
export default class Cart extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const styles = require('./Cart.styl');
    const {user} = this.props;
    const array = [];
    for (let index = 0; index < 50; index++) {
      array.push('Product of ' + user.username);
    }

    return (
      <div className={styles.container}>
        <Title title="Cart"/>
        <div className={styles.productContainer}>
          {array.map((value, index) => {
            return (
              <div className={styles.element} key={value + index}>
                <div className={styles.imageContainer}>
                  <img src="/product.jpg" className={styles.image}/>
                </div>
                <div className={styles.infoContainer}>
                  <p>{value}</p>
                  <p>Price</p>
                  <div className={styles.buttonContainer}>
                    <div className={styles.inputNumber}>
                      <button><i className="material-icons">remove</i></button>
                      <input className={styles.number} defaultValue="1"/>
                      <button><i className="material-icons">add</i></button>
                    </div>
                    <button className={styles.deleteButton}>
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
