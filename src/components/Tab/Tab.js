import React, {Component, PropTypes} from 'react';

export default class Tab extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    icon: PropTypes.string
  };

  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(this);
  }

  render() {
    const {label, selected, icon, ...other} = this.props;
    const styles = require('./Tab.styl');

    return (
      <div {...other} onClick={this.handleOnClick} className={styles.tab + (selected ? (' ' + styles.active) : '')}>
        {icon && <i className="material-icons md-38">{icon}</i>}
        <span>{label}</span>
      </div>
    );
  }
}
