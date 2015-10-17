import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signup } from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), {signup})
export default class SignupForm extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired
  };

  signup(event) {
    const user = {
      email: this.refs.email.value,
      password: this.refs.password.value,
      username: this.refs.username.value
    };
    this.props.signup(user);
    event.preventDefault();
  }

  render() {
    const styles = require('./SignupForm.styl');
    return (
      <div className={styles.form}>
        <div className={styles.container}>
          <h3 className={styles.title}>Sign up for free</h3>
          <form className={styles.inputGroup} onSubmit={this.signup.bind(this)}>
            <div className={styles.inputBox}>
              <input ref="email" type="email" placeholder="Email" required/>
            </div>
            <div className={styles.inputBox}>
              <input ref="password" type="password" placeholder="Password" required/>
            </div>
            <div className={styles.inputBox}>
              <input ref="username" type="text" placeholder="Username" required/>
            </div>
            <input className={styles.inputButton} type="submit" value="Sign up"/>
          </form>
          <Link to="/login" className={styles.signupFooter}>
            Already an account ? <span className={styles.loginLink}>Log in</span>
          </Link>
        </div>
      </div>
    );
  }
}
