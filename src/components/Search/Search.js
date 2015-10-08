import React, {Component, PropTypes} from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

@connect(
  state => ({search: state.search.data}))
export default class InfoBar extends Component {
  static propTypes = {
    search: PropTypes.object
  };

  render() {
    const { search } = this.props;
    return (
      <div>
        <div className="container">
          This is a search bar
          {' '}
          <strong>{search ? search.text : 'Search'}</strong>
        </div>
      </div>
    );
  }
}
