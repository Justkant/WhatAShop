import React, { Component, PropTypes } from 'react';

export default class Title extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  render() {
    const {title} = this.props;
    const styles = require('./Title.styl');

    return (
      <div className={styles.container}>
        <div className={styles.tab}>
          <span>{title}</span>
        </div>
      </div>
    );
  }
}
