import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { login } from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), {login})
export default class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  login(event) {
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    this.props.login(user);
    event.preventDefault();
  }

  render() {
    const styles = require('./LoginForm.styl');
    return (
      <div className={styles.form}>
        <div className={styles.container}>
          <h3 className={styles.title}>Log in to your account</h3>
          <form className={styles.inputGroup} onSubmit={this.login.bind(this)}>
            <div className={styles.inputBox}>
              <input ref="email" type="email" placeholder="Email" required/>
            </div>
            <div className={styles.inputBox}>
              <input ref="password" type="password" placeholder="Password" required/>
            </div>
            <input className={styles.inputButton} type="submit" value="Log in"/>
          </form>
          <Link to="/signup" className={styles.loginFooter}>
            New to WhatAShop ? <span className={styles.signupLink}>Sign up</span>
          </Link>
        </div>
      </div>
    );
  }
}
