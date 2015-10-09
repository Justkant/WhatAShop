import React, { Component } from 'react';

export default class SignupForm extends Component {
  render() {
    const styles = require('./SignupForm.styl');
    return (
      <form className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <input type="email" placeholder="Email"/>
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Password"/>
        </div>
        <div className={styles.inputBox}>
          <input type="text" placeholder="Username"/>
        </div>
      </form>
    );
  }
}
