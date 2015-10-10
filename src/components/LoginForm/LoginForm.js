import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), {login})
export default class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  login() {
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.login(user);
  }

  render() {
    const styles = require('./LoginForm.styl');
    return (
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputBox}>
            <input ref="email" type="email" placeholder="Email"/>
          </div>
          <div className={styles.inputBox}>
            <input ref="password" type="password" placeholder="Password"/>
          </div>
        </div>
        <input className={styles.inputButton} onClick={this.login.bind(this)} type="button" value="Log in"/>
      </form>
    );
  }
}
