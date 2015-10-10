import React, { Component, PropTypes } from 'react';

export default class CenterContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const styles = require('./CenterContainer.styl');
    return (
      <div className={styles.center}>
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
