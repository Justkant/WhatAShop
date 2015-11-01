import React, { Component, PropTypes } from 'react';
import { ProductVignette } from 'components';
import { connect } from 'react-redux';
import { isLoaded as isMarketLoaded, load as loadMarket } from 'redux/modules/product';

@connect(state => ({market: state.product.market}))
export default class Market extends Component {
  static propTypes = {
    market: PropTypes.array
  };

  static fetchData(getState, dispatch) {
    if (!isMarketLoaded(getState())) {
      return dispatch(loadMarket());
    }
  }

  render() {
    const {market} = this.props;
    const styles = require('./Market.styl');

    return (
      <div className={styles.container}>
        {market.map((product) => {
          return (<ProductVignette product={product} key={product.id}/>);
        })}
      </div>
    );
  }
}
