import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { Background } from 'components';

export default class Signup extends Component {
  render() {
    const styles = require('./Signup.styl');
    return (
      <div>
        <div className={styles.centerSignup}>
          <div className={styles.signupContainer}>
            <h2 className={styles.title}><b>W</b>hat A <b>S</b>hop</h2>
            <form className={styles.inputGroup}>
              <div className={styles.inputBox}>
                <input type="email" name="email" placeholder="Email"/>
              </div>
              <div className={styles.inputBox}>
                <input type="password" name="password" placeholder="Password"/>
              </div>
              <div className={styles.inputBox}>
                <input type="text" name="username" placeholder="Username"/>
              </div>
            </form>
            <IndexLink to="/" className={styles.signupButton}>Sign up</IndexLink>
          </div>
        </div>

        <Background/>
      </div>
    );
  }
}
