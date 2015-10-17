import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({user: state.auth.user}))
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  updateInfos() {
    console.log(this.refs.username.value);
    console.log(this.refs.oldPassword.value);
  }

  render() {
    const {user} = this.props;
    const styles = require('./Profile.styl');
    return (
      <div className="main">
        <div className={styles.profileHeader}>
          <div className={styles.container}>
            <img className={styles.profileImage} src="default-user.png"/>
            <h2 className={styles.profileName}>{user && user.username}</h2>
          </div>
        </div>
        <div className={styles.rows}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Orders</h3>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Settings</h3>
            <form>
              <div className={styles.blockBorder}>
                <div className={styles.inputBlock}>
                  <label>Username</label>
                  <input type="text" ref="username" defaultValue={user && user.username}/>
                </div>
              </div>
              <div className={styles.blockBorder}>
                <div className={styles.inputBlock}>
                  <label>Old password</label>
                  <input type="password" ref="oldPassword" placeholder="Old password"/>
                </div>
                <div className={styles.inputBlock}>
                  <label>New password</label>
                  <input type="password" ref="newPassword" placeholder="New password"/>
                </div>
                <div className={styles.inputBlock}>
                  <label>Confirm password</label>
                  <input type="password" ref="confirmPassword" placeholder="Confirm password"/>
                </div>
              </div>
              <div className={styles.blockBorder}>
                <input type="button" value="Save" className={styles.saveButton} onClick={this.updateInfos.bind(this)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
