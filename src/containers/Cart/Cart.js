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
            return (<div className={styles.element} key={value + index}><h4>{value}</h4></div>);
          })}
        </div>
      </div>
    );
  }
}
