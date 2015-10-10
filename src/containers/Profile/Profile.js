import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  render() {
    /* const {user, children} = this.props;
    const styles = require('./Profile.styl'); */
    return (
      <div className="topMargin">
        <h2>Profile</h2>
      </div>
    );
  }
}
