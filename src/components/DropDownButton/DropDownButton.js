import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class DropDownButton extends Component {
  static propTypes = {
    infos: PropTypes.object.isRequired,
    links: PropTypes.array
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
    const {infos, links} = this.props;
    const {showDrop} = this.state;
    return (
      <div className={styles.linkDropdown}>
        <button className={styles.buttonLink} onClick={this.onClickDrop.bind(this)}>
          <img className={styles.infosImg} src={infos.image}/>
          <span className={styles.infosText}>{infos.name}</span>
          <i className="material-icons md-18">keyboard_arrow_down</i>
        </button>
        <div className={styles.dropContainer + (showDrop ? (' ' + styles.active) : '')}>
          {links.map((link) => {
            if (link.to) {
              return <Link to={link.to} key={link.name} className={styles.dropLink}>{link.name}</Link>;
            }
            return <a onClick={link.func} key={link.name} className={styles.dropLink}>{link.name}</a>;
          })}
        </div>
      </div>
    );
  }
}
