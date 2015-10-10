import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class DropDownButton extends Component {
  static propTypes = {
    link: PropTypes.object.isRequired,
    menuLinks: PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      showDrop: false
    };
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  onDocumentClick() {
    if (this.ignoreWindowClick) {
      return;
    }
    this.toggleShowDrop();
  }

  onClickDrop() {
    this.ignoreClick(this.toggleShowDrop);
  }

  ignoreClick(callback) {
    this.ignoreWindowClick = true;

    setTimeout(() => {
      this.ignoreWindowClick = false;
      callback.call(this);
    }, 0);
  }

  toggleShowDrop() {
    const {showDrop} = this.state;
    if (showDrop) {
      this.removeClickListener();
    } else {
      this.removeClickListener();
      window.addEventListener('click', this.clickEventListener = this.onDocumentClick.bind(this));
    }
    if (!this.unmount) this.setState({showDrop: !showDrop});
  }

  removeClickListener() {
    if (this.clickEventListener) {
      window.removeEventListener('click', this.clickEventListener);
      this.clickEventListener = null;
    }
  }

  render() {
    const styles = require('./DropDownButton.styl');
    const {link, menuLinks} = this.props;
    const {showDrop} = this.state;
    return (
      <div className={styles.linkDropdown}>
        <Link to={link.to} className={styles.buttonLink}>
          <img src="default-user.png"/>
          <span>{link.name}</span>
        </Link>
        <button className={styles.dropButton} onClick={this.onClickDrop.bind(this)}>
          |
        </button>
        <div className={styles.dropContainer + (showDrop ? (' ' + styles.active) : '')}>
          {menuLinks.map((menuLink) => {
            if (menuLink.to) {
              return <Link to={menuLink.to} key={menuLink.name} className={styles.dropLink}>{menuLink.name}</Link>;
            }
            return <button onClick={menuLink.func} key={menuLink.name} className={styles.dropLink}>{menuLink.name}</button>;
          })}
        </div>
      </div>
    );
  }
}
