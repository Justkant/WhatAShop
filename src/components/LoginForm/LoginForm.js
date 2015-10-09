import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    const styles = require('./LoginForm.styl');
    return (
      <form className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <input type="email" placeholder="Email"/>
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Password"/>
        </div>
      </form>
    );
  }
}
