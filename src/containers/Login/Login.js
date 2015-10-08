import React, { Component } from 'react';
import { Link } from 'react-router';
import { Background } from 'components';

export default class Login extends Component {
  render() {
    const styles = require('./Login.styl');
    return (
      <div>
        <header>
          <a className="headerLogo">
            <b>WS</b>
          </a>
          <div className="flexSpace"></div>
          <Link to="/signup" className={styles.outlineButton}>Sign up</Link>
        </header>

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
            </form>
            <Link to="/" className={styles.signupButton}>Log in</Link>
          </div>
        </div>

        <Background/>
      </div>
    );
  }
}
