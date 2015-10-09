import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class BigButton extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired
  };

  render() {
    const styles = require('./BigButton.styl');
    return (
      <Link to={this.props.to} className={styles.button}>{this.props.children}</Link>
    );
  }
}
