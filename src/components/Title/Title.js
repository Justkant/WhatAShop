import React, { Component, PropTypes } from 'react';

export default class Title extends Component {
  static propTypes = {
    title: PropTypes.string,
    showButton: PropTypes.bool,
    button: PropTypes.string,
    func: PropTypes.func
  };

  render() {
    const {title, showButton, button, func} = this.props;
    const styles = require('./Title.styl');

    return (
      <div className={styles.container}>
        <div className={styles.tab}>
          <span>{title}</span>
        </div>
        {showButton && <button className={styles.button} onClick={func}><i className="material-icons">{button}</i></button>}
      </div>
    );
  }
}
