import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Market extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    // const {user, children} = this.props;
    // const styles = require('./Market.styl');
    return (
      <div className="topMargin">
        <h2>Market</h2>
      </div>
    );
  }
}
