import React, { Component } from 'react';

export default class Panel extends Component {
  render() {
    const styles = require('./Panel.styl');

    return (
      <div className={styles.container}>
        <h4>Panel</h4>
      </div>
    );
  }
}
