import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const {user} = this.props;
    const styles = require('./Profile.styl');
    return (
      <div className="topPadding flexFull">
        <div className={styles.profileHeader}>
          <div className={styles.container}>
            <img className={styles.profileImage} src="default-user.png"/>
            <h2 className={styles.profileName}>{user.username}</h2>
          </div>
        </div>
        <div className={styles.rows}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Orders</h3>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Settings</h3>
          </div>
        </div>
      </div>
    );
  }
}
