import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { update, remove } from 'redux/modules/auth';
import { FakeInput } from 'components';

@connect(state => ({user: state.auth.user}), {update, remove})
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    update: PropTypes.func,
    remove: PropTypes.func
  };

  constructor() {
    super();
    this.updateProfile = this.updateProfile.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  updateProfile(data) {
    this.props.update(this.props.user.id, data);
  }

  updateEmail(newValue) {
    this.updateProfile({email: newValue});
  }

  updateName(newValue) {
    this.updateProfile({username: newValue});
  }

  updatePassword(event) {
    event.preventDefault();
    const {currentPassword, newPassword, confirmPassword} = this.refs;
    if (newPassword.value === confirmPassword.value) {
      this.updateProfile({currentPassword: currentPassword.value, newPassword: newPassword.value});
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    }
  }

  deleteAccount() {
    this.props.remove(this.props.user.id);
  }

  render() {
    const {user} = this.props;
    const styles = require('./Profile.styl');

    return (
      <div className={styles.settingsContainer}>
        <div className={styles.setting}>
          <div className={styles.settingLeft}>
            <h3 className={styles.settingHead}>Profile</h3>
            <p className={styles.settingText}>Your email address is your identity on WhatAShop and is used to log in.</p>
          </div>
          <div className={styles.settingRight}>
            <FakeInput label="Email Adress" value={user.email} onSubmit={this.updateEmail}/>
            <FakeInput label="Name" value={user.username} onSubmit={this.updateName}/>
          </div>
        </div>
        <div className={styles.setting}>
          <div className={styles.settingLeft}>
            <h3 className={styles.settingHead}>Password</h3>
            <p className={styles.settingText}>Change your password that is used to log in.</p>
          </div>
          <form className={styles.settingRight} onSubmit={this.updatePassword}>
            <div className={styles.inputContainer + ' ' + styles.separator}>
              <label>Current Password</label>
              <input ref="currentPassword" type="password" placeholder="enter your current password"/>
            </div>
            <div className={styles.inputContainer}>
              <label>New Password</label>
              <input ref="newPassword" type="password" placeholder="enter a new password"/>
            </div>
            <div className={styles.inputContainer}>
              <label>Confirm New Password</label>
              <input ref="confirmPassword" type="password" placeholder="enter the password again"/>
            </div>
            <div>
              <button className={styles.button} type="submit">Update Password</button>
            </div>
          </form>
        </div>
        <div className={styles.setting}>
          <div className={styles.settingLeft}>
            <h3 className={styles.settingHead + ' ' + styles.red}>Delete account</h3>
            <p className={styles.settingText}><b>Warning:</b> Closing your account is irreversible.</p>
          </div>
          <div className={styles.settingRight}>
            <div>
              <button className={styles.button + ' ' + styles.buttonRed} onClick={this.deleteAccount}>Delete this account...</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
