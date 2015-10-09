import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    children: PropTypes.object,
    user: PropTypes.object
  };

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  render() {
    /* const {user, children} = this.props;
    const styles = require('./Profile.styl'); */

    return (
      <div>
      </div>
    );
  }
}
