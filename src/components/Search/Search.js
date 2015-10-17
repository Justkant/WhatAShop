import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({search: state.search.data}))
export default class InfoBar extends Component {
  static propTypes = {
    search: PropTypes.object
  };

  render() {
    // const { search } = this.props;
    const styles = require('./Search.styl');
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.searchBar}>
            <i className="material-icons">search</i>
            <input className={styles.searchInput} type="text" name="search" placeholder="Search"/>
          </div>
        </div>
      </div>
    );
  }
}
