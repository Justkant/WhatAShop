import React, { Component } from 'react';

export default class Background extends Component {
  render() {
    const styles = require('./Background.styl');
    return (
      <div>
        <div className={styles.background}></div>
        <div className={styles.backgroundFader}></div>
      </div>
    );
  }
}
