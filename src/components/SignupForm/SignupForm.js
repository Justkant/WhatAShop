import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signup } from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), {signup})
export default class SignupForm extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired
  };

  signup() {
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      username: this.refs.username.value
    };

    this.props.signup(user);
  }

  render() {
    const styles = require('./SignupForm.styl');
    return (
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputBox}>
            <input ref="email" type="email" placeholder="Email"/>
          </div>
          <div className={styles.inputBox}>
            <input ref="password" type="password" placeholder="Password"/>
          </div>
          <div className={styles.inputBox}>
            <input ref="username" type="text" placeholder="Username"/>
          </div>
        </div>
        <input className={styles.inputButton} onClick={this.signup.bind(this)} type="button" value="Sign up"/>
      </form>
    );
  }
}
