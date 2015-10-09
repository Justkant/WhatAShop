import React, {Component, PropTypes} from 'react';
// import {bindActionCreators} from 'redux';
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
      <div className={styles.searchBar}>
        <input className={styles.searchInput} type="text" name="search" placeholder="Search"/>
      </div>
    );
  }
}
