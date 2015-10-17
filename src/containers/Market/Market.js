import React, { Component, PropTypes } from 'react';
import { ProductVignette } from 'components';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Market extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    // const {user, children} = this.props;
    const styles = require('./Market.styl');
    const products = [];
    for (let index = 0; index < 50; index++) {
      products.push(<ProductVignette key={index}/>);
    }
    return (
      <div className={styles.container}>
        {products}
      </div>
    );
  }
}
