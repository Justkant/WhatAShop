import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isUsersLoaded, users as getUsers } from 'redux/modules/auth';
import connectData from 'helpers/connectData';

function fetchDataDeferred(getState, dispatch) {
  if (!isUsersLoaded(getState())) {
    return dispatch(getUsers());
  }
}

@connectData(null, fetchDataDeferred)
@connect(state => ({users: state.auth.users}))
export default class Users extends Component {
  static propTypes = {
    users: PropTypes.array
  };

  render() {
    const {users = []} = this.props;
    const styles = require('./Users.styl');

    return (
      <div className={styles.container}>
        {users && users.map((user, index) => {
          return (
            <div className={styles.element} key={user.username + index}>
              <img src="/default-user.png"/>
              <span>{user.username}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
